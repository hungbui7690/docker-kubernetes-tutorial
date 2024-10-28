/*
  Utility Containers - Why would you use them
  - setup from scratch
  - node: npm init
  - laravel: 
    -> we need to install more tools to create a new project
    -> next chapter


\\\\\\\\\\\\\\\\\\\\\\
  
  Different Ways of Running Commands in Containers
  - docker run node
  - docker run -it node
  - docker exec node 
  - docker ps 
  - docker ps -a
  - docker container prune
  - docker run -it -d node
    - interactive mode + detached mode at the same time
    - return id of container
  - docker <exec> -it <id> npm init
    -> must use -it with <exec>
  - docker run -it node npm init
    -> this will run npm init -> then stop the container


\\\\\\\\\\\\\\\\\\\\\\

  Building a First Utility Container
  - Dockerfile
    # FROM node:14-alpine
      WORKDIR /app

  - docker build -t my-node-app .
    -> Extension: Docker -> Left Panel -> can go inside the container to see the files structure

  - docker run -it -v $(pwd):/app \
      my-node-app npm init


\\\\\\\\\\\\\\\\\\\\\\

  Utilizing ENTRYPOINT
  - some containers allow us to run commands like "npm init" -> like our previous setup
  - some containers do not allow us to accidentally run commands like "npm init" or "npm install"
    -> to protect our self from damaging the container
  => we can restrict the commands that users can run by using ENTRYPOINT

  🍖 <CMD>: when we have the CMD ["npm", "<install>"] in our Dockerfile
    -> and when we run the container with the command "docker run my-node-app npm <init>"
    -> "npm init" will override the CMD that we specify in the Dockerfile

  🍙 <ENTRYPOINT>: with ENTRYPOINT -> any commands that go with docker run like "docker run my-node-app npm <init>" will append to the end of the ENTRYPOINT command
    -> ENTRYPOINT ["npm"]
    -> docker run my-node-app <init>


\\\\\\\\\\\\\\\\\\\\\\

  Docker Compose
  - after create docker-compose.yaml
    -> docker-compose up
    ❌ we cannot use "docker-compose up init"

    ❎ docker-compose run --rm <app> <init>
      -> <app> is the service name 












*/
