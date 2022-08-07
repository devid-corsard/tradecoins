import Coin from './Coin/Coin';

const Table = ({ state: trades }) => {
  const coins = trades.map((coin) => <Coin state={coin} key={coin.coinId} />);
  return <div>{coins}</div>;
};

export default Table;
