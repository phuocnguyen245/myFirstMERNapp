import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StartRating from '../partials/StartRating'
import { addToCartFetch } from './shopSlice'
import './style.scss'

const Shop = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [shop, setShop] = useState([])
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 0) {
    decrementCounter = () => setCounter(0);
  }
  const { id } = params
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  useEffect(() => {
    const getData = async () => {
      const fetch = await axios.get(`http://localhost:5000/api/product/${id}`)
      const { shop } = await fetch.data
      setShop(shop)
    }
    getData()
  }, [id])
  const navigate = useNavigate()
  const handleClick = () => {
    if(accessToken) {
      dispatch(addToCartFetch({ product_ID: id, qty: counter, accessToken }))
      setCounter(1)
    }else{
      navigate('/login')
    }
  }

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
                  <div className="counter" onClick={decrementCounter}>
                    <AiOutlineMinus size="20px"
                      className="counter__btn" />
                  </div>
                  <div className="qty">{counter}</div>
                  <div className="counter" onClick={incrementCounter}>
                    <AiOutlinePlus className="counter__btn" />
                  </div>
                </div>
                <div className="shop-detail__bill">
                  <div className="shop-detail__total d-flex justify-content-start align-items-center">
                    <span>Tổng cộng: </span>
                    <FormattedNumber value={s.cost * counter} style="currency" currency="VND" />
                  </div>
                </div>
                <button className="shop-detail__btn" onClick={handleClick}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </IntlProvider>
      </div>
    ))
  )
}

export default Shop
