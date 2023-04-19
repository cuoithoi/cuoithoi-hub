
import React from 'react'

import React, { useState, useCallback } from 'react'
import { ImageUpload } from '@/components/imageUpload'
import ImgUploadIcon from '@/components/icons/ImgUploadIcon'
import arrayMove from 'array-move-e5'

const ImageUploadSingle = ({ title, desc, allowDrag }) => {
  const [images, setImages] = useState([])
  const onChange = (imageList) => {
    setImages(imageList)
  }
  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setImages((array) => arrayMove(array, oldIndex, newIndex))
  }, [])
  return (
    <div className='uploading_single_img_group'>
      <h2>{title}</h2>
      <ImageUpload
        icon={<ImgUploadIcon />}
        maxnumber={1}
        images={images}
        maxW={'100%'}
        height={300}
        desc={desc}
        onChange={onChange}
        onSortEnd={onSortEnd}
        allowDrag={allowDrag}
      />
    </div>
  )

}

export default ImageUploadSingle
