/*
  postgresdb: 
    hostname: localhost
    -> this line is important -> since we can connect from our local machine


\\\\\\\\\\\\\\\\\\\\\\\\\

  docker-compose up --build
  docker-compose down -v -> remove the volumes
  

\\\\\\\\\\\\\\\\\\\\\\\\

  Commands
  - docker image ls 
  - docker <ps> 
  - docker-compose <up> -d
  - docker-compose <down>
  - docker-compose <ps> 
  - docker-compose <config>
    -> validates and displays the effective configuration generated from the docker-compose.yml file, including volume definitions.
  - docker volume <ls>
    -> list all volumes
  - docker volume <inspect> <playground_postgres-data>
  - docker volume <rm> <playground_postgres-data>
  - docker volume prune
    -> clean up unused volumes
  - docker image prune
  - docker image prune -a
  - docker container prune



\\\\\\\\\\\\\\\\\\\\\\\\

  Explain
  - Services: <postgresdb>
  - Environments
    # Sets environment variables for the container. In the postgres service, we are setting the POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB variables, which are used to configure the PostgreSQL database. In the pgadmin service, we are setting the PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD variables, which are used to set the default email and password for the pgAdmin login.
  - Volumes
    # Mounts a volume (i.e., persistent storage) for the container. In the postgres service, we are mounting a volume named postgres_data at the /var/lib/postgresql/data directory, which is where the PostgreSQL data is stored. This allows the data to persist even if the container is stopped or removed.
  - Ports
    # Exposes a container’s port to the host. In the postgres service, we are exposing the default PostgreSQL port (5432) on the host. In the <pgadmin> service, we are exposing port 80 on the host.
  - Depends on
    # Specifies that a service depends on another service. In the <pgadmin> service, we are specifying that it depends on the postgres service, which means that the postgres service must be started before the <pgadmin> service.


\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  From Local Machine
  - PGAdmin 
    # host: localhost
    # port: 6543
    # db: test_db


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Test
    CREATE TABLE test (id INT, name VARCHAR(255));
    INSERT INTO test VALUES (1, 'postgres');
    INSERT INTO test VALUES (2, 'pg-admin');
    INSERT INTO test VALUES (3, 'docker');
    SELECT * FROM test;


*/
