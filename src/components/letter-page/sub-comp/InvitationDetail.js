import React from 'react'
import IcChrysanthemum from '@/assets/home-image/IcChrysanthemum.svg'

const InvitationDetail = ({ info, isBride }) => {
  if (isBride) {
    const {
      firstName,
      name,
      middleName,
      firstFatherNameOfBride,
      middleFatherNameOfBride,
      fatherNameOfBride,
      isOldBrotherBride,
      firstMotherNameOfBride,
      middleMotherNameOfBride,
      motherNameOfBride,
      isGoneMotherOfBride,
      isGoneFatherBride
    } = info
    return (
      <div className='text-center px-4'>
        <h2 className='text-main'>Nhà Gái</h2>
        <p className='title_tooltipInfo'>Cô Dâu</p>
        <h1 className='name_show'>{`${name}`}</h1>
        <p className='dashed-top-bottom'>{isOldBrotherBride ? 'Trưởng nữ' : 'Thứ nữ'}</p>
        <p className='title_tooltipInfo'>{isGoneMotherOfBride ? 'Cố Phụ' : 'Bố'}</p>
        <p className='show_type_display dashed-top-bottom'>
          {isGoneFatherBride ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
          {`${fatherNameOfBride}`}
        </p>
        <p className='title_tooltipInfo'> {isGoneMotherOfBride ? 'Cố Mẫu' : 'Mẹ'}</p>
        <p className='show_type_display'>
          {isGoneMotherOfBride ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
          {`${motherNameOfBride}`}
        </p>
      </div>
    )
  }
  const {
    firstName,
    name,
    middleName,
    firstFatherNameOfGroom,
    middleFatherNameOfGroom,
    fatherNameOfGroom,
    isOldBrotherGroom,
    firstMotherNameOfGroom,
    middleMotherNameOfGroom,
    motherNameOfGroom,
    isGoneFather,
    isGoneMother
  } = info

  return (
    <div className='text-center px-4'>
      <h2 className='text-main'>Nhà Trai</h2>
      <p className='title_tooltipInfo'>Chú Rể</p>
      <h1 className='name_show'>{`${name}`}</h1>
      <p className='dashed-top-bottom'>{isOldBrotherGroom ? 'Trưởng nam' : 'Thứ nam'}</p>
      <p className='title_tooltipInfo'>{isGoneFather ? 'Cố Phụ' : 'Bố'}</p>
      <p className='show_type_display dashed-top-bottom'>
        {isGoneFather ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
        {`${fatherNameOfGroom}`}
      </p>
      <p className='title_tooltipInfo'>{isGoneMother ? 'Cố Mẫu' : 'Mẹ'}</p>
      <p className='show_type_display'>
        {isGoneMother ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
        {`${motherNameOfGroom}`}
      </p>
    </div>
  )
}

export default InvitationDetail
