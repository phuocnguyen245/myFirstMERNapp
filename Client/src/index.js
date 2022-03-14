import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import './style/main.scss';
import './style/loginForm.scss'
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Login from './components/loginPage/Login';
import HomePage from './components/homepage/HomePage';
import Shop from './components/shop/Shop';


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
