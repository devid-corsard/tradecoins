import tableReducer from "./table-reducer";

let store = {
  _state: {
    tablePage: {
      table: [
        {
          coinId: 0,
          name: 'eth',
          trades: [
            { tradeId: 0, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
            { tradeId: 1, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
            { tradeId: 2, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
          ],
        },
        {
          coinId: 1,
          name: 'ltc',
          trades: [
            { tradeId: 0, amount: '2', buyPrice: '100', sellPrice: '120' },
            { tradeId: 1, amount: '2', buyPrice: '110', sellPrice: '' },
            { tradeId: 2, amount: '2', buyPrice: '120', sellPrice: '' },
          ],
        },
        {
          coinId: 2,
          name: 'dot',
          trades: [
            { tradeId: 0, amount: '5', buyPrice: '24', sellPrice: '12' },
            { tradeId: 1, amount: '5', buyPrice: '8', sellPrice: '' },
            { tradeId: 2, amount: '5', buyPrice: '6', sellPrice: '9' },
          ],
        },
      ],
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('state changed');
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.tablePage = tableReducer(this._state.tablePage, action);
    this._callSubscriber(this._state);
  },
};

export default store;
