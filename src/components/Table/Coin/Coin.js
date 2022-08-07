import Trade from './Trade/Trade';

const Coin = ({ state: coin }) => {
  const trades = coin.trades.map((sr, index) => (
    <Trade state={sr} key={'trade' + index} />
  ));
  return (
    <div>
      <input defaultValue={coin.name}></input>
      <div>{trades}</div>
    </div>
  );
};

export default Coin;
