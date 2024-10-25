### Environment variables

```bash
docker exec -it postgresdb bash
  root@0b59d031fccf:/# printenv
```


### Get IP Address

```bash
docker inspect <container>
docker exec -it <container> /bin/bash
docker network inspect bridge
```

### Volume

``` bash
# create volume
docker volume create postgres_data

docker volume ls
docker volume rm <id>

# run in background + setup volume
docker run --name=db -e POSTGRES_PASSWORD=121212 -d -v <postgres_data>:/var/lib/postgresql/data postgres
```

### Build from Dockerfile

```bash
docker build --no-cache -t my-pg-db .
docker images -a
docker run -d -p <127.0.0.1:6543>:<5432> my-pg-db
docker image rm pg-container
```

### More Commands

```bash
docker image ls 
docker <ps> 
docker-compose <up> -d
docker-compose <down>

# remove the volumes
docker-compose <down> -v
docker-compose <ps> 

# validates and displays the effective configuration generated from the docker-compose.yml file, including volume definitions.
docker-compose <config>
docker volume <ls>
docker volume <inspect> <playground_postgres-data>
docker volume <rm> <playground_postgres-data>
docker volume prune
docker image prune
docker image prune -a
docker container prune
```