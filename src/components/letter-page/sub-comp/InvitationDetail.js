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
    console.log(info)
    return (
      <div className='text-center px-4'>
        <h2 className='text-main'>Nhà Trai</h2>
        <p>Chú rể</p>
        <h1>{`${firstName} ${middleName} ${name}`}</h1>
        <p>{isOldBrotherBride ? 'Trưởng nữ' : 'Thứ nữ'}</p>
        <p>Bố {isGoneMotherOfBride === "true" ? '(Cố)' : ''}</p>
        <p className='show_type_display'>
          {isGoneFatherBride === "true" ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
          {`${firstFatherNameOfBride} ${middleFatherNameOfBride} ${fatherNameOfBride}`}
        </p>
        <p>Mẹ {isGoneMotherOfBride === "true" ? '(Cố)' : ''}</p>
        <p className='show_type_display'>
          {isGoneMotherOfBride === "true" ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
          {`${firstMotherNameOfBride} ${middleMotherNameOfBride} ${motherNameOfBride}`}
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
      <h2 className='text-main'>Nhà Gái</h2>
      <p>Cô dâu</p>
      <h1>{`${firstName} ${middleName} ${name}`}</h1>
      <p>{isOldBrotherGroom ? 'Trưởng nam' : 'Thứ nam'}</p>
      <p>Bố {isGoneFather === "true" ? '(Cố)' : ''}</p>
      <p className='show_type_display'>
        {isGoneFather === "true" ? <img src={IcChrysanthemum} /> : ''} Ông.{' '}
        {`${firstFatherNameOfGroom} ${middleFatherNameOfGroom} ${fatherNameOfGroom}`}
      </p>
      <p>Mẹ {isGoneMother === "true" ? '(Cố)' : ''}</p>
      <p className='show_type_display'>
        {isGoneMother === "true" ? <img src={IcChrysanthemum} /> : ''} Bà.{' '}
        {`${firstMotherNameOfGroom} ${middleMotherNameOfGroom} ${motherNameOfGroom}`}
      </p>
    </div>
  )
}

export default InvitationDetail
