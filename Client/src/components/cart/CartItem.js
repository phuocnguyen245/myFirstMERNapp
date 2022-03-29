import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { Link } from 'react-router-dom';
const CartItem = ({ product_ID, name, qty, cost, img, slug, checkAll }) => {

    const [counter, setCounter] = useState(qty)
    const [check, setCheck] = useState(checkAll)

    const [change, setChange] = useState(false)
    const [quantity, setQuantity] = useState(counter)

    const handleDecrease = (product_ID) => {
        setCounter(counter - 1)
        setChange(false)
        console.log(product_ID);
    }
    const handleIncrease = (product_ID) => {
        setCounter(counter + 1)
        setChange(false)
        console.log(product_ID);
    }
    if (counter < 1) {
        setCounter(1)
    }
    const handleChangeQty = (e, product_ID) => {
        e.target.value < 1 ? setQuantity(1) : setQuantity(e.target.value)
        console.log(product_ID);
    }
    return (
        <div className="cart-item d-flex justify-content-between align-items-center" >
            <div className="product-left d-flex justify-content-between align-items-center">
                <input type="checkbox" checked={checkAll || check} onChange={() => setCheck(!check)} />
                <Link to={`/product/${slug}`} >
                    <img src={`./assets/img/${img}`} alt="" />
                </Link>
                <p className="m-0">
                    {name}
                </p>
            </div>
            <div className="product-mid">
                <IntlProvider locale={'vi'} defaultLocale={'vi'}>
                    <p className="price">
                        <FormattedNumber value={cost} style="currency" currency="VND" />
                    </p>
                </IntlProvider>
                <div className="item_btn d-flex justify-content-start align-items-center">
                    <div className="btn__wish-list">
                        <AiOutlineHeart />
                    </div>
                    <div className="btn__delete">
                        <IoTrashOutline />
                    </div>
                </div>
            </div>
            <div className="product-right d-flex justify-content-between align-items-center">
                <div className="btn__minus" onClick={() => handleDecrease(product_ID)}>
                    <AiOutlineMinus />
                </div>
                <div className="qty">
                    {change ?
                        <input value={quantity} onChange={e => handleChangeQty(e, product_ID)} /> :
                        <input value={counter} onChange={() => setChange(true)} />
                    }
                </div>
                <div className="btn__plus" onClick={() => handleIncrease(product_ID)}>
                    <AiOutlinePlus />
                </div>
            </div>
        </div >
    )
}

export default CartItem