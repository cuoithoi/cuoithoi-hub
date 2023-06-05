import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link, useNavigate } from 'react-router-dom'
import LoginSocial from '@/components/loginSocial'
import Footer from './Footer/Footer'
import FormValidate from '@/utils/FormValidate'
import { Alias } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { signinUser, verifyOTP } from '@/features/auth/authSlice'
import { Input } from '@/components/input/Input'
// initial state
const schema = yup.object().shape({
  otp: yup
    .string()
    // .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Yêu cầu nhập mật khẩu'),
})

const VerifyOtp = () => {
  const { hash, userId, email, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  // /////// handle redirect when signin success//////////
  useEffect(() => {
    console.log(user)
    if (user) navigate(Alias.mypage)
  }, [user])
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
    const dataSending = { ...data, hash, userId, email }
    console.log(dataSending)
    dispatch(verifyOTP(dataSending))
  }

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
              <h1>{Languages.text.verifyHeader}</h1>
            </div>
            <div className='fillDataForm'>
              <form
                className='fieldscli_data'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  register={register}
                  errors={errors}
                  name='otp'
                  type='text'
                  placeHolder='Nhập mã OTP'
                  inputStyle={'form-control'}
                />

                <Button
                  label={Languages.menu.verifyOtp}
                  type='submit'
                  buttonStyle={BUTTON_STYLES.PINK}
                  width={100}
                  textStyle={BUTTON_STYLES.PINK}
                  isLowerCase
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VerifyOtp
