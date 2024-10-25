FROM postgres:17-alpine
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 121212
ENV POSTGRES_DB hello_world
COPY query.sql /docker-entrypoint-initdb.d/
EXPOSE 5432