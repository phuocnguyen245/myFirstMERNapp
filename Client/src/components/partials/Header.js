import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getHomepageDataFetch } from '../homepage/homePageSlice'
import { getCartItemFetch } from '../shop/shopSlice'
const Header = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.loginpage.user)
  const length = useSelector(state => state.shop.length)

  const categories = useSelector(state => state.homepage.categories)

  const [clickLink, setClickClick] = useState()
  const [shopItemLenght, setShopItemLenght] = useState(0)

  user && localStorage.setItem('account', JSON.stringify(user?.username))
  const username = localStorage.getItem('account')

  const handleClick = async () => {
    localStorage.removeItem('account');
    localStorage.removeItem('accessToken')
    await axios.get('http://localhost:5000/api/login/logout', { withCredentials: true })
    window.location.href = '/login'
  }

  useEffect(() => {
    dispatch(getHomepageDataFetch())
  }, [dispatch])
  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    if (accessToken) {
      dispatch(getCartItemFetch({ accessToken }))
    }
  })

  useEffect(() => {
    setShopItemLenght(length)
  }, [length])
  return (
    <header id="header">
      <div className="container-header">
        <div className="container p-2">
          <div className="row p-2 justify-content-between align-items-center">
            <div className="p-0">
              <Link to="/">
                <img className="shopeefoodlogo" src="/assets/img/shopeefoodvn.png" alt="" />
              </Link>
            </div>
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle fz-14" type="button"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Đà Nẵng
              </button>
              <div className="dropdown-menu" style={{ left: "unset !important" }}
                aria-labelledby="dropdownMenuButton">
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
              {categories.map(category => (
                <div className="nav-item" key={category._id}>
                  <NavLink to="/" className={clickLink === category._id && 'active-link'} onClick={() => setClickClick(category._id)}>
                    <img style={{ display: 'none' }} src="./assets/img/imgsmall1.png" alt="" />
                    <p>{category.name}</p>
                  </NavLink>
                </div>
              ))}
            </nav>
            <div className="flex align-items-center justify-content-end">
              <div className="btn-search pr-3">
                <i className="fas fa-shopping-cart" />
                <div className="qty">
                  <p>{shopItemLenght}</p>
                </div>
              </div>
              <div className="btn-login">
                {username ?
                  <button onClick={handleClick} className="btn">Đăng xuất {JSON.parse(username)}</button> :
                  <Link to="/login" className="btn">Đăng nhập</Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header