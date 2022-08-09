import EditTradeButtons from '../../../UI/EditTradeButtons';

const Trade = ({ state: trade, editInput, coinId }) => {
  const onChange = (e) => {
    editInput(coinId, trade.tradeId, e.target.className, e.target.value);
  };
  return (
    <div>
      <input className="amount" value={trade.amount} onChange={onChange} />
      <input className="buyPrice" value={trade.buyPrice} onChange={onChange} />
      <input value={trade.spent} readOnly />
      <input
        className="sellPrice"
        value={trade.sellPrice}
        onChange={onChange}
      />
      <input value={trade.recieved} readOnly />
      <input value={trade.diff} readOnly />
      <EditTradeButtons />
    </div>
  );
};

export default Trade;
