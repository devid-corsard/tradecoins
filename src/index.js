import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App
        state={store.getState()}
        addNewCoin={store.addNewCoin.bind(store)}
        addNewTrade={store.addNewTrade.bind(store)}
        editInput={store.editInput.bind(store)}
        editCoinName={store.editCoinName.bind(store)}
      />
    </React.StrictMode>
  );
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);
