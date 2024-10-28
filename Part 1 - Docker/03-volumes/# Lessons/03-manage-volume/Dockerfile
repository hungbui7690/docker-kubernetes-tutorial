FROM node:14

# 1. arguments
ARG DEFAULT_PORT=80

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# 2. using arguments
ENV PORT $DEFAULT_PORT

# 3. environment variables
# ENV PORT 80
EXPOSE $PORT

VOLUME [ "/app/node_modules" ]

CMD [ "node", "server.js" ]