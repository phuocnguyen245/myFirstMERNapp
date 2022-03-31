
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteCartItemFetch, putShopQtyFetch } from './cartSlice';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function CartItem({ product_ID, name, qty, cost, img, slug, checkAll, cartItem_ID, handleIdChecked, isCheck, handleClickQty }) {

    const accessToken = Cookies.get('accessToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [counter, setCounter] = useState(qty);

    const [check, setCheck] = useState(isCheck);

    const handleDecrease = (product_ID) => {
        setCounter(counter - 1);
        dispatch(putShopQtyFetch({ product_ID, qty: counter - 1, accessToken }));
        handleClickQty(product_ID, check, counter - 1);

    };
    const handleIncrease = (product_ID) => {
        console.log(check);
        setCounter(counter + 1);
        dispatch(putShopQtyFetch({ product_ID, qty: counter + 1, accessToken }));
        handleClickQty(product_ID, check, counter + 1);
    };

    useEffect(() => {
        if (counter < 0) {
            setCounter(0);
        }
    }, [counter])

    const handleDelete = (product_ID) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCartItemFetch(cartItem_ID));
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Cart Item has been deleted.',
                    'success'
                );
                setTimeout(() => navigate(0), 1000)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Cart Item is safe :)',
                    'error'
                );
            }
        });
    };

    const handleCheck = (product_ID) => {
        setCheck(!check);
        handleIdChecked(product_ID, !check, counter);
    };

    return (
        <div className="cart-item d-flex justify-content-between align-items-center">
            <div className="product-left d-flex justify-content-between align-items-center">
                <input type="checkbox"
                    checked={(checkAll || check)}
                    onChange={() => handleCheck(product_ID)} />
                <Link to={`/product/${slug}`}>
                    <img src={`./assets/img/${img}`} alt="" />
                </Link>
                <p className="m-0">
                    {name}
                </p>
            </div>
            <div className="product-mid">
                <IntlProvider locale={'vi'} defaultLocale={'vi'}>
                    <p className="price"><FormattedNumber value={cost} style="currency" currency="VND" /></p>
                </IntlProvider>
                <div className="item_btn d-flex justify-content-start align-items-center">
                    <div className="btn__wish-list">
                        <AiOutlineHeart />
                    </div>
                    <div className="btn__delete" onClick={() => handleDelete(product_ID)}>
                        <IoTrashOutline />
                    </div>
                </div>
            </div>
            <div className="product-right d-flex justify-content-between align-items-center">
                <div className="btn__minus" onClick={() => handleDecrease(product_ID)}>
                    <AiOutlineMinus />
                </div>
                <div className="qty">
                    <input value={counter} onChange={() => { }} />
                </div>
                <div className="btn__plus" onClick={() => handleIncrease(product_ID)}>
                    <AiOutlinePlus />
                </div>
            </div>

        </div>
    );
}

export default CartItem