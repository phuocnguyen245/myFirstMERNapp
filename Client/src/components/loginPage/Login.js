import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoFetch } from '../../components/loginPage/loginSlice'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4, 'Password co 4 ky tu tro len').required()
})

const Login = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const user = useSelector(state => state.loginpage.user)
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const submitForm = (data) => {
    dispatch(getUserInfoFetch(data))
    if (!user) {
      console.log('hihi');
    }
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
              {errors?.username && <span role="alert" className="form-message">{errors.username?.message}</span>}
            </div>
            <div className="form-group">
              <input id="password" type="password"
                placeholder="Password" className="form-control"
                {...register("password")} />
              <i className="fas fa-lock" />
              {errors?.password && <span role="alert" className="form-message">{errors.password?.message}</span>}
            </div>
            <div className="form-group row justify-content-between">
              <div className="row align-items-center">
                <input type="checkbox" name="checked" id="checked-login" defaultChecked />
                <label htmlFor="checked-login" className="m-0">Lưu thông tin đăng nhập</label>
              </div>
              <Link to="#" className="m-0">Quên mật khẩu?</Link>
            </div>
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
