/*
  Launching Only Some Docker Compose Services
  - docker-compose up --help
    -> Usage:  docker compose up [OPTIONS] [SERVICE...]
  - docker-compose up -d <server> <php> <mysql> 
    -> run specific services

  🎈 server: 
      volumes: 
        - ./src:/var/www/html
        - ./nginx/<nginx.conf>:/etc/nginx/<conf.d>/<default.conf>:ro
      depends_on: 
        - php
        - mysql
    -> merge 2 conf files -> this is the correct setup

  ❎ localhost:8000

  🧵 To rebuild images with docker-compose -> always get the latest image -> still use caching 
    -> docker-compose up --build server


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding More Utility Containers
  - services:
      artisan
      npm:


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Docker Compose with and without Dockerfiles
  - for complex commands -> use Dockerfile (nginx, composer, php...) -> need to run many commands + configs
  - otherwise, use the original images (mysql, node)


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Bind Mounts and COPY When To Use What
  - create dockerfiles/nginx.dockerfile


*/
