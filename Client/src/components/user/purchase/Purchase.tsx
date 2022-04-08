import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SearchContainer from '../../homepage/searchContainer/SearchContainer';

const Purchase = () => {
  return (
    <div className="purchase">
      <div className="side-bar-container">
        <ul className="side-bar">
          <li>
            <NavLink to="type-all" className="active-link">
              Tất cả
            </NavLink>
          </li>
          <li>
            <NavLink to="type-wait">Chờ xác nhận</NavLink>
          </li>
          <li>
            <NavLink to="type-delivery">Đang giao</NavLink>
          </li>
          <li>
            <NavLink to="type-receive">Đã giao</NavLink>
          </li>
          <li>
            <NavLink to="type-cancel">Đã hủy</NavLink>
          </li>
        </ul>
      </div>
      <SearchContainer />
      <Outlet />
    </div>
  );
};

export default Purchase;
