import React, { useRef } from 'react'
import Hero from '../components/letter-page/Hero'
import { useEffect, useState, useMemo } from 'react'
import Invitation from '../components/letter-page/Invitation'
import TimeLocation from '../components/letter-page/TimeLocation'
import Schedule from '../components/letter-page/Schedule'
import Congrats from '../components/letter-page/Congrats'

import FooterLogo from '@/components/letter-page/FooterLogo'

import Modal from '../components/letter-page/sub-comp/Modal'
import Sidebar from '../components/letter-page/sub-comp/Sidebar'
import YoutubeVideo from '../components/letter-page/YoutubeVideo'

import NavButton from '../components/letter-page/sub-comp/NavButton'
import Message from '@/components/letter-page/Message'
import Response from '@/components/letter-page/Response'
import Gallery1 from '@/components/letter-page/Gallery-1'
import LetterEnvelopTrial from '@/components/letter-page/LetterEnvelop'
import { getDataApi } from '@/utils/axios'
import styles from './LetterPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import SnowFall from '@/components/letter-page/SnowFall'
import { Alias, APi, config } from '@/commons/Constant.ts'
import { getUserFromLocalStorage } from '@/utils/localStorage'
import html2canvas from 'html2canvas'
import { useBaseService } from '@/utils/BaseServices'
import { Helmet } from 'react-helmet'

const LetterPage = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [letter, setLetter] = useState(null)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const storageId = getUserFromLocalStorage()

  const navigate = useNavigate()

  const containerRef = useRef(null)

  const { post } = useBaseService()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getDataApi(`/invitation-detail?_id=${id}`)
      setIsLoading(false)

      setLetter(data.data)
    }
    fetchData()
  }, [])

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
  if (isLoading) return
  const {
    _id,
    album,
    contentOfInvitation,
    coverImage,
    effectBackgroud,
    effectImage,
    eventOfProgram,
    informationOfBride,
    informationOfGroom,
    isEffectOfOpenning,
    isUseConfirm,
    isUseGuestBook,
    isUseEvent,
    isUseVideo,
    isUseDamNgo,
    isUseBanking,
    song,
    timeAndLocationOfEgagement,
    timeAndLocationOfInterrogation,
    timeAndLocationOfWedding,
    userId,
    videoLink,
    note,
    isPaid,
  } = letter

  const captureAndUpload = () => {
    setTimeout(() => {
      html2canvas(containerRef.current, {
        allowTaint: true,
        useCORS: true,
        proxy: true,
      })
        .then(async (canvas) => {
          const image = canvas.toDataURL('image/png')
          // const link = document.createElement('a')
          // link.href = image
          // link.download = 'screenshot.png'
          // link.click()

          const res = await post(
            APi.convertBase64,
            {
              _id: id,
              data: image,
            },
            config
          )
          console.log(res)
        })
        .catch((error) => {
          console.error('Lỗi khi chụp ảnh:', error)
        })
    }, 1000)
    setIsLetterOpen(true)
  }

  if (!isPaid && userId !== storageId?.userId) {
    navigate(Alias.homePage)
  }
  //!isLetterOpen && !isLoading && isEffectOfOpenning
  if (!isLetterOpen && !isLoading && isEffectOfOpenning) {
    return (
      <div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-main'>
        <Helmet>
          <meta property="og:image" content={coverImage} />
        </Helmet>
        <LetterEnvelopTrial
          isLetterOpen={isLetterOpen}
          setIsLetterOpen={captureAndUpload}
          manfirstName={informationOfGroom.firstName}
          coverImage={coverImage}
          manName={informationOfGroom.name}
          womanfirstName={informationOfBride.firstName}
          womanName={informationOfBride.name}
          timeAndLocationOfWedding={timeAndLocationOfWedding}
        />
      </div>
    )
  }
  return (
    <div ref={containerRef} className={`letter-wrapper ${bgColor}`}>
      <div className={`letter-layout ${bgColor}`}>
        <SnowFall type={effectBackgroud.value} />
        <NavButton setIsNavOpen={setIsNavOpen} song={song} />

        <Hero
          effectImage={effectImage}
          setIsNavOpen={setIsNavOpen}
          manfirstName={informationOfGroom.firstName}
          coverImage={coverImage}
          manName={`${informationOfGroom.name}`}
          womanfirstName={informationOfBride.firstName}
          womanName={`${informationOfBride.name}`}
          timeAndLocationOfWedding={timeAndLocationOfWedding}
        />
        <Invitation
          informationOfBride={informationOfBride}
          informationOfGroom={informationOfGroom}
          contentOfInvitation={contentOfInvitation}
          timeAndLocationOfWedding={timeAndLocationOfWedding}
        />
        <Gallery1 album={album} id={_id} />
        {isUseVideo && <YoutubeVideo videoLink={videoLink} />}
        <TimeLocation
          timeAndLocationOfWedding={timeAndLocationOfWedding}
          timeAndLocationOfEgagement={timeAndLocationOfEgagement}
          timeAndLocationOfInterrogation={timeAndLocationOfInterrogation}
          isUseDamNgo={isUseDamNgo}
        />
        {isUseEvent && <Schedule eventOfProgram={eventOfProgram} note={note} />}
        <Congrats
          setModalContent={setModalContent}
          setIsOpen={setIsOpen}
          informationOfBride={informationOfBride}
          informationOfGroom={informationOfGroom}
          isuseBanking={isUseBanking}
        />
        {isUseGuestBook && <Message id={userId} />}
        {isUseConfirm && <Response />}
        <FooterLogo />
      </div>

      <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
        index={index}
      />
    </div>
  )
}

export default LetterPage
