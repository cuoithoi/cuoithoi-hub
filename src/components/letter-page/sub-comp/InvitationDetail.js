import React from 'react'
import IcChrysanthemum from '@/assets/home-image/IcChrysanthemum.svg'

const InvitationDetail = ({ info, isBride }) => {
  if (isBride) {
    const {
      name,
      fatherNameOfBride,
      isOldBrotherBride,
      motherNameOfBride,
      isGoneMotherOfBride,
      isGoneFatherBride
    } = info
    return (
      <div className='text-center px-4'>
        <h2 className='text-main'>Nhà Gái</h2>
        <p className='title_tooltipInfo'>Cô Dâu</p>
        <h1 className='name_show'>{`${name}`}</h1>
        <p className='dashed-top-bottom hidden'>{isOldBrotherBride ? 'Trưởng nữ' : 'Thứ nữ'}</p>
        {fatherNameOfBride && <><p className='title_tooltipInfo'>{isGoneMotherOfBride ? 'Cố Phụ' : 'Bố'}</p>
          <p className='show_type_display dashed-top-bottom'>
            {isGoneFatherBride ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
            {`${fatherNameOfBride}`}
          </p></>
        }
        {motherNameOfBride && <>
          <p className='title_tooltipInfo'> {isGoneMotherOfBride ? 'Cố Mẫu' : 'Mẹ'}</p>
          <p className='show_type_display'>
            {isGoneMotherOfBride ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
            {`${motherNameOfBride}`}
          </p></>
        }
      </div >
    )
  }
  const {
    name,
    fatherNameOfGroom,
    isOldBrotherGroom,
    motherNameOfGroom,
    isGoneFather,
    isGoneMother
  } = info

  return (
    <div className='text-center px-4'>
      <h2 className='text-main'>Nhà Trai</h2>
      <p className='title_tooltipInfo'>Chú Rể</p>
      <h1 className='name_show'>{`${name}`}</h1>
      <p className='dashed-top-bottom hidden'>{isOldBrotherGroom ? 'Trưởng nam' : 'Thứ nam'}</p>
      {fatherNameOfGroom && <>
        <p className='title_tooltipInfo'>{isGoneFather ? 'Cố Phụ' : 'Bố'}</p>
        <p className='show_type_display dashed-top-bottom'>
          {isGoneFather ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
          {`${fatherNameOfGroom}`}
        </p></>
      }
      {motherNameOfGroom && <>
        <p className='title_tooltipInfo'>{isGoneMother ? 'Cố Mẫu' : 'Mẹ'}</p>
        <p className='show_type_display'>
          {isGoneMother ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
          {`${motherNameOfGroom}`}
        </p>
      </>}
    </div>
  )
}

export default InvitationDetail
