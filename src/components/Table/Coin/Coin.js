import Trade from './Trade/Trade';

const Coin = ({ state: coin, addNewTrade, editInput, editCoinName }) => {
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
  const editName = (e) => {
    editCoinName(coin.coinId, e.target.value);
  };

  return (
    <div>
      <input value={coin.name} onChange={editName} />
      <div>{trades}</div>
      <button onClick={newTrade}>Add</button>
      <hr />
    </div>
  );
};

export default Coin;
