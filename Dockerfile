FROM node:14-slim

RUN mkdir -p /app/node_modules
RUN mkdir -p /app/files/barcode && \
  mkdir -p /app/files/qrcode && \
  chown -R node:node /app
WORKDIR /app
COPY package*.json ./

COPY . .
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  && rm -rf /var/lib/apt/lists/*


RUN yarn install && yarn build

USER node
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]