import React, { useEffect, useRef } from 'react'
import ProductList from '../productList/ProductList'
const RightHomePage = () => {

    const rightRef = useRef()
    useEffect(() => {
        const onLoad = () => {
            setTimeout(() => {
                const rightHeight = rightRef.current.getBoundingClientRect().height
                localStorage.setItem('rightHeight', rightHeight)
            }, 2000)
        }
        window.addEventListener('load', onLoad)
        return () => {
            window.removeEventListener('load', onLoad)
        }
    }, [])

    return (
        <div ref={rightRef} className="content-container-right clearfix">
            <div className="container">
                <div className="right">
                    <div className="right__local">
                        <span><b></b></span>
                        <span>Chọn địa chỉ giao hàng</span>
                    </div>
                    <ProductList />
                </div>
            </div>
        </div>

    )
}

export default RightHomePage
