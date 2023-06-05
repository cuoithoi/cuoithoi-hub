import React from 'react'
import TitleCreate from './subcomp/TitleCreate'
import Languages from '@/commons/Languages'
// component
import InputCreate from './subcomp/InputCreate'
import ImageUploadSingle from './subcomp/ImageUploadSingle'

const TimeAndLocation = () => {
  return (
    <div>
      <TitleCreate title={Languages.text.timeAndLocation} divided={true} />
      <div className='input_fields_control'>
        <div className='group_input_control'>
          <InputCreate
            label={Languages.inputText.firstNameGroom}
            placeholder={Languages.inputText.firstName}
            type='text'
            maxLength={15}
            styleGroup='input_create_half'
          />
        </div>
      </div>


      {/* <ImageUploadSingle
        title={Languages.text.chooseCoverImage}
        images={imagesCover}
        desc={Languages.text.bigsize}
        allowDrag={false}
      /> */}

      <ImageUploadSingle
        title={Languages.text.chooseCoverImage}
        desc={Languages.text.bigsize}
        allowDrag={false}
      />

    </div>
  )
}

export default TimeAndLocation
