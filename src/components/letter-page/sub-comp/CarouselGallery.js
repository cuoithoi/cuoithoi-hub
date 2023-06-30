import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import heartIcon from '@/assets/svg/letter-heart.svg'
import heartIconFill from '@/assets/svg/letter-heart-fill.svg'
const CarouselGallery = ({ index, album }) => {
  const randomNumber = (number) => {
    return Math.floor(Math.random() * number)
  }
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
        {album.map((image, index) => {
          return (
            <div key={index} className='gallery-image mb-3 relative'>
              <img src={image} alt='image gallery' />
              <div
                className='absolute bottom-8 right-8 w-12 h-6 flex items-center justify-end cursor-pointer rounded-md '
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <span style={{ color: 'white' }} className='mr-1'>
                  {randomNumber(16)}
                </span>
                <img
                  src={randomNumber(2) === 0 ? heartIcon : heartIconFill}
                  alt='heart icon'
                  className='w-6 h-6'
                />
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselGallery
