import React, { useEffect } from 'react'
import TitleSection from './sub-comp/TitleSection'
import WeddingCmt from './sub-comp/WeddingCmt'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import Popup from '../modal/Popup'
import Languages from '@/commons/Languages'
import { useRef } from 'react'
import WriteMessage from './sub-comp/WriteMessage'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alias } from '@/commons/Constant.ts'
import { getDataWithParams } from '@/utils/axios'
const Message = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const modalRef = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  useEffect(() => {
    const getData = async () => {
      const resp = await getDataWithParams('/get/list-wish', {
        invitationsId: id,
      })
      console.log(resp)
    }
    getData()
  }, [])
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
        {/* <Link to={'/' + Alias.letterPage + '/' + Alias.congrats}> */}
        <Button
          label='Xem tất cả'
          buttonStyle={BUTTON_STYLES.BORDER_LIGHT_BLUE}
          rounded={true}
          onPress={() => navigate(Alias.congrats)}
        />
        {/* </Link> */}
        <Button
          label='Viết lời chúc'
          buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
          rounded={true}
          onPress={() => {
            handleShowModal()
          }}
        />
      </div>
      <Popup ref={modalRef} content={<WriteMessage />} />
    </div>
  )
}

export default Message
