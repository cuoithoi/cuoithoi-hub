import React, { useEffect, useRef, useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import heartIcon from '@/assets/svg/letter-heart.svg'
import heartIconFill from '@/assets/svg/letter-heart-fill.svg'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import Popup from '../modal/Popup'
import CarouselGallery from './sub-comp/CarouselGallery'
const Gallery = ({ album }) => {
  const modalRef = useRef()
  const [selectedItem, setSelectedItem] = useState(0)
  const randomNumber = (number) => {
    return Math.floor(Math.random() * number)
  }

  return (
    <div
      className='py-10 px-3 section-mb layout-mw gallery-section'
      id='gallery'
    >
      <TitleSection title='ALBUM' />
      <div>
        <Popup
          ref={modalRef}
          content={
            <CarouselGallery
              index={selectedItem}
              setIndex={setSelectedItem}
              album={album}
            />
          }
        />

        {/* <div
          className='gallery-image mb-3'
          onClick={() => {
            setIsOpen(true)
            setModalContent(<CarouselGallery index={0} setIndex={setIndex} />)
            setIndex(0)
          }}
        >
          <img src={galleryImage[0].imageUrl} alt='image gallery' />
        </div> */}
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          selectedItem={selectedItem}
          onClickItem={() => modalRef.current?.showModal()}
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

        <ul className=' gallery-container'>
          {album.map((image, index) => {
            const heartRandom = Math.floor(Math.random() * 2)
            return (
              <li
                key={index}
                className='gallery-img relative'
                onClick={() => setSelectedItem(index)}
              >
                <div className='img-container'>
                  <img src={image} alt='image gallery' />
                </div>
                <div
                  className='absolute bottom-2 right-2 w-8 h-6 flex items-center justify-end cursor-pointer rounded-md  bg-bg-appear'
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <span style={{ color: 'white' }} className='mr-1'>
                    {randomNumber(16)}
                  </span>
                  <img
                    src={randomNumber(2) === 0 ? heartIcon : heartIconFill}
                    alt='heart icon'
                    className='w-4 h-4'
                  />
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
