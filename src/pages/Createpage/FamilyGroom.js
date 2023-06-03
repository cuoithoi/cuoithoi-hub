import { MyTextInput } from "@/components/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { NAME_INPUT_GROOM } from "@/commons/Constant.ts";
import TitleCreate from "@/components/createPage/subcomp/TitleCreate";
import FormValidate from "@/utils/FormValidate";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const FamilyGroom = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [value, setValue] = useState(fiedlsCreatePage)

    const refUnderfine = useRef(null)
    const refFirstnNameGroom = useRef(null)
    const refMiddleNameGroom = useRef(null)
    const refNameGroom = useRef(null)
    const refPhoneGroom = useRef(null)

    const refFirstnNameFather = useRef(null)
    const refMiddleNameFather = useRef(null)
    const refNameFather = useRef(null)
    const refPhoneFather = useRef(null)

    const refFirstnNameMother = useRef(null)
    const refMiddleNameMother = useRef(null)
    const refNameMother = useRef(null)
    const refPhoneMother = useRef(null)

    const itemLocal = getItemFromLocalStorage('createLeter')

    useEffect(() => {

        if (itemLocal) {
            itemLocal.informationOfGroom.firstName && (value.informationOfGroom[0].firstName = itemLocal.informationOfGroom.firstName)
            itemLocal.informationOfGroom.middleName && (value.informationOfGroom[0].middleName = itemLocal.informationOfGroom.middleName)
            itemLocal.informationOfGroom.name && (value.informationOfGroom[0].name = itemLocal.informationOfGroom.name)
            itemLocal.informationOfGroom.phoneNumberOfGroom && (value.informationOfGroom[0].phoneNumberOfGroom = itemLocal.informationOfGroom.phoneNumberOfGroom)
            itemLocal.informationOfGroom.firstFatherNameOfGroom && (value.informationOfGroom[0].firstFatherNameOfGroom = itemLocal.informationOfGroom.firstFatherNameOfGroom)
            itemLocal.informationOfGroom.middleFatherNameOfGroom && (value.informationOfGroom[0].middleFatherNameOfGroom = itemLocal.informationOfGroom.middleFatherNameOfGroom)
            itemLocal.informationOfGroom.fatherNameOfGroom && (value.informationOfGroom[0].fatherNameOfGroom = itemLocal.informationOfGroom.fatherNameOfGroom)
            itemLocal.informationOfGroom.phoneNumberOfFatherGroom && (value.informationOfGroom[0].phoneNumberOfFatherGroom = itemLocal.informationOfGroom.phoneNumberOfFatherGroom)
            itemLocal.informationOfGroom.isGoneFather && (value.informationOfGroom[0].isGoneFather = itemLocal.informationOfGroom.isGoneFather)
            itemLocal.informationOfGroom.firstMotherNameOfGroom && (value.informationOfGroom[0].firstMotherNameOfGroom = itemLocal.informationOfGroom.firstMotherNameOfGroom)
            itemLocal.informationOfGroom.middleMotherNameOfGroom && (value.informationOfGroom[0].middleMotherNameOfGroom = itemLocal.informationOfGroom.middleMotherNameOfGroom)
            itemLocal.informationOfGroom.motherNameOfGroom && (value.informationOfGroom[0].motherNameOfGroom = itemLocal.informationOfGroom.motherNameOfGroom)
            itemLocal.informationOfGroom.phoneNumberOfMotherGroom && (value.informationOfGroom[0].phoneNumberOfMotherGroom = itemLocal.informationOfGroom.phoneNumberOfMotherGroom)
            itemLocal.informationOfGroom.isGoneMother && (value.informationOfGroom[0].isGoneMother = itemLocal.informationOfGroom.isGoneMother)
        } else {
            value.informationOfGroom[0].firstName = ''
            value.informationOfGroom[0].middleName = ''
            value.informationOfGroom[0].name = ''
            value.informationOfGroom[0].phoneNumberOfGroom = ''
            value.informationOfGroom[0].firstFatherNameOfGroom = ''
            value.informationOfGroom[0].middleFatherNameOfGroom = ''
            value.informationOfGroom[0].fatherNameOfGroom = ''
            value.informationOfGroom[0].phoneNumberOfFatherGroom = ''
            value.informationOfGroom[0].isGoneFather = false
            value.informationOfGroom[0].firstMotherNameOfGroom = ''
            value.informationOfGroom[0].middleMotherNameOfGroom = ''
            value.informationOfGroom[0].motherNameOfGroom = ''
            value.informationOfGroom[0].phoneNumberOfMotherGroom = ''
            value.informationOfGroom[0].isGoneMother = false
        }

    }, [])

    const onChangeCreatLetter = useCallback(() => {

        const errMsgFirstNameG = FormValidate.inputNameEmpty(value.informationOfGroom[0].firstName, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameG = FormValidate.inputNameEmpty(value.informationOfGroom[0].middleName, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameG = FormValidate.inputNameEmpty(value.informationOfGroom[0].name, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneG = FormValidate.passConFirmPhone(value.informationOfGroom[0].phoneNumberOfGroom)

        const errMsgFirstNameFather = FormValidate.inputNameEmpty(value.informationOfGroom[0].firstFatherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameFather = FormValidate.inputNameEmpty(value.informationOfGroom[0].middleFatherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameFather = FormValidate.inputNameEmpty(value.informationOfGroom[0].fatherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneFather = FormValidate.passConFirmPhone(value.informationOfGroom[0].phoneNumberOfFatherGroom)

        const errMsgFirstNameMother = FormValidate.inputNameEmpty(value.informationOfGroom[0].firstMotherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameMother = FormValidate.inputNameEmpty(value.informationOfGroom[0].middleMotherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameMother = FormValidate.inputNameEmpty(value.informationOfGroom[0].motherNameOfGroom, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneMother = FormValidate.passConFirmPhone(value.informationOfGroom[0].phoneNumberOfMotherGroom)

        refFirstnNameMother.current?.setErrorMsg(errMsgFirstNameMother)
        // refMiddleNameMother.current?.setErrorMsg(errMsgMiddleNameMother)
        refNameMother.current?.setErrorMsg(errMsgNameMother)
        refPhoneMother.current?.setErrorMsg(errMsgPhoneMother)

        refFirstnNameFather.current?.setErrorMsg(errMsgFirstNameFather)
        // refMiddleNameFather.current?.setErrorMsg(errMsgMiddleNameFather)
        refNameFather.current?.setErrorMsg(errMsgNameFather)
        refPhoneFather.current?.setErrorMsg(errMsgPhoneFather)

        refFirstnNameGroom.current?.setErrorMsg(errMsgFirstNameG)
        // refMiddleNameGroom.current?.setErrorMsg(errMsgMiddleNameG)
        refNameGroom.current?.setErrorMsg(errMsgNameG)
        refPhoneGroom.current?.setErrorMsg(errMsgPhoneG)


        if (`${errMsgFirstNameG}${errMsgNameG}${errMsgPhoneG}${errMsgFirstNameFather}${errMsgNameFather}${errMsgPhoneFather}${errMsgFirstNameMother}${errMsgNameMother}${errMsgPhoneMother}${errMsgMiddleNameG}${errMsgMiddleNameFather}${errMsgMiddleNameMother}`.length === 0) {
            return true
        }
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_GROOM.firstName:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['firstName'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.middleName:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['middleName'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.name:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['name'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.phoneNumberOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['phoneNumberOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.firstFatherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['firstFatherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.middleFatherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['middleFatherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.fatherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['fatherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.phoneNumberOfFatherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['phoneNumberOfFatherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.isGoneFather:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['isGoneFather'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.firstMotherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['firstMotherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.middleMotherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['middleMotherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.motherNameOfGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['motherNameOfGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.phoneNumberOfMotherGroom:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['phoneNumberOfMotherGroom'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            case NAME_INPUT_GROOM.isGoneMother:
                setValue(prevValues => {
                    const newArray = [...prevValues.informationOfGroom];
                    newArray[0]['isGoneMother'] = e;
                    return {
                        ...prevValues,
                        informationOfGroom: newArray
                    };
                });
                break

            default:
                break
        }

    }, [setValue]);

    const onChangeSelectStt = useCallback((e) => {

        value.informationOfGroom[0].isOldBrotherGroom = e.target.value;

    }, [value]);

    const onChangeSelectCodeArea = useCallback((e) => {

        value.informationOfGroom[0].codingRegion = e.target.value;

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
                        name={name}
                        placeHolder={placehodel}
                        type={type}
                        maxLength={maxLength}
                        isIcon={isIcon}
                        icon={icon}
                        styleGroup={'man_inputStyle'}
                        onChangeText={(e) => onChangeText(e.target.value, name)}
                        onKeyPress={onKeyPress}
                        value={values}
                    />
                </div>
            )
        },
        [refUnderfine]
    )


    return (
        <div className='total_family_one_side'>

            <TitleCreate title={Languages.text.man} divided={true} />

            <div className='input_fields_control'>
                <div className='place_title_input'>
                    <label>{Languages.inputText.groom}</label>
                </div>
                <div className='group_input_control'>
                    {renderInput(
                        refFirstnNameGroom,
                        Languages.inputText.firstNameGroom,
                        Languages.inputText.firstName,
                        NAME_INPUT_GROOM.firstName,
                        'text',
                        15,
                        false,
                        false,
                        value.informationOfGroom[0].firstName

                    )}
                    {renderInput(
                        refMiddleNameGroom,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_GROOM.middleName,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].middleName
                    )}
                    {renderInput(
                        refNameGroom,
                        Languages.inputText.nameGroom,
                        Languages.inputText.namesingle,
                        NAME_INPUT_GROOM.name,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].name
                    )}

                    <div className='item_field_single'>
                        <div className='sellect_option'>
                            <label className='Input_label__90o4b'>
                                {Languages.inputText.stt}
                            </label>
                            <select
                                className='form_sellect_control'
                                name='form_sellect_stt'
                                onChange={onChangeSelectStt}
                            >
                                <option value='true'>{Languages.inputText.top1}</option>
                                <option value='false'>{Languages.inputText.notTop}</option>
                            </select>
                        </div>
                    </div>
                    <div className='item_field_single select_code'>
                        <div className='sellect_option select_phone_code'>
                            <label className='Input_label__90o4b'>
                                {Languages.inputText.codeArea}
                            </label>
                            <select
                                className='form_sellect_control select_phone_code_area'
                                name='form_sellect_stt'
                                onChange={onChangeSelectCodeArea}
                            >
                                <option value='-1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneGroom,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_GROOM.phoneNumberOfGroom,
                        'number',
                        10,
                        false,
                        false,
                        value.informationOfGroom[0].phoneNumberOfGroom
                    )}
                </div>
            </div>

            <div className='input_fields_control'>
                <div className='place_title_input'>
                    <label>{Languages.inputText.father}</label>
                </div>
                <div className='group_input_control'>
                    {renderInput(
                        refFirstnNameFather,
                        Languages.inputText.firstName,
                        Languages.inputText.firstName,
                        NAME_INPUT_GROOM.firstFatherNameOfGroom,
                        'text',
                        15,
                        false,
                        false,
                        value.informationOfGroom[0].firstFatherNameOfGroom
                    )}
                    {renderInput(
                        refMiddleNameFather,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_GROOM.middleFatherNameOfGroom,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].middleFatherNameOfGroom
                    )}
                    {renderInput(
                        refNameFather,
                        Languages.inputText.namesingle,
                        Languages.inputText.namesingle,
                        NAME_INPUT_GROOM.fatherNameOfGroom,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].fatherNameOfGroom
                    )}

                    <div className='item_field_single select_code'>
                        <div className='sellect_option select_phone_code'>
                            <label className='Input_label__90o4b'>
                                {Languages.inputText.codeArea}
                            </label>
                            <select
                                className='form_sellect_control select_phone_code_area'
                                name='form_sellect_stt'
                                onChange={onChangeSelectStt}
                            >
                                <option value='1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneFather,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_GROOM.phoneNumberOfFatherGroom,
                        'number',
                        10,
                        false,
                        false,
                        value.informationOfGroom[0].phoneNumberOfFatherGroom
                    )}
                    <div className="item_field_single">
                        <div className="Input_boxGroupInput__G9mP9 man_inputStyle">
                            <label className="Input_label__90o4b">{Languages.inputText.death}</label>
                            <div className="Input_formGroup__mXqJL ">
                                <input type="checkbox" defaultChecked={false} className="Input_form_control__5uYZX inputStyle" onChange={(e) => onChangeText(e.target.checked, NAME_INPUT_GROOM.isGoneFather)} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='input_fields_control'>
                <div className='place_title_input'>
                    <label>{Languages.inputText.mother}</label>
                </div>
                <div className='group_input_control'>
                    {renderInput(
                        refFirstnNameMother,
                        Languages.inputText.firstName,
                        Languages.inputText.firstName,
                        NAME_INPUT_GROOM.firstMotherNameOfGroom,
                        'text',
                        15,
                        false,
                        false,
                        value.informationOfGroom[0].firstMotherNameOfGroom
                    )}
                    {renderInput(
                        refMiddleNameMother,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_GROOM.middleMotherNameOfGroom,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].middleMotherNameOfGroom
                    )}
                    {renderInput(
                        refNameMother,
                        Languages.inputText.namesingle,
                        Languages.inputText.namesingle,
                        NAME_INPUT_GROOM.motherNameOfGroom,
                        'text',
                        30,
                        false,
                        false,
                        value.informationOfGroom[0].motherNameOfGroom
                    )}

                    <div className='item_field_single select_code'>
                        <div className='sellect_option select_phone_code'>
                            <label className='Input_label__90o4b'>
                                {Languages.inputText.codeArea}
                            </label>
                            <select
                                className='form_sellect_control select_phone_code_area'
                                name='form_sellect_stt'
                                onChange={onChangeSelectStt}
                            >
                                <option value='1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneMother,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_GROOM.phoneNumberOfMotherGroom,
                        'number',
                        10,
                        false,
                        false,
                        value.informationOfGroom[0].phoneNumberOfMotherGroom
                    )}
                    <div className="item_field_single">
                        <div className="Input_boxGroupInput__G9mP9 man_inputStyle">
                            <label className="Input_label__90o4b">{Languages.inputText.death}</label>
                            <div className="Input_formGroup__mXqJL ">
                                <input type="checkbox" defaultChecked={false} className="Input_form_control__5uYZX inputStyle" onChange={(e) => onChangeText(e.target.checked, NAME_INPUT_GROOM.isGoneMother)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default FamilyGroom;