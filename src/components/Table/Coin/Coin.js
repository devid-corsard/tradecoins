import Trade from './Trade/Trade';

const Coin = ({ state: coin, addNewTrade, editInput }) => {
  const trades = coin.trades.map((trade) => (
    <Trade
      state={trade}
      key={trade.tradeId}
      coinId={coin.coinId}
      editInput={editInput}
    />
  ));
  const newTrade = () => {
    addNewTrade(coin.coinId);
  };

  return (
    <div>
      <input defaultValue={coin.name}></input>
      <div>{trades}</div>
      <button onClick={newTrade}>Add</button>
      <hr />
    </div>
  );
};

export default Coin;
