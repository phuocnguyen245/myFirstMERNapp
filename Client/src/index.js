import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './components/homepage/HomePage';
import Login from './components/loginPage/Login';
import Shop from './components/shop/Shop';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './style/index.css';
import './style/loginForm.scss';
import './style/main.scss';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='product/:id' element={<Shop />} />
            <Route path='login' element={<Login />}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
