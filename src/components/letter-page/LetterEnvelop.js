import React, { useCallback } from 'react'
import { useState } from 'react'
import classes from './LetterEnvelop.module.css'
import Loading from '../Loading'
import envelopImg from '@/assets/envelopImg/Envelope_ 1.png'
import envelopBodyImg from '@/assets/envelopImg/Envelope_body1.png'
import heartIcon from '@/assets/envelopImg/heartOpen.png'
import bg_logo from '@/assets/envelopImg/bg_logo.png'
import shadow_left from '@/assets/envelopImg/shadow_left.png'
import shadow_right from '@/assets/envelopImg/shadow_right.png'
import heart from '@/assets/envelopImg/heart.png'

const LetterEnvelop = ({
  setIsLetterOpen,
  manName,
  womanName,
  coverImage,
}) => {
  const [open, setOpen] = useState(false)

  const openLetter = useCallback(() => {
    setOpen(true)
    setTimeout(() => {
      setIsLetterOpen(true)
    }, 6000)
  })

  return (
    <>
      <Loading />
      <div
        className={`${classes.container} ${classes.animate__backInDown} ${open && classes.disapear
          }`}
      >
        <div
          className={`${classes.envelopeWrapper} ${open && classes.flap} `}
          onClick={openLetter}
        >
          <div className={`${classes.envelope} `}>
            <div
              className={`${classes.envelopImg} ${open && classes.envelopOpen
                }  `}
            >
              <img src={envelopImg} alt='' />
            </div>

            <div
              className={`${classes.letter} ${open && classes.lineUptop
                }`}
              style={{ zIndex: '1' }}
            >
              <div className={classes.text}>
                <p>{manName} <br />{womanName}</p>
                <img src={coverImage} alt='' />

              </div>
            </div>

            <div className='h-[100%] absolute left-0 right-0 bg-white bottom-[-50%]' style={{ zIndex: '2' }}></div>

            <div
              className={`${classes.envelopBodyImg} ${open && classes.shadow} ${open}`}
              style={{ zIndex: '3' }}
            >
              <img className={`${classes.shadow_left} ${classes.shadow_letter}`} src={shadow_left} alt='' />
              <img src={envelopBodyImg} alt='' />
              <img className={`${classes.shadow_right} ${classes.shadow_letter}`} src={shadow_right} alt='' />
            </div>
          </div>
          <div className={`${classes.signIcon} `}>
            <div className={`${classes.signIconRotate}`}>
              <img className={`${classes.signIconRotate_bgLogo}`} src={bg_logo} alt='' />
              <img className={`${classes.signIconRotate_Logo}`} src={heartIcon} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.hearts} ${!open && classes.close}`}>
        <div className={`image ${classes.heart} ${classes.a1}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a2}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a3}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a4}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a5}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a6}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a7}`}><img src={heart} alt='heart' /></div>
        <div className={`image ${classes.heart} ${classes.a8}`}><img src={heart} alt='heart' /></div>
      </div>
    </>
  )
}

export default React.memo(LetterEnvelop)
