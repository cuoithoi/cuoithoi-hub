import React, { useEffect, useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import WeddingCmt from './sub-comp/WeddingCmt'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import Popup from '../modal/Popup'
import { useRef } from 'react'
import WriteMessage from './sub-comp/WriteMessage'
import { useNavigate, useParams } from 'react-router-dom'
import { customFetch } from '@/utils/axios'
import CommentDetail from '@/pages/CommentDetail'
import { Convert } from '../../commons/Constant.ts'
const Message = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cmtList, setCmtList] = useState([])
  const [cmtListProps, setCmtListProps] = useState([])
  const cmtRef = useRef()
  const { id } = useParams()
  const modalRef = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  const handleCloseModalWriting = () => {
    modalRef.current.hideModal()
  }
  
  const deleteCmt = (index) => {
    setCmtList((prev) => {
      prev.splice(index, 1)
      return prev
    })
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

  const handleShowCmtDetail = async () => {
    const resp = await customFetch.get(`/get/list-wish?_id=${id}`)
    setCmtListProps(resp.data.data[0].data)
    cmtRef.current.showModal()
  }
  
  if (isLoading) return
  return (
    <div className='layout-mw section-mb py-10'>
      <TitleSection title='LỜI CHÚC' />
      {cmtList.length > 0 ? (
        <Carousel
          showStatus={false}
          showThumbs={false}
          showArrows={true}
          centerMode={true}
          showIndicators={false}
          swipeable
          emulateTouch
          className='slider_cmt'
          renderThumbs={() => null}
          centerSlidePercentage={100}
        >
          {cmtList?.map((cmt, index) => {
            return (
              <WeddingCmt
                cmt={cmt}
                index={index}
                key={index}
                deleteCmt={() => deleteCmt(index)}
              />
            )
          })}
        </Carousel>
      ) : (
        <p className='text-center'>Chưa có danh sách lời chúc để hiện thị</p>
      )}
      <div className='flex justify-center items-center gap-6'>
        {/* <Link to={'/' + Alias.letterPage + '/' + Alias.congrats}> */}
        <Button
          label='Xem tất cả'
          buttonStyle={BUTTON_STYLES.BORDER_LIGHT_BLUE}
          rounded={true}
          onPress={() => {
            handleShowCmtDetail()
          }}
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
        content={
          <WriteMessage
            setCmtList={setCmtList}
            handleCloseModal={handleCloseModalWriting}
          />
        }
      />
      <Popup ref={cmtRef} height={'80vh'} content={<CommentDetail cmtLists={cmtListProps} />} maxWidth={Convert.W_800} />
    </div>
  )
}

export default Message
