import React from "react";
import TitleSection from "./sub-comp/TitleSection";
import ring from "../../assets/home-image/ring.svg";
import cup from "../../assets/home-image/cup.svg";
import dish from "../../assets/home-image/dish.svg";
import music from "../../assets/home-image/music.svg";
import TitleDescribeIcon from "../icons/TitleDescribeIcon";
import scheduleBgLeft from "../../assets/home-image/schedule-bg-left.svg";
import scheduleBgRight from "../../assets/home-image/schedule-bg-right.svg";

import pinkRing from "../../assets/invitation/pink/ring.svg";
import camera from "../../assets/invitation/pink/camera.svg";
import pinkCup from "../../assets/invitation/pink/cup.svg";
import pinkDish from "../../assets/invitation/pink/dish.svg";
import cake from "../../assets/invitation/pink/cake.svg";

import goldenRing from "../../assets/invitation/golden/ring.svg";
import goldenCamera from "../../assets/invitation/golden/camera.svg";
import goldenCup from "../../assets/invitation/golden/cup.svg";
import goldenDish from "../../assets/invitation/golden/dish.svg";
import goldenCake from "../../assets/invitation/golden/cake.svg";


import { INVITATION_STYLES } from "@/commons/Constant.ts";

const Schedule = ({ eventOfProgram, note, isUseEvent, invitationStyle }) => {
    const {
        timeToWellcome,
        timeToCelebrate,
        timeToDinner,
        timeToMusic,
        eventOfProgramEditOne,
        eventOfProgramEditTwo,
        eventOfProgramEditThree,
        eventOfProgramEditFour,
    } = eventOfProgram;
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div
                className="pt-10 pb-4 schedule-container section-mb layout-mw border-section-main bg-[#FAF9F5] px-8"
                id="schedule"
            >
                {isUseEvent && (
                    <>
                        <div className="flex border-t-2 pt-16 border-t-[#AD8955] justify-center pb-5">
                            <span className="text-4xl pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                                CHƯƠNG TRÌNH
                            </span>
                        </div>
                        <div className="flex text-xl  justify-center text-[#7F4E26] font-[MaitreeLight]">
                            <div className="">
                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={goldenRing}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToWellcome}</h3>
                                        <div>{eventOfProgramEditOne}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={goldenCamera}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToCelebrate}</h3>
                                        <div>{eventOfProgramEditTwo}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={goldenCup}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToDinner}</h3>
                                        <div>{eventOfProgramEditThree}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={goldenDish}
                                            className="w-8 ml-auto mr-auto"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToMusic}</h3>
                                        <div>{eventOfProgramEditFour}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {note && (
                    <div className="text-center pt-4 ">
                        <h2 className="text-second">Lưu ý</h2>
                        <p>{note}</p>
                    </div>
                )}
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div
                className="pt-10 pb-4 schedule-container section-mb layout-mw border-section-main px-8"
                id="schedule"
            >
                {isUseEvent && (
                    <>
                        <div className="flex border-t-2 border-t-[#FFD6D1] justify-center pb-5 pt-16">
                            <span className="text-3xl pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                                CHƯƠNG TRÌNH
                            </span>
                        </div>
                        <div className="flex text-xl justify-center font-[MavenPro]">
                            <div className="">
                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={pinkRing}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToWellcome}</h3>
                                        <div>{eventOfProgramEditOne}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={camera}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToCelebrate}</h3>
                                        <div>{eventOfProgramEditTwo}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={pinkCup}
                                            className="schedule-detail-img w-14"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToDinner}</h3>
                                        <div>{eventOfProgramEditThree}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={pinkDish}
                                            className="w-8 ml-auto mr-auto"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute"></div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToMusic}</h3>
                                        <div>{eventOfProgramEditFour}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {note && (
                    <div className="text-center pt-4 ">
                        <h2 className="text-second">Lưu ý</h2>
                        <p>{note}</p>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div
                className="pt-10 pb-4 schedule-container section-mb layout-mw border-section-main"
                id="schedule"
            >
                {isUseEvent && (
                    <>
                        <TitleSection title="CHƯƠNG TRÌNH" />
                        <div className="flex  justify-center ">
                            <div className="schedule-bg-lr schedule-bg-l">
                                <img
                                    src={scheduleBgLeft}
                                    alt="background left"
                                    className="schedule-bg"
                                />
                            </div>
                            <div className="">
                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={ring}
                                            className="schedule-detail-img"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute">
                                            <TitleDescribeIcon />
                                        </div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToWellcome}</h3>
                                        <h2>{eventOfProgramEditOne}</h2>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={cup}
                                            className="schedule-detail-img"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute">
                                            <TitleDescribeIcon />
                                        </div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToCelebrate}</h3>
                                        <h2>{eventOfProgramEditTwo}</h2>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={dish}
                                            className="schedule-detail-img"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute">
                                            <TitleDescribeIcon />
                                        </div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToDinner}</h3>
                                        <h2>{eventOfProgramEditThree}</h2>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center ">
                                    <div className="w-28">
                                        <img
                                            src={music}
                                            className="schedule-detail-img"
                                            alt="ring image"
                                        />
                                    </div>
                                    <div className="w-px bg-main icon-container mx-8 py-12">
                                        <div className="icon-absolute">
                                            <TitleDescribeIcon />
                                        </div>
                                    </div>
                                    <div className="w-28 text-center">
                                        <h3>{timeToMusic}</h3>
                                        <h2>{eventOfProgramEditFour}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="schedule-bg-lr schedule-bg-r">
                                <img
                                    src={scheduleBgRight}
                                    alt="background right"
                                    className="schedule-bg"
                                />
                            </div>
                        </div>
                        <div className="pb-6 border-section-1"></div>
                    </>
                )}

                {note && (
                    <div className="text-center pt-4 ">
                        <h2 className="text-second">Lưu ý</h2>
                        <p>{note}</p>
                    </div>
                )}
            </div>
        );
    }
};
export default React.memo(Schedule);
