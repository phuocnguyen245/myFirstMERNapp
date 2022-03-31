import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from 'react-icons/ai';
import { GoLocation } from "react-icons/go";
import { IoCallSharp } from "react-icons/io5";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { URL } from '../../constants';
import SearchContainer from "../homepage/searchContainer/SearchContainer";
import { getCartItemFetch } from '../shop/shopSlice';
import CartItem from "./CartItem";
import { deleteAllItemFetch, getCartTotalFetch } from './cartSlice';
import "./style.scss";


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = Cookies.get('accessToken')

  const { cartItems, initLength, total } = useSelector(state => state.shop)
  const { total: changeTotal, length: changeLength } = useSelector(state => state.cart)
  const { userData } = useSelector(state => state.shop)
console.log(userData);
  const [totalCost, setTotalCost] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(0)

  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')

  useEffect(() => {
    setCartQuantity(initLength)
    document.title = "Giỏ hàng"
  }, [total, initLength])

  useEffect(() => {
    setTotalCost(total)
    dispatch(getCartItemFetch({ accessToken }))
  }, [dispatch, accessToken, total])

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
    setTotalCost(changeTotal)
    setCartQuantity(changeLength)
  }, [navigate, accessToken, changeTotal, changeLength])

  const handleIdChecked = (id, isCheck) => {
    console.log(id);
    dispatch(getCartTotalFetch({ accessToken, id, isCheck }))
    setTotalCost(changeTotal)
  }

  const handleClickQty = (id, isCheck) => {
    ;
    dispatch(getCartTotalFetch({ accessToken, id, isCheck }))

  }

  const deleteAll = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure to delete all item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllItemFetch(accessToken));
        dispatch(getCartItemFetch({ accessToken }))
        setCartQuantity(0)
        setTotalCost(0)
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Cart Items has been deleted.',
          'success'
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Cart Item is safe :)',
          'error'
        );
      }
    });
  }

  useEffect(() => {
    setUsername(userData?.rest?.name)
    setAddress(userData?.rest?.address)
    setTel(userData?.rest?.tel)
  }, [userData?.rest?.username, userData?.rest?.tel, userData?.rest?.address])

  const handleClick = async () => {
    if (cartQuantity === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Product',
      })
    } else {
      setCartQuantity(0)
      setTotalCost(0)
      const payload = { userInfo: { username, address, tel }, accessToken }
      await axios.post(`${URL}/cart/check-out`, payload)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success',
        showConfirmButton: true,
        timer: 1500
      })
      dispatch(getCartItemFetch({ accessToken }))
    }
  }

  return (
    <IntlProvider locale={'vi'} defaultLocale={'vi'}>

      <div className="cart">
        <div className="container">
          <div className="cart__header d-flex justify-content-between align-items-center">
            <Link to="/cart">
              Giỏ hàng
            </Link>
            <SearchContainer />
          </div>
          <div className="cart__container d-flex justify-content-between align-items-start">
            <div className="cart__left left">
              <div className="left__bar d-flex justify-content-between align-items-center">
                <div className="left__check d-flex justify-content-between align-items-center">
                  <p className="mb-0 ml-3">
                    {cartItems?.length} mặt hàng
                  </p>
                </div>
                <div className="left__button--delete d-flex justify-content-between align-items-center" onClick={deleteAll}>
                  <i className="fas fa-trash-alt"></i>
                  <p className="m-0 ml-1">
                    Xóa
                  </p>
                </div>
              </div>
              <div className="left__list">
                {cartItems && cartItems.map(item =>
                  <CartItem product_ID={item._id} name={item.name} key={item._id} cost={item.cost}
                    qty={item.qty} img={item.img} slug={item.slug} cartItem_ID={item.cartItem_ID}
                    isCheck={item.isCheck} handleIdChecked={handleIdChecked}
                    handleClickQty={handleClickQty}
                  />)}
              </div>
            </div>
            <div className="cart__right right">
              <div className="right__header">
                <div className="d-flex justify-content-start align-items-center mb-1">
                  <AiOutlineUser />
                  <input className="info m-0 ml-3" value={username || ''} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="d-flex justify-content-start align-items-center mb-1">
                  <GoLocation />
                  <input className="info m-0 ml-3" value={address || ''} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <IoCallSharp />
                  <input type="tel" className="info m-0 ml-3" value={tel || ''} onChange={e => setTel(e.target.value)} />
                </div>
              </div>
              <div className="right__mid">
                <p>Thông tin đơn hàng</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0">Phương thức thanh toán</p>
                  <div className="choose-coupon">
                    Chọn phương thức
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                  <p className="m-0">ShopeeFood Voucher</p>
                  <div className="choose-coupon">
                    Chọn hoặc nhập mã
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0">Tạm tính ({cartQuantity} mặt hàng)</p>
                  <p className="m-0"><FormattedNumber value={totalCost} style="currency" currency="VND" /></p>
                </div>


              </div>
              <div className="right__footer">
                <div className="right__total d-flex justify-content-between align-items-center">
                  <p>Giảm</p>
                  <p><FormattedNumber value={0} style="currency" currency="VND" /></p>
                </div>
                <div className="right__total d-flex justify-content-between align-items-center">
                  <p>Tổng cộng</p>
                  {totalCost}
                  <p><FormattedNumber value={totalCost} style="currency" currency="VND" /></p>
                </div>
                <button onClick={handleClick}>
                  Xác nhận giỏ hàng ({cartQuantity} mặt hàng)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider >
  );
};

export default Cart;
