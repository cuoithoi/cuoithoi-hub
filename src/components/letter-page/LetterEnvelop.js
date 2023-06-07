import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Hero from './Hero'
import classes from './LetterEnvelop.module.css'
import EnvelopContent from './sub-comp/EnvelopContent'
import Loading from '../Loading'
import envelopImg from '@/assets/envelopImg/Envelope_ 1.png'
import envelopBodyImg from '@/assets/envelopImg/Envelope_body1.png'
import heartIcon from '@/assets/envelopImg/heartOpen.png'

const LetterEnvelop = ({
  isLetterOpen,
  setIsLetterOpen,
  manfirstName,
  manName,
  womanfirstName,
  womanName,
  coverImage,
  timeAndLocationOfWedding,
}) => {
  const [open, setOpen] = useState(false)
  const openLetter = () => {
    setOpen(true)
    setTimeout(() => {
      setIsLetterOpen((prev) => !prev)
    }, 4500)

    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 4550)
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 5)
    }, 1500)
  }, [])

  return (
    <>
      <Loading />
      <div className={`${classes.container} ${classes.animate__backInDown}`}>
        <div
          className={`${classes.envelopeWrapper} ${open && classes.flap} ${
            open && classes.animate__zoomOutUp
          }`}
          onClick={openLetter}
        >
          <div className={classes.envelope}>
            <div
              className={`${classes.envelopImg} ${open && classes.envelopOpen}`}
            >
              <img src={envelopImg} alt='' />
            </div>

            <div
              className={`  overflow-hidden ${classes.letter}`}
              style={{ zIndex: '1' }}
            >
              <div className={classes.text}>
                <EnvelopContent
                  manfirstName={manfirstName}
                  manName={manName}
                  womanfirstName={womanfirstName}
                  womanName={womanName}
                  coverImage={coverImage}
                  timeAndLocationOfWedding={timeAndLocationOfWedding}
                />
              </div>
            </div>
            <div className={`${classes.hearts} ${!open && classes.close}`}>
              <div className={`${classes.heart} ${classes.a1}`}></div>
              <div className={`${classes.heart} ${classes.a2}`}></div>
              <div className={`${classes.heart} ${classes.a3}`}></div>
              <div className={`${classes.heart} ${classes.a4}`}></div>
              <div className={`${classes.heart} ${classes.a5}`}></div>
              <div className={`${classes.heart} ${classes.a6}`}></div>
              <div className={`${classes.heart} ${classes.a7}`}></div>
              <div className={`${classes.heart} ${classes.a8}`}></div>
            </div>
            <div className={classes.envelopBodyImg} style={{ zIndex: '2' }}>
              <img src={envelopBodyImg} alt='' />
            </div>
          </div>
          <div className={classes.signIcon}>
            <img src={heartIcon} alt='' />
          </div>
          {/* <img src={envelopSignImg} alt='' className={classes.signIcon} /> */}
        </div>
      </div>
    </>
  )
}

export default LetterEnvelop
