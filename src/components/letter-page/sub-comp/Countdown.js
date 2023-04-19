import React, { useState } from 'react'
import dayjs from 'dayjs'

const CountDown = () => {
  const currentDate = dayjs().format('YYYY/MM/DD')
  const timeLeft = dayjs('2023-04-05') - dayjs(currentDate)
  const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return <h1 className='text-second text-6xl'>{dayLeft}</h1>
}
export default CountDown
