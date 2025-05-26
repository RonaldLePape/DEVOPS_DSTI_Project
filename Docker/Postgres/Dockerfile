# Use official PostgreSQL 15 image
FROM postgres:15

# Optional: Set environment variables
ENV POSTGRES_DB=myproject_db
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Optional: Copy custom SQL/init scripts (executed automatically by Postgres)
COPY *.sql /docker-entrypoint-initdb.d/

# The default port is 5432
EXPOSE 5432