/*
  Network
  - docker network create goals-net


  MongoDB
  - docker run --name <mongodb> \
    -e MONGO_INITDB_ROOT_USERNAME=max \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    -v data:/data/db \
    --rm -d --network goals-net <mongo>


  Node JS
  - docker build -t goals-node .
  - docker run --name <goals-backend> \
    -e MONGODB_USERNAME=max \
    -e MONGODB_PASSWORD=secret \
    -v logs:/app/logs -v ${PWD}:/app -v /app/node_modules \
    --rm -d --network goals-net -p 80:80 <goals-node>


  React SPA
  - docker build -t goals-react .
  - docker run --name <goals-frontend> \
    -v {PWD}/src:/app/src \
    --rm -d -p 3000:3000 -it <goals-react>


  Stop All Containers
  - docker stop mongodb goals-backend goals-frontend


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Docker-Compose What & Why
  - multi docker build & docker run in 1 single config file
    -> yaml file
  - not replace Dockerfile
  - not replace Images & Containers
  - not suited for managing mult containers on different hosts


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - services: 
    # published ports
    # environment variables
    # volumes
    # network
    # ...

  - https://docs.docker.com/reference/compose-file/


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Compose Mongodb
  - mongodb:
      image: 'mongo'
      volumes:
        - data:/data/db
      env_file:
        - ./env/mongo.env


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - check:
    # docker-compose-1.yaml
    # docker-compose-2.yaml
    # docker-compose-3.yaml


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Commands
  - docker container prune
  - docker-compose up 
  - docker-compose up -d
  - docker-compose down
  - docker-compose down -v
    -> remove network + volumes


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Compose Backend 
  - volumes:
      - logs:/app/logs -> named
      - ./backend:/app -> anonymous
      - /app/node_modules -> anonymous
    depends_on:
      - mongodb

  🍧 depends_on -> start backend after mongodb starts


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Compose Frontend
  - frontend:
      build: ./frontend
      ports:
        - '3000:3000'
      volumes:
        - ./frontend/src:/app/src
      stdin_open: true
      tty: true
      depends_on:
        - backend

  - -it -> combination of tty & stdin
    # stdin_open: open input connection
    # tty


  🥩 Note: 
      ports:
        - '5000:<3000>'
    -> containers which are inside a compose file will use the port after the colon -> <3000> 
    -> port 5000 is used for the outside machine to connect to the container


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Building Images & Understanding Container Names
  - docker-compose build
  - docker-compose up -d
  - docker ps 
  - docker compose ps


*/
