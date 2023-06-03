import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link, useNavigate } from 'react-router-dom'
import LoginSocial from '@/components/loginSocial'
import Footer from './Footer/Footer'
import { Alias } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { signinUser } from '@/features/auth/authSlice'
import { Input } from '@/components/input/Input'
// initial state
const schema = yup.object().shape({
  password: yup
    .string()
    // .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Yêu cầu nhập mật khẩu'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập trường này'),
})

const Login = () => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // /////// handle redirect when signin success//////////
  useEffect(() => {
    if (user) navigate(Alias.mypage)
  }, [user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onchange',

    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    dispatch(signinUser(data))
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
              <h1>{Languages.menu.login}</h1>
            </div>
            <div className='fillDataForm'>
              <form
                className='fieldscli_data'
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  label={Languages.menu.login}
                  type='submit'
                  buttonStyle={BUTTON_STYLES.PINK}
                  width={100}
                  textStyle={BUTTON_STYLES.WHITE}
                  isLowerCase
                />

                <div className='forgotPwd'>
                  <Link to={Alias.pwdRecovery}>
                    {Languages.inputText.forgotPass}
                  </Link>
                </div>
              </form>
              <LoginSocial />
            </div>
          </div>
          <div className='footerFormData'>
            <Link to={Alias.register}>{Languages.inputText.youNotAccount}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
