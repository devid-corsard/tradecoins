import Trade from './Trade';

export default class Coin {
  constructor(coin = []) {
    this.name = coin[0];
    this.coinId = coin[1];
    this.trades = coin[2].map((trade) => new Trade(trade));
  }
}
