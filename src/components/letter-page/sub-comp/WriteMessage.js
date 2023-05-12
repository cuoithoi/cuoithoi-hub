import React from 'react'
import { Input } from '../../input/Input'
import yup from '@/utils/yupGlobal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  name: yup
    .string()
    // .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Yêu cầu nhập tên'),
  message: yup.string().required('Viết lời chúc cho cô dâu chú rể'),
  password: yup.string().required('Yêu cầu nhập mật khẩu'),
})

const WriteMessage = () => {
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
  }

  return (
    <div>
      <h1>LỜI CHÚC</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          name='name'
          placeHolder='Tên'
          register={register}
          errors={errors}
          inputStyle='letter-input'
        />
        <Input
          type='text'
          placeHolder='Nhập lời chúc'
          name='message'
          register={register}
          errors={errors}
        />
        <Input
          type='text'
          placeHolder='Mật khẩu'
          name='password'
          register={register}
          errors={errors}
        />
      </form>
    </div>
  )
}

export default WriteMessage
