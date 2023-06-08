import React, { useEffect, useState } from 'react'
import TitleSection from '@/components/letter-page/sub-comp/TitleSection'
import WeddingCmt from '@/components/letter-page/sub-comp/WeddingCmt'
import { customFetch } from '@/utils/axios'
import { csv, useBaseService } from '@/utils/BaseServices'
import { config } from '@/commons/Constant.ts'
import { useParams } from 'react-router-dom'
import { getLocalAccessToken } from '@/utils/localStorage'
const CommentDetail = () => {
  const { id } = useParams()
  const [cmtList, setCmtList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const { get, del } = useBaseService()
  const deleteCmt = (index) => {
    let newCmtList = cmtList
    newCmtList = newCmtList.filter(function (_, i) {
      console.log(i, index)
      return i !== index
    })
    console.log(newCmtList)
    setCmtList(newCmtList)
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
  console.log(cmtList)
  if (isLoading) return
  return (
    <div className=' h-full  overflow-y-scroll'>
      <div className=' letter-layout h-full '>
        <div className='text-center  relative section-mb layout-mw h-full'>
          <div className='congrats-wrapper pt-16'>
            <TitleSection title='LỜI CHÚC' />
          </div>
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
                maxWidth={'560px'}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentDetail
