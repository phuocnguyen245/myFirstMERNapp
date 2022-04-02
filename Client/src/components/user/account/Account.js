import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { URL } from "../../../constants";
const Account = () => {

  const accessToken = Cookies.get('accessToken')
  const navigate = useNavigate()


  const [name, setName] = useState('')
  const [tel, setTel] = useState(0)
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  const getUser = async (accessToken) => {
    try {
      const fetch = await axios.get(`${URL}/homepage/get-user/${accessToken}`)
      const { user: userFetch } = await fetch.data
      setName(userFetch?.name)
      setTel(() => `0${userFetch?.tel}`)
      setAddress(userFetch?.address)
      setEmail(userFetch?.email)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getUser(accessToken)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }
  }, [accessToken, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, address, tel }
      const fetch = await axios.put(`${URL}/homepage/update-user-info`, { data, accessToken })
      const dataFetch = await fetch.data
      if (dataFetch === 'OK') {
        toast.success('Thêm thành công!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getUser(accessToken)
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="account">
      <div className="account-container">
        <div className="account-header">
          <h3>Hồ Sơ Của Tôi</h3>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="account-main">
          <form onSubmit={handleSubmit}>
            <div className="main__left col-8">
              <div className="left__top">
                <div className="mb-3 row">
                  <label htmlFor="username" className="col-form-label text-right text-right">Username</label>
                  <div className="col-sm-8 col-form-label">pnguyen</div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-form-label text-right">Name</label>
                  <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                    <input type="text" className="form-control" id="name" onChange={e => setName(e.target.value)}
                      value={name} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="address" className="col-form-label text-right">Address</label>
                  <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                    <input type="text" className="form-control" id="address" onChange={e => setAddress(e.target.value)} value={address} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-form-label text-right">Email</label>
                  <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                    <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)}
                      value={email} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="tel" className="col-form-label text-right">Tel</label>
                  <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                    <input type="tel" className="form-control" id="tel" onChange={e => setTel(e.target.value)}
                      value={tel} />
                  </div>
                </div>
              </div>
            </div>
            <div className="left__bottom col-8">
              <button className="btn btn-primary float-right">Update</button>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Account
