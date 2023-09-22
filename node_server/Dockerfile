FROM node:20-alpine3.17

RUN mkdir -p /usr/src/javier

WORKDIR /usr/src/javier

COPY . .

RUN npm install

ENTRYPOINT  ["node", "index.js"]
