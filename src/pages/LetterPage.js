import React from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import Hero from '../components/letter-page/Hero'
import { useEffect, useState, useMemo } from 'react'
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
import leaveEffect from '../assets/home-image/leaveEffect.png'
import peachEffect from '../assets/home-image/peachEffect.png'
import snowWhiteEffect from '../assets/home-image/snowWhiteEffect.png'
import NavButton from '../components/letter-page/sub-comp/NavButton'
import Message from '@/components/letter-page/Message'
import Response from '@/components/letter-page/Response'
import Gallery1 from '@/components/letter-page/Gallery-1'
import LetterEnvelop from '@/components/letter-page/LetterEnvelop'
import { getUserFromLocalStorage } from '@/utils/localStorage'
import { getDataApi } from '@/utils/axios'
import styles from './LetterPage.module.css'
import { useParams } from 'react-router-dom'
const LetterPage = () => {
  const { id } = useParams()
  console.log(id)
  const snowImg = document.createElement('img')
  snowImg.src = leaveEffect
  snowImg.width = 60
  let images
  const [isOpen, setIsOpen] = useState(false)
  const [letter, setLetter] = useState(null)
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
  // useEffect(() => {
  //   snowImg.src = peachEffect
  //   // switch (bgEffect) {
  //   //   case 'LEAVE_EFFECT':
  //   //     break
  //   //   default:
  //   //     break
  //   // }
  // }, [])
  // useEffect(() => {
  //   const { userId } = getUserFromLocalStorage()
  //   const fetchData = async () => {
  //     const data = await getDataApi(`/list-invitation?userId=${userId}`)
  //     console.log(data.data[1])
  //     setLetter(data.data[1])
  //   }
  //   fetchData()
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataApi(`/invitation-detail?_id=${id}`)
      console.log(data)
      setLetter(data.data)
    }
    fetchData()
  }, [])
  images = [snowImg]
  const bgColor = useMemo(() => {
    let style = ''

    if (0) {
      style = styles.pinkBg
    }

    if (0) {
      style = styles.grayBg
    }

    return style
  }, [])
  if (!isLetterOpen && !letter) {
    return (
      <div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-main'>
        <LetterEnvelop
          isLetterOpen={isLetterOpen}
          setIsLetterOpen={setIsLetterOpen}
        />
      </div>
    )
  }
  const {
    album,
    anotherProduct,
    backgroundColor,
    codeInvite,
    contentGuestBook,
    contentOfInvitation,
    coverImage,
    createTime,
    effectBackground,
    effectImage,
    eventOfProgram,
    fontStyleOfContent,
    fontStyleOfTitle,
    informationOfBride,
    informationOfGroom,
    isDisplayGonePeople,
    isEffectOfOpenning,
    isPaid,
    isUseConfirm,
    isUseGuestBook,
    password,
    productId,
    song,
    styleBackground,
    thumbnailImage,
    timeAndLocationOfEgagement,
    timeAndLocationOfInterrogation,
    timeAndLocationOfWedding,
    userId,
    videoLink,
  } = letter
  console.log(letter)
  return (
    <div className={`letter-wrapper ${bgColor}`}>
      <AnimationOnScroll
        animateIn='animate__zoomInDown'
        offset={10}
        animatePreScroll={false}
        duration={2}
        delay={0}
      >
        <div className={`letter-layout ${bgColor}`}>
          <Snowfall
            // color='#E29C67'
            snowflakeCount={70}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              zIndex: 11,
            }}
            images={images}
            radius={[15, 25]}
          />
          <NavButton setIsNavOpen={setIsNavOpen} />

          <Hero
            setIsNavOpen={setIsNavOpen}
            manfirstName={informationOfGroom.firstName}
            coverImage={coverImage}
            manName={informationOfGroom.name}
            womanfirstName={informationOfBride.firstName}
            womanName={informationOfBride.name}
          />
          <Invitation
            informationOfBride={informationOfBride}
            informationOfGroom={informationOfGroom}
            contentOfInvitation={contentOfInvitation}
            timeAndLocationOfWedding={timeAndLocationOfWedding}
          />
          {/* <Gallery
          setModalContent={setModalContent}
          setIsOpen={setIsOpen}
          setIndex={setIndex}
        /> */}
          <Gallery1 />
          <YoutubeVideo videoLink={videoLink} />
          <TimeLocation
            timeAndLocationOfWedding={timeAndLocationOfWedding}
            timeAndLocationOfEgagement={timeAndLocationOfEgagement}
            timeAndLocationOfInterrogation={timeAndLocationOfInterrogation}
          />
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
      {/* <Outlet /> */}
    </div>
  )
}

export default LetterPage
