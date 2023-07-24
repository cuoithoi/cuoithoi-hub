import React, { useEffect, useState } from 'react'
import homeMain from '../../assets/home-image/home-main.png'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import { formatDayHero } from '@/utils/helpers'
// import menuNav from '../../assets/home-image/menu-nav.svg'
import AudioPlay from './sub-comp/AudioPlay'
import waveGrayBg from '@/assets/home-image/wave-gray.png'
import heartGray from '@/assets/home-image/heart-gray.png'
import noneGray from '@/assets/home-image/none-gray.png'
import lightGray from '@/assets/home-image/light-gray.png'
import LazyLoad from 'react-lazyload'
const Hero = ({
  effectImage,
  manfirstName,
  manName,
  womanfirstName,
  womanName,
  coverImage,
  timeAndLocationOfWedding,
}) => {

  const [url, setUrl] = useState('')

  useEffect(() => {

    setUrl(coverImage)

  }, [coverImage])

  const renderEffectImage = () => {
    let img
    if (effectImage === 'none') img = noneGray
    if (effectImage === 'Heart Frame') img = heartGray
    if (effectImage === 'Light') img = lightGray
    if (effectImage === 'Wave') img = waveGrayBg
    return img
  }

  return (
    <LazyLoad height={325} offset={0}>
      <div
        className='text-center  relative section-mb layout-mw bg-no-repeat bg-center bg-contain'
        id='hero'
        style={url ? { backgroundImage: `url('${url}')`, backgroundSize: 'cover' } : undefined}
      >
        <div
          className='bg-no-repeat bg-center bg-cover py-20'
          style={{ backgroundImage: `url(${renderEffectImage()})` }}
        >
          <div className={effectImage === 'Light' ? 'effect_light' : undefined}>
            <h2 className={effectImage === 'Light' ? 'text-main pt-96' : ''}>Thân mời tới dự bữa tiệc</h2>
            <h1 className={effectImage === 'Light' ? '' : 'pb-96'}>{`${manName} & ${womanName}`}</h1>
            <div className='flex justify-center pt-3 w-full'>
              <img src={''} alt='' className='w-full' />
            </div>
            <div style={effectImage === 'none' ? { position: 'relative', top: 120 } : undefined}>
              <h1 className={`wind-song big-size text-9xl ${effectImage === 'Light' ? '' : 'pt-20'}`} style={effectImage === 'Heart Frame' ? { paddingTop: '12rem' } : undefined}>
                {timeAndLocationOfWedding.dateOfEventWedding &&
                  formatDayHero(timeAndLocationOfWedding.dateOfEventWedding)}
              </h1>
              <h1>
                SAVE<span className='wind-song text-main text-2xl'>the</span>DATE
              </h1>
            </div>
          </div>
        </div>
        {/* <AudioPlay song={song} /> */}
      </div>
      <div style={effectImage === 'none' ? { paddingBottom: 100, background: '#f4f5f6' } : undefined}></div>
    </LazyLoad>
  )
}

export default Hero
