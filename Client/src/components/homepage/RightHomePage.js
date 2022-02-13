import React, { useRef, useEffect, useState } from 'react'
import ProductList from './ProductList'
const RightHomePage = ({ right }) => {
    const [rightHeight, setRightHeight] = useState(0)

    const rightRef = useRef()

    useEffect(() => {
        const onLoad = () => {
            setRightHeight(rightRef.current.getBoundingClientRect().height)
        }
        window.addEventListener('load', onLoad)
        return () => {
            window.removeEventListener('load', onLoad)
        }
    }, [])

    right(rightHeight)
    
    return (
        <div ref={rightRef} className="content-container-right clearfix">
            <div className="container">
                <div className="right">
                    <div className="right__local">
                        <span><b>Đồ ăn</b></span>
                        <span>Chọn địa chỉ giao hàng</span>
                    </div>
                    <ProductList />
                </div>
            </div>
        </div>

    )
}

export default RightHomePage
