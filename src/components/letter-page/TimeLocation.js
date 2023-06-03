import React from 'react'
import TitleSection from './sub-comp/TitleSection'
import TitleDescribe from './sub-comp/TitleDescribe'
import calander from '../../assets/home-image/calander.svg'
import MapIcon from '../icons/MapIcon'
import mapIcon from '../../assets/home-image/map-icon.png'
import background from '../../assets/home-image/time-schedule-bg.png'
import Calendar from './sub-comp/Calendar'
import CountDown from './sub-comp/Countdown'
import LazyLoad from 'react-lazy-load'
import { formatDay } from '@/utils/helpers'
const TimeLocation = ({
  timeAndLocationOfWedding,
  timeAndLocationOfEgagement,
  timeAndLocationOfInterrogation,
}) => {
  const address = `378 Minh Khai, Hai Bà Trưng, Hà Nội`
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
  const src = `https://maps.google.com/maps?&q="+${locationOfWedding}"&output=embed`
  return (
    <div
      className='pt-10 pb-10 bg-main-bg section-mb layout-mw'
      id='time-location'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className=' text-center '>
        <TitleSection title='THỜI GIAN & ĐỊA ĐIỂM' />
        <div className='pb-2'>
          <h2 className='text-second'>Dạm ngõ</h2>
          <p className='max-w-xs text-base margin-auto'>
            Lễ dạm ngõ sẽ diễn tại {locationOfInterrogation}, vào lúc{' '}
            {timeOfEventInterrogation}, {formatDay(dateOfEventInterrogation)}
          </p>
        </div>
        <div className=' pb-2'>
          <h2 className='text-second'>Ăn hỏi</h2>
          <p className='max-w-xs text-base margin-auto'>
            Lễ ăn hỏi sẽ diễn tại {locationOfEgagement}, vào lúc{' '}
            {timeOfEventEgagement}, {formatDay(dateOfEventEgagement)}
          </p>
        </div>
        <div className='pb-2 border-section-1'>
          <h2 className='text-second'>Lê cưới sẽ diễn ra vào lúc</h2>
          <p className='max-w-xs text-base margin-auto'>
            Lễ cưới sẽ diễn tại {locationOfWedding}, vào lúc{' '}
            {timeOfEventWedding}, {formatDay(dateOfEventWedding)}
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
      <div>
        <LazyLoad height={325} offset={200}>
          {/* <iframe
            src={src}
            width='100%'
            height='350'
            style={{ border: '0' }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe> */}
          <iframe
            src={src}
            width='100%'
            height='350'
            style={{ border: '0' }}
            allowfullscreen=''
            loading='lazy'
            referrerpolicy='no-referrer-when-downgrade'
          ></iframe>
        </LazyLoad>
      </div>
      <div className='flex justify-center pt-6 mt-2'>
        <button className='btn-map'>
          <img src={mapIcon} alt='' className='gg-map-icon' />
          <a href={mapDirectLink} className='pl-12 pr-3 py-3 link-map '>
            Chỉ đường trên Google Maps
          </a>
        </button>
      </div>
    </div>
  )
}

export default TimeLocation
// https://goo.gl/maps/4STQwR9ZS1EyfP6z6
{
  /* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9430993939277!2d105.79570607572326!3d20.994917880646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbea4c8dd29%3A0xd08da6f53bdfde6!2zQsO6biBCw7IgSHXhur8gVGh1IFPGsMahbmc!5e0!3m2!1svi!2s!4v1685274687229!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */
}
