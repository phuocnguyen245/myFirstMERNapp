import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { RootState } from '../../redux/store';
import { getCartTotalFetch } from '../cart/cartSlice';
import { getHomepageDataFetch } from '../homepage/homePageSlice';
import { getCartItemFetch } from '../shop/shopSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: any = useSelector((state: RootState) => state.loginpage.user);

  const length = useSelector((state: RootState) => state.shop.length);
  const categories = useSelector((state: RootState) => state.homepage.categories);

  const accessToken = Cookies.get('accessToken');

  const [clickLink, setClickClick] = useState();
  const [shopItemLenght, setShopItemLenght] = useState(0);

  user && localStorage.setItem('account', JSON.stringify(user?.username));

  // save address to cookie
  const username = localStorage.getItem('account');

  const handleClick = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('address');
    localStorage.clear();
    setShopItemLenght(0);
    window.location.href = '/login';
  };

  useEffect(() => {
    dispatch(getHomepageDataFetch({}));
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getCartItemFetch({ accessToken }));
    } else {
      accessToken === undefined && localStorage.clear();
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setShopItemLenght(length);
  }, [length]);

  const handleHomeClick = () => {
    dispatch(getCartItemFetch({ accessToken }));
  };

  const handleCartClick = () => {
    if (accessToken) {
      dispatch(getCartItemFetch({ accessToken }));
      dispatch(getCartTotalFetch({ accessToken }));
      navigate('/cart');
    } else {
      toast.error('Chưa đăng nhập', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 1500);
    }
  };
  const handleAuth = () => {
    if (!accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not logged yet',
      });
      setTimeout(() => navigate('/login'), 1500);
    }
  };
  return (
    <header id="header">
      <div className="container-header">
        <div className="container p-2">
          <div className="row p-2 justify-content-between align-items-center">
            <div className="p-0">
              <Link to="/" onClick={handleHomeClick}>
                <img className="shopeefoodlogo" src="/assets/img/shopeefoodvn.png" alt="" />
              </Link>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle fz-14"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Đà Nẵng
              </button>
              <div
                className="dropdown-menu"
                style={{ left: 'unset !important' }}
                aria-labelledby="dropdownMenuButton"
              >
                <Link to="/" className="dropdown-item bg-light">
                  <span>Hà Nội</span>
                  <span>1000000 địa điểm</span>
                </Link>

                <Link to="/" className="dropdown-item bg-light">
                  <span>TP. HCM</span>
                  <span>1 địa điểm</span>
                </Link>
                <Link to="/" className="dropdown-item bg-light">
                  <span>Hải Phòng</span>
                  <span>1 địa điểm</span>
                </Link>
              </div>
            </div>
            <nav className="flex justify-content-start">
              {categories.map((category: any) => (
                <div className="nav-item" key={category._id}>
                  <NavLink
                    to="/"
                    className={clickLink === category._id ? 'active-link' : ''}
                    onClick={() => setClickClick(category._id)}
                  >
                    <img style={{ display: 'none' }} src="/assets/img/imgsmall1.png" alt="" />
                    <p>{category.name}</p>
                  </NavLink>
                </div>
              ))}
            </nav>
            <div className="flex align-items-center justify-content-end mr-2">
              <div className="btn-search pr-3" onClick={handleCartClick}>
                <i className="fas fa-shopping-cart" />
                <div className="qty">
                  <p>{shopItemLenght}</p>
                </div>
              </div>
              <div className="btn-login">
                {username ? (
                  <div>
                    <p className="m-0 btn">{JSON.parse(username)}</p>
                    <ul className="user-control">
                      <li>
                        <Link to="/user/account" onClick={handleAuth}>
                          Tài khoản của tôi
                        </Link>
                      </li>
                      <li>
                        <Link to="/user/purchase/type-all" onClick={handleAuth}>
                          Đơn hàng của tôi
                        </Link>
                      </li>
                      <li onClick={handleClick}>Đăng xuất</li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login" className="btn">
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
};

export default Header;
