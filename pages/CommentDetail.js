import React, { useEffect } from 'react'
import TitleSection from '@/components/letter-page/sub-comp/TitleSection'
import WeddingCmt from '@/components/letter-page/sub-comp/WeddingCmt'
import { customFetch } from '@/utils/axios'
import { csv, useBaseService } from '@/utils/BaseServices'
import { config } from '@/commons/Constant.ts'
import { useParams } from 'react-router-dom'
import { getLocalAccessToken } from '@/utils/localStorage'
const CommentDetail = () => {
  const { id } = useParams()
  const { get, del } = useBaseService()
  useEffect(() => {
    const getData = async () => {
      const token = getLocalAccessToken()
      const response = await get(`/get/list-wish?invitationsId=${id}`, config, {
        invitationsId: id,
      })
      // const resp = await customFetch.get(
      //   `/get/list-wish?invitationsId=${id}`,
      //   {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //     },
      //   },
      //   {
      //     invitationsId: id,
      //   }
      // )
      console.log(response)
    }
    getData()
  }, [])
  return (
    <div className='letter-wrapper h-full'>
      <div className=' letter-layout h-full'>
        <div className='text-center  relative section-mb layout-mw h-full'>
          <div className='congrats-wrapper pt-16'>
            <TitleSection title='LỜI CHÚC' />
          </div>
          {new Array(10).fill(0).map((_, i) => {
            return (
              <div key={i}>
                <WeddingCmt viewDetail={true} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentDetail
