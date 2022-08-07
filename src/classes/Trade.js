export default class Trade {
  constructor(tradeValues) {
    const STANDART_FEE = 0.01;
    this.amount = tradeValues[0];
    this.buyPrice = tradeValues[1];
    this.sellPrice = tradeValues[2];
    this.fee = tradeValues[3] || STANDART_FEE;
    this.singlefee = tradeValues[4] || false;
  }
  get spent() {
    return this.amount * this.buyPrice;
  }
  get _feeMultiplier() {
    return (1 - this.fee / 10) ** (this.singlefee ? 1 : 2);
  }
  get recieved() {
    return this.amount * this.sellPrice * this._feeMultiplier || '';
  }
  get diff() {
    if (!this.spent || !this.recieved) return '';
    return this.recieved - this.spent;
  }
  toArray() {
    return [
      this.amount,
      this.buyPrice,
      this.sellPrice,
      /*
      this.fee,
      this.singlefee,
      */
    ];
  }
}
