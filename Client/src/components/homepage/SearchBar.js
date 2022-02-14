import React from 'react'
import { useSelector } from 'react-redux'
const SearchBar = () => {
    const shops = useSelector(state => state.homepage.searchData)
    return (
        <ul className="search-bar">
            {shops.map(shop => {
                return <li>
                <a href="/#">
                    <img src={`./assets/img/${shop.img}`} alt="" />
                    <div className="search-bar__item">
                        <p>{shop.shopName}</p>
                        <p>{shop.address}</p>
                    </div>
                </a>
            </li>
            })}
            
        </ul>
    )
}

export default SearchBar