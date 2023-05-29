import React, { useEffect, useState } from "react";
import { useRef } from "react";
import beautifulInWhite from "../../../assets/audio/beautiful-in-white.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import VolumnOpen from "../../icons/VolumnOpen";
import VolumnMute from "../../icons/VolumeMute";
// import VolumnMute1 from 'src/comnponents/icons/VolumeMute'
import {
  toggleAudioPlay,
  setIsAudioPlay,
  setAudioElement,
} from "../../../features/letter-page/music-vid-reducer";
import { useDispatch, useSelector } from "react-redux";
const AudioPlay = () => {
  const dispatch = useDispatch();
  const audioMusic = useRef();
  const audioContainer = useRef();
  const { isAudioPlay } = useSelector((store) => store.musicVid);

  const handlePlayPause = () => {
    console.log("click");
    if (isAudioPlay) {
      audioMusic.current.pause();
    } else {
      audioMusic.current.play();
    }
    dispatch(toggleAudioPlay());
  };
  useEffect(() => {
    dispatch(setAudioElement(audioMusic.current));
    audioMusic.current.addEventListener("canplaythrough", () => {
      audioMusic.current.play().catch((e) => {
        window.addEventListener(
          "click",
          () => {
            audioMusic.current.play();
            dispatch(setIsAudioPlay(true));
          },
          { once: true }
        );
      });
    });
    if (!audioMusic.current.paused) dispatch(setIsAudioPlay(true));
  }, []);

  return (
    <div className="float-left">
      <div
        className="cursor-pointer w-7"
        ref={audioContainer}
        onClick={() => handlePlayPause()}
      >
        {isAudioPlay ? (
          <VolumnOpen className="icon-music" />
        ) : (
          <VolumnMute className="icon-music" />
        )}
      </div>
      <audio
        ref={audioMusic}
        // src={beautifulInWhite}
        autoPlay
        loop={true}
      ></audio>
    </div>
  );
};

export default AudioPlay;
