import React from 'react'
import invitationBg from '../../assets/home-image/invitation-bg.jpg'
import dayjs from 'dayjs'
// import invitationBg
import InvitationRight from '../icons/InvitationRight'
import InvitationLeft from '../icons/InvitationLeft'
import { getDayOfWeeks, formatDay } from '@/utils/helpers'
import InvitationDetail from './sub-comp/InvitationDetail'
import TitleSection from './sub-comp/TitleSection'
const Invitation = ({
  informationOfBride,
  informationOfGroom,
  timeAndLocationOfWedding,
  contentOfInvitation,
}) => {
  const { dateOfEventWedding, locationOfWedding } = timeAndLocationOfWedding
  return (
    <section
      className='bg-center bg-no-repeat bg-cover section-mb layout-mw'
      id='invitation'
      style={{ backgroundImage: `url(${invitationBg})` }}
    >
      <div className='section-mb text-center py-10 pr-2 pl-2'>
        <TitleSection title='LỜI MỜI' />
        <div className='border-section-1 pb-4'>
          <p className='text-lg '>Trân trọng kính mời,</p>
          <p />
          đến dự buổi tiệc chung vui cùng gia đình chúng tôi
        </div>
        <div>
          <div className='flex justify-center pt-4'>
            <InvitationDetail info={informationOfGroom} isBride={false} />
            <InvitationDetail info={informationOfBride} isBride={true} />
          </div>
          {dateOfEventWedding && (
            <>
              <h2 className='py-4'>
                {getDayOfWeeks(dateOfEventWedding)}, ngày{' '}
                {formatDay(dateOfEventWedding)}
              </h2>
            </>
          )}
          {locationOfWedding && (
            <>
              <h2 className='text-second'>Địa chỉ</h2>
              <p className='px-20 pb-6 border-section-1'>{locationOfWedding}</p>
              <p className='pt-8 px-20'>{contentOfInvitation}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Invitation
