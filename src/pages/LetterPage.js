import React, { useCallback, useRef } from 'react'
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
import { Alias, APi, config, INVITATION_STYLES, Status } from '@/commons/Constant.ts'
import { getUserFromLocalStorage } from '@/utils/localStorage'
import html2canvas from 'html2canvas'
import { useBaseService } from '@/utils/BaseServices'
import dayjs from 'dayjs'
import Parents from '@/components/letter-page/Parents'

const ADS_STARTED_DATE = '2025-02-15'

const LetterPage = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [letter, setLetter] = useState(null)
  const [ads, setAds] = useState(null)
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
      const adsData = await getDataApi(`/get-ads`)
      setIsLoading(false)
      setAds(adsData.data[0].data[adsData.data[0].data.length-1])
      setLetter(data.data)
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

  const displayAds = useMemo(() => {
    if(!letter) return false
    return (
      letter.status != Status.ACTIVE &&
      dayjs(letter.createTime).isAfter(dayjs(ADS_STARTED_DATE))
    );
  }, [letter]);

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
    weddingVow,
    imgWeddingVow,
    invitationStyle
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

          await post(
            APi.convertBase64,
            {
              _id: letter._id,
              data: image,
            },
            config
          )
        })
        .catch((error) => {
          console.error('Lỗi khi chụp ảnh:', error)
        })
    }, 500)
    setIsLetterOpen(true)
  }

  // if (!isPaid && userId !== storageId?.userId) {
  //   navigate(Alias.homePage)
  // }


  // !isLetterOpen && !isLoading && isEffectOfOpenning
  if (!isLetterOpen && !isLoading && JSON.parse(isEffectOfOpenning)) {
    return (
      <div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-main'>
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
      {displayAds && ads && (
        <>
          {ads.type == 1 ? (
            <>
              <div className={styles.leftGoogleAds}>
                <a href={ads.url1} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image1}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url2} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image2}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url3} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image3}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url4} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image4}
                      alt={"Ads"}
                    />
                  </div>
                </a>
              </div>
              <div className={styles.rightGoogleAds}>
                
                <a href={ads.url5} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image5}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url6} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image6}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url7} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image7}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url8} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image8}
                      alt={"Ads"}
                    />
                  </div>
                </a>
              </div>

              <div className={styles.topGoogleAds}>
                <a href={ads.url9} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image9}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url10} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image10}
                      alt={"Ads"}
                    />
                  </div>
                </a>
              </div>
              <div className={styles.bottomGoogleAds}>
                <a href={ads.url11} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image11}
                      alt={"Ads"}
                    />
                  </div>
                </a>
                <a href={ads.url12} target="_blank" title={"ads"}>
                  <div className={styles.adsWrapper}>
                    <img
                      className={styles.adsImage}
                      src={ads.image12}
                      alt={"Ads"}
                    />
                  </div>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className={styles.leftGoogleAdsPlaceholder}></div>

              <ins
                className={styles.leftGoogleAds}
                data-ad-client="ca-pub-9262218469295338"
                data-ad-slot="4446932927"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
              <ins
                className={styles.rightGoogleAds}
                data-ad-client="ca-pub-9262218469295338"
                data-ad-slot="1151256569"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </>
          )}
        </>
      )}

      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <div
        className={`letter-layout overflow-hidden ${
          invitationStyle == INVITATION_STYLES.PINK && styles.pinkBg
        }`}
      >
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
        <Gallery1 album={album} id={_id} invitationStyle={invitationStyle} />
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
            informationOfBride={informationOfBride}
            informationOfGroom={informationOfGroom}
            invitationStyle={invitationStyle}
          />
        )}
        <Parents
          informationOfBride={informationOfBride}
          informationOfGroom={informationOfGroom}
          invitationStyle={invitationStyle}
        />
        {isUseGuestBook && (
          <Message id={_id} invitationStyle={invitationStyle} />
        )}
        {isUseConfirm && (
          <Response invitationsId={_id} invitationStyle={invitationStyle} />
        )}
        <FooterLogo album={imgWeddingVow || album[0]} weddingVow={weddingVow} />
      </div>

      <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
        index={index}
      />
      <SnowFall type={effectBackgroud.value} />
      {displayAds && <div className={styles.rightGoogleAdsPlaceholder}></div>}
    </div>
  );
}

export default React.memo(LetterPage)
