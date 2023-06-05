import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
//////////////////////////////
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'
import LoginSocial from '@/components/loginSocial'
import Footer from './Footer/Footer'
import { Alias } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { signupUser } from '@/features/auth/authSlice'

import { Input } from '@/components/input/Input'

// initial state
import { useEffect } from 'react'
// initial state
const schema = yup.object().shape({
  username: yup.string().required('Yêu cầu nhập trường này'),
  password: yup
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Yêu cầu nhập mật khẩu'),
  fullName: yup.string().required('Yêu cầu nhập trường này'),

  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập trường này'),
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{10,14}$/, 'Số điện thoại không hợp lệ')
    .required('số điện thoại là bắt buộc'),
})

const RegisterRefactor = () => {
  const { isSignupSuccess } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  // /////// handle redirect when sign up success//////////
  useEffect(() => {
    console.log(isSignupSuccess)
    if (isSignupSuccess) navigate(Alias.verifyOtp)
  }, [isSignupSuccess])

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onchange',

    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
    dispatch(signupUser(data))
  }

  // dispatch(signupUser(data))

  // console.log(register('username'))

  // console.log(register('username'))
  console.log(errors)
  return (
    <div className='Login'>
      <Loading />
      <Header
        background={'var(--white-color)'}
        colorText={'var(--text-color-darkmode)'}
      />
      <div className='bg_form'>
        <div className='main-form-user'>
          <div className='backgroundFromUser'>
            <div className='userFields_head'>
              <h1>{Languages.menu.register}</h1>
            </div>
            <div className='fillDataForm'>
              <form
                className='fieldscli_data'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  register={register}
                  errors={errors}
                  name='fullName'
                  type='text'
                  placeHolder={Languages.inputText.name}
                  inputStyle={'form-control'}
                />
                <Input
                  register={register}
                  errors={errors}
                  name='username'
                  type='text'
                  placeHolder={'User name'}
                  inputStyle={'form-control'}
                />
                <Input
                  register={register}
                  errors={errors}
                  name='phoneNumber'
                  type='text'
                  placeHolder={Languages.inputText.phone}
                  inputStyle={'form-control'}
                />
                <Input
                  register={register}
                  errors={errors}
                  name='email'
                  type='email'
                  placeHolder='email'
                  inputStyle={'form-control'}
                />
                <Input
                  register={register}
                  errors={errors}
                  name='password'
                  type='password'
                  placeHolder={Languages.inputText.password}
                  inputStyle={'form-control'}
                />
                <Button
                  type='submit'
                  label={Languages.menu.register}
                  // onPress={registerToken}
                  buttonStyle={BUTTON_STYLES.PINK}
                  width={100}
                  textStyle={BUTTON_STYLES.WHITE}
                  isLowerCase
                />
              </form>
              <LoginSocial />
            </div>
          </div>
          <div className='footerFormData'>
            <Link to={Alias.login}>{Languages.inputText.youhaveAccount}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegisterRefactor
