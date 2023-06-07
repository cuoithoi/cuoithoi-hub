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
  const [cmtList, setCmtList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const { get, del } = useBaseService()
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
  if (isLoading) return
  console.log(cmtList)
  return (
    <div className='letter-wrapper h-full pb-96'>
      <div className=' letter-layout h-full'>
        <div className='text-center  relative section-mb layout-mw h-full'>
          <div className='congrats-wrapper pt-16'>
            <TitleSection title='LỜI CHÚC' />
          </div>
          {cmtList.map((cmt, index) => {
            return (
              <WeddingCmt
                cmt={cmt}
                viewDetail={true}
                key={index}
                index={index}
                deleteCmt={deleteCmt}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentDetail
