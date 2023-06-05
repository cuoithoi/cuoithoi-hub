import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import bankQr from '@/assets/temp-file/bank-qr.png'
import bankText from '@/assets/temp-file/bank-text.png'
const BankInfo = ({
  nameBank,
  nameBankOfFather,
  nameBankOfMother,
  qrCode,
  qrCodeFatherLink,
  qrCodeMotherLink,
  isBride,
}) => {
  return (
    <div>
      <h2 className='text-center text-second'>
        Thông tin {`${isBride ? 'Nhà gái' : 'Nhà trai'}`}
      </h2>
      <div className=' text-left'>
        <Carousel showArrows={true} centerMode={true}>
          <div className=' text-left'>
            <h2>{isBride ? 'Cô dâu' : 'Chú rể'}</h2>
            <p className='pr-4 text-sm'>{nameBank}</p>
            <img src={qrCode} alt='' />
          </div>
          <div className=' text-left'>
            <h2 className=' text-left'>Bố</h2>
            <p className='pr-4 text-sm'>{nameBankOfFather}</p>
            <img src={qrCodeFatherLink} alt='' />
          </div>
          <div className=' text-left'>
            <h2>Mẹ</h2>
            <p className='pr-4 text-sm'>{nameBankOfMother}</p>
            <img src={qrCodeMotherLink} alt='' />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default BankInfo
