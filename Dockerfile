FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add pandoc
RUN npm install
COPY . .

RUN npx next build

EXPOSE 3000
CMD ["npx", "next", "start"]
