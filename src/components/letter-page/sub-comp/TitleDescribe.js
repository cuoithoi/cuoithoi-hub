import React from 'react'
import TitleDescribeIcon from '../../icons/TitleDescribeIcon'
const TitleDescribe = ({ title }) => {
  return (
    <div>
      <div className='flex justify-center pb-5'>
        <TitleDescribeIcon />
        <span className='text-xl pl-1 pr-1'>{title}</span>
        <TitleDescribeIcon />
      </div>
    </div>
  )
}

export default TitleDescribe
