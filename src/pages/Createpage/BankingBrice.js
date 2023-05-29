import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BankData, NAME_INPUT_BRIDE } from "@/commons/Constant.ts";
import { ImageUpload } from "@/components/imageUpload";
import ImgUploadIcon from "@/components/icons/ImgUploadIcon";
import arrayMove from 'array-move-e5'
import Qrcode from "@/components/icons/IcQrcode";
import FormValidate from "@/utils/FormValidate";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/axios";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import { useBaseService } from "@/utils/BaseServices";

const BankingBrice = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [qrBride, setqrBride] = useState([])
    const [qrFather, setQrFather] = useState([])
    const [qrMother, setQrMother] = useState([])
    const [dataBank, setDataBank] = useState([])

    const [value, setValue] = useState(fiedlsCreatePage)

    const refUnderfine = useRef(null)
    const refOwnerBride = useRef(null)
    const refNumberBankBride = useRef(null)
    const refOwnerFather = useRef(null)
    const refNumberBankFather = useRef(null)
    const refOwnerMother = useRef(null)
    const refNumberBankMother = useRef(null)
    const itemLocal = getItemFromLocalStorage('createLeter')

    const { get } = useBaseService()

    useEffect(() => {

        if (itemLocal) {

            itemLocal.informationOfBride.nameBankOfBride && (value.informationOfBride[0].nameBankOfBride = itemLocal.informationOfBride.nameBankOfBride)
            itemLocal.informationOfBride.nameBankOfFatherBride && (value.informationOfBride[0].nameBankOfFatherBride = itemLocal.informationOfBride.nameBankOfFatherBride)
            itemLocal.informationOfBride.nameBankOfMotherBride && (value.informationOfBride[0].nameBankOfMotherBride = itemLocal.informationOfBride.nameBankOfMotherBride)

            itemLocal.informationOfBride.ownerBankOfBride && (value.informationOfBride[0].ownerBankOfBride = itemLocal.informationOfBride.ownerBankOfBride)
            itemLocal.informationOfBride.bankOfNumberBride && (value.informationOfBride[0].bankOfNumberBride = itemLocal.informationOfBride.bankOfNumberBride)
            itemLocal.informationOfBride.ownerBankOfFatherBride && (value.informationOfBride[0].ownerBankOfFatherBride = itemLocal.informationOfBride.ownerBankOfFatherBride)
            itemLocal.informationOfBride.bankOfNumberFatherBride && (value.informationOfBride[0].bankOfNumberFatherBride = itemLocal.informationOfBride.bankOfNumberFatherBride)
            itemLocal.informationOfBride.ownerBankOfMotherBride && (value.informationOfBride[0].ownerBankOfMotherBride = itemLocal.informationOfBride.ownerBankOfMotherBride)
            itemLocal.informationOfBride.bankOfNumberMotherBride && (value.informationOfBride[0].bankOfNumberMotherBride = itemLocal.informationOfBride.bankOfNumberMotherBride)
            itemLocal.informationOfBride.qrCodeFatherBrideLink && (value.informationOfBride[0].qrCodeFatherBrideLink = itemLocal.informationOfBride.qrCodeFatherBrideLink)
            itemLocal.informationOfBride.qrCodeMotherBrideLink && (value.informationOfBride[0].qrCodeMotherBrideLink = itemLocal.informationOfBride.qrCodeMotherBrideLink)
            itemLocal.informationOfBride.qrCodeBrideLink && (value.informationOfBride[0].qrCodeBrideLink = itemLocal.informationOfBride.qrCodeBrideLink)

        } else {
            value.informationOfBride[0].ownerBankOfBride = ''
            value.informationOfBride[0].bankOfNumberBride = ''
            value.informationOfBride[0].ownerBankOfFatherBride = ''
            value.informationOfBride[0].bankOfNumberFatherBride = ''
            value.informationOfBride[0].ownerBankOfMotherBride = ''
            value.informationOfBride[0].bankOfNumberMotherBride = ''
        }

    }, [])

    useEffect(() => {

        const asyncListBank = async () => {
            const response = await get(BankData);
            setDataBank(response.data)
        };
        asyncListBank();

    }, [])

    const onChangeCreatLetter = useCallback(() => {

        const errMsgOwnerBride = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfBride)
        const errMsgNumberBankBride = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberBride)
        const errMsgOwnerFather = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfFatherBride)
        const refNumberBankFather = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberFatherBride)
        const errMsgOwnerMother = FormValidate.inputContentEmpty(value.informationOfBride[0].ownerBankOfMotherBride)
        const errMsgNumberBankMother = FormValidate.inputContentEmpty(value.informationOfBride[0].bankOfNumberMotherBride)

        refOwnerBride.current?.setErrorMsg(errMsgOwnerBride)
        refNumberBankBride.current?.setErrorMsg(errMsgNumberBankBride)
        refOwnerFather.current?.setErrorMsg(errMsgOwnerFather)
        refNumberBankFather.current?.setErrorMsg(refNumberBankFather)
        refOwnerMother.current?.setErrorMsg(errMsgOwnerMother)
        refNumberBankMother.current?.setErrorMsg(errMsgNumberBankMother)

        if (`${errMsgOwnerBride}${errMsgNumberBankBride}${errMsgOwnerFather}${refNumberBankFather}${errMsgOwnerMother}${errMsgNumberBankMother}`.length === 0) {
            return true
        }
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_BRIDE.nameBankOfBride:
                value.informationOfBride[0].nameBankOfBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['nameBankOfBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });

                break

            case NAME_INPUT_BRIDE.ownerBankOfBride:
                value.informationOfBride[0].ownerBankOfBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['ownerBankOfBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.bankOfNumberBride:
                value.informationOfBride[0].bankOfNumberBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['bankOfNumberBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.nameBankOfFatherBride:
                value.informationOfBride[0].nameBankOfFatherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['nameBankOfFatherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.ownerBankOfFatherBride:
                value.informationOfBride[0].ownerBankOfFatherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['ownerBankOfFatherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.bankOfNumberFatherBride:
                value.informationOfBride[0].bankOfNumberFatherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['bankOfNumberFatherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.nameBankOfMotherBride:
                value.informationOfBride[0].nameBankOfMotherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['nameBankOfMotherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });

                break

            case NAME_INPUT_BRIDE.ownerBankOfMotherBride:
                value.informationOfBride[0].ownerBankOfMotherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['ownerBankOfMotherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
                    };
                });
                break

            case NAME_INPUT_BRIDE.bankOfNumberMotherBride:
                value.informationOfBride[0].bankOfNumberMotherBride = e;
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfBride];
                    newArray[0]['bankOfNumberMotherBride'] = e;
                    return {
                        ...prevValues,
                        informationOfBride: newArray
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

    const onChangeBrice = (imageList) => {
        setqrBride(imageList)
        if (imageList.length > 0) {
            uploadImage(imageList[0].file)
                .then((response) => {
                    value.informationOfBride[0].qrCodeBrideLink = response.data.data;
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
                    value.informationOfBride[0].qrCodeFatherBrideLink = response.data.data;
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
                    value.informationOfBride[0].qrCodeMotherBrideLink = response.data.data;
                })
                .catch((error) => {
                    toast.error(error)
                });
        }
    }

    const onSortEnd = useCallback((oldIndex, newIndex) => {
        setqrBride((array) => arrayMove(array, oldIndex, newIndex))
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
                <label className="Input_label">{label}</label>
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
        <div className='section_banking_Bride '>
            <h2>{Languages.text.women}</h2>

            <div className='inforBank_one_per'>
                {renderBank(NAME_INPUT_BRIDE.nameBankOfBride, 'Ngân Hàng Cô dâu', value.informationOfBride[0].nameBankOfBride)}
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerBride, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfBride, 'text', 200, false, '', value.informationOfBride[0].ownerBankOfBride)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankBride, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberBride, 'number', 16, false, '', value.informationOfBride[0].bankOfNumberBride)}
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
                        Languages.text.qrcode,
                        itemLocal?.informationOfBride.qrCodeBrideLink
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                {renderBank(NAME_INPUT_BRIDE.nameBankOfFatherBride, 'Ngân Hàng Bố Cô dâu', value.informationOfBride[0].nameBankOfFatherBride)}

                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerFather, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfFatherBride, 'text', 200, false, '', value.informationOfBride[0].ownerBankOfFatherBride)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankFather, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberFatherBride, 'number', 16, false, '', value.informationOfBride[0].bankOfNumberFatherBride)}
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
                        itemLocal?.informationOfBride.qrCodeFatherBrideLink
                    )}
                </div>
            </div>

            <div className='inforBank_one_per'>
                {renderBank(NAME_INPUT_BRIDE.nameBankOfMotherBride, 'Ngân Hàng Mẹ Cô dâu', value.informationOfBride[0].nameBankOfMotherBride)}
                <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                        {renderInput(refOwnerMother, Languages.text.accountHolder, Languages.text.accountHolder, NAME_INPUT_BRIDE.ownerBankOfMotherBride, 'text', 200, false, '', value.informationOfBride[0].ownerBankOfMotherBride)}
                    </div>
                    <div className='half_row_hor_input'>
                        {renderInput(refNumberBankMother, Languages.text.serinumber, Languages.text.serinumber, NAME_INPUT_BRIDE.bankOfNumberMotherBride, 'number', 16, false, '', value.informationOfBride[0].bankOfNumberMotherBride)}
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
                        itemLocal?.informationOfBride.qrCodeMotherBrideLink
                    )}
                </div>
            </div>


        </div>

    )
});

export default BankingBrice;
