import React, { useCallback } from 'react'
import { useState } from 'react'
import TitleSection from './sub-comp/TitleSection'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAudioPlay } from '../../features/letter-page/music-vid-reducer'

import { youtubeParser } from '@/utils/helpers'
const YoutubeVideo = ({ videoLink }) => {

  const youtubeId = youtubeParser(videoLink)
  const dispatch = useDispatch()

  const { audioElement, isAudioPlay } = useSelector((store) => store.musicVid)
  const [prevState, setPrevState] = useState(false)

  const onPlay = useCallback(() => {
    audioElement.pause()
    setPrevState(isAudioPlay)
    dispatch(setIsAudioPlay(false))
  }, [audioElement, isAudioPlay])
  const onPause = useCallback(() => {
    if (prevState) {
      audioElement.play()
      dispatch(setIsAudioPlay(true))
    }
    return
  }, [audioElement])

  return (
    videoLink && (
      <div className='py-10 px-3 section-mb layout-mw'>
        <TitleSection title='VIDEO' />
        <div className='pt-5  pb-3'>
          <YouTube
            videoId={youtubeId}
            opts={{ width: '100%', height: '325' }}
            onPlay={onPlay}
            onPause={onPause}
            loading='lazy'
          />
        </div>
      </div>
    )
  )
}

export default React.memo(YoutubeVideo)