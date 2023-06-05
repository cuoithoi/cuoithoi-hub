import React, { useState, useCallback } from 'react'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'
import Footer from './Footer/Footer'
import FormValidate from '@/utils/FormValidate'
import { Alias } from '@/commons/Constant.ts'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Loading from '@/components/Loading'
import { Input } from '@/components/input/Input'
import { useForm } from 'react-hook-form'
import { verifyEmail } from '@/features/auth/authSlice'
import yup from '@/utils/yupGlobal'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập trường này'),
})
const RecoveryPwd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    dispatch(verifyEmail(data))
  }

  // const [name, setName] = useState('');
  // const refName = useRef(null);

  // function handleChangeName(event) {
  //     setName(event.target.value);
  // }
  // const loginToken = useCallback(() => {

  //     const errMsgPhone = FormValidate.passConFirmPhone(name);

  //     refName.current?.setErrorMsg(errMsgPhone);

  //     if (`${errMsgPhone}`.length === 0) {
  //         console.log('name:', name);
  //     }

  // }, [name]);

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
            <div className='btn-back'>
              <Link to={Alias.login}>
                <FaLongArrowAltLeft />
                <span>{Languages.inputText.backIndex}</span>
              </Link>
            </div>
            <div className='userFields_head'>
              <h1>{Languages.inputText.recoveryPwd}</h1>
            </div>
            <div className='fillDataForm'>
              <form
                className='fieldscli_data'
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <MyTextInput
                    ref={refName}
                    value={name}
                    type={'text'}
                    placeHolder={Languages.inputText.username}
                    onChangeText={handleChangeName}
                    inputStyle={'form-control'}
                  /> */}
                <Input
                  register={register}
                  errors={errors}
                  name='email'
                  type='email'
                  placeHolder='email'
                  inputStyle={'form-control'}
                />
                <Button
                  label={Languages.inputText.sendEmailRecoveryPwd}
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

export default RecoveryPwd
