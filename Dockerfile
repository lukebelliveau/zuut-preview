FROM node:16-alpine AS dev

WORKDIR /app/backend

ADD backend/package.json backend/package-lock.json /app/backend/
RUN npm ci
COPY backend /app/backend/

WORKDIR /app/ui
# python required to install node-canvas npm dependency
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake
ADD ui/package.json ui/package-lock.json /app/ui/
RUN npm ci
COPY ui /app/ui/

WORKDIR /app

FROM node:16-alpine AS build

WORKDIR /app/backend
COPY --from=dev /app/backend /app/backend
RUN npm run build

WORKDIR /app/ui
COPY --from=dev /app/ui /app/ui
RUN npm run build

WORKDIR /app

FROM node:16-alpine AS prod

EXPOSE 4000

ENV NODE_ENV=production
ENV UI_DIR=/app/ui/build

WORKDIR /app

COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/package.json /app/backend/package.json
COPY --from=build /app/backend/package-lock.json /app/backend/package-lock.json
COPY ./graphql /app/graphql/
WORKDIR /app/backend
RUN npm ci

COPY --from=build /app/ui/build /app/ui/build

CMD npm start
