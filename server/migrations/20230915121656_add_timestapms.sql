ALTER TABLE trade_item
ADD COLUMN created_at timestamp DEFAULT current_timestamp;
ALTER TABLE portfolio_item
ADD COLUMN created_at timestamp DEFAULT current_timestamp;
