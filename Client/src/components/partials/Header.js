import React from 'react'
import {NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <header id="header">
      <div className="container-header">
        <div className="container p-2">
          <div className="row p-2 justify-content-between align-items-center">
            <nav className="flex justify-content-start">
              <div className="nav-item active-color">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall1.png" alt="" />
                  <p>Đồ ăn</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall2.png" alt="" />
                  <p>Thực phẩm</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall3.png" alt="" />
                  <p>Bia</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall4.png" alt="" />
                  <p>Hoa</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall5.png" alt="" />
                  <p>Siêu thị</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall6.png" alt="" />
                  <p>Thuốc</p>
                </a>
              </div>
              <div className="nav-item">
                <a href="/#">
                  <img style={{ display: 'none' }} src="./assets/img/imgsmall7.png" alt="" />
                  <p>Thú cưng</p>
                </a>
              </div>
            </nav>
            <div className="col-2 flex align-items-center justify-content-end">
              <div className="btn-search pr-3">
                <i className="fas fa-shopping-cart" />
                <div className="qty">
                  <p>0</p>
                </div>
              </div>
              <div className="btn-login">
                <NavLink to="/login" className="btn">Đăng nhập</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header