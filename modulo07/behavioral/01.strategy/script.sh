docker run \
    --name postgres \
    -e POSTGRES_USER=hell \
    -e POSTGRES_PASSWORD="senha123" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

    docker exec -it postgres psql --username hell --dbname heroes

    CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);

    SELECT * FROM warriors;

    docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=hell \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -p 27017:27017 \
    -d \
    mongo:4

    docker logs mongodb