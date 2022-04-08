import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FormattedNumber } from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../constants';
import StartRating from '../partials/StartRating';
import { addToCartFetch, getCartItemFetch } from './shopSlice';
import './style.scss';
const Shop = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const btn: any = useRef();
  const btnText: any = useRef();

  const [shop, setShop] = useState([]);
  const [counter, setCounter] = useState(1);
  const [text, setText] = useState('Thêm vào giỏ hàng');
  const [btnStyle, setBtnStyle] = useState(false);

  useEffect(() => {
    if (counter < 0) {
      toast.error('Số lượng > 0', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCounter(0);
    }
  }, [counter]);

  const { slug } = params;
  const accessToken = Cookies.get('accessToken');

  const getData = async (slug: string | undefined) => {
    const fetch = await axios.get(`${URL}/product/${slug}`);
    const { shop } = await fetch.data;
    setShop(shop);
  };

  useEffect(() => {
    getData(slug);
    window.scrollTo(0, 0);
    return () => {
      setShop([]);
    };
  }, [slug]);

  const navigate = useNavigate();
  const handleClick = () => {
    let timer;
    if (accessToken) {
      dispatch(addToCartFetch({ slug, qty: counter, accessToken }));
      dispatch(getCartItemFetch({ accessToken }));
      setText('Đã thêm');
      setBtnStyle(true);
      timer = setTimeout(() => {
        setBtnStyle(false);
        setText('Thêm vào giỏ hàng');
      }, 3000);
      toast.success('Thêm thành công!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCounter(1);
    } else {
      toast.error('Bạn chưa đăng nhập', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearTimeout(timer);
      setTimeout(() => navigate('/login'), 1500);
    }
  };
  console.log(shop.length);
  return (
    <div className="shop-detail" style={{ marginTop: '100px' }}>
      {shop.length > 0 ? (
        shop?.map((s: any) => (
          <div className="container d-flex justify-content-between align-start" key={s._id}>
            <div className="shop-detail__image">
              <img src={`/assets/img/${s.img}`} alt="Shop" />
            </div>
            <div className="shop-detail__info">
              <div className="shop-detail__breadcrumb">
                <ul className="d-flex">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">{s.category}</Link>
                  </li>
                  <li>
                    <Link to={`/product/${s._id}`}>{s.shopName}</Link>
                  </li>
                </ul>
              </div>
              <div className="shop-detail__title">{s.shopName}</div>
              <div className="shop-detail__address">{s.address}</div>
              <div className="shop-detail__rating">
                <StartRating />
              </div>
              <div className="shop-detail__status">{moment().format('llll')}</div>
              <div className="shop-detail__price">
                <p>
                  <FormattedNumber value={s.cost} style="currency" currency="VND" />
                </p>
              </div>
              <div className="shop-detail__order">
                <div className="shop-detail__qty d-flex justify-content-start align-items-center">
                  <div className="counter" onClick={() => setCounter(counter - 1)}>
                    <AiOutlineMinus size="20px" className="counter__btn" />
                  </div>
                  <div className="qty">{counter}</div>
                  <div className="counter" onClick={() => setCounter(counter + 1)}>
                    <AiOutlinePlus className="counter__btn" />
                  </div>
                </div>
                <div className="shop-detail__bill">
                  <div className="shop-detail__total d-flex justify-content-start align-items-center">
                    <span>Tổng cộng: </span>
                    <FormattedNumber value={s.cost * counter} style="currency" currency="VND" />
                  </div>
                </div>
                <button
                  ref={btn}
                  id="btn"
                  className={btnStyle ? 'shop-detail__btn active' : 'shop-detail__btn'}
                  onClick={handleClick}
                >
                  <p ref={btnText} id="btnText">
                    {text}
                  </p>
                  <div className="check-box">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                </button>
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="container" style={{ marginTop: '100px' }}>
          <Skeleton count={12} />
        </div>
      )}
    </div>
  );
};

export default Shop;
