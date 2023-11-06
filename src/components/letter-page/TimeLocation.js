import React, { useEffect, useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import mapIcon from '../../assets/home-image/map-icon.png'
import background from '../../assets/home-image/time-schedule-bg.png'
import ph_map from '../../assets/home-image/ph_map-pin.png'
import Calendar from './sub-comp/Calendar'

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
    namelocationOfWedding
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


        <Calendar dateOfEventWedding={dateOfEventWedding} />

        <h2 className='text-second'>Hôn Lễ Được Tổ Chức Vào Lúc {timeOfEventWedding && timeOfEventWedding}</h2>

        <p className='namelocationOfWedding'><img src={ph_map} /> {namelocationOfWedding}</p>
        <p className='margin-auto pb-6 border-section-1 addlocationOfWedding'>
          {locationOfWedding}
        </p>

      </div>
      {mapDirectLink && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: embeddedMap }}></div>
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
export default React.memo(TimeLocation)