import Coin from './Coin/Coin';

const Table = ({ state: trades, addNewTrade, editInput }) => {
  const coins = trades.map((coin) => (
    <Coin
      state={coin}
      key={coin.coinId}
      addNewTrade={addNewTrade}
      editInput={editInput}
    />
  ));
  return <div>{coins}</div>;
};

export default Table;
