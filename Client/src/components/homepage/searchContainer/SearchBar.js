import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const SearchBar = () => {
  const shops = useSelector(state => state.homepage.searchData)
  return (
    <ul className="search-bar">
      {shops.map(shop => {
        return <li key={shop._id}>
          <Link to={`/product/${shop.slug}`} target="_blank">
            <img src={`/assets/img/${shop.img}`} alt="" />
            <div className="search-bar__item default-color">
              <p title={shop.shopName.toUpperCase()}>{shop.shopName}</p>
              <p title={shop.address}>{shop.address}</p>
            </div>
          </Link>
        </li>
      })}

    </ul>
  )
}

export default SearchBar