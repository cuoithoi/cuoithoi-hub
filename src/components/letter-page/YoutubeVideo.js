import React from 'react'
import { useState, useEffect } from 'react'
import TitleSection from './sub-comp/TitleSection'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAudioPlay } from '../../features/letter-page/music-vid-reducer'
import LazyLoad from 'react-lazy-load'
import { youtubeParser } from '@/utils/helpers'
const YoutubeVideo = ({ videoLink }) => {
  const youtubeId = youtubeParser(videoLink)
  console.log(youtubeId)
  const dispatch = useDispatch()
  const { audioElement, isAudioPlay } = useSelector((store) => store.musicVid)
  const [prevState, setPrevState] = useState(false)
  const onPlay = () => {
    audioElement.pause()
    setPrevState(isAudioPlay)
    dispatch(setIsAudioPlay(false))
  }
  const onPause = () => {
    if (prevState) {
      audioElement.play()
      dispatch(setIsAudioPlay(true))
    }
    return
  }
  return (
    <div className='py-10 px-3 section-mb layout-mw'>
      <TitleSection title='VIDEO' />
      <div className='pt-5  pb-3'>
        <LazyLoad height={325} offset={300}>
          <YouTube
            videoId={youtubeId}
            opts={{ width: '100%', height: '325' }}
            onPlay={onPlay}
            onPause={onPause}
          />
        </LazyLoad>
      </div>
    </div>
  )
}

export default YoutubeVideo
