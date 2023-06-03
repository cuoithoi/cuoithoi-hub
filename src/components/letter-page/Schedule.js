import React from 'react'
import TitleSection from './sub-comp/TitleSection'
import ring from '../../assets/home-image/ring.svg'
import cup from '../../assets/home-image/cup.svg'
import dish from '../../assets/home-image/dish.svg'
import music from '../../assets/home-image/music.svg'
import TitleDescribeIcon from '../icons/TitleDescribeIcon'
import scheduleBgLeft from '../../assets/home-image/schedule-bg-left.svg'
import scheduleBgRight from '../../assets/home-image/schedule-bg-right.svg'
const Schedule = ({ eventOfProgram }) => {
  const { timeToWellcome, timeToCelebrate, timeToDinner, timeToMusic } =
    eventOfProgram
  return (
    <div
      className='pt-10 pb-4 schedule-container section-mb layout-mw border-section-main'
      id='schedule'
    >
      <TitleSection title='CHƯƠNG TRÌNH' />
      <div className='flex  justify-center '>
        <div className='schedule-bg-lr schedule-bg-l'>
          <img
            src={scheduleBgLeft}
            alt='background left'
            className='schedule-bg'
          />
        </div>
        <div className=''>
          <div className='flex justify-center items-center '>
            <div className='w-28'>
              <img
                src={ring}
                className='schedule-detail-img'
                alt='ring image'
              />
            </div>
            <div className='w-px bg-main icon-container mx-8 py-12'>
              <div className='icon-absolute'>
                <TitleDescribeIcon />
              </div>
            </div>
            <div className='w-28'>
              <h3>{timeToWellcome}</h3>
              <h2>Đón khách</h2>
            </div>
          </div>

          <div className='flex justify-center items-center '>
            <div className='w-28'>
              <img src={cup} className='schedule-detail-img' alt='ring image' />
            </div>
            <div className='w-px bg-main icon-container mx-8 py-12'>
              <div className='icon-absolute'>
                <TitleDescribeIcon />
              </div>
            </div>
            <div className='w-28'>
              <h3>{timeToCelebrate}</h3>
              <h2>Làm lễ</h2>
            </div>
          </div>

          <div className='flex justify-center items-center '>
            <div className='w-28'>
              <img
                src={dish}
                className='schedule-detail-img'
                alt='ring image'
              />
            </div>
            <div className='w-px bg-main icon-container mx-8 py-12'>
              <div className='icon-absolute'>
                <TitleDescribeIcon />
              </div>
            </div>
            <div className='w-28'>
              <h3>{timeToDinner}</h3>
              <h2>Tiệc tối</h2>
            </div>
          </div>

          <div className='flex justify-center items-center '>
            <div className='w-28'>
              <img
                src={music}
                className='schedule-detail-img'
                alt='ring image'
              />
            </div>
            <div className='w-px bg-main icon-container mx-8 py-12'>
              <div className='icon-absolute'>
                <TitleDescribeIcon />
              </div>
            </div>
            <div className='w-28'>
              <h3>{timeToMusic}</h3>
              <h2>Âm nhạc</h2>
            </div>
          </div>
        </div>
        <div className='schedule-bg-lr schedule-bg-r'>
          <img
            src={scheduleBgRight}
            alt='background right'
            className='schedule-bg'
          />
        </div>
      </div>
      <div className='pb-6 border-section-1'></div>
      <div className='text-center pt-4 '>
        <h2 className='text-second'>Lưu ý</h2>
        <p>Dresscode: Trắng đen - Hồng</p>
      </div>
    </div>
  )
}

export default Schedule
