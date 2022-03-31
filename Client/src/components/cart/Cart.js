import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SearchContainer from "../homepage/searchContainer/SearchContainer";
import CartItem from "./CartItem";
import { deleteAllItemFetch, getCartTotalFetch } from './cartSlice';
import "./style.scss";
const MySwal = withReactContent(Swal)

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = Cookies.get('accessToken')
  const address = Cookies.get('address')

  const { cartItems } = useSelector(state => state.shop)
  const { total, length } = useSelector(state => state.shop)
  const { total: changeTotal, length: changeLength } = useSelector(state => state.cart)

  const [totalCost, setTotalCost] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [checkAll, setCheckAll] = useState(false)
  const [checkedID, setCheckedID] = useState([])

  useEffect(() => {
    setTotalCost(total)
    setCartQuantity(length)
  }, [total, length])

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
    setTotalCost(changeTotal)
    setCartQuantity(changeLength)
  }, [navigate, accessToken, changeTotal, changeLength])

  const handleIdChecked = (id, isCheck) => {
    setCheckedID(prev => {
      const isChecked = checkedID?.includes(id)
      if (isChecked) {
        const checked = checkedID?.filter(idChecked => idChecked !== id)
        dispatch(getCartTotalFetch({ checked, accessToken, id, isCheck }))
        return checkedID?.filter(idChecked => idChecked !== id)
      } else {
        const checked = [...prev, id]
        dispatch(getCartTotalFetch({ checked, accessToken, id, isCheck }))
        return [...prev, id]
      }
    })
  }

  const handleClickQty = (id, isCheck, counter) => {
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
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Cart Items has been deleted.',
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
                  <input type="checkbox" onChange={() => setCheckAll(!checkAll)} />
                  <p className="mb-0 ml-3">
                    Chọn tất cả
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
                    isCheck={item.isCheck} checkAll={checkAll} handleIdChecked={handleIdChecked}
                    handleClickQty={handleClickQty}
                  />)}
              </div>
            </div>
            <div className="cart__right right">
              <div className="right__header">
                <p className="mb-0">Địa điểm</p>
                <div className="right__location d-flex justify-content-start align-items-center">
                  <GoLocation />
                  <div className="address ml-3">
                    {address}
                  </div>
                </div>
              </div>
              <div className="right__mid">
                <p>Thông tin đơn hàng</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Tạm tính ({cartQuantity} sản phẩm)</p>
                  <p><FormattedNumber value={totalCost} style="currency" currency="VND" /></p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="choose-coupon fz-14">
                    Chọn mã giảm giá
                  </div>
                  <p className="m-0">
                    123456789123
                  </p>
                </div>
              </div>
              <div className="right__footer">
                <div className="right__total d-flex justify-content-between align-items-center">
                  <p>Tổng cộng</p>
                  <p><FormattedNumber value={totalCost} style="currency" currency="VND" /></p>
                </div>
                <button>
                  Xác nhận thanh toán
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
