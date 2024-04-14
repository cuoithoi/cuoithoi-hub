import React, { useCallback, useEffect, useState } from "react";
import TitleSection from "./sub-comp/TitleSection";
import WeddingCmt from "./sub-comp/WeddingCmt";
import PinkWeddingCmt from "./pink/WeddingCmt";
import GoldenWeddingCmt from "./golden/WeddingCmt";
import { Carousel } from "react-responsive-carousel";
import { Button } from "../button";
import { BUTTON_STYLES } from "@/commons/Constant.ts";
import Popup from "../modal/Popup";
import { useRef } from "react";
import WriteMessage from "./sub-comp/WriteMessage";
import { customFetch } from "@/utils/axios";
import CommentDetail from "@/pages/CommentDetail";
import { Convert } from "../../commons/Constant.ts";
import { INVITATION_STYLES } from "@/commons/Constant.ts";
import gradient from "@/assets/invitation/golden/gradient.jpg";

const Message = ({ id, invitationStyle }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cmtList, setCmtList] = useState([]);
    const [cmtListProps, setCmtListProps] = useState([]);
    const cmtRef = useRef();
    const modalRef = useRef();
    const handleShowModal = () => {
        modalRef.current.showModal();
    };
    const handleCloseModalWriting = () => {
        modalRef.current.hideModal();
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const resp = await customFetch.get(`/get/list-wish?_id=${id}`);
                setCmtList(resp.data.data[0].data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    const deleteCmt = (index) => {
        let newCmtList = cmtList;
        newCmtList = newCmtList.filter(function (_, i) {
            return i !== index;
        });
        setCmtList(newCmtList);
    };

    const handleShowCmtDetail = async () => {
        const resp = await customFetch.get(`/get/list-wish?_id=${id}`);
        setCmtListProps(resp.data.data[0].data);
        cmtRef.current.showModal();
    };

    if (isLoading) return;
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div className="layout-mw section-mb py-10 bg-[#FAF9F5] py-10 px-3">
                <div className="flex border-t-2 border-t-[#AD8955]  justify-center pb-5">
                    <span className="text-3xl pt-16 pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                        LỜI CHÚC
                    </span>
                </div>
                {cmtList.length > 0 ? (
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        showArrows={true}
                        centerMode={true}
                        showIndicators={false}
                        swipeable
                        emulateTouch
                        className="slider_cmt"
                        renderThumbs={() => null}
                        // centerSlidePercentage={100}
                    >
                        {cmtList?.map((cmt, index) => {
                            return (
                                <GoldenWeddingCmt
                                    cmt={cmt}
                                    index={index}
                                    key={index}
                                    deleteCmt={() => deleteCmt(index)}
                                />
                            );
                        })}
                    </Carousel>
                ) : (
                    <p className="text-center">
                        Chưa có danh sách lời chúc để hiện thị
                    </p>
                )}
                <div className="flex justify-center items-center gap-6">
                    {/* <Link to={'/' + Alias.letterPage + '/' + Alias.congrats}> */}
                    <Button
                        label="Xem tất cả"
                        buttonStyle={BUTTON_STYLES.PASTEL_PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                        backgroundImageUrl={gradient}
                        onPress={() => {
                            handleShowCmtDetail();
                        }}
                    />
                    {/* </Link> */}
                    <Button
                        label="Viết lời chúc"
                        buttonStyle={BUTTON_STYLES.WHITE}
                        textStyle={BUTTON_STYLES.BORDER_GOLDEN}
                        borderStyle={BUTTON_STYLES.BORDER_GOLDEN}
                        onPress={() => {
                            handleShowModal();
                        }}
                    />
                </div>
                <Popup
                    ref={modalRef}
                    content={
                        <WriteMessage
                            id={id}
                            setCmtList={setCmtList}
                            handleCloseModal={handleCloseModalWriting}
                        />
                    }
                />
                <Popup
                    ref={cmtRef}
                    height={"80vh"}
                    content={
                        <CommentDetail
                            handleDeleteCmt={deleteCmt}
                            cmtLists={cmtListProps}
                        />
                    }
                    maxWidth={Convert.W_800}
                />
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div className="layout-mw section-mb py-10 px-3">
                <div className="flex justify-center pb-5 border-t-2 border-t-[#FFD6D1]">
                    <span className="text-3xl pt-16 pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                        LỜI CHÚC
                    </span>
                </div>
                {cmtList.length > 0 ? (
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        showArrows={true}
                        centerMode={true}
                        showIndicators={false}
                        swipeable
                        emulateTouch
                        className="slider_cmt"
                        renderThumbs={() => null}
                        // centerSlidePercentage={100}
                    >
                        {cmtList?.map((cmt, index) => {
                            return (
                                <PinkWeddingCmt
                                    cmt={cmt}
                                    index={index}
                                    key={index}
                                    deleteCmt={() => deleteCmt(index)}
                                />
                            );
                        })}
                    </Carousel>
                ) : (
                    <p className="text-center">
                        Chưa có danh sách lời chúc để hiện thị
                    </p>
                )}
                <div className="flex justify-center items-center gap-6">
                    {/* <Link to={'/' + Alias.letterPage + '/' + Alias.congrats}> */}
                    <Button
                        label="Xem tất cả"
                        buttonStyle={BUTTON_STYLES.PASTEL_PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                        rounded={true}
                        onPress={() => {
                            handleShowCmtDetail();
                        }}
                    />
                    {/* </Link> */}
                    <Button
                        label="Viết lời chúc"
                        buttonStyle={BUTTON_STYLES.WHITE}
                        textStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                        borderStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                        rounded={true}
                        onPress={() => {
                            handleShowModal();
                        }}
                    />
                </div>
                <Popup
                    ref={modalRef}
                    content={
                        <WriteMessage
                            id={id}
                            setCmtList={setCmtList}
                            handleCloseModal={handleCloseModalWriting}
                        />
                    }
                />
                <Popup
                    ref={cmtRef}
                    height={"80vh"}
                    content={
                        <CommentDetail
                            handleDeleteCmt={deleteCmt}
                            cmtLists={cmtListProps}
                        />
                    }
                    maxWidth={Convert.W_800}
                />
            </div>
        );
    } else {
        return (
            <div className="layout-mw section-mb py-10">
                <TitleSection title="LỜI CHÚC" />
                {cmtList.length > 0 ? (
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        showArrows={true}
                        centerMode={true}
                        showIndicators={false}
                        swipeable
                        emulateTouch
                        className="slider_cmt"
                        renderThumbs={() => null}
                        // centerSlidePercentage={100}
                    >
                        {cmtList?.map((cmt, index) => {
                            return (
                                <WeddingCmt
                                    cmt={cmt}
                                    index={index}
                                    key={index}
                                    deleteCmt={() => deleteCmt(index)}
                                />
                            );
                        })}
                    </Carousel>
                ) : (
                    <p className="text-center">
                        Chưa có danh sách lời chúc để hiện thị
                    </p>
                )}
                <div className="flex justify-center items-center gap-6">
                    {/* <Link to={'/' + Alias.letterPage + '/' + Alias.congrats}> */}
                    <Button
                        label="Xem tất cả"
                        buttonStyle={BUTTON_STYLES.BORDER_LIGHT_BLUE}
                        rounded={true}
                        onPress={() => {
                            handleShowCmtDetail();
                        }}
                    />
                    {/* </Link> */}
                    <Button
                        label="Viết lời chúc"
                        buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
                        rounded={true}
                        onPress={() => {
                            handleShowModal();
                        }}
                    />
                </div>
                <Popup
                    ref={modalRef}
                    content={
                        <WriteMessage
                            id={id}
                            setCmtList={setCmtList}
                            handleCloseModal={handleCloseModalWriting}
                        />
                    }
                />
                <Popup
                    ref={cmtRef}
                    height={"80vh"}
                    content={
                        <CommentDetail
                            handleDeleteCmt={deleteCmt}
                            cmtLists={cmtListProps}
                        />
                    }
                    maxWidth={Convert.W_800}
                />
            </div>
        );
    }
};

export default React.memo(Message);
