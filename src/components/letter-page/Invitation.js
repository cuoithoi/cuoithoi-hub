import React from "react";
import invitationBg from "../../assets/home-image/invitation-bg.png";
import { getDayOfWeeks, formatDay } from "@/utils/helpers";
import InvitationRight from "../icons/InvitationRight";
import InvitationLeft from "../icons/InvitationLeft";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import flower2 from "@/assets/invitation/golden/flower2.svg";
import flower3 from "@/assets/invitation/golden/flower3.svg";
import flower4 from "@/assets/invitation/golden/flower4.svg";

const Invitation = ({
    timeAndLocationOfWedding,
    contentOfInvitation,
    invitationStyle,
}) => {
    const {
        dateOfEventWedding,
        locationOfWedding,
        namelocationOfWedding,
        timeOfEventWedding,
    } = timeAndLocationOfWedding;
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <section
                className="overflow-hidden relative bg-[#FAF9F5] bg-center bg-no-repeat bg-[size:140%] section-mb layout-mw h-[44rem] md:bg-contain"
                id="invitation"
            >
                <div className="section-mb text-center py-10 pr-2 pl-2 pt-20">
                    <img
                        className="absolute top-0 left-[-0.5rem] w-1/3"
                        src={flower2}
                    />
                    <img
                        className="absolute top-10 right-[-2rem] w-1/3"
                        src={flower3}
                    />
                    <div className="flex justify-center pt-20 pb-5">
                        <span className="font-[SFUTrajanRegular] text-[#7F4E26] text-[2rem] pl-1 pr-1 text-center">
                            LỜI MỜI
                        </span>
                    </div>
                    <div className="mt-6 pb-4">
                        <p className="m-auto w-5/6 text-[#333333] font-[RokkittExtraLight]">
                            Thân mời quý khách tới dự bữa tiệc chung vui <br />{" "}
                            cùng gia đình chúng tôi vào hồi
                        </p>
                    </div>
                    <div>
                        {/* <div className='flex justify-center pt-4 md:grid md:grid-cols-2 md:gap-4' style={{ paddingTop: '1.5rem' }}>
              <InvitationDetail info={informationOfGroom} isBride={false} />
              <InvitationDetail info={informationOfBride} isBride={true} />
            </div> */}

                        <div className="mt-10">
                            {dateOfEventWedding && (
                                <div className="text-xl text-[#7F4E26] font-[MaitreeLight]">
                                    {timeOfEventWedding &&
                                        timeOfEventWedding + " - "}{" "}
                                    {getDayOfWeeks(dateOfEventWedding)}, ngày{" "}
                                    {formatDay(dateOfEventWedding)}
                                </div>
                            )}
                        </div>

                        {locationOfWedding && (
                            <div className="text-[#7F4E26] font-[MaitreeLight]">
                                <h2 className="text-[1rem] sm:text-[1.2rem]">TẠI: {namelocationOfWedding}</h2>
                                <p className="font-[RokkittExtraLight] text-[#4D4D4D] mt-16 px-20">
                                    {locationOfWedding}
                                </p>
                                <div
                                    className="pt-4 font-[RokkittExtraLight]"
                                    dangerouslySetInnerHTML={{
                                        __html: contentOfInvitation,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <img
                        className="absolute bottom-0 right-[-0.5rem] w-1/3"
                        src={flower4}
                    />
                </div>
            </section>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <section
                className="bg-center bg-no-repeat bg-[size:140%] layout-mw bg-invitation md:bg-contain"
                id="invitation"
            >
                <div className="text-center py-10 pr-2 pl-2 pt-32">
                    <div className="flex justify-center pb-5">
                        <span className="font-[SFUGlytusRegular] text-[#F9959D] text-[3rem] pl-1 pr-1 text-center">
                            LỜI MỜI
                        </span>
                    </div>
                    <div className="pb-4 pt-20">
                        <p className="text-lg hidden">Thân mời,</p>

                        <p className="m-auto w-5/6 leading-8 font-[MavenPro] text-[0.9rem] sm:text-[1.2rem]">
                            Thân mời quý khách tới dự bữa tiệc chung vui <br />{" "}
                            cùng gia đình chúng tôi vào hồi
                        </p>
                    </div>
                    <div>
                        {/* <div className='flex justify-center pt-4 md:grid md:grid-cols-2 md:gap-4' style={{ paddingTop: '1.5rem' }}>
              <InvitationDetail info={informationOfGroom} isBride={false} />
              <InvitationDetail info={informationOfBride} isBride={true} />
            </div> */}

                        <div className="">
                            {dateOfEventWedding && (
                                <div className="text-[1.5rem] text-[#F9959D] pt-16 font-[NettoOT]">
                                    {timeOfEventWedding &&
                                        timeOfEventWedding + " - "}{" "}
                                    {getDayOfWeeks(dateOfEventWedding)}, ngày{" "}
                                    {formatDay(dateOfEventWedding)}
                                </div>
                            )}
                        </div>

                        {locationOfWedding && (
                            <div className="pb-20 font-[NettoOT]">
                                <h2 className="text-[#F9959D] pt-2 text-[1.2rem] sm:text-[1.5rem]">
                                    TẠI: {namelocationOfWedding}
                                </h2>
                                <p className="w-5/6 mx-auto pt-20 text-[1rem] sm:text-[1.2rem]">{locationOfWedding}</p>
                                <div
                                    className="w-5/6 mx-auto pt-4 text-[1.2rem]"
                                    dangerouslySetInnerHTML={{
                                        __html: contentOfInvitation,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section
                className="bg-center bg-no-repeat bg-[size:140%] section-mb layout-mw bg-invitation md:bg-contain"
                id="invitation"
                style={{ backgroundImage: `url(${invitationBg})` }}
            >
                <div className="section-mb text-center py-10 pr-2 pl-2 pt-20">
                    <div className="flex justify-center pb-5">
                        <InvitationLeft />
                        <span className="text-xl pl-1 pr-1 text-center invitation_title">
                            LỜI MỜI
                        </span>
                        <InvitationRight />
                    </div>
                    <div className="pb-4">
                        <p className="text-lg hidden">Thân mời,</p>

                        <p className="invitation_desp">
                            Thân mời quý khách tới dự bữa tiệc mừng hạnh phúc
                            cùng gia đình chúng tôi vào lúc
                        </p>
                    </div>
                    <div>
                        {/* <div className='flex justify-center pt-4 md:grid md:grid-cols-2 md:gap-4' style={{ paddingTop: '1.5rem' }}>
              <InvitationDetail info={informationOfGroom} isBride={false} />
              <InvitationDetail info={informationOfBride} isBride={true} />
            </div> */}

                        <div className="outstanding_box">
                            {dateOfEventWedding && (
                                <h2 className="title_outstanding">
                                    {timeOfEventWedding &&
                                        timeOfEventWedding + " - "}{" "}
                                    {getDayOfWeeks(dateOfEventWedding)}, ngày{" "}
                                    {formatDay(dateOfEventWedding)}
                                </h2>
                            )}
                        </div>

                        {locationOfWedding && (
                            <div className="outstanding_box">
                                <h2 className="title_outstanding">
                                    TẠI: {namelocationOfWedding}
                                </h2>
                                <p className="px-20">{locationOfWedding}</p>
                                <div
                                    className="px-20"
                                    dangerouslySetInnerHTML={{
                                        __html: contentOfInvitation,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
};

export default React.memo(Invitation);
