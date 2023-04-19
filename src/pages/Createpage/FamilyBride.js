import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { SelectInvitationTemplate, fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BUTTON_STYLES, CheckParams, Convert, NAME_INPUT_BRIDE } from "@/commons/Constant.ts";
import { RadioButton } from "@/components/RadioButton";
import IcChrysanthemum from '@/assets/home-image/IcChrysanthemum.svg'
import { MyTextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { useMemo } from "react";
import Popup from "@/components/modal/Popup";
import TitleCreate from "@/components/createPage/subcomp/TitleCreate";
import FormValidate from "@/utils/FormValidate";

const FamilyBride = forwardRef(({ props }, ref) => {
    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [value] = useState(fiedlsCreatePage)
    const [radioDead, setRadioDead] = useState('none')
    const [inviteTemp, setInviteTemp] = useState('')

    const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)
    const [radioInviteTemplate, setRadioInviteTemplate] = useState('none')

    const refModal = useRef(null)
    const refUnderfine = useRef(null)
    const refFirstnNameBride = useRef(null)
    const refMiddleNameBride = useRef(null)
    const refNameBride = useRef(null)
    const refPhoneBride = useRef(null)

    const refFirstnNameFather = useRef(null)
    const refMiddleNameFather = useRef(null)
    const refNameFather = useRef(null)
    const refPhoneFather = useRef(null)

    const refFirstnNameMother = useRef(null)
    const refMiddleNameMother = useRef(null)
    const refNameMother = useRef(null)
    const refPhoneMother = useRef(null)

    const refinvite = useRef(null)


    const renderRadio = useCallback(
        (id, label, value, onChange, isSelected) => {

            return (
                <div className='options_select'>
                    <RadioButton
                        id={id}
                        label={label}
                        value={value}
                        onChange={onChange}
                        isSelected={isSelected === value}
                    />
                </div>
            )
        },
        []
    )

    const onChangeCreatLetter = useCallback(() => {

        const errMsgFirstNameB = FormValidate.inputNameEmpty(value.informationOfBride[0].firstName, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameB = FormValidate.inputNameEmpty(value.informationOfBride[0].middleName, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameB = FormValidate.inputNameEmpty(value.informationOfBride[0].name, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneB = FormValidate.passConFirmPhone(value.informationOfBride[0].phoneNumberOfBride)

        const errMsgFirstNameFather = FormValidate.inputNameEmpty(value.informationOfBride[0].firstFatherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameFather = FormValidate.inputNameEmpty(value.informationOfBride[0].middleFatherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameFather = FormValidate.inputNameEmpty(value.informationOfBride[0].fatherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneFather = FormValidate.passConFirmPhone(value.informationOfBride[0].phoneNumberOfFatherBride)

        const errMsgFirstNameMother = FormValidate.inputNameEmpty(value.informationOfBride[0].firstMotherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgMiddleNameMother = FormValidate.inputNameEmpty(value.informationOfBride[0].middleMotherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgNameMother = FormValidate.inputNameEmpty(value.informationOfBride[0].motherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)
        const errMsgPhoneMother = FormValidate.passConFirmPhone(value.informationOfBride[0].phoneNumberOfMotherBride)

        const errMsgInvite = FormValidate.inputNameEmpty(value.informationOfBride[0].motherNameOfBride, Languages.errorMsg.required, Languages.errorMsg.userNameRegex)

        refinvite.current?.setErrorMsg(errMsgInvite)

        refFirstnNameMother.current?.setErrorMsg(errMsgFirstNameMother)
        refMiddleNameMother.current?.setErrorMsg(errMsgMiddleNameMother)
        refNameMother.current?.setErrorMsg(errMsgNameMother)
        refPhoneMother.current?.setErrorMsg(errMsgPhoneMother)

        refFirstnNameFather.current?.setErrorMsg(errMsgFirstNameFather)
        refMiddleNameFather.current?.setErrorMsg(errMsgMiddleNameFather)
        refNameFather.current?.setErrorMsg(errMsgNameFather)
        refPhoneFather.current?.setErrorMsg(errMsgPhoneFather)


        refFirstnNameBride.current?.setErrorMsg(errMsgFirstNameB)
        refMiddleNameBride.current?.setErrorMsg(errMsgMiddleNameB)
        refNameBride.current?.setErrorMsg(errMsgNameB)
        refPhoneBride.current?.setErrorMsg(errMsgPhoneB)

        if (`${errMsgFirstNameB}${errMsgMiddleNameB}${errMsgNameB}${errMsgPhoneB}${errMsgFirstNameFather}${errMsgMiddleNameFather}${errMsgNameFather}${errMsgPhoneFather}${errMsgFirstNameMother}${errMsgMiddleNameMother}${errMsgNameMother}${errMsgPhoneMother}${errMsgInvite}`.length === 0) {
            console.log('passing')
            return true
        }
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case NAME_INPUT_BRIDE.firstName:
                value.informationOfBride[0].firstName = e;
                break

            case NAME_INPUT_BRIDE.middleName:
                value.informationOfBride[0].middleName = e;
                break

            case NAME_INPUT_BRIDE.name:
                value.informationOfBride[0].name = e;
                break

            case NAME_INPUT_BRIDE.phoneNumberOfBride:
                value.informationOfBride[0].phoneNumberOfBride = e;
                break

            case NAME_INPUT_BRIDE.firstFatherNameOfBride:
                value.informationOfBride[0].firstFatherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.middleFatherNameOfBride:
                value.informationOfBride[0].middleFatherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.fatherNameOfBride:
                value.informationOfBride[0].fatherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.phoneNumberOfFatherBride:
                value.informationOfBride[0].phoneNumberOfFatherBride = e;
                break

            case NAME_INPUT_BRIDE.isGoneFatherBride:
                value.informationOfBride[0].isGoneFatherBride = e;
                break

            case NAME_INPUT_BRIDE.firstMotherNameOfBride:
                value.informationOfBride[0].firstMotherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.middleMotherNameOfBride:
                value.informationOfBride[0].middleMotherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.motherNameOfBride:
                value.informationOfBride[0].motherNameOfBride = e;
                break

            case NAME_INPUT_BRIDE.phoneNumberOfMotherBride:
                value.informationOfBride[0].phoneNumberOfMotherBride = e;
                break

            case NAME_INPUT_BRIDE.isGoneMotherOfBride:
                value.informationOfBride[0].isGoneMotherOfBride = e;
                break

            default:
                break
        }


    }, [value]);

    const radioChangeHandlerInviteTemplate = (text, values) => {
        setRadioInviteTemplate(values)
        setInviteTemp(text)
        value.contentOfInvitation = text
    }

    const renderMapRadio = useCallback((title, data, radioChangeHandlerTemplate, selected) => {

        return <div className='section_choose_template'>
            <div className='head_template'>
                <h3>
                    {title}
                </h3>
            </div>
            <div className='group_radio_choose_template'>

                {data.map((item, index) => (
                    <div className='SelectInvitationTemplate_map' key={index}>
                        {renderRadio(item.value, item.text, item.value, () => radioChangeHandlerTemplate(item.text, item.value), selected)}
                    </div>
                ))}

            </div>
        </div>

    }, [])

    const renderContentModal = useMemo(() => {

        return (
            renderMapRadio(Languages.text.inviteLanguage, SelectInvitationTemplate, radioChangeHandlerInviteTemplate, radioInviteTemplate)
        )
    }, [
        checkParams,
        renderMapRadio,
        radioChangeHandlerInviteTemplate
    ])

    const renderModal = useMemo(() => {

        return (
            <Popup
                ref={refModal}
                content={renderContentModal}
                btnCancelText={Languages.common.cancel}
                btnSubmitText={Languages.common.agree}
                maxWidth={checkParams === CheckParams.AFFTER ? Convert.W_400 : Convert.W_800}
            />
        )
    }, [renderContentModal, checkParams])

    const onChangeOpenInviteTemplate = () => {
        setCheckParams(CheckParams.INVITE_TEMPLATES)
        refModal.current?.showModal();
    }

    const onChangeSelectStt = useCallback((e) => {

        value.informationOfBride[0].isOldBrotherBride = e.target.value;

    }, [value]);

    const onChangeSelectCodeArea = useCallback((e) => {

        value.informationOfBride[0].codingRegion = e.target.value;

    }, [value]);

    const onChangeInviteTemp = useCallback((e) => {
        setInviteTemp(e.target.value)
        value.contentOfInvitation = e.target.value
    }, [value])

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

    const radioChangeHandlerDeadman = (e) => {
        setRadioDead(e.target.value)
        value.isDisplayGonePeople = e.target.value
    }

    return (

        <div className='total_family_one_side'>
            <TitleCreate title={Languages.text.women} divided={true} />
            <div className='input_fields_control'>
                <div className='place_title_input'>
                    <label>{Languages.inputText.bride}</label>
                </div>
                <div className='group_input_control'>
                    {renderInput(
                        refFirstnNameBride,
                        Languages.inputText.firstNameBride,
                        Languages.inputText.firstName,
                        NAME_INPUT_BRIDE.firstName,
                        'text',
                        15,
                        false,
                        false
                    )}
                    {renderInput(
                        refMiddleNameBride,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_BRIDE.middleName,
                        'text',
                        30,
                        false,
                        false
                    )}
                    {renderInput(
                        refNameBride,
                        Languages.inputText.nameBride,
                        Languages.inputText.namesingle,
                        NAME_INPUT_BRIDE.name,
                        'text',
                        30,
                        false,
                        false
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
                                <option value='true'>{Languages.inputText.top1woman}</option>
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
                                <option value='1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneBride,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_BRIDE.phoneNumberOfBride,
                        'number',
                        10,
                        false,
                        false
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
                        NAME_INPUT_BRIDE.firstFatherNameOfBride,
                        'text',
                        15,
                        false,
                        false
                    )}
                    {renderInput(
                        refMiddleNameFather,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_BRIDE.middleFatherNameOfBride,
                        'text',
                        30,
                        false,
                        false
                    )}
                    {renderInput(
                        refNameFather,
                        Languages.inputText.namesingle,
                        Languages.inputText.namesingle,
                        NAME_INPUT_BRIDE.fatherNameOfBride,
                        'text',
                        30,
                        false,
                        false
                    )}

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
                                <option value='1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneFather,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_BRIDE.phoneNumberOfFatherBride,
                        'number',
                        10,
                        false,
                        false
                    )}
                    <div className="item_field_single">
                        <div className="Input_boxGroupInput__G9mP9 man_inputStyle">
                            <label className="Input_label__90o4b">{Languages.inputText.death}</label>
                            <div className="Input_formGroup__mXqJL ">
                                <input type="checkbox" className="Input_form_control__5uYZX inputStyle" onChange={(e) => onChangeText(e.target.checked, NAME_INPUT_BRIDE.isGoneFatherBride)} />
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
                        NAME_INPUT_BRIDE.firstMotherNameOfBride,
                        'text',
                        15,
                        false,
                        false
                    )}
                    {renderInput(
                        refMiddleNameMother,
                        Languages.inputText.firstAnother,
                        Languages.inputText.firstAnother,
                        NAME_INPUT_BRIDE.middleMotherNameOfBride,
                        'text',
                        30,
                        false,
                        false
                    )}
                    {renderInput(
                        refNameMother,
                        Languages.inputText.namesingle,
                        Languages.inputText.namesingle,
                        NAME_INPUT_BRIDE.motherNameOfBride,
                        'text',
                        30,
                        false,
                        false
                    )}

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
                                <option value='1'>+84</option>
                            </select>
                        </div>
                    </div>
                    {renderInput(
                        refPhoneMother,
                        Languages.inputText.phone,
                        Languages.inputText.phonepla,
                        NAME_INPUT_BRIDE.phoneNumberOfMotherBride,
                        'number',
                        10,
                        false,
                        false
                    )}
                    <div className="item_field_single">
                        <div className="Input_boxGroupInput__G9mP9 man_inputStyle">
                            <label className="Input_label__90o4b">{Languages.inputText.death}</label>
                            <div className="Input_formGroup__mXqJL ">
                                <input type="checkbox" className="Input_form_control__5uYZX inputStyle" onChange={(e) => onChangeText(e.target.checked, NAME_INPUT_BRIDE.isGoneMotherOfBride)} />
                            </div>
                        </div>
                    </div>

                    <div className='enable_show_deadman active'>
                        <div className='label_left'>
                            <label>{Languages.text.displayModeDeceased}</label>
                        </div>
                        <div className='radio_enable'>

                            {renderRadio('none', Languages.common.no, 'none', radioChangeHandlerDeadman, radioDead)}
                            {renderRadio('explanatory', Languages.text.explanatory, 'explanatory', radioChangeHandlerDeadman, radioDead)}

                            {renderRadio('chrysanthemumIcon',
                                <div className='chrysanthemumIcon'>{Languages.text.chrysanthemumIcon}<img src={IcChrysanthemum} /></div>,
                                'chrysanthemumIcon', radioChangeHandlerDeadman, radioDead)}


                        </div>
                    </div>

                </div>
            </div>

            <div className='input_fields_control Select_invitation_template'>

                <div className='place_title_input'>
                    <label>{Languages.text.invite}</label>
                </div>

                <div className='group_textarea_control'>

                    <MyTextArea
                        ref={refinvite}
                        value={inviteTemp}
                        label={Languages.inputText.contentInvite}
                        placeHolder={Languages.inputText.contentInvite}
                        maxLength={500}
                        onChangeText={onChangeInviteTemp}
                    />

                    <Button

                        label={Languages.buttonText.invitationTemplate}
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.PINK}
                        isLowerCase
                        onPress={onChangeOpenInviteTemplate}

                    />

                </div>
                {renderModal}
            </div>

        </div>

    )
});

export default FamilyBride;
