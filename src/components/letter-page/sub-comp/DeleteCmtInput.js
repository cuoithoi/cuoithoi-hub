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
import { deleteDataApi } from '@/utils/axios'
const schema = yup.object().shape({
  passWish: yup.string().required('Yêu cầu nhập mật khẩu'),
})

const DeleteCmtInput = ({ handleCloseModal, deleteCmt, _id }) => {
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
        const res = await deleteDataApi(`/delete-wish/${_id}`, {
          ...data,
          _id: _id,
        })
        toast.success('Xoá lời chúc thành công')
        deleteCmt()
        handleCloseModal()
      } catch (error) {
        toast.error('Xoá lời chúc không thành công, vui lòng thử lại')
      }
    }
    postData()
  }

  return (
    <div>
      <h1>Xác nhận xoá lời chúc</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
            label={'Xoá lời chúc'}
            buttonStyle={BUTTON_STYLES.PINK}
            textStyle={BUTTON_STYLES.WHITE}
          />
        </div>
      </form>
    </div>
  )
}

export default DeleteCmtInput
