import React, { useCallback, useEffect, useState } from "react";
import { formatDayHero } from "@/utils/helpers";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import suongMai from "@/assets/invitation/frame/suong-mai.png";
import huongDiem from "@/assets/invitation/frame/huong-diem.png";
import songVu from "@/assets/invitation/frame/song-vu.png";
import tinhKhoi from "@/assets/invitation/frame/tinh-khoi.png";
import vuonXuan from "@/assets/invitation/frame/vuon-xuan.png";

import saveDate from "@/assets/invitation/golden/saveDate.svg";
import flower1 from "@/assets/invitation/golden/flower1.svg";

const Hero = ({
    effectImage,
    manName,
    womanName,
    coverImage,
    timeAndLocationOfWedding,
    invitationStyle,
}) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(coverImage);
    }, [coverImage]);

    const renderEffectImage = useCallback(() => {
        let img = suongMai;
        if (effectImage === "suong-mai") img = suongMai;
        if (effectImage === "huong-diem") img = huongDiem;
        if (effectImage === "song-vu") img = songVu;
        if (effectImage === "tinh-khoi") img = tinhKhoi;
        if (effectImage === "vuon-xuan") img = vuonXuan;
        return img;
    }, []);

    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <>
                <div
                    className={`text-center  relative section-mb layout-mw bg-no-repeat bg-[#FAF9F5] bg-center bg-contain h-[72rem] pt-10`}
                    id="hero"
                    // style={
                    //     url ? { backgroundImage: `url('${url}')` } : undefined
                    // }
                >
                    <div className="bg-no-repeat bg-center bg-cover h-[62rem]">
                        <div className="">
                            <h2 className="font-['SFUTrajanRegular'] text-lg">
                                Thân mời tới dự bữa tiệc
                            </h2>
                            <div className="text-3xl pt-12 px-10 font-['SFUTrajanRegular'] text-left">
                                <div className="relative">{`${manName}`}</div>
                                <div className="pl-24 relative">{`& ${womanName}`}</div>
                            </div>
                            <img
                                className="w-full aspect-[1077/1017] mt-4 object-cover"
                                src={url}
                            />
                            <h1
                                className={`text-5xl pt-12 text-[#AD8955] font-['SVNWallows'] mb-0`}
                            >
                                {timeAndLocationOfWedding.dateOfEventWedding &&
                                    formatDayHero(
                                        timeAndLocationOfWedding.dateOfEventWedding
                                    )}
                            </h1>
                            <img
                                className="absolute right-0 w-1/3"
                                src={flower1}
                            />
                            <img
                                className="mt-20 w-11/12 mx-auto"
                                src={saveDate}
                            />
                        </div>
                    </div>
                    {/* <AudioPlay song={song} /> */}
                </div>
            </>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <>
                <div
                    className={`text-center  relative section-mb layout-mw h-[900px] pt-10`}
                    id="hero"
                >
                    <h2 className="font-['SFUDinLight'] text-xl">
                        Thân mời tới dự bữa tiệc
                    </h2>
                    <h1 className={`text-5xl relative z-20 pt-2 font-['SFUTrajanRegular']`}>
                        {timeAndLocationOfWedding.dateOfEventWedding &&
                            formatDayHero(
                                timeAndLocationOfWedding.dateOfEventWedding,
                                true
                            )}
                    </h1>
                    <div className="relative mt-[-5rem]">
                        <img className="relative z-10 w-full" src={renderEffectImage()} />
                        <div className="absolute top-[11.0%] h-[77.2%]">
                            <img
                                className="object-cover w-full h-full"
                                src={url}
                            />
                        </div>
                    </div>

                    <div className="mt-[-5rem]">
                        <div className="relative text-[3rem] z-20 font-['NETTOOT'] leading-[2.5rem]">{`${manName}`}</div>
                        <div className="z-10 relative text-[10rem] text-[#F9C2C6] leading-[4.5rem] opacity-50">
                            {" "}
                            &{" "}
                        </div>
                        <div className="relative text-[3rem] font-['NETTOOT'] z-10">{`${womanName}`}</div>
                    </div>
                    {/* <AudioPlay song={song} /> */}
                </div>
                <div style={{ paddingBottom: 300 }}></div>
            </>
        );
    } else {
        return (
            <>
                <div
                    className={`text-center  relative section-mb layout-mw bg-no-repeat bg-center bg-contain`}
                    id="hero"
                    style={
                        url ? { backgroundImage: `url('${url}')` } : undefined
                    }
                >
                    <div
                        className="bg-no-repeat bg-center bg-cover py-20"
                        style={{
                            backgroundImage: `url(${renderEffectImage()})`,
                        }}
                    >
                        <div>
                            <h2>Thân mời tới dự bữa tiệc</h2>
                            <h1 className="pb-96">
                                <span className="text_block_line_mb">{`${manName}`}</span>
                                <span className="text_block_line_mb"> & </span>
                                <span className="text_block_line_mb">{`${womanName}`}</span>
                            </h1>
                            <div className="flex justify-center pt-3 w-full">
                                <img src={""} alt="" className="w-full" />
                            </div>
                            <div
                                className="positions_moblie"
                                style={{ position: "relative", top: 120 }}
                            >
                                <div>
                                    <h1
                                        className={`wind-song big-size text-9xl pt-20`}
                                    >
                                        {timeAndLocationOfWedding.dateOfEventWedding &&
                                            formatDayHero(
                                                timeAndLocationOfWedding.dateOfEventWedding
                                            )}
                                    </h1>
                                    <h1>
                                        SAVE
                                        <span className="wind-song text-main text-2xl">
                                            the
                                        </span>
                                        DATE
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <AudioPlay song={song} /> */}
                </div>
                <div style={{ paddingBottom: 60, background: "#f4f5f6" }}></div>
            </>
        );
    }
};

export default React.memo(Hero);
