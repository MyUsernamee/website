FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add pandoc
RUN npm install
RUN mkdir temp
COPY . ./temp

WORKDIR /usr/src/app/temp

RUN npx next build

WORKDIR /usr/src/app
RUN cp -r ./temp/.next .
RUN cp -r ./temp/node_modules .
RUN rm -rf ./temp

EXPOSE 3000
CMD ["npx", "next", "start"]
