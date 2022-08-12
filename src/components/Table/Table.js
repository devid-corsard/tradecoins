import CoinContainer from './Coin/CoinContainer';

const Table = ({ state: trades, dispatch }) => {
  const coins = trades.map((coin) => (
    <CoinContainer
      state={coin}
      key={coin.coinId}
      dispatch={dispatch}
    />
  ));
  return <div>{coins}</div>;
};

export default Table;
