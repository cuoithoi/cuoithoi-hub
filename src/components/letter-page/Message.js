import React from 'react'
import TitleSection from './sub-comp/TitleSection'
import WeddingCmt from './sub-comp/WeddingCmt'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import Popup from '../modal/Popup'
import Languages from '@/commons/Languages'
import { useRef } from 'react'
import WriteMessage from './sub-comp/WriteMessage'
const Message = () => {
  const modalRef = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  return (
    <div className='layout-mw section-mb py-10'>
      <TitleSection title='LỜI CHÚC' />
      <Carousel
        showStatus={false}
        showThumbs={false}
        showArrows={true}
        centerMode={true}
        showIndicators={false}
      >
        {new Array(10).fill(0).map((_, index) => {
          return <WeddingCmt index={index} />
        })}
      </Carousel>
      <div className='flex justify-center items-center gap-6'>
        <Button
          label='Xem tất cả'
          buttonStyle={BUTTON_STYLES.BORDER_LIGHT_BLUE}
          rounded={true}
        />
        <Button
          label='Viết lời chúc'
          buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
          rounded={true}
          onPress={() => {
            handleShowModal()
          }}
        />
      </div>
      <Popup
        ref={modalRef}
        btnCancelText={Languages.common.cancel}
        btnSubmitText='Gửi Lời Chúc'
        content={<WriteMessage />}
      />
    </div>
  )
}

export default Message
