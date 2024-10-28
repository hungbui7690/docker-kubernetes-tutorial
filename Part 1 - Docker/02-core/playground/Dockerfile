FROM node
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 80

RUN node server.js

CMD ["node", "server.js"]