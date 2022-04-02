import { yupResolver } from "@hookform/resolvers/yup"
import Cookies from "js-cookie"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from "yup"
import { getUserInfoFetch } from '../../components/loginPage/loginSlice'

const schema = yup.object().shape({
  username: yup.string().trim('Username no space')
    .matches(/[a-zA-Z]/, 'Username can only contain Latin letters.').required('Username is required'),
  password: yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character').required('Password is required'),
})

const Login = () => {
  const [alert, setAlert] = useState(false)

  const { user } = useSelector(state => state.loginpage)

  const { status } = useSelector(state => state.loginpage)

  const dispatch = useDispatch()

  // get Token and save to cookie
  const token = useSelector(state => state.loginpage.accessToken)

  token && Cookies.set('accessToken', token, {
    expires: 1 / 12,
    secure: true
  })

  user && Cookies.set('address', user?.address, {
    expires: 1 / 12,
    secure: true
  })

  const navigate = useNavigate()
  useEffect(() => {
    user && (window.location.href = '/')
    if (status !== 400) return
    toast.error('Hãy đăng nhập lại', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setAlert(true)
  }, [status, user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const submitForm = (data) => {
    dispatch(getUserInfoFetch(data))
  }

  const handleChange = () => {
    setAlert(false)
  }

  return (
    <div className="login-form loader">
      {/* <img src="/assets/gif/Spinner-1s-203px.gif" alt="" width="250" /> */}
      <div className="container">
        <div className="login-container ">
          <h4 className="heading">Sign in</h4>
          <div className="button-group">
            <div className="button-control">
              <i className="fas fa-mobile-alt" />
              <p>Số điện thoại</p>
            </div>
            <div className="button-control">
              <i className="fa fa-facebook" />
              <p>Facebook</p>
            </div>
            <div className="button-control">
              <i className="fa fa-google-plus" aria-hidden="true" />
              <p>Gmail</p>
            </div>
          </div>
          <p className="p-title">Hoặc đăng nhập bằng tài khoản của bạn</p>
          {(errors?.username || errors?.password) && <div className="login-alert">
            {errors?.username && <span className="block" style={{ color: '#a94442' }}>{errors.username?.message}</span>}
            {errors?.password && <span className="block" style={{ color: '#a94442' }}>{errors.password?.message}</span>}
          </div>}
          {alert && <div className="login-alert">
            <span className="block" style={{ color: '#a94442' }}>Sai username or password</span>
          </div>}
          <form onSubmit={handleSubmit(submitForm)} className="form" id="form-1">
            <div className="form-group">
              <i className="far fa-envelope" />
              <input id="username" type="text" placeholder="Username"
                className="form-control"
                {...register("username", { onChange: () => handleChange() })}
              />
            </div>
            <div className="form-group">
              <input id="password" type="password"
                placeholder="Password" className="form-control"
                {...register("password", { onChange: () => handleChange() })} />
              <i className="fas fa-lock" />
            </div>

            <div className="form-group row justify-content-between">
              <div className="row align-items-center">
                <input type="checkbox" name="checked" id="checked-login" defaultChecked />
                <label htmlFor="checked-login" className="m-0">Lưu thông tin đăng nhập</label>
              </div>
              <Link to="#" className="m-0">Quên mật khẩu?</Link>
            </div>
            <button className="form-submit">Đăng Nhập</button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </form>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <p className="m-0">Bạn mới biết đến ShopeeFood?</p>
            <Link to="/register" style={{
              color: '#ff7645',
            }} className="ml-2 ">Đăng ký</Link>
          </div>
          <div className="login-policy">
            <p>Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng cách đăng nhập
              hoặc đăng ký, bạn đồng ý với <a href="/#"><u>Chính sách quy định của Foody</u></a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
