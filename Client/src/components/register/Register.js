import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import * as yup from "yup"
import { URL } from "../../constants"

const schema = yup.object().shape({
  username: yup.string().trim('Username no space')
    .matches(/[a-zA-Z]/, 'Username can only contain Latin letters.').required('Username is required'),
  firstname: yup.string().matches(/[a-zA-Z]/, 'Firstname can only contain Latin letters.').required(),
  lastname: yup.string().matches(/[a-zA-Z]/, 'Lastname can only contain Latin letters.').required(),
  address: yup.string().required('Address is required'),
  email: yup.string().email().required('Email is required'),
  tel: yup.number()
    .typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point").min(8).required('Tel is required'),
  password: yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      tel: '',
      password: '',
      confirmPassword: '',
    }
  })
  const navigate = useNavigate()
  const submitForm = async (data) => {
    console.log(data);
    const fetch = await axios.post(`${URL}/login/add-user`, data)
    const getStatus = await fetch.data
    if (getStatus === "Created") {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => navigate('/login'), 1700)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  return (
    <section style={{
      background: 'url("./assets/img/main-banner.jpg")',
      padding: '40px',
      height: '130vh',
      backgroundSize: 'cover'
    }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-xl-7">
            <div className="card card-registration" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', border: 'none', marginTop: '90px' }}>
              <h3 className="text-center mt-2">Đăng ký</h3>
              <div className="col-xl-11" style={{ margin: '0 auto' }}>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="card-body text-white">
                    {(errors?.username || errors?.password || errors?.firstname || errors?.lastname || errors?.address || errors?.tel || errors?.confirmPassword || errors?.email) &&
                      <div className="login-alert">
                        {errors?.username && <span className="block" style={{ color: '#a94442' }}>{errors.username?.message}</span>}
                        {errors?.firstname && <span className="block" style={{ color: '#a94442' }}>{errors.firstname?.message}</span>}
                        {errors?.lastname && <span className="block" style={{ color: '#a94442' }}>{errors.lastname?.message}</span>}
                        {errors?.address && <span className="block" style={{ color: '#a94442' }}>{errors.address?.message}</span>}
                        {errors?.tel && <span className="block" style={{ color: '#a94442' }}>{errors.tel?.message}</span>}
                        {errors?.password && <span className="block" style={{ color: '#a94442' }}>{errors.password?.message}</span>}
                        {errors?.confirmPassword && <span className="block" style={{ color: '#a94442' }}>{errors.confirmPassword?.message}</span>}
                        {errors?.email && <span className="block" style={{ color: '#a94442' }}>{errors.email?.message}</span>}
                      </div>}
                    <div className="form-outline mb-4">
                      <input type="text" placeholder="Username" className="form-control"
                        {...register("username")} />
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input type="text" placeholder="First Name" className="form-control"
                            {...register("firstname")} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input type="text" placeholder="Last Name" className="form-control"
                            {...register("lastname")} />

                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" placeholder="Address" className="form-control"
                        {...register("address")} />

                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input type="email" placeholder="Email" className="form-control"
                            {...register("email")} />

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input type="tel" placeholder="Tel" className="form-control"
                            {...register("tel")} />

                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" placeholder="Password" className="form-control"
                        {...register("password")} />

                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" placeholder="Confirm Password" className="form-control"
                        {...register("confirmPassword")} />

                    </div>
                    <div className="d-flex justify-content-end pt-3">

                      <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >

    </section >
  )
}

export default Register