ALTER TABLE trade_item
ALTER COLUMN amount DROP NOT NULL,
ALTER COLUMN buy_price DROP NOT NULL,
ALTER COLUMN sell_price DROP NOT NULL;