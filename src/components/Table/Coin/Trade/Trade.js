const Trade = (props) => {
  // ADDD MAX LENGHT FOR INPUTS
  return (
    <span>
      <input
        className="amount"
        value={props.trade.amount}
        placeholder="amount"
        onChange={props.input.action}
      />
      <input
        className="buyPrice"
        value={props.trade.buyPrice}
        placeholder="buy price"
        onChange={props.input.action}
      />
      <input value={props.trade.spent} placeholder="spent" disabled readOnly />
      <input
        className="sellPrice"
        value={props.trade.sellPrice}
        placeholder="sell price"
        onChange={props.input.action}
      />
      <input value={props.trade.recieved} placeholder="recieved" disabled readOnly />
      <input value={props.trade.diff} placeholder="diff" disabled readOnly />
    </span>
  );
};

export default Trade;
