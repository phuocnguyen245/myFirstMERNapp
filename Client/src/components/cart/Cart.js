import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SearchContainer from "../homepage/searchContainer/SearchContainer";
import CartItem from "./CartItem";
import { getCartTotalFetch } from './cartSlice';
import "./style.scss";
const MySwal = withReactContent(Swal)

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shop)

  const accessToken = Cookies.get('accessToken')

  const address = Cookies.get('address')

  const [checkAll, setCheckAll] = useState(false)
  const [checkedID, setCheckedID] = useState([])
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [navigate, accessToken])

  const handleClick = () => {

  }

  const handleIdChecked = (id, isCheck) => {
    setCheckedID(prev => {
      const isChecked = checkedID?.includes(id)
      if (isChecked) {
        const checked = checkedID?.filter(idChecked => idChecked !== id)
        dispatch(getCartTotalFetch({ checked, accessToken, isCheck: !isChecked }))
        return checkedID?.filter(idChecked => idChecked !== id)
      } else {
        const checked = [...prev, id]
        dispatch(getCartTotalFetch({ checked, accessToken, isCheck: isCheck }))
        return [...prev, id]
      }
    })
  }

  useEffect(() => {
  }, [checkedID, dispatch, accessToken])

  return (
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
              <div className="left__button--delete d-flex justify-content-between align-items-center">
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
                <p>
                  Tạm tính (0 sản phẩm)
                </p>
                <p>0đ</p>
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
                <p>15000đ</p>
              </div>
              <button onClick={handleClick}>
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
