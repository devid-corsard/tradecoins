CREATE TABLE trade_item (
    id uuid PRIMARY KEY,
    amount VARCHAR(60) NOT NULL,
    buy_price VARCHAR(60) NOT NULL,
    sell_price VARCHAR(60) NOT NULL,
    portfolio_item_id uuid REFERENCES portfolio_item(id)
);
