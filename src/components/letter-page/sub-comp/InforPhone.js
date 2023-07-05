import React from 'react'
import phoneMain from '../../../assets/home-image/phone-main.svg'
import phoneSecond from '../../../assets/home-image/phone-second.svg'

const InforPhone = ({ title, name, phoneNumber, phoneColor, nameSizeLg }) => {
  return (
    <div className='text-center w-50' style={{width: '50%'}}>
      <p className='title_tooltipInfo'>{title}</p>
      <h2 className={`${nameSizeLg ? 'text-2xl' : 'text-base'} dashed-top-bottom`}>{name}</h2>
      <a href='tel:+84985145293' className='href-call text-center pb-3'>
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
