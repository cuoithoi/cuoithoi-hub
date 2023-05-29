import React, { useState } from 'react'
import background from '../../assets/home-image/time-schedule-bg.png'
import manResponse from '@/assets/svg/man-response.svg'
import womanResponse from '@/assets/svg/woman-response.svg'
import { ImageUpload } from '../imageUpload'
import uploadImageIcon from '@/assets/svg/uploadImgIcon.svg'
import ImgUploadIcon from '../icons/ImgUploadIcon'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
const Response = () => {
  const [numPeopleAttend, setNumberPeopleAttend] = useState(0)
  const increaseNumberPeople = () => {
    setNumberPeopleAttend((prev) => prev + 1)
  }
  const decreaseNumberPeople = () => {
    if (numPeopleAttend === 0) return
    setNumberPeopleAttend((prev) => prev - 1)
  }
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
      <div className='flex justify-between gap-10 pb-10 max-w-sm margin-auto'>
        <div className='text-center bg-letter-main-color rounded-lg border-gray-item-color side-choose'>
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
        <div className='text-center bg-white rounded-lg border-gray-item-color side-choose'>
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
      <form className='max-w-sm margin-auto'>
        <input
          type='text'
          className='input-letter text-center border-gray-item-color rounded-lg mb-4 w-full'
        />
        <div className='flex items-center justify-between max-w-sm margin-auto'>
          <div className='flex items-center'>
            <input type='radio' name='able-attend' id='response-attend' />
            <label className='ml-2' htmlFor='response-attend'>
              Tham dự
            </label>
          </div>
          <div className='flex items-center'>
            <input type='radio' name='able-attend' id='response-maybe' />
            <label className='ml-2' htmlFor='response-maybe'>
              Có thể
            </label>
          </div>
          <div className='flex items-center'>
            <input type='radio' name='able-attend' id='response-cannot' />
            <label className='ml-2' htmlFor='response-cannot'>
              Rất tiếc
            </label>
          </div>
        </div>
      </form>
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
          className='input-count-num mx-2 text-text border-gray-item-color rounded-lg input-letter'
          value={numPeopleAttend}
          style={{ width: '56px' }}
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
          buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
          label='Gửi chúc phúc'
          rounded={true}
          width='100'
        />
      </div>
    </div>
  )
}

export default Response
{
  /* <ImageUpload
icon={<ImgUploadIcon />}
maxW="300px"
height="200px"
desc="thêm ảnh ở đây"
/> */
}
