/*
  The Target Setup 
  - no laravel knowledge is required
  - with nodejs -> when we build our app -> we just need express 
    -> express will build server for us


*************************

  - with php -> different -> php cannot build server for us
    -> php code -> php interpreter -> nginx web server
    ->          -> php interpreter -> mysql database
    -> we need to setup server by ourselves

  - more than that, need utilities 
    -> composer -> similar to npm -> use to create laravel project + install dependencies
    -> laravel artisan -> tool to run commands against database + write initial data to db
    -> npm packages -> use for frontend of laravel project


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding a Nginx (Web Server) Container
  - services:
      server: # nginx
      php:
      mysql:
      composer:
      artisan:
      npm:
  - https://hub.docker.com/_/nginx
    -> $ -v </host/path/nginx.conf>:</etc/nginx/nginx.conf>:ro


*/
