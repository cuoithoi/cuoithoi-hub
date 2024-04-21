import React, { useEffect, useState } from "react";
import TitleSection from "./sub-comp/TitleSection";
import mapIcon from "../../assets/home-image/map-icon.png";
import background from "../../assets/home-image/time-schedule-bg.png";
import ph_map from "../../assets/home-image/ph_map-pin.png";
import Calendar from "./sub-comp/Calendar";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import { formatDay } from "@/utils/helpers";
import CountDown from "./sub-comp/Countdown";
import flower9 from "@/assets/invitation/golden/flower9.svg";
import flower10 from "@/assets/invitation/golden/flower10.svg";
import gradient from "@/assets/invitation/golden/gradient.svg";

const TimeLocation = ({
    timeAndLocationOfWedding,
    timeAndLocationOfEgagement,
    timeAndLocationOfInterrogation,
    isUseDamNgo,
    invitationStyle,
}) => {
    const [embeddedMap, setEmbeddedMap] = useState("");

    const {
        dateOfEventInterrogation,
        locationOfInterrogation,
        timeOfEventInterrogation,
    } = timeAndLocationOfInterrogation;
    const { dateOfEventEgagement, locationOfEgagement, timeOfEventEgagement } =
        timeAndLocationOfEgagement;
    const {
        dateOfEventWedding,
        locationOfWedding,
        timeOfEventWedding,
        mapDirectLink,
        namelocationOfWedding,
    } = timeAndLocationOfWedding;

    useEffect(() => {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = mapDirectLink.match(regex);
        if (match) {
            const latitude = match[1];
            const longitude = match[2];
            const iframeCode = `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&amp;output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
            setEmbeddedMap(iframeCode);
        }
    }, []);
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div
                className="pb-10 section-mb layout-mw bg-[#FAF9F5]"
                id="time-location"
            >
                <img className="mx-auto w-[40%]" src={flower9} />
                <div className="mt-10 text-center ">
                    <div className="flex justify-center pb-5">
                        <span className="text-[1.5rem] sm:text-3xl pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                            THỜI GIAN & ĐỊA ĐIỂM
                        </span>
                    </div>
                    <div className="font-[NexaBold] text-[#F9959D]">
                        <Calendar
                            dateOfEventWedding={dateOfEventWedding}
                            titleIcon={false}
                            showWeekday={false}
                        />
                    </div>
                    <img className="absolute left-[-2rem] w-1/3" src={flower10} />

                    <div className="font-[SFUFeniceRegular] text-4xl text-[#7F4E26] mb-12 mt-36">
                        <CountDown className="text-4xl" dateOfEventWedding={dateOfEventWedding} />
                    </div>

                    <h2 className="font-[RokkittExtraLight] mb-12 mt-6 text-[#808080]">
                        Tiệc Mừng Được Tổ Chức Vào Lúc{" "}
                        {timeOfEventWedding && timeOfEventWedding}
                    </h2>

                    <p className="font-[MaitreeLight] mb-12 text-[#7F4E26] text-3xl">
                        <span>{namelocationOfWedding}</span>
                    </p>
                    <p className="margin-auto pb-8 border-section-1 font-[MavenPro] text-[#808080]">
                        {locationOfWedding}
                    </p>
                </div>
                {mapDirectLink && (
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: embeddedMap }}
                        ></div>
                    </div>
                )}
                <div className="flex justify-center pt-6 mt-2">
                    <button className={`relative rounded-md w-3/4 px-6 sm:px-16`} style={{
                            backgroundImage: `url(`+gradient+`)`,
                            backgroundSize: "190%",
                            backgroundPosition: "center"
                        }}>
                        <img src={mapIcon} alt="" className="gg-map-icon"/>
                        <a
                            href={mapDirectLink}
                            target="_blank"
                            className="pl-12 pr-3 py-3 link-map font-[NettoOT]"
                        >
                            Chỉ đường trên Google Maps
                        </a>
                    </button>
                </div>
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div
                className="pt-10 pb-10 section-mb layout-mw"
                id="time-location"
            >
                <div className=" text-center ">
                    <div className="flex justify-center pb-5">
                        <span className="text-3xl pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                            THỜI GIAN & ĐỊA ĐIỂM
                        </span>
                    </div>
                    <div className="mb-16 font-[NexaBold] text-[#F9959D]">
                        <Calendar
                            dateOfEventWedding={dateOfEventWedding}
                            titleIcon={false}
                            showWeekday={false}
                        />
                    </div>

                    <div className="font-[NettoOT] mb-8 text-[#F9959D]">
                        <CountDown dateOfEventWedding={dateOfEventWedding} />
                    </div>

                    <h2 className="font-[NettoOT] mb-16 text-[#808080]">
                        Tiệc Mừng Được Tổ Chức Vào Lúc{" "}
                        {timeOfEventWedding && timeOfEventWedding}
                    </h2>

                    <p className="font-[NEXABOLD] text-[#F9959D] text-[1.5rem] mb-8">
                        <span>{namelocationOfWedding}</span>
                    </p>
                    <p className="margin-auto pb-8 border-section-1 font-[MavenPro] text-[#808080]">
                        {locationOfWedding}
                    </p>
                </div>
                {mapDirectLink && (
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: embeddedMap }}
                        ></div>
                    </div>
                )}
                <div className="flex justify-center pt-6 mt-2">
                    <button className="relative bg-[#FFD6D1] rounded-md w-3/4 px-6 sm:px-16">
                        <img src={mapIcon} alt="" className="gg-map-icon" />
                        <a
                            href={mapDirectLink}
                            target="_blank"
                            className="pl-12 pr-3 py-3 link-map font-[NettoOT]"
                        >
                            Chỉ đường trên Google Maps
                        </a>
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="pt-10 pb-10 bg-main-bg section-mb layout-mw"
                id="time-location"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className=" text-center ">
                    <TitleSection title="THỜI GIAN & ĐỊA ĐIỂM" />

                    <Calendar dateOfEventWedding={dateOfEventWedding} />
                    <div className="text-second ">
                        <CountDown dateOfEventWedding={dateOfEventWedding} />
                    </div>

                    <h2 className="text-second">
                        Tiệc Mừng Được Tổ Chức Vào Lúc{" "}
                        {timeOfEventWedding && timeOfEventWedding}
                    </h2>

                    <p className="namelocationOfWedding">
                        <img src={ph_map} />{" "}
                        <span>{namelocationOfWedding}</span>
                    </p>
                    <p className="margin-auto pb-6 border-section-1 addlocationOfWedding">
                        {locationOfWedding}
                    </p>
                </div>
                {mapDirectLink && (
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: embeddedMap }}
                        ></div>
                    </div>
                )}
                <div className="flex justify-center pt-6 mt-2">
                    <button className="btn-map">
                        <img src={mapIcon} alt="" className="gg-map-icon" />
                        <a
                            href={mapDirectLink}
                            target="_blank"
                            className="pl-12 pr-3 py-3 link-map "
                        >
                            Chỉ đường trên Google Maps
                        </a>
                    </button>
                </div>
            </div>
        );
    }
};
export default React.memo(TimeLocation);
