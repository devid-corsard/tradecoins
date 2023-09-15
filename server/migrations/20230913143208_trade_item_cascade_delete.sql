ALTER TABLE trade_item
ADD CONSTRAINT fk_trade_item_portfolio_item
FOREIGN KEY (portfolio_item_id)
REFERENCES portfolio_item(id)
ON DELETE CASCADE;
