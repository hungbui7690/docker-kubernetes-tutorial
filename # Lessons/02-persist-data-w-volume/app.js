/*
  Volume
  - docker volume <create> <postgres_data>
  - docker run --name=db -e POSTGRES_PASSWORD=121212 -d -v <postgres_data>:/var/lib/postgresql/data postgres
    -> This will start the database in the background, configure it with a password, and attach a volume to the directory PostgreSQL will persist the database files.
  - docker exec -ti db psql -U postgres  
    -> Connect to DB
    # CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,
          description VARCHAR(100)
      );
      INSERT INTO tasks (description) VALUES ('Finish work'), ('Have fun');
    # SELECT * FROM tasks;
    # \q
  - docker stop db
  - docker rm db


\\\\\\\\\\\\\\\\\\\\\\\

  Test
  - docker run --name=new-db -d -v postgres_data:/var/lib/postgresql/data postgres 
    -> You might have noticed that the POSTGRES_PASSWORD environment variable has been omitted. That’s because that variable is only used when bootstrapping a new database.
  - docker exec -ti new-db psql -U postgres -c "SELECT * FROM tasks"  
    -> Verify the database still has the records


\\\\\\\\\\\\\\\\\\\\\\\\

  Sharing local files with containers
  - docker run --name=db -e POSTGRES_PASSWORD=121212 -d -v .:/var/lib/postgresql/data postgres
    -> Error response from daemon: create .: volume name is too short, names should be at least two alphanumeric characters.
  - docker run --name=db -e POSTGRES_PASSWORD=121212 -d -v ${PWD}/:/var/lib/postgresql/data postgres
    -> fix -> use ${PWD}/ instead of .



  POSTGRES 
  - 15:  /var/lib/pgsql
  - 17: /var/lib/postgresql/data



*/
