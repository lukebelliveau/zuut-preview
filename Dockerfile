FROM node:16-alpine AS dev
# deps required to install node-canvas
# which is required to render react-konva components in Jest tests
# https://github.com/Automattic/node-canvas#compiling
# https://stackoverflow.com/a/66692565/3124493
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

WORKDIR /app/backend

ADD backend/package.json backend/package-lock.json /app/backend/
RUN npm ci
COPY backend /app/backend/

WORKDIR /app/ui-new

ADD ui-new/package.json ui-new/package-lock.json /app/ui-new/
RUN npm ci --legacy-peer-deps
COPY ui-new /app/ui-new/

WORKDIR /app

FROM node:16-alpine AS build

# from github action docker_build_args
ARG MIXPANEL_TOKEN
ENV REACT_APP_MIXPANEL_TOKEN $MIXPANEL_TOKEN

WORKDIR /app/backend
COPY --from=dev /app/backend /app/backend
RUN npm run build

WORKDIR /app/ui-new
COPY --from=dev /app/ui-new /app/ui-new
RUN npm run build

WORKDIR /app

FROM node:16-alpine AS prod

EXPOSE 4000

ENV NODE_ENV=production
ENV UI_DIR=/app/ui-new/build

WORKDIR /app

COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/package.json /app/backend/package.json
COPY --from=build /app/backend/package-lock.json /app/backend/package-lock.json
COPY ./graphql /app/graphql/
WORKDIR /app/backend
RUN npm ci

COPY --from=build /app/ui-new/build /app/ui-new/build

CMD npm start
