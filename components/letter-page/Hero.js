import React, { useEffect } from 'react'
import homeMain from '../../assets/home-image/home-main.png'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import waveGrayBg from '@/assets/home-image/wave-gray.png'
import { formatDayHero } from '@/utils/helpers'
// import menuNav from '../../assets/home-image/menu-nav.svg'
import AudioPlay from './sub-comp/AudioPlay'
const Hero = ({
  song,
  manfirstName,
  manName,
  womanfirstName,
  womanName,
  coverImage,
  timeAndLocationOfWedding,
}) => {
  return (
    <div
      className='text-center  relative section-mb layout-mw bg-no-repeat bg-center bg-contain'
      id='hero'
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div
        className='bg-no-repeat bg-center bg-cover py-20'
        style={{ backgroundImage: `url(${waveGrayBg})` }}
      >
        <h2 className='text-main'>Thân mời tới dự bữa tiệc</h2>
        <h1 className='pb-96'>{`${manfirstName} ${manName} & ${womanfirstName}  ${womanName}`}</h1>
        <div className='flex justify-center pt-3 w-full'>
          <img src={''} alt='' className='w-full' />
        </div>
        <h1 className='wind-song big-size text-9xl pt-20'>
          {formatDayHero(timeAndLocationOfWedding.dateOfEventWedding)}
        </h1>
        <div>
          <h1>
            SAVE<span className='wind-song text-main text-2xl'>the</span>DATE
          </h1>
        </div>
      </div>
      {/* <AudioPlay song={song} /> */}
    </div>
  )
}

export default Hero
