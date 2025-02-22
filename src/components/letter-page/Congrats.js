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
import { INVITATION_STYLES } from "@/commons/Constant.ts";
import gradient from "@/assets/invitation/golden/gradient.jpg";

const Congrats = ({
    informationOfBride,
    informationOfGroom,
    invitationStyle,
}) => {
    const {
        name: nameBride,
        phoneNumberOfBride,
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
        phoneNumberOfGroom,
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
                className="py-10 section-mb layout-mw bg-[#FAF9F5] relative"
                id="congrat"
            >
                <div className="flex justify-center pb-5 px-3">
                    <span className="border-t-2 py-16 w-full border-t-[#AD8955] text-4xl pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                        CHÚC PHÚC
                    </span>
                </div>
                <div
                    className="flex justify-space-between mb-24"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around box-infor">
                        {nameGroom && (
                            <>
                                <InforPhoneGolden
                                    title={"Chú rể"}
                                    name={`${nameGroom}`}
                                    phoneNumber={phoneNumberOfGroom}
                                    phoneColor="main"
                                    nameSizeLg={true}
                                />
                                <br />
                            </>
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.GOLDEN}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Mừng Cưới"
                            onPress={() => {
                                handleShowModal1();
                            }}
                            backgroundImageUrl={gradient}
                            autocenter
                        />
                    </div>
                    <div className="justify-space-between box-infor">
                        {nameBride && (
                            <>
                                <InforPhoneGolden
                                    title={"Cô dâu"}
                                    name={`${nameBride}`}
                                    phoneNumber={phoneNumberOfBride}
                                    nameSizeLg={true}
                                />
                                <br />
                            </>
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.WHITE}
                            textStyle={BUTTON_STYLES.BORDER_GOLDEN}
                            borderStyle={BUTTON_STYLES.BORDER_GOLDEN}
                            label="Mừng Cưới"
                            onPress={() => {
                                handleShowModal();
                            }}
                            autocenter
                        />
                    </div>
                </div>
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
            <div className="pt-10 section-mb layout-mw" id="congrat">
                <div className="flex justify-center pb-5 px-3">
                    <span className="text-3xl pt-16 pb-16 border-t-2 border-t-[#FFD6D1] w-full pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                        CHÚC PHÚC
                    </span>
                </div>
                <div
                    className="flex justify-space-between mb-24"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="justify-around box-infor">
                        {nameGroom && (
                            <>
                                <InforPhonePink
                                    title={"Chú rể"}
                                    name={`${nameGroom}`}
                                    phoneNumber={phoneNumberOfGroom}
                                    phoneColor="main"
                                    nameSizeLg={true}
                                />
                                <br />
                            </>
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.PASTEL_PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Mừng Cưới"
                            onPress={() => {
                                handleShowModal1();
                            }}
                            autocenter
                        />
                    </div>
                    <div className="justify-space-between box-infor">
                        {nameBride && (
                            <>
                                <InforPhonePink
                                    title={"Cô dâu"}
                                    name={`${nameBride}`}
                                    phoneNumber={phoneNumberOfBride}
                                    nameSizeLg={true}
                                />
                                <br />
                            </>
                        )}
                        <Button
                            buttonStyle={BUTTON_STYLES.WHITE}
                            textStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            borderStyle={BUTTON_STYLES.BORDER_PASTEL_PINK}
                            label="Mừng Cưới"
                            onPress={() => {
                                handleShowModal();
                            }}
                            autocenter
                        />
                    </div>
                </div>
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
