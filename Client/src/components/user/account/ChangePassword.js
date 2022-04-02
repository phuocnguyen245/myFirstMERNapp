
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import * as yup from "yup"
import { URL } from "../../../constants"


const schema = yup.object().shape({
  oldpassword: yup.string().required('Old Password is required'),
  password: yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required(' Confirm Password is required')
});
const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldpassword: '',
      password: '',
      confirmPassword: '',
    }
  })
  const accessToken = Cookies.get('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      navigate('/login')
    }
  }, [accessToken, navigate])

  const submitForm = async (data) => {
    const postData = await axios.put(`${URL}/homepage/update-password`, { data, accessToken });
    const status = postData.data
    if (status === 'OK') {
      reset({
        oldpassword: "",
        password: "",
        confirmPassword: ""
      }, {
        keepErrors: false,
        keepDirty: true,
        keepIsSubmitted: true,
        keepTouched: true,
        keepIsValid: true,
        keepSubmitCount: true,
      });
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Do you want to re-login',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, re-login!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Re-direct to Login',
            'success'
          )
          Cookies.remove('accessToken')
          Cookies.remove('address')
          localStorage.clear();
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Enjoy your time',
            'success'
          )
        }
      })
    } else if (status === 'Duplicate') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New password is the same as the Old Password',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  return (
    <div>
      <div className="account">
        <div className="account-container">
          <div className="account-header">
            <h3>Hồ Sơ Của Tôi</h3>
            <p>Quản lý mật khẩu để bảo mật tài khoản</p>
          </div>
          <div className="account-main">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="main__left col-8">
                {(errors?.password || errors?.confirmPassword || errors?.oldpassword) &&
                  <div className="login-alert">
                    {errors?.oldpassword && <span className="block" style={{ color: '#a94442' }}>{errors.oldpassword?.message}</span>}
                    {errors?.password && <span className="block" style={{ color: '#a94442' }}>{errors.password?.message}</span>}
                    {errors?.confirmPassword && <span className="block" style={{ color: '#a94442' }}>{errors.confirmPassword?.message}</span>}
                  </div>}
                <div className="left__top">
                  <div className="mb-3 row">
                    <label htmlFor="oldPassword" className="col-form-label text-right">Old Password</label>
                    <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                      <input type="password" className="form-control" id="oldPassword" {...register("oldpassword")} />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="Password" className="col-form-label text-right">Password</label>
                    <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                      <input type="password" className="form-control" id="Password" {...register("password")} />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="confirmPassword" className="col-form-label text-right">Confirm</label>
                    <div className="col-sm-8" style={{ flex: '1', maxWidth: '100%' }}>
                      <input type="password" className="form-control" id="confirmPassword" {...register("confirmPassword")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="left__bottom col-8">
                <button className="btn btn-primary float-right">Update</button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ChangePassword
