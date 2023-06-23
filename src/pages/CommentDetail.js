import React, { useEffect, useState } from 'react'
import TitleSection from '@/components/letter-page/sub-comp/TitleSection'
import WeddingCmt from '@/components/letter-page/sub-comp/WeddingCmt'

const CommentDetail = ({ cmtLists }) => {

  const [cmtList, setCmtList] = useState(cmtLists)

  const deleteCmt = (index) => {
    let newCmtList = cmtList
    newCmtList = newCmtList.filter(function (_, i) {
      return i !== index
    })
    setCmtList(newCmtList)
  }

  useEffect(() => {
    setCmtList(cmtLists)
  }, [cmtLists])

  return (
    <div className='h-full'>
      <div className='text-center relative section-mb h-full'>
        <div className='congrats-wrapper pt-16'>
          <TitleSection title='LỜI CHÚC' />
        </div>
        <div className='row'>
          {cmtList.length > 0 ? (
            ''
          ) : (
            <p className='py-10'>Thiệp hiện chưa có lời chúc</p>
          )}
          {cmtList.map((cmt, index) => {
            return (
              <WeddingCmt
                cmt={cmt}
                viewDetail={true}
                key={index}
                index={index}
                deleteCmt={() => deleteCmt(index)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentDetail
