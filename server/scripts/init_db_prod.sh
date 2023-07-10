#!/usr/bin/env bash
set -x
set -eo pipefail

if ! [ -x "$(command -v psql)" ]; then
  echo  "Error: psql is not installed."
  exit 1
fi

if ! [ -x "$(command -v sqlx)" ]; then
  echo  "Error: sqlx is not installed."
  echo  "Use:"
  echo  "    cargo install --version=0.5.7 sqlx-cli --no-default-features --features postgres"
  echo  "to install it."
  exit 1
fi

DB_USER=${POSTGRES_USER:=ubuntu}
DB_PORT="${POSTGRES_PORT:=5432}"

until psql -h "localhost" -U "${DB_USER}" -p "${DB_PORT}" -d "postgres" -c '\q'
do
  echo "Postgres is still unavailable - sleeping"
  sleep 1
done

echo "Postgres is up and running on port ${DB_PORT} - running migrations now!"

sqlx database create
sqlx migrate run

echo "Postgres has been migrated, ready to go!"
