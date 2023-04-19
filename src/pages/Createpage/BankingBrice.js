import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { NAME_INPUT_BRIDE } from "@/commons/Constant.ts";
import { ImageUpload } from "@/components/imageUpload";
import ImgUploadIcon from "@/components/icons/ImgUploadIcon";
import arrayMove from 'array-move-e5'
import Qrcode from "@/components/icons/IcQrcode";
import FormValidate from "@/utils/FormValidate";

const BankingBrice = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [qrBride, setqrBride] = useState([])
    const [qrFather, setQrFather] = useState([])
    const [qrMother, setQrMother] = useState([])

    const [value] = useState(fiedlsCreatePage)

    const refUnderfine = useRef(null)
    const refOwnerBride = useRef(null)
    const refNumberBankBride = useRef(null)
    const refOwnerFather = useRef(null)
    const refNumberBankFather = useRef(null)
    const refOwnerMother = useRef(null)
    const refNumberBankMother = useRef(null)

    const onChangeCreatLetter = useCallback(() => {

        const errMsgOwnerBride = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfBride)
        const errMsgNumberBankBride = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberBride)
        const errMsgOwnerFather = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfFatherBrice)
        const refNumberBankFather = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberFatherBrice)
        const errMsgOwnerMother = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfMotherBrice)
        const errMsgNumberBankMother = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberMotherBrice)

        refOwnerBride.current?.setErrorMsg(errMsgOwnerBride)
        refNumberBankBride.current?.setErrorMsg(errMsgNumberBankBride)
        refOwnerFather.current?.setErrorMsg(errMsgOwnerFather)
        refNumberBankFather.current?.setErrorMsg(refNumberBankFather)
        refOwnerMother.current?.setErrorMsg(errMsgOwnerMother)
        refNumberBankMother.current?.setErrorMsg(errMsgNumberBankMother)

        if (`${errMsgOwnerBride}${errMsgNumberBankBride}${errMsgOwnerFather}${refNumberBankFather}${errMsgOwnerMother}${errMsgNumberBankMother}`.length === 0) {
            console.log('bankingBride')
            return true
        }
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_BRIDE.nameBankOfBride:
                value.informationOfBride[0].nameBankOfBride = e;
                break

            case NAME_INPUT_BRIDE.ownerBankOfBride:
                value.informationOfBride[0].ownerBankOfBride = e;
                break

            case NAME_INPUT_BRIDE.bankOfNumberBride:
                value.informationOfBride[0].bankOfNumberBride = e;
                break

            case NAME_INPUT_BRIDE.nameBankOfFatherBrice:
                value.informationOfBride[0].nameBankOfFatherBrice = e;
                break

            case NAME_INPUT_BRIDE.ownerBankOfFatherBrice:
                value.informationOfBride[0].ownerBankOfFatherBrice = e;
                break

            case NAME_INPUT_BRIDE.bankOfNumberFatherBrice:
                value.informationOfBride[0].bankOfNumberFatherBrice = e;
                break

            case NAME_INPUT_BRIDE.nameBankOfMotherBrice:
                value.informationOfBride[0].nameBankOfBride = e;
                break

            case NAME_INPUT_BRIDE.ownerBankOfMotherBrice:
                value.informationOfBride[0].ownerBankOfMotherBrice = e;
                break

            case NAME_INPUT_BRIDE.bankOfNumberMotherBrice:
                value.informationOfBride[0].bankOfNumberMotherBrice = e;
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

    const onChangeBrice = (imageList) => {
        setqrBride(imageList)
        value.informationOfBride[0].qrCodeBriceLink = imageList
    }

    const onChangeFather = (imageList) => {
        setQrFather(imageList)
        value.informationOfBride[0].qrCodeFatherBriceLink = imageList
    }

    const onChangeMother = (imageList) => {
        setQrMother(imageList)
        value.informationOfBride[0].qrCodeMotherBriceLink = imageList
    }

    const onSortEnd = useCallback((oldIndex, newIndex) => {
        setqrBride((array) => arrayMove(array, oldIndex, newIndex))
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
            <h2>{Languages.text.women}</h2>

            <div className='inforBank_one_per'>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        {renderInput('', Languages.inputText.bride, Languages.inputText.bride, NAME_INPUT_BRIDE.nameBankOfBride, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerBride, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfBride, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankBride, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberBride, 'number', 14, false)}
                    </div>
                </div>
                <div className='list_album_uploads'>
                    {renderImageUploadSingle(
                        '',
                        qrBride,
                        '',
                        true,
                        onChangeBrice,
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
                        {renderInput('', Languages.inputText.father, Languages.inputText.father, NAME_INPUT_BRIDE.nameBankOfFatherBride, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerFather, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfFatherBride, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankFather, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberFatherBride, 'number', 14, false)}
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
                        {renderInput('', Languages.inputText.mother, Languages.inputText.mother, NAME_INPUT_BRIDE.nameBankOfMotherBrice, 'text', 200, true)}
                    </div>
                </div>
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerMother, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfMotherBride, 'text', 200, false)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankMother, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberMotherBride, 'number', 14, false)}
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

export default BankingBrice;
