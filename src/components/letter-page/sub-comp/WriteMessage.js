import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Input } from '../../input/Input'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postDataApi } from '@/utils/axios'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MyTextArea } from '@/components/textarea'
const schema = yup.object().shape({
  namePeopleSend: yup
    .string()
    // .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Yêu cầu nhập tên'),
  desWish: yup.string().required('Viết lời chúc cho cô dâu chú rể'),
  passWish: yup.string().required('Yêu cầu nhập mật khẩu'),
})

const WriteMessage = ({ setCmtList, handleCloseModal }) => {
  const { id } = useParams()
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
        const res = await postDataApi('/send/wish', {
          ...data,
          invitationsId: id,
        })
        const newData = { ...data, createTime: new Date() }
        setCmtList((prev) => [newData, ...prev])
        toast.success(res.data[0].messaging)
        handleCloseModal()
      } catch (error) {
        console.log(error)
        toast.error('Gửi lời chúc không thành công')
      }
    }
    postData()
  }

  return (
    <div>
      <h1>LỜI CHÚC</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type='text'
            name='namePeopleSend'
            placeHolder='Tên'
            register={register}
            errors={errors}
            inputStyle='letter-input'
          />
          <MyTextArea
            type='text'
            className='text'
            placeHolder='Nhập lời chúc'
            name='desWish'
            register={register}
            errors={errors}
          />
          <Input
            type='text'
            placeHolder='Mật khẩu'
            name='passWish'
            register={register}
            errors={errors}
          />
        </div>
        <div className='flex w-full justify-center'>
          <Button
            label={'Gửi lời chúc'}
            buttonStyle={BUTTON_STYLES.PINK}
            textStyle={BUTTON_STYLES.WHITE}
          />
        </div>
      </form>
    </div>
  )
}

export default WriteMessage
