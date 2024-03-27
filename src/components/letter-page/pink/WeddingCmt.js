import React, { useRef } from "react";
import msgCmtTitle from "@/assets/home-image/msgCmtTitle.png";
import closeIcon from "@/assets/svg/icon-close-outline.svg";
import { convertTimeFormat } from "@/utils/helpers";
import Popup from "@/components/modal/Popup";
import DeleteCmtInput from "../sub-comp/DeleteCmtInput";
const WeddingCmt = ({ viewDetail, cmt, deleteCmt, index, handleDeleteCmt }) => {
    const modalRef = useRef();
    return (
        <div
            className={`${!viewDetail && "max-w-md"} p-4 relative`}
            style={{ width: "100%" }}
        >
            <img
                className="close_icon"
                onClick={() => modalRef.current.showModal()}
                src={closeIcon}
                alt=""
                // className=' w-6 '
                style={{
                    width: "28px",
                    position: "absolute",
                    right: "24px",
                    top: "24px",
                    cursor: "pointer",
                    zIndex: "10 !important",
                }}
            />
            <div
                className="p-4 rounded-lg shadow text-left"
                style={{ background: "#FFFFFF", width: "100%" }}
            >
                <div>
                    <h2 className="text-xl font-medium text-[#D65156] font-[NettoOT]">
                        {cmt.namePeopleSend}
                    </h2>
                </div>
                <p className="text-text text-lg pt-4 font-[MavenPro]">{cmt.desWish}</p>
            </div>
            <Popup
                ref={modalRef}
                content={
                    <DeleteCmtInput
                        deleteCmt={deleteCmt}
                        _id={cmt._id}
                        handleCloseModal={() => modalRef?.current.hideModal()}
                        handleDeleteCmt={handleDeleteCmt}
                        index={index}
                    />
                }
            />
        </div>
    );
};

export default WeddingCmt;
