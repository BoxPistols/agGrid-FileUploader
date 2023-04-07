# CodeSandbox supports debian and ubuntu based images
FROM debian:bullseye


# CodeSandbox supports debian and ubuntu based images
FROM debian:bullseye



# CodeSandbox supports debian and ubuntu based images
FROM debian:bullseye



# Install PHP & Composer
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt install -y curl php-cli php-mbstring git unzip && \
  cd ~ && \
  curl -sS https://getcomposer.org/installer -o composer-setup.php && \
  php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
  composer --version


RUN apt update && apt install -y python3 python3-pip


RUN apt install -y ruby
