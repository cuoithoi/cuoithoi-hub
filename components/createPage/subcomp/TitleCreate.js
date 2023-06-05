import React from 'react'

const TitleCreate = ({ title, divided, classNameCus }) => {
  return (
    <div className={`${'title_comp_wed'} ${classNameCus ? classNameCus : ''}`}>
      <h2>
        {title}
        {divided && <div className='divided'></div>}
      </h2>
    </div>
  )
}

export default TitleCreate
