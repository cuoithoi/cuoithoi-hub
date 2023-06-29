import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const BankInfo = ({
  nameBank,
  nameBankOfFather,
  nameBankOfMother,
  qrCode,
  qrCodeFatherLink,
  qrCodeMotherLink,
  isGoneFather,
  isGoneMother,
  isBride,
}) => {
  const data = [
    {
      nameB: isBride ? 'Cô dâu' : 'Chú rể',
      qr: qrCode,
      isGone: false,
    },
    {
      name: 'Bố',
      nameB: nameBankOfFather,
      qr: qrCodeFatherLink,
      isGone: isGoneFather,
    },
    {
      name: 'Mẹ',
      nameB: nameBankOfMother,
      qr: qrCodeMotherLink,
      isGone: isGoneMother,
    },
  ]
  for (let i = data.length - 1; i >= 0; i--) {
    console.log(data[i])
    console.log(!data[i].qr, data[i].isGone)
    if (data[i].isGone || !data[i].qr) {
      data.splice(i, 1)
    }
    console.log(data)
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
          showArrows={true}
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
              <div className=' text-left'>
                <h2 className=' text-left'>{item.name}</h2>
                <p className='pr-4 text-sm'>{item.nameB}</p>
                <img src={item.qr} alt='qrFather' />
              </div>
            )
          })}
          {/* <div className=' text-left'>
            <h2>{isBride ? 'Cô dâu' : 'Chú rể'}</h2>
            <p className='pr-4 text-sm'>{nameBank}</p>
            <img src={qrCode} alt={isBride ? 'Cô dâu' : 'Chú rể'} />
          </div>
          {renderBankInfoFather(
            'Bố',
            nameBankOfFather,
            qrCodeFatherLink,
            isGoneFather
          )}
          {renderBankInfoFather(
            'Mẹ',
            nameBankOfMother,
            qrCodeMotherLink,
            isGoneMother
          )} */}
          {/* {isGoneFather && qrCodeFatherLink ? (
            <div className=' text-left'>
              <h2 className=' text-left'>Bố</h2>
              <p className='pr-4 text-sm'>{nameBankOfFather}</p>
              <img src={qrCodeFatherLink} alt='qrFather' />
            </div>
          ) : (
            ''
          )}
          {isGoneMother && qrCodeFatherLink ? (
            <div className=' text-left'>
              <h2>Mẹ</h2>
              <p className='pr-4 text-sm'>{nameBankOfMother}</p>
              <img src={qrCodeMotherLink} alt='qrMother' />
            </div>
          ) : (
            ''
          )} */}
        </Carousel>
      </div>
    </div>
  )
}

export default BankInfo
