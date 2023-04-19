import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { NAME_INPUT_GROOM } from "@/commons/Constant.ts";
import { ImageUpload } from "@/components/imageUpload";
import ImgUploadIcon from "@/components/icons/ImgUploadIcon";
import arrayMove from 'array-move-e5'
import Qrcode from "@/components/icons/IcQrcode";
import FormValidate from "@/utils/FormValidate";

const BankingGroom = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [qrGroom, setQrGroom] = useState([])
    const [qrFather, setQrFather] = useState([])
    const [qrMother, setQrMother] = useState([])

    const refUnderfine = useRef(null)
    const refOwnerGroom = useRef(null)
    const refNumberBankGroom = useRef(null)
    const refOwnerFather = useRef(null)
    const refNumberBankFather = useRef(null)
    const refOwnerMother = useRef(null)
    const refNumberBankMother = useRef(null)

    const [value] = useState(fiedlsCreatePage)

    const onChangeCreatLetter = useCallback(() => {

        const errMsgOwnerGroom = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfGroom)
        const errMsgNumberBankGroom = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberGroom)
        const errMsgOwnerFather = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfFatherGroom)
        const refNumberBankFather = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberFatherGroom)
        const errMsgOwnerMother = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfMotherGroom)
        const errMsgNumberBankMother = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberMotherGroom)


        refOwnerGroom.current?.setErrorMsg(errMsgOwnerGroom)
        refNumberBankGroom.current?.setErrorMsg(errMsgNumberBankGroom)
        refOwnerFather.current?.setErrorMsg(errMsgOwnerFather)
        refNumberBankFather.current?.setErrorMsg(refNumberBankFather)
        refOwnerMother.current?.setErrorMsg(errMsgOwnerMother)
        refNumberBankMother.current?.setErrorMsg(errMsgNumberBankMother)

        if (`${errMsgOwnerGroom}${errMsgNumberBankGroom}${errMsgOwnerFather}${refNumberBankFather}${errMsgOwnerMother}${errMsgNumberBankMother}`.length === 0) {
            console.log('bankingGroom')
            return true
        }
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_GROOM.nameBankOfGroom:
                value.informationOfGroom[0].nameBankOfGroom = e;
                break

            case NAME_INPUT_GROOM.ownerBankOfGroom:
                value.informationOfGroom[0].ownerBankOfGroom = e;
                break

            case NAME_INPUT_GROOM.bankOfNumberGroom:
                value.informationOfGroom[0].bankOfNumberGroom = e;
                break

            case NAME_INPUT_GROOM.nameBankOfFatherGroom:
                value.informationOfGroom[0].nameBankOfFatherGroom = e;
                break

            case NAME_INPUT_GROOM.ownerBankOfFatherGroom:
                value.informationOfGroom[0].ownerBankOfFatherGroom = e;
                break

            case NAME_INPUT_GROOM.bankOfNumberFatherGroom:
                value.informationOfGroom[0].bankOfNumberFatherGroom = e;
                break

            case NAME_INPUT_GROOM.nameBankOfMotherGroom:
                value.informationOfGroom[0].nameBankOfMotherGroom = e;
                break

            case NAME_INPUT_GROOM.ownerBankOfMotherGroom:
                value.informationOfGroom[0].ownerBankOfMotherGroom = e;
                break

            case NAME_INPUT_GROOM.bankOfNumberMotherGroom:
                value.informationOfGroom[0].bankOfNumberMotherGroom = e;
                break

            default:
                break
        }


    }, [value]);

    const onKeyPress = useCallback(() => {

        return

    }, []);

    const renderInput = useCallback(
        (
            ref,
            label,
            placehodel,
            name,
            type,
            maxLength,
            isIcon,
            icon,
            inputStyle,
        ) => {


            return (
                <div className='item_field_single'>
                    <MyTextInput
                        ref={ref === '' ? refUnderfine : ref}
                        label={label}
                        name={name}
                        placeHolder={placehodel}
                        type={type}
                        maxLength={maxLength}
                        isIcon={isIcon}
                        icon={icon}
                        styleGroup={'man_inputStyle'}
                        onChangeText={(e) => onChangeText(e.target.value, name)}
                        onKeyPress={onKeyPress}
                        inputStyle={inputStyle}
                    />
                </div>
            )
        },
        [refUnderfine]
    )

    const onChangeGroom = (imageList) => {
        setQrGroom(imageList)
        value.informationOfGroom[0].qrCodeGroomLink = imageList
    }

    const onChangeFather = (imageList) => {
        setQrFather(imageList)
        value.informationOfGroom[0].qrCodeFatherGroomLink = imageList
    }

    const onChangeMother = (imageList) => {
        setQrMother(imageList)
        value.informationOfGroom[0].qrCodeMotherGroomLink = imageList
    }

    const onSortEnd = useCallback((oldIndex, newIndex) => {
        setQrGroom((array) => arrayMove(array, oldIndex, newIndex))
        setQrFather((array) => arrayMove(array, oldIndex, newIndex))
        setQrMother((array) => arrayMove(array, oldIndex, newIndex))
    }, [])

    const renderImageUploadSingle = useCallback(
        (title, images, desc, allowDrag, onChange, max, height, icon, titleImages) => {
            return (
                <div className='uploading_single_img_group'>
                    <h2>{title}</h2>
                    <ImageUpload
                        icon={icon || <ImgUploadIcon />}
                        maxnumber={max || 1}
                        images={images}
                        maxW={'100%'}
                        height={height || 300}
                        desc={desc}
                        onChange={onChange}
                        onSortEnd={onSortEnd}
                        allowDrag={allowDrag}
                        title={titleImages || Languages.text.addonepic}
                    />
                </div>
            )
        },
        [onSortEnd]
    )

    return (
        <div className='section_banking_groom'>
            <h2>{Languages.text.man}</h2>

            <div className='inforBank_one_per'>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        {renderInput('', Languages.inputText.groom, Languages.inputText.groom, NAME_INPUT_GROOM.nameBankOfGroom, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerGroom, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfGroom, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankGroom, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberGroom, 'number', 14, false)}
                    </div>
                </div>
                <div className='list_album_uploads'>
                    {renderImageUploadSingle(
                        '',
                        qrGroom,
                        '',
                        true,
                        onChangeGroom,
                        1,
                        150,
                        <Qrcode />,
                        Languages.text.qrcode
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        {renderInput('', Languages.inputText.father, Languages.inputText.father, NAME_INPUT_GROOM.nameBankOfFatherGroom, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerFather, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfFatherGroom, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankFather, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberFatherGroom, 'number', 14, false)}
                    </div>
                </div>
                <div className='list_album_uploads'>
                    {renderImageUploadSingle(
                        '',
                        qrFather,
                        '',
                        true,
                        onChangeFather,
                        1,
                        150,
                        <Qrcode />,
                        Languages.text.qrcode
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        {renderInput('', Languages.inputText.mother, Languages.inputText.mother, NAME_INPUT_GROOM.nameBankOfMotherGroom, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerMother, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfMotherGroom, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankMother, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberMotherGroom, 'number', 14, false)}
                    </div>
                </div>
                <div className='list_album_uploads'>
                    {renderImageUploadSingle(
                        '',
                        qrMother,
                        '',
                        true,
                        onChangeMother,
                        1,
                        150,
                        <Qrcode />,
                        Languages.text.qrcode
                    )}
                </div>
            </div>


        </div>

    )
});

export default BankingGroom;
