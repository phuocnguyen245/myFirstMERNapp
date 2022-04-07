import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FormattedDate, FormattedNumber, FormattedTime, IntlProvider } from 'react-intl';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { URL } from "../../../constants/index";
import { getCartItemFetch } from "../../shop/shopSlice";

const PurchaseAll = () => {
  const accessToken = Cookies.get('accessToken')
  const dispatch = useDispatch()
  const { type } = useParams();

  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    const callApi = async () => {
      try {
        if (accessToken) {
          const getOrder = await axios.post(`${URL}/purchase/get-order-info/type`, { type, accessToken });
          const fetch = await getOrder.data.orders
          if (fetch) {
            setData(fetch)
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not logged yet',
          })
          setTimeout(() => navigate('/login'), 1500)
        }
      } catch (error) {

      }
    }
    callApi()
  }, [type, accessToken, navigate]);

  const handleReBuy = async (product_IDS) => {
    const post = await axios.post(`${URL}/purchase/re-add-to-cart`, { product_IDS, accessToken })
    const data = await post.data
    const { status, length } = data
    if (status === 200 && length > 0) {
      dispatch(getCartItemFetch({ accessToken }))
      toast.success(`Added ${length} to cart`, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } else if (status === 200 && length === 0) {
      toast.warn(`No item to add`, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Fail`, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <IntlProvider locale={'vi'} defaultLocale={'vi'}>
      <div className="purchase-list">
        {data?.map(d => {
          const total = d.products.reduce((a, b) => a + b.cost * b.qty, 0)
          return <div className="items-purchase" key={d._id}>
            <div className="item" key={d._id}>
              <div className="item__header d-flex justify-content-end align-items-center">
                <div className="item__header-status d-flex justify-content-between align-items-center">
                  <FiTruck />
                  <p>{d.status === 1 ? 'Đang đợi xác nhận' : d.status === 2 ? 'Đang giao' : d.status === 3 ? 'Đã giao thành công' : 'Đã hủy'}</p>
                </div>
                <p>{(d.status === 1 || d.status === 2) && 'Đang xử lý'}{d.status === 3 && 'Đã giao'}</p>
                <p><FormattedDate value={d.updatedAt} year="numeric" month="long" day="2-digit" /></p>
                <p><FormattedTime value={d.updatedAt} /></p>
              </div>
              {d?.products?.map(p => {
                return <div className="item__mid d-flex justify-content-between align-items-center" key={p.product_ID}>
                  <div className="item__info d-flex justify-content-start align-items-start">
                    <img src={`/assets/img/${p.img}`} alt="" />
                    <div>
                      <p className="shop-name mb-0">{p.name}</p>
                      <p className="shop-name text-14 mb-0">x {p.qty}</p>
                    </div>
                  </div>
                  <p className="price"><FormattedNumber value={p.cost} style="currency" currency="VND" /></p>
                </div>
              })}
              <div className="d-flex justify-content-end align-items-center mt-2 mb-2">
                <FaMoneyCheck />
                <p className="mb-0 mr-4">Tổng số tiền:</p>
                <p className="mb-0 total-price"><FormattedNumber value={total} style="currency" currency="VND" /></p>
              </div>
              <div className="item__bottom d-flex justify-content-end align-items-center">
                <button onClick={() => handleReBuy(d?.products)} className="btn btn-buy">Mua lại</button>
                <button className="btn btn-rate">Đánh giá</button>
              </div>
            </div>
          </div>
        })}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </IntlProvider>
  );
};

export default PurchaseAll;
