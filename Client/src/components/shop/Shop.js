import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './style.scss'
const Shop = () => {
  const params = useParams()
  const [shop, getShop] = useState([])
  const { id } = params
  useEffect(() => {
    const getData = async () => {
      const fetch = await axios.get(`http://localhost:5000/api/product/${id}`)
      const { shops } = await fetch.data
      getShop(shops)
    }
    getData()
  }, [id])

  return (
    shop.map(s => (
      <div className="shop-detail" style={{ marginTop: '100px' }} key={s._id}>
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
            <div className="shop-detail__rating"></div>
            <div className="shop-detail__status"></div>
            <div className="shop-detail__price">{s.cost}</div>
            <div className="shop-detail__order">
              <div className="shop-detail__qty d-flex justify-content-start align-center">
                <div className="increase"> - </div>
                <div className="qty">1</div>
                <div className="decrease"> + </div>
              </div>
              <div className="shop-detail__bill">
                <div className="shop-detail__total"></div>
              </div>
              <button className="shop-detail__btn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      </div>
    ))
  )
}

export default Shop
