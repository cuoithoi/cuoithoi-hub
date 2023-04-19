import React, { useState } from 'react'
import dayjs from 'dayjs'
import range from 'lodash-es/range'
import 'dayjs/locale/es' // load on demand
import TitleDescribe from './TitleDescribe'
// import Tit
// import '../../../style.scss'

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const todayObj = dayjs()

const Calendar = () => {
  const dayObj = dayjs('2023-04-05')
  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()
  const date = dayObj.date()
  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()

  return (
    <div className='calendar text-xl'>
      <div className='header '>
        <div className='datetime text-text'>
          <TitleDescribe
            title={`Tháng ${dayObj.locale('vi').format('M/YYYY')}`}
          />
          {/* Tháng {dayObj.locale('vi').format('M/YYYY')} */}
        </div>
      </div>
      <div className='week-container'>
        {weekDays.map((d) => (
          <div className='week-cell' key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className='day-container '>
        {range(weekDayOf1).map((i) => (
          <div className='day-cell day-cell--faded ' key={i}>
            {dayObjOf1.subtract(weekDayOf1 - i, 'day').date()}
          </div>
        ))}

        {range(daysInMonth).map((i) => (
          <div
            className={`day-cell day-cell--in-month${
              i + 1 === todayObj.date() &&
              thisMonth === todayObj.month() &&
              thisYear === todayObj.year()
                ? ' day-cell--today'
                : ''
            } ${i + 1 === date ? 'active-date' : ''}`}
            key={i}
          >
            {i + 1}
          </div>
        ))}

        {range(6 - weekDayOfLast).map((i) => (
          <div className='day-cell day-cell--faded' key={i}>
            {dayObjOfLast.add(i + 1, 'day').date()}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
