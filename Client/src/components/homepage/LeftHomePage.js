import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchFetch } from './homePageSlice'
import { categoriesSelector } from '../../redux/selector'
import SearchBar from './SearchBar'
const LeftHomePage = ({ left, rightValue }) => {
  const [addAbsolute, setAddAbsolute] = useState('content-container-left')
  const [plusHeight, setPlusHeight] = useState(0)
  const [searchText, setSearchText] = useState('')
  const leftRef = useRef()
  const typingTimeoutRef = useRef(null)
  useEffect(() => {
    const onLoad = () => {
      left(leftRef.current.getBoundingClientRect().height)
    }
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [left])

  useEffect(() => {
    const scroll = () => {
      const scroll = window.scrollY
      if (scroll >= rightValue - window.innerHeight) {
        setAddAbsolute('content-container-left absolute')
        setPlusHeight(rightValue - window.innerHeight)
      } else {
        setAddAbsolute('content-container-left')
        setPlusHeight(0)
      }
    }
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  })

  const dispatch = useDispatch()
  const handleSearch = (e) => {
    setSearchText(e.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      e.target.value === '' ? dispatch(getSearchFetch(null)) : dispatch(getSearchFetch(e.target.value))
    }, 500)
  }

  const categories = useSelector(categoriesSelector)

  return (
    <div ref={leftRef} className={addAbsolute} style={{ top: `${plusHeight}px` }}>
      <div className="container">
        <div className="left t-w col-5">
          <div className="left__text t-w">
            <h1>Đặt đồ ăn, giao hàng từ 20'...</h1>
            <p className="t-w">Có 9047 Địa Điểm Ở Đà Nẵng Từ 06:00 - 22:00</p>
          </div>
          <div className="left__search col-12 col-sm-12 col-md-12 p-0">
            <input type="text" value={searchText} onChange={handleSearch} placeholder="Tìm địa điểm, món ăn, địa chỉ" />
            <a href="/#">
              <button className="btn">
                <i className="fa fa-search text-white" />
              </button>
            </a>
            <SearchBar />
          </div>
          <div className="left__menu flex">
            <a className="left__menu__item" href="/#">All</a>
            {categories.map(category => {
              return <a key={category._id} className="left__menu__item" href="/#" >{category.name}</a>
            })}
          </div>
          <div className="left__text">
            <p className="t-w">Sử dụng App ShopeeFood để có nhiều giảm giá
              <br />và trải nghiệm tốt hơn
            </p>
          </div>
          <div className="left__connect flex justify-content-start">
            <div className="pr-4">
              <a href="/#">
                <img src="./assets/img/AppStore-vn.png" alt="" />
              </a>
            </div>
            <div>
              <a href="/#">
                <img src="./assets/img/PlayStore-vn.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LeftHomePage