import React, { useCallback } from "react";
import { useState } from "react";
import TitleSection from "./sub-comp/TitleSection";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { setIsAudioPlay } from "../../features/letter-page/music-vid-reducer";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import flower7 from "@/assets/invitation/golden/flower7.svg";
import flower8 from "@/assets/invitation/golden/flower8.svg";

import { youtubeParser } from "@/utils/helpers";
const YoutubeVideo = ({ videoLink, invitationStyle }) => {
    const youtubeId = youtubeParser(videoLink);
    const dispatch = useDispatch();

    const { audioElement, isAudioPlay } = useSelector(
        (store) => store.musicVid
    );
    const [prevState, setPrevState] = useState(false);

    const onPlay = useCallback(() => {
        audioElement.pause();
        setPrevState(isAudioPlay);
        dispatch(setIsAudioPlay(false));
    }, [audioElement, isAudioPlay]);
    const onPause = useCallback(() => {
        if (prevState) {
            audioElement.play();
            dispatch(setIsAudioPlay(true));
        }
        return;
    }, [audioElement]);

    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            videoLink && (
                <div className="py-10 px-10 section-mb layout-mw bg-[#FAF9F5]">
                    <div className="flex gap-2 justify-center pb-5">
                        <img className="w-10" src={flower7} />
                        <span className="text-4xl font-[SFUTrajanRegular] text-[#7F4E26] pl-1 pr-1 text-center">
                            VIDEO
                        </span>
                        <img className="w-10" src={flower8} />
                    </div>
                    <div className="pt-5  pb-3">
                        <YouTube
                            videoId={youtubeId}
                            opts={{ width: "100%", height: "325" }}
                            onPlay={onPlay}
                            onPause={onPause}
                            loading="lazy"
                        />
                    </div>
                </div>
            )
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            videoLink && (
                <div className="py-10 px-3 section-mb layout-mw">
                    <div className="flex border-t-2 border-t-[#FFD6D1] justify-center pb-5">
                        <span className="text-3xl pt-8 pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                            VIDEO
                        </span>
                    </div>
                    <div className="pt-5  pb-3">
                        <YouTube
                            videoId={youtubeId}
                            opts={{ width: "100%", height: "325" }}
                            onPlay={onPlay}
                            onPause={onPause}
                            loading="lazy"
                        />
                    </div>
                </div>
            )
        );
    } else {
        return (
            videoLink && (
                <div className="py-10 px-3 section-mb layout-mw">
                    <TitleSection title="VIDEO" />
                    <div className="pt-5  pb-3">
                        <YouTube
                            videoId={youtubeId}
                            opts={{ width: "100%", height: "325" }}
                            onPlay={onPlay}
                            onPause={onPause}
                            loading="lazy"
                        />
                    </div>
                </div>
            )
        );
    }
};

export default React.memo(YoutubeVideo);
