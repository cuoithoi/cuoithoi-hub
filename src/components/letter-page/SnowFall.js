import Snowfall from 'react-snowfall'
import peachEffect from '@/assets/home-image/peachEffect.png'
import snowWhiteEffect from '@/assets/home-image/snowWhiteEffect.png'
import React, { useCallback } from 'react'
import leave1 from '@/assets/leaves/leave-1.png'
import leave2 from '@/assets/leaves/leave-2.png'
import leave3 from '@/assets/leaves/leave-3.png'
import leave4 from '@/assets/leaves/leave-4.png'
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
    if (type === 'hoadao') imgE.src = peachEffect
    if (type === 'bongtuyet') imgE.src = snowWhiteEffect
    imgE.width = 60
    return [imgE]

  }, [])

  return (
    <Snowfall
      color={type === 'kimtuyen' && '#E29C67'}
      snowflakeCount={7}
      speed={[1, 2]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        zIndex: 11,
      }}
      images={renderImg()}
      radius={type === 'kimtuyen' ? [2, 7] : [15, 25]}
    />
  )
}

export default React.memo(SnowFall)
