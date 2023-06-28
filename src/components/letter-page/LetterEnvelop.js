import React from 'react'
import { useState } from 'react'
import classes from './LetterEnvelop.module.css'
import EnvelopContent from './sub-comp/EnvelopContent'
import Loading from '../Loading'
import envelopImg from '@/assets/envelopImg/Envelope_ 1.png'
import envelopBodyImg from '@/assets/envelopImg/Envelope_body1.png'
import heartIcon from '@/assets/envelopImg/heartOpen.png'

const LetterEnvelop = ({
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
      setIsLetterOpen(true)
    }, 4900)
  }

  return (
    <>
      <Loading />
      <div
        className={`${classes.container} ${classes.animate__backInDown} ${
          open && classes.disapear
        }`}
      >
        <div
          className={`${classes.envelopeWrapper} ${open && classes.flap} `}
          onClick={openLetter}
        >
          <div className={`${classes.envelope} `}>
            <div
              className={`${classes.envelopImg} ${
                open && classes.envelopOpen
              }  `}
            >
              <img src={envelopImg} alt='' />
            </div>

            <div
              className={`overflow-hidden ${classes.letter}`}
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
            {/* <div className={`${classes.envelope_abs}`}></div> */}
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
            <div
              className={`${classes.envelopBodyImg} ${open}`}
              style={{ zIndex: '2' }}
            >
              <img src={envelopBodyImg} alt='' />
            </div>
          </div>
          <div className={`${classes.signIcon} `}>
            <div className={`${classes.signIconRotate}`}>
              <img src={heartIcon} alt='' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LetterEnvelop
