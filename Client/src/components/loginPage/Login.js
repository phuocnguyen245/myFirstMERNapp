import { yupResolver } from "@hookform/resolvers/yup"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { getUserInfoFetch } from '../../components/loginPage/loginSlice'

const schema = yup.object().shape({
  username: yup.string().required('Không được để trống Username'),
  password: yup.string().min(4, 'Password có 4 ký tự trở lên')
    .matches(/[a-zA-Z]/, 'Không được dùng ký tự đặc biệt').required()
})

const Login = () => {
  const [alert, setAlert] = useState(false)

  const { user } = useSelector(state => state.loginpage)
  const { status } = useSelector(state => state.loginpage)

  const dispatch = useDispatch()

  const token = useSelector(state => state.loginpage.accessToken)
  token && localStorage.setItem('accessToken', JSON.stringify(token))

  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
    if (status !== 400) return
    setAlert(true)
  }, [status, user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  
  const submitForm = async (data) => {
    dispatch(getUserInfoFetch(data))
  }

  return (
    <div className="login-form">
      <div className="container">
        <div className="login-container">
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
          <form onSubmit={handleSubmit(submitForm)} className="form" id="form-1">
            <div className="form-group">
              <i className="far fa-envelope" />
              <input id="username" type="text" placeholder="Username or Email"
                className="form-control"
                {...register("username")}
              />
            </div>
            <div className="form-group">
              <input id="password" type="password"
                placeholder="Password" className="form-control"
                {...register("password")} />
              <i className="fas fa-lock" />
            </div>

            <div className="form-group row justify-content-between">
              <div className="row align-items-center">
                <input type="checkbox" name="checked" id="checked-login" defaultChecked />
                <label htmlFor="checked-login" className="m-0">Lưu thông tin đăng nhập</label>
              </div>
              <Link to="#" className="m-0">Quên mật khẩu?</Link>
            </div>
            {(errors?.username || errors?.password) && <div className="login-alert">
              {errors?.username && <span className="block" style={{ color: '#a94442' }}>{errors.username?.message}</span>}
              {errors?.password && <span className="block" style={{ color: '#a94442' }}>{errors.password?.message}</span>}
            </div>}
            {alert && <div className="login-alert">
              <span className="block" style={{ color: '#a94442' }}>Sai username or password</span>
            </div>}
            <button className="form-submit">Đăng Nhập</button>
          </form>
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
