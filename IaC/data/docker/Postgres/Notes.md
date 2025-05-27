# Installing docker-compose from web repo (not installed with docker on ubuntu):

    1. Install prerequisites
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release

    2. Add Docker’s GPG key
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
      sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    3. Add Docker’s APT repository
    echo \
      "deb [arch=$(dpkg --print-architecture) \
      signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    4. Update package list
    sudo apt-get update

    5. Install Docker Compose v2 plugin
    sudo apt-get install -y docker-compose-plugin

    6. (Optional) Verify it's working
    docker compose version


# Useful Docker commands:

## Building Posgres image: (from the folder containing Dockerfile)

  sudo docker build -t postgres-15 .

## Starting Postgres container:

  sudo docker run -d --name mypg -p 5433:5432 postgres-15

## Using docker compose from directory containing docker-compose.yml

  sudo docker compose up -d

## Accessing Postgres database from host :
  sudo docker exec -it mypg psql -U myuser -d myproject_db


# Other notes:

  sql files are named 01** 02*** : sql init takes sql files in alphanumeric order 