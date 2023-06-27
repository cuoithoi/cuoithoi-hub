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
          <div className=' text-left'>
            <h2>{isBride ? 'Cô dâu' : 'Chú rể'}</h2>
            <p className='pr-4 text-sm'>{nameBank}</p>
            <img src={qrCode} alt={isBride ? 'Cô dâu' : 'Chú rể'} />
          </div>
          {isGoneFather === false ? (
            <div className=' text-left'>
              <h2 className=' text-left'>Bố</h2>
              <p className='pr-4 text-sm'>{nameBankOfFather}</p>
              <img src={qrCodeFatherLink} alt='qrFather' />
            </div>
          ) : (
            <div className=' text-left'></div>
          )}

          {isGoneMother === false ? (
            <div className=' text-left'>
              <h2>Mẹ</h2>
              <p className='pr-4 text-sm'>{nameBankOfMother}</p>
              <img src={qrCodeMotherLink} alt='qrMother' />
            </div>
          ) : (
            <div className=' text-left'></div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default BankInfo
