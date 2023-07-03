import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import heartIcon from '@/assets/svg/letter-heart.svg'
import heartIconFill from '@/assets/svg/letter-heart-fill.svg'
const CarouselGallery = ({ index, album, handleLikeImage }) => {
  return (
    <div className='layout-mw gallery-section relative'>
      {/* <div
        className='absolute bottom-8 right-2 w-10 h-6 flex items-center justify-end cursor-pointer rounded-md z-50  bg-bg-appear'
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <span style={{ color: 'white' }} className='mr-1'>
          {album[index].totalLike}
        </span>
        <img
          src={album[index].totalLike === 0 ? heartIcon : heartIconFill}
          alt='heart icon'
          className='w-6 h-6 '
          onClick={() => handleLikeImage(index, album[index]._id)}
        />
      </div> */}
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        swipeable={true}
        selectedItem={index}
        dynamicHeight={true}
        showIndicators={true}
        showStatus={false}
      >
        {album?.map((image, index) => {
          return (
            <div key={index} className='gallery-image mb-3 relative'>
              <img
                src={image.url}
                alt='image gallery'
                className='gallery-image mb-3 relative'
              />
              {/* <div
                className='absolute bottom-8 right-8 w-12 h-6 flex items-center justify-end cursor-pointer rounded-md '
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <span style={{ color: 'white' }} className='mr-1'>
                  {image.totalLike}
                </span>
                <img
                  src={image.totalLike === 0 ? heartIcon : heartIconFill}
                  alt='heart icon'
                  className='w-6 h-6'
                  handleLikeImage={() => handleLikeImage(index, image._id)}
                />
              </div> */}
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselGallery
