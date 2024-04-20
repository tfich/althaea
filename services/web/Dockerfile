FROM node:current-alpine

WORKDIR /usr/app

COPY package.json .

RUN yarn install --silent

COPY . .

RUN yarn build

CMD yarn start

EXPOSE 3000