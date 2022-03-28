import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StartRating from '../partials/StartRating'
import { addToCartFetch, getCartItemFetch } from './shopSlice'
import './style.scss'

const Shop = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [shop, setShop] = useState([])
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter < 0) {
      toast.error('Số lượng > 0', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCounter(0);
    }
  }, [counter])

  const { id } = params
  const accessToken = Cookies.get('accessToken')
  useEffect(() => {
    const getData = async () => {
      const fetch = await axios.get(`http://localhost:5000/api/product/${id}`)
      const { shop } = await fetch.data
      setShop(shop)
    }
    getData()
  }, [id])

  const length = useSelector(state => state.shop.length)
  useEffect(() => {
    console.log(length);
  }, [length])
  
  const navigate = useNavigate()
  const handleClick = () => {
    if (btn.current) {
      btnText.current.innerHTML = "Đã thêm";
      btn.current.classList.add("active");
      setTimeout(() => {
        btn.current.classList.remove("active");
        btnText.current.innerHTML = "Thêm vào giỏ hàng";
        btn.current.style.transition = '3s'
      }, 3000)
    }
    if (accessToken) {
      dispatch(addToCartFetch({ product_ID: id, qty: counter, accessToken }))
      toast.success('Thêm thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getCartItemFetch({ accessToken }))
      setCounter(1)
    } else {
      toast.error('Bạn chưa đăng nhập', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 1500)
    }
  }
  const btn = useRef()
  const btnText = useRef()

  // useEffect(() => {
  //   if (btn.current)
  //     btn.current.onclick = () => {

  //     }
  // }, [])

  return (
    shop.map(s => (
      <div className="shop-detail" style={{ marginTop: '100px' }} key={s._id}>
        <IntlProvider locale={'vi'} defaultLocale={'vi'}>
          <div className="container d-flex justify-content-between align-start">
            <div className="shop-detail__image">
              <img src={`/assets/img/${s.img}`} alt="Shop" />
            </div>
            <div className="shop-detail__info">
              <div className="shop-detail__breadcrumb">
                <ul className="d-flex">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">{s.category}</Link></li>
                  <li><Link to={`/product/${s._id}`}>{s.shopName}</Link></li>
                </ul>
              </div>
              <div className="shop-detail__title">{s.shopName}</div>
              <div className="shop-detail__address">{s.address}</div>
              <div className="shop-detail__rating">
                <StartRating />
              </div>
              <div className="shop-detail__status">{moment().format('llll')}</div>
              <div className="shop-detail__price">
                <p><FormattedNumber value={s.cost} style="currency" currency="VND" /></p>
              </div>
              <div className="shop-detail__order">
                <div className="shop-detail__qty d-flex justify-content-start align-items-center">
                  <div className="counter" onClick={() => setCounter(counter - 1)}>
                    <AiOutlineMinus size="20px"
                      className="counter__btn" />
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
                <button ref={btn} id="btn" className="shop-detail__btn" onClick={handleClick}>
                  <p ref={btnText} id="btnText">Thêm vào giỏ hàng</p>
                  <div className="check-box">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                </button>
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
              </div>
            </div>
          </div>

        </IntlProvider>
      </div>
    ))
  )
}

export default Shop
