-- Add migration script here
CREATE TABLE users(
   id uuid NOT NULL,
   PRIMARY KEY (id),
   name TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   subscribed_at timestamptz NOT NULL
);
