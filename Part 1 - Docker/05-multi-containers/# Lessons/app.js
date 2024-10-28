/*
  App Structure
  - 3 building blocks:
    # DB: MongoDB
    # Backend: NodeJS
    # Frontend: React
    => DB <-> Backend <-> Frontend


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Dockerize
  - we will need 2 Dockerfile:
    # Backend
      -> docker build -t goals-backend .
    # Frontend
      -> docker build -t goals-frontend .


  ❌ dockerize React app will be a bit tricky


**************************

  1. docker run --name mongodb --rm -d -p <27017:27017> mongo
    -> Dockerizing the MongoDB Service 
    -> mongoose.connect('mongodb://<localhost:27017>/course-goals')

  2. docker run --name goals-backend --rm -p 80:80 -d goals-backend
    -> Dockerizing the Node.js
    -> mongoose.connect('mongodb://<host.docker.internal:27017>/course-goals')

  3. docker run --name goals-frontend --rm -p 3000:3000 -d goals-frontend
    -> Dockerizing the React App
    -> const response = await fetch('http://localhost/goals'); -> not show any data
    ❌ NOT WORK


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Add Network
  - docker network create goals-network
  - docker run --name <mongodb> --rm -d -p 27017:27017 --network <goals-network> mongo
  - docker run --name <goals-backend> --rm -p 80:80 -d --network <goals-network> goals-backend
    -> mongoose.connect('mongodb://<mongodb:27017>/course-goals')
  - docker run --name <goals-frontend> --rm -p 3000:3000 -d --network <goals-network> goals-frontend
    -> const response = await fetch('http://<goals-backend>/goals'); -> not show any data

    ❌ STILL NOT WORKING
      # Reason: frontend -> run in browser -> not in container
      #         backend -> run in node environment
      # -> const response = await fetch('http://<goals-backend>/goals')
        -> using the container name here won't work

    ❎ const response = await fetch('http://<localhost>/goals')
      -> also need to publish port 80 in backend as well
      -> NOW WORKING


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding Data Persistence to MongoDB with Volumes
  - gg -> mongodb docker -> docker hub -> -v /data:/data/db
  - docker run --name <mongodb> --rm -d -p 27017:27017 --network goals-network -v </data:/data/db> mongo
  - docker stop <mongodb>
  - docker start <mongodb>
    => data still persists


  🍭 Docs -> Environment Variables 
    # MONGO_INITDB_ROOT_USERNAME
    # MONGO_INITDB_ROOT_PASSWORD
    # MONGO_INITDB_DATABASE

    -> docker run -d --network some-network --name some-mongo \
        -e <MONGO_INITDB_ROOT_USERNAME>=mongoadmin \
        -e <MONGO_INITDB_ROOT_PASSWORD>=secret \
        mongo

    -> mongoose.connect(`mongodb://<mongoadmin>:<secret>@mongodb:27017/course-goals?authSource=admin`,


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Volumes, Bind Mounts & Polishing for the NodeJS Container
  - live source code update
  - docker run --name <goals-backend> --rm -p 80:80 -d \
    --network goals-network \
    -v <logs:app/logs> -v <${pwd}:/app> v /app/node_modules \
    goals-backend 

    -> now if we install nodemon -> then rebuild the container -> everything will be fine
    -> if we change the code -> no need to rebuild the container & we still see the changes

  - Dockerfile
    # ENV MONGO_DB_USERNAME=mongoadmin
    # ENV MONGO_DB_PASSWORD=secret
    -> mongoose.connect(`mongodb://<process.env.MONGO_DB_USERNAME>:<process.env.MONGO_DB_PASSWORD>@mongodb:27017/course-goals?authSource=admin`,


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Live Source Code Updates for the React Container (with Bind Mounts)
  - docker run --name <goals-frontend> --rm -p 3000:3000 -d \
    --network goals-network \
    -v <${pwd}/src:app/src> \
    goals-frontend


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  .dockerignore
  - node_modules
  - logs


*/
