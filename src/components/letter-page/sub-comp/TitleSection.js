import React from 'react'
import InvitationRight from '../../icons/InvitationRight'
import InvitationLeft from '../../icons/InvitationLeft'
const TitleSection = ({ title }) => {
  return (
    <div className='flex justify-center pb-5'>
      <InvitationLeft />
      <span className='text-xl pl-1 pr-1 text-center'>{title}</span>
      <InvitationRight />
    </div>
  )
}

export default TitleSection
