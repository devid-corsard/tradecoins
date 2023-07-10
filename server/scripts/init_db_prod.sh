#!/usr/bin/env bash
set -x
set -eo pipefail
export PATH=$PATH:~/.cargo/bin

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

until psql -d postgres -c '\c'
do
  echo "Postgres is still unavailable - sleeping"
  sleep 1
done

echo "Postgres is up and running - running migrations now!"

sqlx database create
sqlx migrate run

echo "Postgres has been migrated, ready to go!"
