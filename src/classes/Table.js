import Coin from './Coin';

export default class Table {
  constructor(table) {
    this.table = table.map((coinArr) => new Coin(coinArr));
  }
  //add methods for manipulate data
  addCoin(name, id) {}
  deleteCoin(id) {}
  addNewTrade(coinId) {}
  copyTrade(coinId, tradeId) {}
  deleteTrade(coinId, tradeId) {}
  toArray() {}
}
