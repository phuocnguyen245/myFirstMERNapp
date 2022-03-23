import React, { useRef, useEffect } from 'react'
import ProductList from './ProductList'
const RightHomePage = ({ right }) => {
    const rightRef = useRef()

    useEffect(() => {
        const onLoad = () => {
            setTimeout(() => {
                right(rightRef.current.getBoundingClientRect().height)
            }, 500)
        }
        window.addEventListener('load', onLoad)
        return () => {
            window.removeEventListener('load', onLoad)
        }
    }, [right])

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
