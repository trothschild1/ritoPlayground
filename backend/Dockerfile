FROM node:20

WORKDIR /my-app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]