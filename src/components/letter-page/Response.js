import React, { useState } from 'react'
import background from '../../assets/home-image/time-schedule-bg.png'
import yup from '@/utils/yupGlobal'
import manResponse from '@/assets/svg/man-response.svg'
import womanResponse from '@/assets/svg/woman-response.svg'
import { ImageUpload } from '../imageUpload'
import uploadImageIcon from '@/assets/svg/uploadImgIcon.svg'
import ImgUploadIcon from '../icons/ImgUploadIcon'
import { Input } from '../input/Input'
import classes from './Response.module.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { postDataApi } from '@/utils/axios'
import { useParams } from 'react-router-dom'

const schema = yup.object().shape({
  nameGuest: yup.string().required('Yêu cầu nhập tên'),
  isVerified: yup.number().required(),
  numberPeopleParticipate: yup.number().required(),
})
const Response = () => {
  const { id } = useParams()
  const [guestSide, setGuestSide] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onchange',

    resolver: yupResolver(schema),
  })
  const [numPeopleAttend, setNumberPeopleAttend] = useState(0)
  const increaseNumberPeople = () => {
    setNumberPeopleAttend((prev) => prev + 1)
  }
  const decreaseNumberPeople = () => {
    if (numPeopleAttend === 0) return
    setNumberPeopleAttend((prev) => prev - 1)
  }
  const onSubmit = (data) => {
    console.log(data)
    if (!guestSide) {
      toast.error('Vui lòng chọn khách cô dâu hoặc chú rể')
      return
    }
    if (errors['nameGuest']) {
      toast.error('Vui lòng điền tên khách mời')
      return
    }
    if (errors['isVerified']) {
      toast.error('Vui lòng xác nhận tham dự')
      return
    }
    if (data['isVerified'] !== 3 && numPeopleAttend === 0) {
      toast.error('Vui lòng chọn số người tham dự')
      return
    }
    const sendResponse = async () => {
      try {
        const resp = await postDataApi('/send/recurrent-info', {
          ...data,
          isGuestSide: guestSide,
          numberPeopleParticipate: numPeopleAttend,
          invitationsId: '',
        })
        if (resp.errorCode === 0) {
          toast.success('gửi phản hồi thành công')
        }
      } catch (error) {
        toast.success(error.message)
      }
    }
    sendResponse()
  }
  console.log(errors)
  return (
    <div
      className='layout-mw section-mb py-10 text-center'
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className='text-main'>Thông tin phản hồi</h2>
      <p className='max-w-sm margin-auto pb-6'>
        Để thuận tiện cho việc sắp xếp chỗ ngồi, vui lòng phản hồi giúp vợ chồng
        mình nhé!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between gap-10 pb-10 max-w-sm margin-auto'>
          <div
            className={`text-center bg-letter-main-color rounded-lg border-gray-item-color side-choose ${
              guestSide === 1 ? classes.activeSide : ''
            }`}
            onClick={() => setGuestSide(1)}
          >
            <div className='py-4 px-6'>
              <img
                src={manResponse}
                alt='man response'
                className='margin-auto pb-2'
              />
              <p className='text-white m-0' style={{ color: 'white' }}>
                Khách nhà trai
              </p>
            </div>
          </div>
          <div
            className={`text-center bg-white rounded-lg border-gray-item-color side-choose ${
              guestSide === 2 ? classes.activeSide : ''
            }`}
            onClick={() => setGuestSide(2)}
          >
            <div className='py-4 px-6 '>
              <img
                src={womanResponse}
                alt='man response'
                className='margin-auto pb-2 '
              />
              <p className='text-white m-0'>Khách nhà gái</p>
            </div>
          </div>
        </div>
        <p>Tên khách mời</p>
        <div className='max-w-sm margin-auto'>
          <input
            type='text'
            className='input-letter text-center border-gray-item-color rounded-lg mb-4 w-full'
            name='nameGuest'
            {...register('nameGuest')}
          />
          <div className='flex items-center justify-between max-w-sm margin-auto'>
            <div className='flex items-center'>
              <input
                type='radio'
                name='able-attend'
                value={1}
                id='response-attend'
                {...register('isVerified')}
              />
              <label className='ml-2' htmlFor='response-attend'>
                Tham dự
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                name='maybe-attend'
                value={2}
                id='response-maybe'
                {...register('isVerified')}
              />
              <label className='ml-2' htmlFor='response-maybe'>
                Có thể
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                name='cannot-attend'
                id='response-cannot'
                value={3}
                {...register('isVerified')}
              />
              <label className='ml-2' htmlFor='response-cannot'>
                Rất tiếc
              </label>
            </div>
          </div>
        </div>
        <p className='pt-6'>Số người tham dự</p>
        <div className='flex items-center justify-center'>
          <span
            className='text-4xl  cursor-pointer'
            onClick={decreaseNumberPeople}
          >
            <AiOutlineMinus />
          </span>
          <input
            type='number'
            name='number-attend'
            className='input-count-num mx-2 text-text border-gray-item-color rounded-lg input-letter'
            value={numPeopleAttend}
            style={{ width: '56px' }}
            {...register('numberPeopleParticipate')}
          />
          <span
            className='text-4xl  pointer cursor-pointer'
            onClick={increaseNumberPeople}
          >
            <AiOutlinePlus />
          </span>
        </div>
        <div className='max-w-sm margin-auto pt-6'>
          <Button
            type='submit'
            buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
            label='Xác nhận'
            rounded={true}
            width='100'
            onPress={onSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default Response
