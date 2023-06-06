import React from 'react'
import msgCmtTitle from '@/assets/home-image/msgCmtTitle.png'
import closeIcon from '@/assets/svg/icon-close-outline.svg'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { convertTimeFormat } from '@/utils/helpers'
const WeddingCmt = ({ viewDetail, cmt }) => {
  return (
    <div
      className={`${!viewDetail && 'max-w-md'} p-4 relative`}
      style={{ width: '100%' }}
    >
      <div
        className='p-4 rounded-lg'
        style={{ background: 'rgba(238, 241, 239, 0.5)', width: '100%' }}
      >
        {viewDetail && (
          <div className='flex justify-between mt-4'>
            <h2 className='text-base font-medium'>-{cmt.namePeopleSend}-</h2>
            <p className='text-base font-light'>
              {convertTimeFormat(cmt.createTime)}
            </p>
          </div>
        )}
        <img
          src={closeIcon}
          alt=''
          // className=' w-6 '
          style={{
            width: '28px',
            position: 'absolute',
            right: '24px',
            top: '24px',
          }}
        />
        {!viewDetail && (
          <img
            src={msgCmtTitle}
            alt=''
            className='w-4'
            style={{ width: '90px' }}
          />
        )}
        <p className='text-text text-lg p-4'>{cmt.desWish}</p>
        {!viewDetail && (
          <div>
            <h2 className='text-base font-medium'>-{cmt.namePeopleSend}-</h2>
            <p className='text-base font-light'>
              {convertTimeFormat(cmt.createTime)}
            </p>
          </div>
        )}
        {viewDetail && (
          <img
            src={msgCmtTitle}
            alt=''
            className='w-4 margin-auto'
            style={{ width: '90px' }}
          />
        )}
      </div>
    </div>
  )
}

export default WeddingCmt
