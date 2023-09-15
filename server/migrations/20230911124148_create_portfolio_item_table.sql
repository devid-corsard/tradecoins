CREATE TABLE portfolio_item (
    id uuid PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id uuid REFERENCES users(user_id)
);
