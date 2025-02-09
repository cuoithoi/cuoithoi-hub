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
import styles from './LetterPage.module.css'
import SnowFall from '@/components/letter-page/SnowFall'
import { INVITATION_STYLES } from '@/commons/Constant.ts'
import { getStorage } from '@/utils/localStorage'

const LetterPreviewPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [letter, setLetter] = useState(null)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const containerRef = useRef(null)

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
      const data = getStorage("letterPreview")
      setIsLoading(false)

      setLetter(data)
    }
    fetchData()
  }, [])

  const bgColor = useMemo(() => {
    let style = ''

    if (letter?.invitationStyle == INVITATION_STYLES.PINK) {
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
    timeAndLocationOfEgagement,
    timeAndLocationOfInterrogation,
    timeAndLocationOfWedding,
    videoLink,
    note,
    weddingVow,
    imgWeddingVow,
    invitationStyle
  } = letter


  // !isLetterOpen && !isLoading && isEffectOfOpenning
  if (!isLetterOpen && !isLoading && JSON.parse(isEffectOfOpenning)) {
    return (
      <div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-main'>
        <LetterEnvelopTrial
          isLetterOpen={isLetterOpen}
          setIsLetterOpen={setIsLetterOpen}
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

      <div className={`letter-layout overflow-hidden ${(invitationStyle == INVITATION_STYLES.PINK) && styles.pinkBg}`}>
        <NavButton setIsNavOpen={setIsNavOpen} />

        <Hero
          effectImage={effectImage}
          setIsNavOpen={setIsNavOpen}
          manfirstName={informationOfGroom.firstName}
          coverImage={coverImage}
          manName={`${informationOfGroom.name}`}
          womanfirstName={informationOfBride.firstName}
          womanName={`${informationOfBride.name}`}
          timeAndLocationOfWedding={timeAndLocationOfWedding}
          invitationStyle={invitationStyle}
        />
        <Invitation
          informationOfBride={informationOfBride}
          informationOfGroom={informationOfGroom}
          contentOfInvitation={contentOfInvitation}
          timeAndLocationOfWedding={timeAndLocationOfWedding}
          invitationStyle={invitationStyle}
        />
        <Gallery1 defaultAlbum={album} id={_id} invitationStyle={invitationStyle} preview={true} />
        {isUseVideo && (
          <YoutubeVideo
            videoLink={videoLink}
            invitationStyle={invitationStyle}
          />
        )}
        <TimeLocation
          timeAndLocationOfWedding={timeAndLocationOfWedding}
          timeAndLocationOfEgagement={timeAndLocationOfEgagement}
          timeAndLocationOfInterrogation={timeAndLocationOfInterrogation}
          isUseDamNgo={isUseDamNgo}
          invitationStyle={invitationStyle}
        />
        <Schedule
          eventOfProgram={eventOfProgram}
          note={note}
          isUseEvent={isUseEvent}
          invitationStyle={invitationStyle}
        />
        {isUseBanking && (
          <Congrats
            setModalContent={setModalContent}
            setIsOpen={setIsOpen}
            informationOfBride={informationOfBride}
            informationOfGroom={informationOfGroom}
            invitationStyle={invitationStyle}
          />
        )}
        {isUseGuestBook && (
          <Message id={_id} invitationStyle={invitationStyle} preview={true} />
        )}
        {isUseConfirm && (
          <Response invitationsId={_id} invitationStyle={invitationStyle} preview={true} />
        )}
        <FooterLogo album={album[0].url} weddingVow={weddingVow} />
      </div>

      <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
        index={index}
      />
      <SnowFall type={effectBackgroud.value} />
    </div>
  );
}

export default React.memo(LetterPreviewPage)
