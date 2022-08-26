FROM node:12-slim

RUN mkdir -p /app/node_modules
RUN mkdir -p /app/files/barcode && \
  mkdir -p /app/files/qrcode && \
  chown -R node:node /app
WORKDIR /app
COPY package*.json ./

COPY . .
RUN apt-get update \
  && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev


RUN yarn install && yarn build

USER node
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]