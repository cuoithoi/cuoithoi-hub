import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BankData, NAME_INPUT_GROOM, itemLocal } from "@/commons/Constant.ts";
import { ImageUpload } from "@/components/imageUpload";
import ImgUploadIcon from "@/components/icons/ImgUploadIcon";
import arrayMove from 'array-move-e5'
import Qrcode from "@/components/icons/IcQrcode";
import FormValidate from "@/utils/FormValidate";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/axios";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import { useBaseService } from "@/utils/BaseServices";

const BankingGroom = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const { get } = useBaseService()

    const [qrGroom, setQrGroom] = useState([])
    const [qrFather, setQrFather] = useState([])
    const [qrMother, setQrMother] = useState([])
    const [dataBank, setDataBank] = useState([])

    const refUnderfine = useRef(null)
    const refOwnerGroom = useRef(null)
    const refNumberBankGroom = useRef(null)
    const refOwnerFather = useRef(null)
    const refNumberBankFather = useRef(null)
    const refOwnerMother = useRef(null)
    const refNumberBankMother = useRef(null)

    const [value, setValue] = useState(fiedlsCreatePage)

    const itemLocal = getItemFromLocalStorage('createLeter')

    useEffect(() => {

        if (itemLocal) {

            itemLocal.informationOfGroom.nameBankOfGroom && (value.informationOfGroom[0].nameBankOfGroom = itemLocal.informationOfGroom.nameBankOfGroom)
            itemLocal.informationOfGroom.nameBankOfFatherGroom && (value.informationOfGroom[0].nameBankOfFatherGroom = itemLocal.informationOfGroom.nameBankOfFatherGroom)
            itemLocal.informationOfGroom.nameBankOfMotherGroom && (value.informationOfGroom[0].nameBankOfMotherGroom = itemLocal.informationOfGroom.nameBankOfMotherGroom)

            itemLocal.informationOfGroom.ownerBankOfGroom && (value.informationOfGroom[0].ownerBankOfGroom = itemLocal.informationOfGroom.ownerBankOfGroom)
            itemLocal.informationOfGroom.bankOfNumberGroom && (value.informationOfGroom[0].bankOfNumberGroom = itemLocal.informationOfGroom.bankOfNumberGroom)
            itemLocal.informationOfGroom.ownerBankOfFatherGroom && (value.informationOfGroom[0].ownerBankOfFatherGroom = itemLocal.informationOfGroom.ownerBankOfFatherGroom)
            itemLocal.informationOfGroom.bankOfNumberFatherGroom && (value.informationOfGroom[0].bankOfNumberFatherGroom = itemLocal.informationOfGroom.bankOfNumberFatherGroom)
            itemLocal.informationOfGroom.ownerBankOfMotherGroom && (value.informationOfGroom[0].ownerBankOfMotherGroom = itemLocal.informationOfGroom.ownerBankOfMotherGroom)
            itemLocal.informationOfGroom.bankOfNumberMotherGroom && (value.informationOfGroom[0].bankOfNumberMotherGroom = itemLocal.informationOfGroom.bankOfNumberMotherGroom)
            itemLocal.informationOfGroom.qrCodeFatherGroomLink && (value.informationOfGroom[0].qrCodeFatherGroomLink = itemLocal.informationOfGroom.qrCodeFatherGroomLink)
            itemLocal.informationOfGroom.qrCodeMotherGroomLink && (value.informationOfGroom[0].qrCodeMotherGroomLink = itemLocal.informationOfGroom.qrCodeMotherGroomLink)
            itemLocal.informationOfGroom.qrCodeGroomLink && (value.informationOfGroom[0].qrCodeGroomLink = itemLocal.informationOfGroom.qrCodeGroomLink)
        } else {
            value.informationOfGroom[0].ownerBankOfGroom = ''
            value.informationOfGroom[0].bankOfNumberGroom = ''
            value.informationOfGroom[0].ownerBankOfFatherGroom = ''
            value.informationOfGroom[0].bankOfNumberFatherGroom = ''
            value.informationOfGroom[0].ownerBankOfMotherGroom = ''
            value.informationOfGroom[0].bankOfNumberMotherGroom = ''
            value.informationOfGroom[0].qrCodeFatherGroomLink = ''
            value.informationOfGroom[0].qrCodeMotherGroomLink = ''
            value.informationOfGroom[0].qrCodeGroomLink = ''
        }
    }, [])

    const onChangeCreatLetter = useCallback(() => {

        const errMsgOwnerGroom = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfGroom)
        const errMsgNumberBankGroom = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberGroom)
        const errMsgOwnerFather = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfFatherGroom)
        const refNumberBankFather = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberFatherGroom)
        const errMsgOwnerMother = FormValidate.inputContentEmpty(value.informationOfGroom[0].ownerBankOfMotherGroom)
        const errMsgNumberBankMother = FormValidate.inputContentEmpty(value.informationOfGroom[0].bankOfNumberMotherGroom)


        // refOwnerGroom.current?.setErrorMsg(errMsgOwnerGroom)
        // refNumberBankGroom.current?.setErrorMsg(errMsgNumberBankGroom)
        // refOwnerFather.current?.setErrorMsg(errMsgOwnerFather)
        // refNumberBankFather.current?.setErrorMsg(refNumberBankFather)
        // refOwnerMother.current?.setErrorMsg(errMsgOwnerMother)
        // refNumberBankMother.current?.setErrorMsg(errMsgNumberBankMother)

        if (`${errMsgOwnerGroom}${errMsgNumberBankGroom}${errMsgOwnerFather}${refNumberBankFather}${errMsgOwnerMother}${errMsgNumberBankMother}`.length === 0) {
            return true
        }
        return false

    }, [value])

    useEffect(() => {

        const asyncListBank = async () => {
            const response = await get(BankData);
            setDataBank(response.data)
        };
        asyncListBank();

    }, [])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_GROOM.nameBankOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['nameBankOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.ownerBankOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['ownerBankOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.bankOfNumberGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['bankOfNumberGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.nameBankOfFatherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['nameBankOfFatherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.ownerBankOfFatherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['ownerBankOfFatherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.bankOfNumberFatherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['bankOfNumberFatherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.nameBankOfMotherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['nameBankOfMotherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.ownerBankOfMotherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['ownerBankOfMotherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.bankOfNumberMotherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['bankOfNumberMotherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
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
            values
        ) => {


            return (
                <div className='item_field_single'>
                    <MyTextInput
                        ref={ref === '' ? refUnderfine : ref}
                        label={label}
                        value={values}
                        name={name}
                        placeHolder={placehodel}
                        type={type}
                        maxLength={maxLength}
                        isIcon={isIcon}
                        icon={icon}
                        styleGroup={'man_inputStyle'}
                        onChangeText={(e) => onChangeText(e.target.value, name)}
                        onKeyPress={onKeyPress}
                    />
                </div>
            )
        },
        [refUnderfine]
    )

    const onChangeGroom = (imageList) => {
        setQrGroom(imageList)
        if (imageList.length > 0) {
            uploadImage(imageList[0].file)
                .then((response) => {
                    value.informationOfGroom[0].qrCodeGroomLink = response.data.data;
                })
                .catch((error) => {
                    toast.error(error)
                });
        }
    }

    const onChangeFather = (imageList) => {
        setQrFather(imageList)
        if (imageList.length > 0) {
            uploadImage(imageList[0].file)
                .then((response) => {
                    value.informationOfGroom[0].qrCodeFatherGroomLink = response.data.data;
                })
                .catch((error) => {
                    toast.error(error)
                });
        }
    }

    const onChangeMother = (imageList) => {
        setQrMother(imageList)
        if (imageList.length > 0) {
            uploadImage(imageList[0].file)
                .then((response) => {
                    value.informationOfGroom[0].qrCodeMotherGroomLink = response.data.data;
                })
                .catch((error) => {
                    toast.error(error)
                });
        }
    }

    const onSortEnd = useCallback((oldIndex, newIndex) => {
        setQrGroom((array) => arrayMove(array, oldIndex, newIndex))
        setQrFather((array) => arrayMove(array, oldIndex, newIndex))
        setQrMother((array) => arrayMove(array, oldIndex, newIndex))
    }, [])

    const renderImageUploadSingle = useCallback(
        (title, images, desc, allowDrag, onChange, max, height, icon, titleImages, urlLocal) => {
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
                        urlLocal={urlLocal}
                    />
                </div>
            )
        },
        [onSortEnd]
    )

    const renderBank = useCallback((name, label, itemlocal) => {

        return <div className='fullwidth_input_colum'>
            <div className='single_hor_input man_inputStyle' style={{ marginBottom: 10 }}>
                <label className="Input_label__90o4b">{label}</label>
                <select
                    className='form_sellect_control'
                    name='form_sellect_stt'
                    onChange={(e) => onChangeText(e.target.value, name)}
                    style={{ maxWidth: 'unset' }}
                >
                    <option value={itemlocal ? itemlocal : Languages.text.bank}>{itemlocal ? itemlocal : Languages.text.bank}</option>
                    {

                        dataBank.map(function (item, index) {

                            return <option key={index} value={item?.amount}>{item?.name} </option>

                        })
                    }
                </select>
            </div>
        </div>

    }, [dataBank])

    return (
        <div className='section_banking_groom'>
            <h2>{Languages.text.man}</h2>

            <div className='inforBank_one_per'>

                {renderBank(NAME_INPUT_GROOM.nameBankOfGroom, 'Ngân Hàng Chú rể', value.informationOfGroom[0].nameBankOfGroom)}
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerGroom, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfGroom, 'text', 200, false, '', value.informationOfGroom[0].ownerBankOfGroom)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankGroom, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberGroom, 'number', 14, false, '', value.informationOfGroom[0].bankOfNumberGroom)}
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
                        Languages.text.qrcode,
                        itemLocal?.informationOfGroom.qrCodeGroomLink
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                {renderBank(NAME_INPUT_GROOM.nameBankOfFatherGroom, 'Ngân Hàng Bố Chú rể', value.informationOfGroom[0].nameBankOfFatherGroom)}

                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerFather, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfFatherGroom, 'text', 200, false, '', value.informationOfGroom[0].ownerBankOfFatherGroom)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankFather, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberFatherGroom, 'number', 14, false, '', value.informationOfGroom[0].bankOfNumberFatherGroom)}
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
                        Languages.text.qrcode,
                        itemLocal?.informationOfGroom.qrCodeFatherGroomLink
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                {renderBank(NAME_INPUT_GROOM.nameBankOfMotherGroom, 'Ngân Hàng Mẹ Chú rể', value.informationOfGroom[0].nameBankOfMotherGroom)}

                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerMother, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_GROOM.ownerBankOfMotherGroom, 'text', 200, false, '', value.informationOfGroom[0].ownerBankOfMotherGroom)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankMother, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_GROOM.bankOfNumberMotherGroom, 'number', 14, false, '', value.informationOfGroom[0].bankOfNumberMotherGroom)}
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
                        Languages.text.qrcode,
                        itemLocal?.informationOfGroom.qrCodeMotherGroomLink
                    )}
                </div>
            </div>


        </div>

    )
});

export default BankingGroom;
