# Conference API & Database Docker Containers

We have two different Docker Compose files:

***docker-compose-mssql.yaml:*** Required for x86/x64 processors and host a Microsoft SQL Server DB
***docker-compose-mssql-arm.yaml:*** Required for ARM64 processors like MacOS M1 and host a Microsoft SQL Server DB
***docker-compose-mysql.yaml:*** Host a MySql 8 Database Server

## 1. Build the Docker Images with docker-compose

```shell
docker-compose -f [YOUR_DOCKER_COMPOSE_FILE].yml build
```

## 3. Create Containers with docker-compose

```shell
docker-compose -f [YOUR_DOCKER_COMPOSE_FILE].yml up
```

## 4. Try to connect

### Database

You can open a SQL Client (like Azure Data Studio) and connect to:

- Server: localhost; 1633
- User: sa
- Password: GraphQL@Workshop

### Conference API

Open a browser and enter `http://localhost:5000/swagger`

## 5. Remove and delete docker-compose containers

```shell
docker-compose rm
```