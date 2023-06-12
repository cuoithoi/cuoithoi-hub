import React, { useEffect, useState } from 'react'
import TitleSection from '@/components/letter-page/sub-comp/TitleSection'
import WeddingCmt from '@/components/letter-page/sub-comp/WeddingCmt'
import { customFetch } from '@/utils/axios'
import { useParams } from 'react-router-dom'

const CommentDetail = () => {
  const { id } = useParams()
  const [cmtList, setCmtList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const { get, del } = useBaseService()

  const deleteCmt = (index) => {
    let newCmtList = cmtList
    newCmtList = newCmtList.filter(function (_, i) {
      return i !== index
    })
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

  if (isLoading) return

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
