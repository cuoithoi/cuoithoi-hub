import Snowfall from 'react-snowfall'
import leaveEffect from '@/assets/home-image/leaveEffect.png'
import peachEffect from '@/assets/home-image/peachEffect.png'
import snowWhiteEffect from '@/assets/home-image/snowWhiteEffect.png'
import { SelectEffectBg } from '@/commons/FieldsDataObj'
import React from 'react'

const SnowFall = ({ type }) => {
  const renderImg = () => {
    const imgE = document.createElement('img')
    if (type === 'hoadao') imgE.src = peachEffect
    if (type === 'lavang') imgE.src = leaveEffect
    if (type === 'bongtuyet') imgE.src = snowWhiteEffect
    imgE.width = 60
    return [imgE]
  }
  if (type === 'kimtuyen') {
    return (
      <Snowfall
        color='#E29C67'
        snowflakeCount={60}
        speed={[1, 3]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 11,
        }}
        radius={[2, 7]}
      />
    )
  }
  return (
    <Snowfall
      // color='#E29C67'
      snowflakeCount={45}
      speed={[1, 3]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 11,
      }}
      images={renderImg()}
      radius={[15, 25]}
    />
  )
}

export default SnowFall
