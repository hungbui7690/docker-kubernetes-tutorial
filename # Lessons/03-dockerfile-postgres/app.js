/*
  Dockerfile 
  - COPY query.sql /docker-entrypoint-initdb.d/
    🌲 The docker-entrypoint-initdb.d directory is used to store shell or SQL scripts that you want to be executed when a Docker container is started for the first time -> we place the SQL script here to initialize our DB
    🍡 SQL Query must work in query.sql -> otherwise, will exit the container
    🌿 we setup db-name + password there


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - docker build --no-cache -t my-pg-db .
  - docker images -a
  - docker run -d -p <127.0.0.1:6543>:<5432> my-pg-db
  - docker image rm pg-container


\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  PgAdmin
  - Host name: localhost
  - Post: 6543
  - Username: postgres
  - DB: postgres


  💜 DATABASE_URL=postgres://postgres:docker@localhost:5432/hello_world?sslmode=disable 



*/
