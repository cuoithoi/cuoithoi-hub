import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { galleryImage } from '../../../utils/gallery-data'
const CarouselGallery = ({ index }) => {
  return (
    <div className='carousel-gallery-container layout-mw'>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        swipeable={true}
        selectedItem={index}
        dynamicHeight={true}
        showIndicators={true}
        showStatus={false}
        className='casourel'
      >
        <div className=''>
          <img src={galleryImage[0].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[1].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[2].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[3].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[4].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[5].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[6].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[7].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[8].imageUrl} alt='image-gallery' />
        </div>
        <div>
          <img src={galleryImage[9].imageUrl} alt='image-gallery' />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselGallery
