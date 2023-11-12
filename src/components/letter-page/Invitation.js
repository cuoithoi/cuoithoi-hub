import React from 'react'
import invitationBg from '../../assets/home-image/invitation-bg.png'
import { getDayOfWeeks, formatDay } from '@/utils/helpers'
import InvitationRight from '../icons/InvitationRight'
import InvitationLeft from '../icons/InvitationLeft'

const Invitation = ({
  timeAndLocationOfWedding,
  contentOfInvitation,
}) => {
  const { dateOfEventWedding, locationOfWedding, namelocationOfWedding, timeOfEventWedding } = timeAndLocationOfWedding
  return (
    <section
      className='bg-center bg-no-repeat bg-cover section-mb layout-mw bg-invitation'
      id='invitation'
      style={{ backgroundImage: `url(${invitationBg})` }}
    >
      <div className='section-mb text-center py-10 pr-2 pl-2 pt-20'>
        <div className='flex justify-center pb-5'>
          <InvitationLeft />
          <span className='text-xl pl-1 pr-1 text-center invitation_title'>LỜI MỜI</span>
          <InvitationRight />
        </div>
        <div className='pb-4'>
          <p className='text-lg hidden'>Thân mời,</p>

          <p className='invitation_desp'>Thân mời quý khách tới dự bữa tiệc chung vui
            cùng gia đình chúng tôi vào hồi
          </p>
        </div>
        <div>
          {/* <div className='flex justify-center pt-4 md:grid md:grid-cols-2 md:gap-4' style={{ paddingTop: '1.5rem' }}>
            <InvitationDetail info={informationOfGroom} isBride={false} />
            <InvitationDetail info={informationOfBride} isBride={true} />
          </div> */}


          <div className='outstanding_box'>
            {dateOfEventWedding && (
              <h2 className='title_outstanding'>
                {timeOfEventWedding && timeOfEventWedding + ' - '} {getDayOfWeeks(dateOfEventWedding)}, ngày{' '}
                {formatDay(dateOfEventWedding)}
              </h2>
            )}
          </div>

          {locationOfWedding && (
            <div className='outstanding_box'>
              <h2 className='title_outstanding'>TẠI: {namelocationOfWedding}</h2>
              <p className='px-20'>{locationOfWedding}</p>
              <div className='px-20' dangerouslySetInnerHTML={{ __html: contentOfInvitation }} />
            </div>
          )}



        </div>
      </div>
    </section>
  )
}

export default React.memo(Invitation)
