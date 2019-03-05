FROM node:10.15

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["node","main.js"]