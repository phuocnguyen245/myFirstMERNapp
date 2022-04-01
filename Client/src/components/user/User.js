import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import "./style.scss";
const User = () => {
  return (
    <div className="user">
      <div className="container d-flex justify-content-between align-items-start">
        <div className="side-bar">
          <div className="d-flex justify-content-start align-items-center mb-4">
            <AiOutlineUser className="svg-large" />
            <p className="m-0">Nguyên</p>
          </div>
          <ul>
            <li>
              <div className="d-flex justify-content-start align-items-center p-2">
                <AiOutlineUser />
                <NavLink to="account" className="active-link">Tài khoản của tôi</NavLink>
              </div>
              <ul className="ul-child">
                <li className="pt-2 pb-2">
                  <NavLink to="">Hồ sơ</NavLink>
                </li>
                <li className="pt-2 pb-2">
                  <NavLink to="">Đổi mật khẩu</NavLink>
                </li>
              </ul>
            </li>
            <li className="p-2">
              <div className="d-flex justify-content-start align-items-center">
                <BsLayoutTextSidebarReverse />
                <NavLink to="purchase/type-all">Đơn mua</NavLink>
              </div>
            </li>
          </ul>
        </div>
        <div className="user-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default User;
