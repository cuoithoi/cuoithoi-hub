import React, { useEffect, useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import mapIcon from '../../assets/home-image/map-icon.png'
import background from '../../assets/home-image/time-schedule-bg.png'
import Calendar from './sub-comp/Calendar'
import CountDown from './sub-comp/Countdown'
import LazyLoad from 'react-lazyload'

import { formatDay } from '@/utils/helpers'

const TimeLocation = ({
  timeAndLocationOfWedding,
  timeAndLocationOfEgagement,
  timeAndLocationOfInterrogation,
  isUseDamNgo,
}) => {
  const [embeddedMap, setEmbeddedMap] = useState('')

  const {
    dateOfEventInterrogation,
    locationOfInterrogation,
    timeOfEventInterrogation,
  } = timeAndLocationOfInterrogation
  const { dateOfEventEgagement, locationOfEgagement, timeOfEventEgagement } =
    timeAndLocationOfEgagement
  const {
    dateOfEventWedding,
    locationOfWedding,
    timeOfEventWedding,
    mapDirectLink,
  } = timeAndLocationOfWedding

  useEffect(() => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
    const match = mapDirectLink.match(regex)
    if (match) {
      const latitude = match[1]
      const longitude = match[2]
      const iframeCode = `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&amp;output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
      setEmbeddedMap(iframeCode)
    }
  }, [])
  return (
    <div
      className='pt-10 pb-10 bg-main-bg section-mb layout-mw'
      id='time-location'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className=' text-center '>
        <TitleSection title='THỜI GIAN & ĐỊA ĐIỂM' />
        {isUseDamNgo && (
          <div className='pb-2'>
            <h2 className='text-second'>Dạm ngõ</h2>
            <p className='max-w-xs text-base margin-auto'>
              Lễ dạm ngõ sẽ diễn tại {locationOfEgagement}, vào lúc{' '}
              {timeOfEventEgagement && timeOfEventEgagement},{' '}
              {dateOfEventEgagement && formatDay(dateOfEventEgagement)}
            </p>
          </div>
        )}

        {isUseDamNgo && (
          <div className=' pb-2'>
            <h2 className='text-second'>Ăn hỏi</h2>
            <p className='max-w-xs text-base margin-auto'>
              Lễ ăn hỏi sẽ diễn ra tại {locationOfInterrogation}, vào lúc{' '}
              {timeOfEventInterrogation && timeOfEventInterrogation},{' '}
              {dateOfEventInterrogation && formatDay(dateOfEventInterrogation)}
            </p>
          </div>
        )}

        <div className='pb-2 border-section-1'>
          <h2 className='text-second'>Lê cưới sẽ diễn ra vào lúc</h2>
          <p className='max-w-xs text-base margin-auto'>
            Lễ cưới sẽ diễn tại {locationOfWedding}, vào lúc{' '}
            {timeOfEventWedding && timeOfEventWedding},{' '}
            {dateOfEventWedding && formatDay(dateOfEventWedding)}
          </p>
        </div>
        <Calendar dateOfEventWedding={dateOfEventWedding} />
        {/* <TitleDescribe title='Tháng 2/2023' /> */}
        {/* <div className='flex justify-center'>
          <img src={calander} alt='calander image' />
        </div> */}
        <h2 className='pt-6 second-text-pink pb-3 max-w-xs margin-auto'>
          Đám cưới sẽ diễn ra sau
        </h2>
        <CountDown dateOfEventWedding={dateOfEventWedding} />
        <h2 className='pb-6 border-section-1'>Ngày</h2>
        <h2 className='text-second'>Địa chỉ</h2>
        <p className='margin-auto pb-6 border-section-1 max-w-xs'>
          {locationOfWedding}
        </p>
        {/* <div className='flex justify-center items-center pb-5'>
          <MapIcon />
          <h2 className='pl-2 m-0 pb-0 ' style={{ color: 'black' }}>
            Tầng 2, Khách sạn Petro{' '}
          </h2>
        </div>
        <p className='pb-2'>Số 458 Lý Bôn, P. Đề Thám, TP. Thái Bình</p> */}
      </div>
      {mapDirectLink && (
        <div>
          <LazyLoad height={325} offset={200}>
            <div dangerouslySetInnerHTML={{ __html: embeddedMap }}></div>
          </LazyLoad>
        </div>
      )}
      <div className='flex justify-center pt-6 mt-2'>
        <button className='btn-map'>
          <img src={mapIcon} alt='' className='gg-map-icon' />
          <a
            href={mapDirectLink}
            target='_blank'
            className='pl-12 pr-3 py-3 link-map '
          >
            Chỉ đường trên Google Maps
          </a>
        </button>
      </div>
    </div>
  )
}

export default TimeLocation
