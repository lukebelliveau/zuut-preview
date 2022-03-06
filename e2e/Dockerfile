FROM cypress/included:9.5.1
ENV CI=1

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

ADD . /app