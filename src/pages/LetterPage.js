import React from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import Hero from '../components/letter-page/Hero'
import { useEffect, useState } from 'react'
import Invitation from '../components/letter-page/Invitation'
import TimeLocation from '../components/letter-page/TimeLocation'
import Schedule from '../components/letter-page/Schedule'
import Congrats from '../components/letter-page/Congrats'
import Footer from '../components/letter-page/Footer'
import FooterLogo from '@/components/letter-page/FooterLogo'
import Gallery from '../components/letter-page/Gallery'
import Modal from '../components/letter-page/sub-comp/Modal'
import { galleryImage } from '../utils/gallery-data'
import Sidebar from '../components/letter-page/sub-comp/Sidebar'
import YoutubeVideo from '../components/letter-page/YoutubeVideo'
import Snowfall from 'react-snowfall'
import snowImage from '../assets/home-image/snow.png'
import NavButton from '../components/letter-page/sub-comp/NavButton'
import Message from '@/components/letter-page/Message'
import Response from '@/components/letter-page/Response'
import Gallery1 from '@/components/letter-page/Gallery-1'
import LetterEnvelop from '@/components/letter-page/LetterEnvelop'
const LetterPage = () => {
  const snowImg = document.createElement('img')
  snowImg.src = snowImage
  snowImg.width = 20
  const images = [snowImg]
  const [isOpen, setIsOpen] = useState(false)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [index, setIndex] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const numberImage = galleryImage.length
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])



  if (!isLetterOpen) {
    return (
      <div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-main'>
        <LetterEnvelop
          isLetterOpen={isLetterOpen}
          setIsLetterOpen={setIsLetterOpen}
        />
      </div>
    )
  }
  return (
    <div className='letter-wrapper '>
      <AnimationOnScroll
        animateIn="animate__zoomInDown" offset={10} animatePreScroll={false} duration={3} delay={0}
      >
        <div className='letter-layout'>
          <Snowfall
            color='#E29C67'
            snowflakeCount={100}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              zIndex: 11,
            }}
            images={images}
            radius={[2, 15]}
          />
          <NavButton setIsNavOpen={setIsNavOpen} />


          <Hero setIsNavOpen={setIsNavOpen} />
          <Invitation />
          {/* <Gallery
          setModalContent={setModalContent}
          setIsOpen={setIsOpen}
          setIndex={setIndex}
        /> */}
          <Gallery1 />
          <YoutubeVideo />
          <TimeLocation />
          <Schedule />
          <Congrats setModalContent={setModalContent} setIsOpen={setIsOpen} />
          <Message />
          <Response />
          {/* <Footer /> */}
          <FooterLogo />
        </div>
      </AnimationOnScroll>
      <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
        index={index}
        numberImage={numberImage}
      />
    </div >
  )
}

export default LetterPage
