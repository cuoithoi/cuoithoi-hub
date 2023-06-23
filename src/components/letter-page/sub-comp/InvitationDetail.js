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
        <p>Cô Dâu</p>
        <h1>{`${name}`}</h1>
        <p>{isOldBrotherBride ? 'Trưởng nữ' : 'Thứ nữ'}</p>
        <p>Bố {isGoneMotherOfBride ? '(Cố)' : ''}</p>
        <p className='show_type_display'>
          {isGoneFatherBride ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
          {`${fatherNameOfBride}`}
        </p>
        <p>Mẹ {isGoneMotherOfBride ? '(Cố)' : ''}</p>
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
      <p>Chú Rể</p>
      <h1>{`${name}`}</h1>
      <p>{isOldBrotherGroom ? 'Trưởng nam' : 'Thứ nam'}</p>
      <p>Bố {isGoneFather ? '(Cố)' : ''}</p>
      <p className='show_type_display'>
        {isGoneFather ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
        {`${fatherNameOfGroom}`}
      </p>
      <p>Mẹ {isGoneMother ? '(Cố)' : ''}</p>
      <p className='show_type_display'>
        {isGoneMother ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
        {`${motherNameOfGroom}`}
      </p>
    </div>
  )
}

export default InvitationDetail
