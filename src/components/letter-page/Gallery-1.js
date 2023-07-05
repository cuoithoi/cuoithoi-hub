import React, { useEffect, useRef, useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import heartIcon from '@/assets/svg/letter-heart.svg'
import heartIconFill from '@/assets/svg/letter-heart-fill.svg'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import Popup from '../modal/Popup'
import CarouselGallery from './sub-comp/CarouselGallery'
import { api } from '@/utils/axios'
import { toast } from 'react-toastify'
import LazyLoad from 'react-lazyload'
const Gallery = ({ id }) => {
  const modalRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [album, setAlbum] = useState([])
  const [selectedItem, setSelectedItem] = useState(0)
  const randomNumber = (number) => {
    return Math.floor(Math.random() * number)
  }
  useEffect(() => {
    const getDataImage = async () => {
      setIsLoading(true)
      const resp = await api.get(`list-images?invitationId=${id}`)
      setAlbum(resp.data.data)
      setIsLoading(false)
    }
    getDataImage()
  }, [])
  const handleLikeImageApi = async (_id) => {
    const resp = await api.post('/like-image', {
      _id: _id,
      like: true,
    })
    return resp
  }
  const handleLikeImage = async (index, _id) => {
    try {
      await api.post('/like-image', {
        _id: _id,
        like: true,
      })
      const newAlbum = [...album]
      newAlbum[index].totalLike = newAlbum[index].totalLike + 1
      setAlbum(newAlbum)
    } catch (error) {
      toast.error('something went wrong, maybe your network is overloaded')
    }
  }
  if (isLoading) return
  return (
    <div
      className='py-10 px-3 section-mb layout-mw gallery-section'
      id='gallery'
    >
      <TitleSection title='ALBUM' />
      <div className=''>
        <Popup
          ref={modalRef}
          content={
            <CarouselGallery
              index={selectedItem}
              setIndex={setSelectedItem}
              album={album}
              handleLikeImage={handleLikeImage}
            />
          }
        />
        <div className='relative'>
          <div
            className='absolute bottom-8 right-2 w-10 h-6 flex items-center justify-end cursor-pointer rounded-md z-50  bg-bg-appear'
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          >
            <span style={{ color: 'white' }} className='mr-1'>
              {album[selectedItem].totalLike}
            </span>
            <LazyLoad threshold={0.95}>
              <img
                src={
                  album[selectedItem].totalLike === 0
                    ? heartIcon
                    : heartIconFill
                }
                alt='heart icon'
                className='w-6 h-6 fill-icon'
                onClick={() =>
                  handleLikeImage(selectedItem, album[selectedItem]._id)
                }
              />
            </LazyLoad>
          </div>
          <Carousel
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            selectedItem={selectedItem}
            onClickItem={() => modalRef.current?.showModal()}
            dynamicHeight={false}
          >
            {album?.map((image, index) => {
              return (
                <LazyLoad threshold={0.95} height='100%' key={index}>
                  <div className='gallery-image relative'>
                    <img src={image.url} alt='image gallery' />
                  </div>
                </LazyLoad>
              )
            })}
          </Carousel>
        </div>

        <ul className=' gallery-container'>
          {album.map((image, index) => {
            return (
              <li
                key={index}
                className='gallery-img relative'
                onClick={() => setSelectedItem(index)}
              >
                <div className='img-container'>
                  <img src={image.url} alt='image gallery' />
                </div>
                <div
                  className='absolute bottom-2 right-2 w-8 h-6 flex items-center justify-end cursor-pointer rounded-md  bg-bg-appear'
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <span style={{ color: 'white' }} className='mr-1'>
                    {image.totalLike}
                  </span>
                  <img
                    src={image.totalLike === 0 ? heartIcon : heartIconFill}
                    alt='heart icon'
                    className='w-4 h-4 fill-icon'
                    onClick={() => handleLikeImage(index, image._id)}
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
