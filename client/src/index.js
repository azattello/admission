import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from "./reducers";
import {Provider} from "react-redux";
import './i18n'; // Подключаем конфигурацию i18n

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);


