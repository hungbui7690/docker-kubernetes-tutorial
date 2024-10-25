/*
  Postgres w Docker
  - https://hub.docker.com/_/postgres
  - docker run --rm
    -> remove the stopped container
    
  🍀 postgres 17
  🍀 if we cannot connect to postgres container after setup -> try to remove the <volume>, <network>, container, images...

172.17.0.2

\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Get IP Address
  - docker inspect <postgresdb>
  - docker exec -it <postgresdb> /bin/bash
  - docker network inspect bridge


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - docker run --name pg-container -p 6543:5432 -e POSTGRES_PASSWORD=121212 -d postgres
  - docker run -p 5050:80 -e 'PGADMIN_DEFAULT_EMAIL=admin@admin.com' -e PGADMIN_DEFAULT_PASSWORD=121212 -d dpage/pgadmin4
    🌲 now, both pg-container & pgadmin are in the same Network -> can connect


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - docker -a
    -> check the port column
  - docker inspect pg-container -> get the ip address of the container
    🌿 <172.17.0.2> -> outside of the container
    🌲 localhost -> both are in the same the container 


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - localhost:5050 -> pgAdmin
    # add new server
      + host: <127.17.0.2>
      + username: postgres -> default
      + db: postgres -> default


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - docker stop pg-container
  - docker rm pg-container
  - docker image ls -> list all images
  - docker image rm <image_id>



\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  CONNECT FROM LOCALHOST TO POSTGRES CONTAINER
  - docker run --rm -P -p <127.0.0.1:6543>:<5432> -e POSTGRES_PASSWORD="121212" --name pg postgres:alpine
    -> -P: Publish all exposed ports to random ports -> --publish-all
    -> -p: 	Publish a container's port(s) to the host -> --publish

  🚀 After setup, we can use connect to Postgres Container from outside using PGAdmin or NodeJS
      # PgAdmin
        - Host name: localhost
        - Post: 6543




  🍀 for smaller version -> postgres:16
    - docker run --name pg-container --rm -e POSTGRES_PASSWORD=password postgres:16-alpine
    - docker exec -it pg-container bash
      # psql -U postgres
      # exit

  POSTGRES 
  - 15:  /var/lib/pgsql
  - 16: /var/lib/postgresql/data
  - 17: /var/lib/postgresql/data


*/
