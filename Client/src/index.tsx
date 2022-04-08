import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Cart from './components/cart/Cart';
import HomePage from './components/homepage/homepageContainer/HomePage';
import Login from './components/loginPage/Login';
import Register from './components/register/Register';
import Shop from './components/shop/Shop';
import Account from './components/user/account/Account';
import ChangePassword from './components/user/account/ChangePassword';
import Purchase from './components/user/purchase/Purchase';
import PurchaseType from './components/user/purchase/PurchaseType';
import User from './components/user/User';
import store from './redux/store';
import './style/index.css';
import './style/loader.css';
import './style/loginForm.scss';
import './style/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="product/:slug" element={<Shop />} />
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="user" element={<User />}>
              <Route path="account" element={<Account />}></Route>
              <Route path="account/change-password" element={<ChangePassword />}></Route>
              <Route path="purchase" element={<Purchase />}>
                <Route path="type-:type" element={<PurchaseType />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
