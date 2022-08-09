import Coin from './Coin/Coin';

const Table = ({ state: trades, addNewTrade, editInput, editCoinName }) => {
  const coins = trades.map((coin) => (
    <Coin
      state={coin}
      key={coin.coinId}
      addNewTrade={addNewTrade}
      editInput={editInput}
      editCoinName={editCoinName}
    />
  ));
  return <div>{coins}</div>;
};

export default Table;
