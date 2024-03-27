import React, { useRef } from "react";
import TitleSection from "./sub-comp/TitleSection";
import InforPhone from "./sub-comp/InforPhone";
import InforPhonePink from "./pink/InforPhone";
import InforPhoneGolden from "./golden/InforPhone";
import Popup from "../modal/Popup";
import Languages from "@/commons/Languages";
import BankInfo from "./sub-comp/BankInfo";
import { Button } from "../button";
import { BUTTON_STYLES } from "@/commons/Constant.ts";
import IcChrysanthemum from "@/assets/home-image/IcChrysanthemum.svg";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import flower11 from "@/assets/invitation/golden/flower11.svg";
import flower12 from "@/assets/invitation/golden/flower12.svg";
const Congrats = ({
    informationOfBride,
    informationOfGroom,
    invitationStyle,
}) => {
    const {
        name: nameBride,
        fatherNameOfBride,
        motherNameOfBride,
        phoneNumberOfBride,
        phoneNumberOfFatherBride,
        phoneNumberOfMotherBride,
        nameBankOfBride,
        nameBankOfFatherBride,
        nameBankOfMotherBride,
        qrCodeBrideLink,
        qrCodeFatherBrideLink,
        qrCodeMotherBrideLink,
        isGoneFatherBride,
        isGoneMotherOfBride,
        bankOfNumberBride,
        bankOfNumberFatherBride,
        bankOfNumberMotherBride,
        ownerBankOfBride,
        ownerBankOfFatherBride,
        ownerBankOfMotherBride,
    } = informationOfBride;
    const {
        name: nameGroom,
        fatherNameOfGroom,
        motherNameOfGroom,
        phoneNumberOfGroom,
        phoneNumberOfFatherGroom,
        phoneNumberOfMotherGroom,
        nameBankOfGroom,
        nameBankOfFatherGroom,
        nameBankOfMotherGroom,
        qrCodeGroomLink,
        qrCodeFatherGroomLink,
        qrCodeMotherGroomLink,
        isGoneFather,
        isGoneMother,
        bankOfNumberFatherGroom,
        bankOfNumberGroom,
        bankOfNumberMotherGroom,
        ownerBankOfFatherGroom,
        ownerBankOfGroom,
        ownerBankOfMotherGroom,
    } = informationOfGroom;
    const modalRef = useRef();
    const modalRef1 = useRef();
    const handleShowModal = () => {
        modalRef.current.showModal();
    };
    const handleShowModal1 = () => {
        modalRef1.current.showModal();
    };
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div
                className="py-10 section-mb layout-mw border-section-main bg-[#FAF9F5] relative"
                id="congrat"
            >
                <div className="flex justify-center pb-5">
                    <span className="text-4xl pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                        CHÚC PHÚC
                    </span>
                </div>
                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around box-infor">
                        {nameGroom && (
                            <InforPhoneGolden
                                title={"Chú rể"}
                                name={`${nameGroom}`}
                                phoneNumber={phoneNumberOfGroom}
                                phoneColor="main"
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.GOLDEN}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal1();
                            }}
                            autocenter
                        />
                    </div>
                    <div className="justify-space-between box-infor">
                        {nameBride && (
                            <InforPhoneGolden
                                title={"Cô dâu"}
                                name={`${nameBride}`}
                                phoneNumber={phoneNumberOfBride}
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.WHITE}
                            textStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            borderStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal();
                            }}
                            autocenter
                        />
                    </div>
                </div>
                <img className="absolute w-1/4 left-0" src={flower11} />
                <div className="interface font-[MaitreeLight]">
                    <h2>
                        <span className="text-3xl mt-10 text-[#7F4E26]">
                            Đại diện gia đình
                        </span>
                    </h2>
                </div>

                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around">
                        <div className="interface_title font-[NettoOT] text-[#AD8955]">
                            NHÀ TRAI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFather ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfGroom && "Ông."}{" "}
                                {fatherNameOfGroom}
                            </p>
                            <p>
                                {isGoneMother ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfGroom && "Bà."} {motherNameOfGroom}
                            </p>
                        </div>
                    </div>
                    <div className="justify-space-between">
                        <div className="interface_title font-[NettoOT] text-[#AD8955]">
                            NHÀ GÁI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFatherBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfBride && "Ông."}{" "}
                                {fatherNameOfBride}
                            </p>
                            <p>
                                {isGoneMotherOfBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfBride && "Bà."} {motherNameOfBride}
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="pt-10 text-center font-[MaitreeLight] text-[#7F4E26]">
                    Trân trọng cảm ơn!
                </h2>
                <img className="mx-auto w-1/2" src={flower12} />
                <Popup
                    ref={modalRef1}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfGroom}
                            nameBankOfFather={nameBankOfFatherGroom}
                            nameBankOfMother={nameBankOfMotherGroom}
                            qrCode={qrCodeGroomLink}
                            qrCodeFatherLink={qrCodeFatherGroomLink}
                            qrCodeMotherLink={qrCodeMotherGroomLink}
                            numberBank={bankOfNumberGroom}
                            numberBankFather={bankOfNumberFatherGroom}
                            numberBankMother={bankOfNumberMotherGroom}
                            ownerBank={ownerBankOfGroom}
                            ownerBankFather={ownerBankOfFatherGroom}
                            ownerBankMother={ownerBankOfMotherGroom}
                            isGoneFather={isGoneFather}
                            isGoneMother={isGoneMother}
                            isBride={false}
                        />
                    }
                />
                <Popup
                    ref={modalRef}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfBride}
                            nameBankOfFather={nameBankOfFatherBride}
                            nameBankOfMother={nameBankOfMotherBride}
                            qrCode={qrCodeBrideLink}
                            qrCodeFatherLink={qrCodeFatherBrideLink}
                            qrCodeMotherLink={qrCodeMotherBrideLink}
                            isBride={true}
                            isGoneFather={isGoneFatherBride}
                            isGoneMother={isGoneMotherOfBride}
                            numberBank={bankOfNumberBride}
                            numberBankFather={bankOfNumberFatherBride}
                            numberBankMother={bankOfNumberMotherBride}
                            ownerBank={ownerBankOfBride}
                            ownerBankFather={ownerBankOfFatherBride}
                            ownerBankMother={ownerBankOfMotherBride}
                        />
                    }
                />
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div
                className="py-10 section-mb layout-mw border-section-main"
                id="congrat"
            >
                <div className="flex justify-center pb-5">
                    <span className="text-xl pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                        CHÚC PHÚC
                    </span>
                </div>
                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around box-infor">
                        {nameGroom && (
                            <InforPhonePink
                                title={"Chú rể"}
                                name={`${nameGroom}`}
                                phoneNumber={phoneNumberOfGroom}
                                phoneColor="main"
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.PASTEL_PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal1();
                            }}
                            autocenter
                        />
                    </div>
                    <div className="justify-space-between box-infor">
                        {nameBride && (
                            <InforPhonePink
                                title={"Cô dâu"}
                                name={`${nameBride}`}
                                phoneNumber={phoneNumberOfBride}
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.WHITE}
                            textStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            borderStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal();
                            }}
                            autocenter
                        />
                    </div>
                </div>
                <div className="interface font-[NexaLight]">
                    <h2>
                        <span className="text-[#F9959D]">
                            Đại diện gia đình
                        </span>
                    </h2>
                </div>

                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around">
                        <div className="interface_title font-[NettoOT] text-[#F9959D]">
                            NHÀ TRAI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFather ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfGroom && "Ông."}{" "}
                                {fatherNameOfGroom}
                            </p>
                            <p>
                                {isGoneMother ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfGroom && "Bà."} {motherNameOfGroom}
                            </p>
                        </div>
                    </div>
                    <div className="justify-space-between">
                        <div className="interface_title font-[NettoOT] text-[#F9959D]">
                            NHÀ GÁI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFatherBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfBride && "Ông."}{" "}
                                {fatherNameOfBride}
                            </p>
                            <p>
                                {isGoneMotherOfBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfBride && "Bà."} {motherNameOfBride}
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="pt-10 text-center font-[NexaBold] text-[#F9959D]">
                    Trân trọng cảm ơn!
                </h2>
                <Popup
                    ref={modalRef1}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfGroom}
                            nameBankOfFather={nameBankOfFatherGroom}
                            nameBankOfMother={nameBankOfMotherGroom}
                            qrCode={qrCodeGroomLink}
                            qrCodeFatherLink={qrCodeFatherGroomLink}
                            qrCodeMotherLink={qrCodeMotherGroomLink}
                            numberBank={bankOfNumberGroom}
                            numberBankFather={bankOfNumberFatherGroom}
                            numberBankMother={bankOfNumberMotherGroom}
                            ownerBank={ownerBankOfGroom}
                            ownerBankFather={ownerBankOfFatherGroom}
                            ownerBankMother={ownerBankOfMotherGroom}
                            isGoneFather={isGoneFather}
                            isGoneMother={isGoneMother}
                            isBride={false}
                        />
                    }
                />
                <Popup
                    ref={modalRef}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfBride}
                            nameBankOfFather={nameBankOfFatherBride}
                            nameBankOfMother={nameBankOfMotherBride}
                            qrCode={qrCodeBrideLink}
                            qrCodeFatherLink={qrCodeFatherBrideLink}
                            qrCodeMotherLink={qrCodeMotherBrideLink}
                            isBride={true}
                            isGoneFather={isGoneFatherBride}
                            isGoneMother={isGoneMotherOfBride}
                            numberBank={bankOfNumberBride}
                            numberBankFather={bankOfNumberFatherBride}
                            numberBankMother={bankOfNumberMotherBride}
                            ownerBank={ownerBankOfBride}
                            ownerBankFather={ownerBankOfFatherBride}
                            ownerBankMother={ownerBankOfMotherBride}
                        />
                    }
                />
            </div>
        );
    } else {
        return (
            <div
                className="py-10 section-mb layout-mw border-section-main border-section"
                id="congrat"
            >
                <TitleSection title="CHÚC PHÚC" />
                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around box-infor">
                        {nameGroom && (
                            <InforPhone
                                title={"Chú rể"}
                                name={`${nameGroom}`}
                                phoneNumber={phoneNumberOfGroom}
                                phoneColor="main"
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal1();
                            }}
                            autocenter
                        />
                    </div>
                    <div className="justify-space-between box-infor">
                        {nameBride && (
                            <InforPhone
                                title={"Cô dâu"}
                                name={`${nameBride}`}
                                phoneNumber={phoneNumberOfBride}
                                nameSizeLg={true}
                            />
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.ORANGE}
                            label="Mừng Cưới"
                            rounded={true}
                            onPress={() => {
                                handleShowModal();
                            }}
                            autocenter
                        />
                    </div>
                </div>
                <div className="interface">
                    <h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                        >
                            <path
                                d="M8.86551 9.38218C10.0644 9.93863 11.7003 8.66998 12.4414 8.09498C13.8079 7.0346 15.4301 5.00758 14.8732 3.80414C14.5368 3.077 13.7051 3.2735 12.8707 2.08771C12.3622 1.3651 12.4677 1.00334 12.0127 0.728965C11.2593 0.274843 10.0984 0.739831 9.43825 1.22972C9.2576 1.36329 8.45349 1.99218 8.00797 3.7326C7.59279 5.35168 7.30483 8.65731 8.86551 9.38218Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86265 9.38258C9.36838 8.70253 9.00889 7.52263 8.29035 5.16328C7.69361 3.20462 7.13716 2.57845 6.86007 2.30272C6.46436 1.90836 5.6521 1.09882 4.42828 1.08705C3.18227 1.07482 1.87696 1.89297 1.56772 2.94655C1.24762 4.03635 2.10787 4.98625 1.63926 5.44943C1.24354 5.84107 0.432641 5.35706 0.208975 5.66404C-0.0604189 6.03349 0.742331 7.24735 1.71079 8.09583C3.91892 10.0291 7.81631 10.7893 8.86265 9.38258Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86457 9.38176C7.76572 7.84281 3.99284 8.89141 1.99887 10.0971C0.920835 10.7491 0.498859 11.3644 0.282438 11.8851C-0.120069 12.8545 -0.148593 14.3133 0.568585 14.8887C0.927626 15.1771 1.33692 15.1332 1.92733 15.6756C2.23974 15.9622 2.27324 16.1098 2.42809 16.2479C3.13757 16.8786 5.13742 16.18 6.43323 15.1753C8.28956 13.7351 9.85658 10.7708 8.86457 9.38176Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M14.1578 17.1054C13.739 17.3744 12.8959 16.4861 12.0121 16.8908C11.7319 17.0194 11.6246 17.1964 11.4398 17.3916C10.638 18.2378 9.05288 18.7028 8.15007 18.3211C6.48118 17.6161 6.89184 13.9134 6.9344 13.5295C7.02585 12.7059 7.3455 9.8182 8.86543 9.38174C10.6104 8.88008 12.7148 11.9602 13.514 13.5295C14.3113 15.0956 14.6418 16.7944 14.1578 17.1054Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86522 9.38249C8.5922 11.0948 12.476 13.8531 14.8725 13.1015C15.6214 12.8665 15.9243 12.3839 17.3754 11.9574C18.4294 11.6477 19.0719 11.6667 19.2349 11.242C19.3906 10.8363 18.9143 10.5307 18.5195 9.52556C18.0663 8.37102 18.4059 8.03869 18.0903 7.52299C17.2672 6.17828 13.8601 6.64554 11.5823 7.52299C10.1809 8.06269 9.00331 8.51635 8.86522 9.38249Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                        </svg>
                        <span>Đại diện gia đình</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                        >
                            <path
                                d="M8.86551 9.38218C10.0644 9.93863 11.7003 8.66998 12.4414 8.09498C13.8079 7.0346 15.4301 5.00758 14.8732 3.80414C14.5368 3.077 13.7051 3.2735 12.8707 2.08771C12.3622 1.3651 12.4677 1.00334 12.0127 0.728965C11.2593 0.274843 10.0984 0.739831 9.43825 1.22972C9.2576 1.36329 8.45349 1.99218 8.00797 3.7326C7.59279 5.35168 7.30483 8.65731 8.86551 9.38218Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86265 9.38258C9.36838 8.70253 9.00889 7.52263 8.29035 5.16328C7.69361 3.20462 7.13716 2.57845 6.86007 2.30272C6.46436 1.90836 5.6521 1.09882 4.42828 1.08705C3.18227 1.07482 1.87696 1.89297 1.56772 2.94655C1.24762 4.03635 2.10787 4.98625 1.63926 5.44943C1.24354 5.84107 0.432641 5.35706 0.208975 5.66404C-0.0604189 6.03349 0.742331 7.24735 1.71079 8.09583C3.91892 10.0291 7.81631 10.7893 8.86265 9.38258Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86457 9.38176C7.76572 7.84281 3.99284 8.89141 1.99887 10.0971C0.920835 10.7491 0.498859 11.3644 0.282438 11.8851C-0.120069 12.8545 -0.148593 14.3133 0.568585 14.8887C0.927626 15.1771 1.33692 15.1332 1.92733 15.6756C2.23974 15.9622 2.27324 16.1098 2.42809 16.2479C3.13757 16.8786 5.13742 16.18 6.43323 15.1753C8.28956 13.7351 9.85658 10.7708 8.86457 9.38176Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M14.1578 17.1054C13.739 17.3744 12.8959 16.4861 12.0121 16.8908C11.7319 17.0194 11.6246 17.1964 11.4398 17.3916C10.638 18.2378 9.05288 18.7028 8.15007 18.3211C6.48118 17.6161 6.89184 13.9134 6.9344 13.5295C7.02585 12.7059 7.3455 9.8182 8.86543 9.38174C10.6104 8.88008 12.7148 11.9602 13.514 13.5295C14.3113 15.0956 14.6418 16.7944 14.1578 17.1054Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                            <path
                                d="M8.86522 9.38249C8.5922 11.0948 12.476 13.8531 14.8725 13.1015C15.6214 12.8665 15.9243 12.3839 17.3754 11.9574C18.4294 11.6477 19.0719 11.6667 19.2349 11.242C19.3906 10.8363 18.9143 10.5307 18.5195 9.52556C18.0663 8.37102 18.4059 8.03869 18.0903 7.52299C17.2672 6.17828 13.8601 6.64554 11.5823 7.52299C10.1809 8.06269 9.00331 8.51635 8.86522 9.38249Z"
                                fill="#91ADA3"
                                fill-opacity="0.5"
                            />
                        </svg>
                    </h2>
                </div>

                <div
                    className="flex justify-space-between"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around">
                        <div className="interface_title interface_groom">
                            NHÀ TRAI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFather ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfGroom && "Ông."}{" "}
                                {fatherNameOfGroom}
                            </p>
                            <p>
                                {isGoneMother ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfGroom && "Bà."} {motherNameOfGroom}
                            </p>
                        </div>
                    </div>
                    <div className="justify-space-between">
                        <div className="interface_title interface_bride">
                            NHÀ GÁI
                        </div>
                        <div className="family">
                            <p>
                                {isGoneFatherBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {fatherNameOfBride && "Ông."}{" "}
                                {fatherNameOfBride}
                            </p>
                            <p>
                                {isGoneMotherOfBride ? (
                                    <img src={IcChrysanthemum} />
                                ) : (
                                    ""
                                )}{" "}
                                {motherNameOfBride && "Bà."} {motherNameOfBride}
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="pt-10 text-center ">Trân trọng cảm ơn!</h2>
                <Popup
                    ref={modalRef1}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfGroom}
                            nameBankOfFather={nameBankOfFatherGroom}
                            nameBankOfMother={nameBankOfMotherGroom}
                            qrCode={qrCodeGroomLink}
                            qrCodeFatherLink={qrCodeFatherGroomLink}
                            qrCodeMotherLink={qrCodeMotherGroomLink}
                            numberBank={bankOfNumberGroom}
                            numberBankFather={bankOfNumberFatherGroom}
                            numberBankMother={bankOfNumberMotherGroom}
                            ownerBank={ownerBankOfGroom}
                            ownerBankFather={ownerBankOfFatherGroom}
                            ownerBankMother={ownerBankOfMotherGroom}
                            isGoneFather={isGoneFather}
                            isGoneMother={isGoneMother}
                            isBride={false}
                        />
                    }
                />
                <Popup
                    ref={modalRef}
                    btnCancelText={Languages.common.cancel}
                    btnSubmitText={Languages.common.delete}
                    content={
                        <BankInfo
                            nameBank={nameBankOfBride}
                            nameBankOfFather={nameBankOfFatherBride}
                            nameBankOfMother={nameBankOfMotherBride}
                            qrCode={qrCodeBrideLink}
                            qrCodeFatherLink={qrCodeFatherBrideLink}
                            qrCodeMotherLink={qrCodeMotherBrideLink}
                            isBride={true}
                            isGoneFather={isGoneFatherBride}
                            isGoneMother={isGoneMotherOfBride}
                            numberBank={bankOfNumberBride}
                            numberBankFather={bankOfNumberFatherBride}
                            numberBankMother={bankOfNumberMotherBride}
                            ownerBank={ownerBankOfBride}
                            ownerBankFather={ownerBankOfFatherBride}
                            ownerBankMother={ownerBankOfMotherBride}
                        />
                    }
                />
            </div>
        );
    }
};
export default React.memo(Congrats);
