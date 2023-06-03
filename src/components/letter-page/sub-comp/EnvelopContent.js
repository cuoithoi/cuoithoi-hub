import React from 'react'
import homeMain from '@/assets/home-image/home-main.png'
import waveGrayBg from '@/assets/home-image/wave-gray.png'
import { formatDayHero } from '@/utils/helpers'

const EnvelopContent = ({
  manfirstName,
  manName,
  womanfirstName,
  womanName,
  coverImage,
  timeAndLocationOfWedding,
}) => {
  return (
    <div
      className='text-center text-xs  relative section-mb layout-mw bg-no-repeat bg-center bg-contain'
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div
        className='bg-no-repeat bg-center bg-cover pt-10'
        style={{ backgroundImage: `url(${waveGrayBg})` }}
      >
        <h2 className='text-main text-xs'>Thân mời tới dự bữa tiệc</h2>
        <h1 className='text-xs'>{`${manfirstName} ${manName} & ${womanfirstName}  ${womanName}`}</h1>
        <div className='flex justify-center pt-3 w-full'>
          <img src={''} alt='' className='w-full' />
        </div>
        <h1 className='wind-song big-size text-sm pt-20'>
          {formatDayHero(timeAndLocationOfWedding.dateOfEventWedding)}
        </h1>
      </div>
    </div>
  )
}

export default EnvelopContent
