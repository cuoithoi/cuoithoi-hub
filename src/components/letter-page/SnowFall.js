import Snowfall from 'react-snowfall'
import peachEffect from '@/assets/home-image/peachEffect.png'
import snowWhiteEffect from '@/assets/home-image/snowWhiteEffect.png'
import React, { useCallback } from 'react'
import leave1 from '@/assets/leaves/leave-1.png'
import leave2 from '@/assets/leaves/leave-2.png'
import leave3 from '@/assets/leaves/leave-3.png'
import leave4 from '@/assets/leaves/leave-4.png'

import ic_hd1 from '@/assets/leaves/Ic_hoadao1.png'
import ic_hd2 from '@/assets/leaves/Ic_hoadao2.png'
import ic_hd3 from '@/assets/leaves/Ic_hoadao3.png'
import ic_hd4 from '@/assets/leaves/Ic_hoadao4.png'

import ic_b01 from '@/assets/leaves/B01.png'
import ic_b02 from '@/assets/leaves/B02.png'
import ic_b03 from '@/assets/leaves/B03.png'
import ic_b04 from '@/assets/leaves/B04.png'
import ic_T1 from '@/assets/leaves/T1-8.png'
import ic_T2 from '@/assets/leaves/T2-8.png'
import ic_T3 from '@/assets/leaves/T3-8.png'
import ic_T4 from '@/assets/leaves/T4-8.png'

const SnowFall = ({ type }) => {

  const renderImg = useCallback(() => {
    const imgE = document.createElement('img')
    const imgE2 = document.createElement('img')
    const imgE3 = document.createElement('img')
    const imgE4 = document.createElement('img')
    if (type === 'lavang') {
      imgE.src = leave1
      imgE2.src = leave2
      imgE3.src = leave3
      imgE4.src = leave4
      imgE.width = 60
      imgE2.width = 60
      imgE3.width = 60
      imgE4.width = 60
      return [imgE, imgE2, imgE3, imgE4]
    }
    if (type === 'hoadao') {
      imgE.src = ic_hd1
      imgE2.src = ic_hd2
      imgE3.src = ic_hd3
      imgE4.src = ic_hd4
      imgE.width = 5
      imgE2.width = 5
      imgE3.width = 5
      imgE4.width = 5
      return [imgE, imgE2, imgE3, imgE4]
    }
    if (type === 'kimtuyen') {
      imgE.src = ic_b01
      imgE2.src = ic_b02
      imgE3.src = ic_b03
      imgE4.src = ic_b04
      imgE.width = 5
      imgE2.width = 5
      imgE3.width = 5
      imgE4.width = 5
      return [imgE, imgE2, imgE3, imgE4]
    }
    if (type === 'bongtuyet') {
      imgE.src = ic_T1
      imgE2.src = ic_T2
      imgE3.src = ic_T3
      imgE4.src = ic_T4
      imgE.width = 5
      imgE2.width = 5
      imgE3.width = 5
      imgE4.width = 5
      return [imgE, imgE2, imgE3, imgE4]
    }

  }, [])

  if (type === 'kimtuyen') {
    return (
      <Snowfall
        color='#E29C67'
        snowflakeCount={5}
        speed={[1, 2]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          zIndex: 11,
        }}
        images={renderImg()}
        radius={[20, 25]}
        // wind={[0, 0]}
        // changeFrequency={50}
      />
    )
  }

  return (
    <Snowfall
      color={'#E29C67'}
      snowflakeCount={5}
      speed={[1, 2]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        zIndex: 11,
      }}
      images={renderImg()}
      radius={[10, 18]}
    // wind={[0, 0]}
    // changeFrequency={50}
    />
  )
}

export default React.memo(SnowFall)
