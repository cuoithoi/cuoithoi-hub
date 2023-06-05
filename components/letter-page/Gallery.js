import React from 'react'
import TitleSection from './sub-comp/TitleSection'
import { galleryImage } from '../../utils/gallery-data'
import CarouselGallery from './sub-comp/CarouselGallery'
const Gallery = ({ setModalContent, setIsOpen, setIndex }) => {
  return (
    <div className='py-10 px-3 section-mb layout-mw' id='gallery'>
      <TitleSection title='ALBUM' />
      <div>
        <div
          className='gallery-image mb-3'
          // onClick={() => {
          //   setIsOpen(true)
          //   setModalContent(<CarouselGallery index={0} setIndex={setIndex} />)
          //   setIndex(0)
          // }}
        >
          <img src={galleryImage[0].imageUrl} alt='image gallery' />
        </div>
        <ul className=' gallery-container'>
          {galleryImage.map((image, index) => {
            if (index === 0) return
            return (
              <li
                key={index}
                className='gallery-img'
                // onClick={() => {
                //   setIsOpen(true)
                //   setModalContent(<CarouselGallery index={index} />)
                //   setIndex(index)
                // }}
              >
                <div>
                  <img src={image.imageUrl} alt='image gallery' />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Gallery
