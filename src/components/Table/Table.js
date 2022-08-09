import Coin from './Coin/Coin';

const Table = ({ state: trades, dispatch }) => {
  const coins = trades.map((coin) => (
    <Coin
      state={coin}
      key={coin.coinId}
      dispatch={dispatch}
    />
  ));
  return <div>{coins}</div>;
};

export default Table;
