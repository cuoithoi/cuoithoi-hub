import React, { useEffect, useState } from 'react'
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
import { customFetch } from '@/utils/axios'
const Message = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [cmtList, setCmtList] = useState([])
  const { id } = useParams()
  console.log(id)
  const modalRef = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  const deleteCmt = (index) => {
    setCmtList((prev) => prev.splice(index, 1))
  }
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const resp = await customFetch.get(`/get/list-wish?_id=${id}`)
        setCmtList(resp.data.data[0].data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  console.log(deleteCmt)
  if (isLoading) return
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
        {cmtList?.map((cmt, index) => {
          return (
            <WeddingCmt
              cmt={cmt}
              index={index}
              key={index}
              deleteCmt={deleteCmt}
            />
          )
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
      <Popup
        ref={modalRef}
        content={<WriteMessage setCmtList={setCmtList} />}
      />
    </div>
  )
}

export default Message
