FROM node:16-alpine AS build

WORKDIR /app/backend

ADD backend/package.json backend/package-lock.json /app/backend/
RUN npm ci
COPY backend /app/backend/
RUN npm run build

WORKDIR /app/ui

ADD ui/package.json ui/package-lock.json /app/ui/
RUN npm ci
COPY ui /app/ui/
RUN npm run build


FROM node:16-alpine AS prod

EXPOSE 4000

ENV NODE_ENV=production
ENV UI_DIR=/app/ui/build

WORKDIR /app

COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/package.json /app/backend/package.json
COPY --from=build /app/backend/package-lock.json /app/backend/package-lock.json
WORKDIR /app/backend
RUN npm ci

COPY --from=build /app/ui/build /app/ui/build

CMD npm start