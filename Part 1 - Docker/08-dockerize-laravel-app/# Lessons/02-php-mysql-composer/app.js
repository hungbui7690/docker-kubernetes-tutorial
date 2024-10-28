/*
  Adding a PHP Container
  - https://hub.docker.com/_/php
    -> choose Tags tab 
    🎈 need <php-fmp> image to config nginx
  - php.dockerfile
    # WORKDIR /var/www/html
    # RUN docker-php-ext-install pdo pdo_mysql
    ❎ if we check the dockerfile of the original image -> we will see the expose port 9000
      -> https://hub.docker.com/layers/library/php/fpm-alpine3.20/images/sha256-2cf1f1f34e7fc3a0c4738425098cdb2f7070e8e2920d8aa01555be9c8ca58028?context=explore


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding a MySQL Container
  - docker-compose.yaml
    # MYSQL_DATABASE=
      MYSQL_USER=
      MYSQL_PASSWORD=
      MYSQL_ROOT_PASSWORD=


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding a Composer Utility Container
  - composer docs: https://getcomposer.org/doc/00-intro.md#installation-windows


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Creating a Laravel App via the Composer Utility Container
  - https://laravel.com/docs/11.x#installing-php

  - ❌ below command is from laravel docs 8.x -> latest command is: composer global require laravel/installer
      -> docker-compose run --rm composer create-project --prefer-dist laravel/laravel .


*/
