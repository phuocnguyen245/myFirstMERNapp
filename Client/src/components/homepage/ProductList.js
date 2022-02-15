import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { categoriesSelector, shopsSelector } from '../../redux/selector'
import Hehe from './Hehe'
import { getHomepageDataFetch } from './homePageSlice'

import Shop from './Shop'
const ProductList = () => {
    const categories = useSelector(categoriesSelector)
    const shops = useSelector(shopsSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHomepageDataFetch())
    }, [dispatch])
    return (
        categories.map(category => {
            return <section key={category._id} className="right-wrapper">
                <div className="right__title">
                    <span><b>{category.name}</b></span>
                </div>
                <div className="right__list row m-0">
                    {shops.map(shop => {
                        return shop.category === category.name ?
                    <Shop key={shop._id} shopName={shop.shopName} img={shop.img} address={shop.address} cost={shop.cost} /> : ''
                    })}
                </div>
            </section >
        })

    )
}

export default ProductList
