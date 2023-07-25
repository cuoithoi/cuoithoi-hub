import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import Ic_NoImage from '@/assets/home-image/Ic_NoImage.png'

const BankInfo = ({
  nameBank,
  nameBankOfFather,
  nameBankOfMother,
  qrCode,
  qrCodeFatherLink,
  qrCodeMotherLink,
  numberBank,
  numberBankFather,
  numberBankMother,
  ownerBank,
  ownerBankFather,
  ownerBankMother,
  isGoneFather,
  isGoneMother,
  isBride,
}) => {
  const data = [
    {
      name: isBride ? 'Cô dâu' : 'Chú rể',
      nameB: nameBank,
      numberBank: numberBank,
      ownerBank: ownerBank,
      qr: qrCode || Ic_NoImage,
      isGone: false,
    },
    {
      name: 'Bố',
      nameB: nameBankOfFather,
      numberBank: numberBankFather,
      ownerBank: ownerBankFather,
      qr: qrCodeFatherLink || Ic_NoImage,
      isGone: isGoneFather,
    },
    {
      name: 'Mẹ',
      nameB: nameBankOfMother,
      numberBank: numberBankMother,
      ownerBank: ownerBankMother,
      qr: qrCodeMotherLink || Ic_NoImage,
      isGone: isGoneMother,
    },
  ]
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].isGone) {
      data.splice(i, 1)
    }
  }
  // console.log(data)
  const renderBankInfoFather = (name, bankName, qrLink, isGone) => {
    if (isGone && qrLink) {
      return (
        <div className=' text-left'>
          <h2 className=' text-left'>{name}</h2>
          <p className='pr-4 text-sm'>{bankName}</p>
          <img src={qrLink} alt='qrFather' />
        </div>
      )
    }
    return
  }
  return (
    <div>
      <h2 className='text-center text-second'>
        Thông tin {`${isBride ? 'Nhà gái' : 'Nhà trai'}`}
      </h2>
      <div className=' text-left'>
        <Carousel
          showStatus={false}
          showArrows={false}
          centerMode={true}
          showIndicators={true}
          swipeable
          emulateTouch
          centerSlidePercentage={100}
          showThumbs={false}
          className='banking_happy_invite'
        >
          {data.map((item, index) => {
            return (
              <div className=' text-left' key={index}>
                <div className='bank_info_show'>
                  <img src={item.qr} alt='qrFather' />
                  <div className='content_info'>
                    <div className='group_label'>
                      <span>Ngân hàng</span>
                      <p className='pr-4 text-sm'>{item.nameB}</p>
                    </div>
                    <div className='group_label'>
                      <span>Chủ tài khoản</span>
                      <p className='pr-4 text-sm'>{item.ownerBank}</p>
                    </div>
                    <div className='group_label'>
                      <span>Số tài khoản</span>
                      <p className='pr-4 text-sm'>{item.numberBank}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default BankInfo
