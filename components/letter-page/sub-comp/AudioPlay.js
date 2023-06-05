import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import beautifulInWhite from '../../../assets/audio/beautiful-in-white.mp3'
import perfect from '@/assets/audio/perfect.mp3'
import allOfMe from '@/assets/audio/all-of-me.mp3'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import VolumnOpen from '../../icons/VolumnOpen'
import VolumnMute from '../../icons/VolumeMute'
// import VolumnMute1 from 'src/comnponents/icons/VolumeMute'
import {
  toggleAudioPlay,
  setIsAudioPlay,
  setAudioElement,
} from '../../../features/letter-page/music-vid-reducer'
import { useDispatch, useSelector } from 'react-redux'
const AudioPlay = ({ song }) => {
  const dispatch = useDispatch()
  const audioMusic = useRef()
  const audioContainer = useRef()
  const { isAudioPlay } = useSelector((store) => store.musicVid)
  const renderSrcMusic = () => {
    let songSrc
    if (song === 1) {
      songSrc = beautifulInWhite
    }
    if (song === 2) {
      songSrc = perfect
    }
    if (song === allOfMe) {
      songSrc = perfect
    }
    return songSrc
  }
  const handlePlayPause = () => {
    console.log('click')
    if (isAudioPlay) {
      audioMusic.current.pause()
    } else {
      audioMusic.current.play()
    }
    dispatch(toggleAudioPlay())
  }
  useEffect(() => {
    dispatch(setAudioElement(audioMusic.current))
    audioMusic.current.addEventListener('canplaythrough', () => {
      audioMusic.current.play().catch((e) => {
        window.addEventListener(
          'click',
          () => {
            audioMusic.current.play()
            dispatch(setIsAudioPlay(true))
          },
          { once: true }
        )
      })
    })
    if (!audioMusic.current.paused) dispatch(setIsAudioPlay(true))
  }, [])

  return (
    <div className='float-left'>
      <div
        className='cursor-pointer w-7'
        ref={audioContainer}
        onClick={() => handlePlayPause()}
      >
        {isAudioPlay ? (
          <VolumnOpen className='icon-music' />
        ) : (
          <VolumnMute className='icon-music' />
        )}
      </div>
      <audio
        ref={audioMusic}
        src={renderSrcMusic()}
        autoPlay={true}
        loop={true}
      ></audio>
    </div>
  )
}

export default AudioPlay
