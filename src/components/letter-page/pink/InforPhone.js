import React from 'react'
import phoneMain from '../../../assets/home-image/phone-main.svg'
import phoneSecond from '../../../assets/home-image/phone-second.svg'

const InforPhone = ({ title, name, phoneNumber, phoneColor, nameSizeLg }) => {
  return (
    <div className='text-center w-50'>
      <p className='font-[MavenPro] text-[#4D4D4D]' style={{ marginBottom: 0 }}>{title}</p>
      <h2 className={`font-[NettoOT] text-[#F9959D] text-[1.5rem] sm:text-[2rem]`}>{name}</h2>
      <a href={`'tel:'${phoneNumber}`} className='href-call text-center pb-3'>
        <div className='phone-container'>
          <img
            src={phoneColor === 'main' ? phoneMain : phoneSecond}
            alt='phone chu rể'
            className='href-icon'
          />
          {phoneNumber}
        </div>
      </a>
    </div>
  )
}

export default InforPhone
