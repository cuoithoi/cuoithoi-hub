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
import { customFetch } from '@/utils/axios'
import { toast } from 'react-toastify'
import { forgotPassOtp } from '@/features/auth/authSlice'
// initial state
const schema = yup.object().shape({
  otp: yup.string()
    .required('Yêu cầu nhập OTP')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
})

const ForgotPassOtp = () => {
  const { hash } = useSelector((store) => store.auth.emailVerify)
  const navigate = useNavigate()
  // /////// handle redirect when signin success//////////
  useEffect(() => { }, [])
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
    const postData = async () => {
      try {
        const resp = await customFetch.post('/verify-otp', {
          ...data,
          hash: hash,
        })
        if (resp.data.errorCode === -1) {
          toast.error('OTP không chính xác', {
            autoClose: 1000
          })
        } else {
          dispatch(forgotPassOtp(data.otp))
          navigate(Alias.changePassword)
          toast.success('Xác thực OTP thành công', {
            autoClose: 1000
          })
        }

      } catch {
        toast.error('Xác thực OTP thất bại')
      }
    }
    postData()
  }

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
                  label='Xác thực OTP'
                  type='submit'
                  buttonStyle={BUTTON_STYLES.PINK}
                  width={100}
                  textStyle={BUTTON_STYLES.WHITE}
                  isLowerCase
                />
              </form>
              <span style={{ color: 'var(--white-color)', fontSize: 14, display: 'block', marginTop: 10 }}>
                * Nếu bạn không nhận được OTP vui lòng xóa cookie hoặc refresh lại website
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassOtp
