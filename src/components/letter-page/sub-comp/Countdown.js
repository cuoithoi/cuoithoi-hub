import React, { useState } from 'react'
import dayjs from 'dayjs'

const CountDown = ({ dateOfEventWedding }) => {
  const currentDate = dayjs().format('YYYY/MM/DD')
  const timeLeft = dayjs(dateOfEventWedding) - dayjs(currentDate)
  const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return <h1 className='text-3xl'>Còn {isNaN(dayLeft) ? '0' : dayLeft} Ngày</h1>
}
export default CountDown
