import React from 'react'
import { useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer/Footer'
import { Alias } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { Input } from '@/components/input/Input'
import { toast } from 'react-toastify'
import { customFetch } from '@/utils/axios'
// initial state
const schema = yup.object().shape({
  password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirmPassword: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  // .min(6, 'Mật khẩu tối thiểu 6 ký tự')
})

const ChangePassword = () => {
  const { hash, otp } = useSelector((store) => store.auth.emailVerify)
  const navigate = useNavigate()
  // /////// handle redirect when signin success//////////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onchange',

    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }
    const postData = async () => {
      try {
        await customFetch.post('/change-forgot-password', {
          ...data,
          otp: otp,
          hash: hash,
        })
        toast.success('Thay đổi mật khẩu thành công')
        navigate(Alias.login)
      } catch (error) {
        toast.error('Thay đổi mật khẩu không thành công, vui lòng thử lại')
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
                  name='password'
                  type='password'
                  placeHolder='Nhập mật khẩu mới'
                  inputStyle={'form-control'}
                />
                <Input
                  register={register}
                  errors={errors}
                  name='confirmPassword'
                  type='password'
                  placeHolder='Nhập lại mật khẩu'
                  inputStyle={'form-control'}
                />
                <Button
                  label='Thay đổi mật khẩu'
                  type='submit'
                  buttonStyle={BUTTON_STYLES.PINK}
                  width={100}
                  textStyle={BUTTON_STYLES.WHITE}
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

export default ChangePassword
