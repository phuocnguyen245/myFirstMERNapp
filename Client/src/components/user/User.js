import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
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
                <Link to="">Tài khoản của tôi</Link>
              </div>
              <ul className="ul-child">
                <li className="pt-2 pb-2">
                  <Link to="">Hồ sơ</Link>
                </li>
                <li className="pt-2 pb-2">
                  <Link to="">Đổi mật khẩu</Link>
                </li>
              </ul>
            </li>
            <li className="p-2">
              <div className="d-flex justify-content-start align-items-center">
                <BsLayoutTextSidebarReverse />
                <Link to="">Đơn mua</Link>
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
