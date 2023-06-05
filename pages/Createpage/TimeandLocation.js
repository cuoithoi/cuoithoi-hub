import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { SelectTimeTemplate, fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BUTTON_STYLES, CheckParams, Convert, TIME_AND_LOCATION } from "@/commons/Constant.ts";
import { Button } from "@/components/button";
import { MyTextArea } from "@/components/textarea";
import { FaLink, FaMap } from "react-icons/fa";
import { RadioButton } from "@/components/RadioButton";
import Popup from "@/components/modal/Popup";
import TitleCreate from "@/components/createPage/subcomp/TitleCreate";
import FormValidate from "@/utils/FormValidate";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const TimeandLocation = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));
    const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

    const [countdownTemp, setCountdownTemp] = useState('')
    const [radioCountdowTemplate, setRadioCountdowTemplate] = useState('none')
    const refModal = useRef(null)

    const [value, setValue] = useState(fiedlsCreatePage)

    const refUnderfine = useRef(null)
    const refDateOfEventWedding = useRef(null)
    const refTimeOfEventWedding = useRef(null)
    const refLocationOfWedding = useRef(null)
    const refMapDirectLink = useRef(null)
    const refTitleTemplate = useRef(null)
    const itemLocal = getItemFromLocalStorage('createLeter')


    useEffect(() => {
        if (itemLocal) {
            itemLocal.timeAndLocationOfWedding.dateOfEventWedding && (value.timeAndLocationOfWedding.dateOfEventWedding = itemLocal.timeAndLocationOfWedding.dateOfEventWedding)
            itemLocal.timeAndLocationOfWedding.timeOfEventWedding && (value.timeAndLocationOfWedding.timeOfEventWedding = itemLocal.timeAndLocationOfWedding.timeOfEventWedding)
            itemLocal.timeAndLocationOfWedding.locationOfWedding && (value.timeAndLocationOfWedding.locationOfWedding = itemLocal.timeAndLocationOfWedding.locationOfWedding)
            itemLocal.timeAndLocationOfWedding.mapDirectLink && (value.timeAndLocationOfWedding.mapDirectLink = itemLocal.timeAndLocationOfWedding.mapDirectLink)
            itemLocal.timeAndLocationOfWedding.contentOfCountDown && (setCountdownTemp(itemLocal.timeAndLocationOfWedding.contentOfCountDown))
            itemLocal.timeAndLocationOfWedding.contentOfCountDown && (value.arraylist[0].contentOfCountDown = itemLocal.timeAndLocationOfWedding.contentOfCountDown)
        } else {
            value.timeAndLocationOfWedding.dateOfEventWedding = ''
            value.timeAndLocationOfWedding.timeOfEventWedding = ''
            value.timeAndLocationOfWedding.locationOfWedding = ''
            value.timeAndLocationOfWedding.mapDirectLink = ''
            value.timeAndLocationOfWedding.contentOfCountDown = ''
        }
    }, [])

    value.timeAndLocationOfWedding.isDisplayCountDown = true;

    const radioChangeHandlerCountdownTemplate = (text, values) => {
        setRadioCountdowTemplate(values)
        setCountdownTemp(text)
        value.arraylist[0].contentOfCountDown = text
    }

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
            checkParams === CheckParams.TITLE_TIME_TEMPLATES && renderMapRadio(Languages.text.inviteTitle, SelectTimeTemplate, radioChangeHandlerCountdownTemplate, radioCountdowTemplate)
        )

    }, [
        checkParams,
        radioCountdowTemplate,
        renderMapRadio,
        radioChangeHandlerCountdownTemplate,
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

    const onChangeCreatLetter = useCallback(() => {

        const errMsgDateOfEventWedding = FormValidate.inputContentEmpty(value.timeAndLocationOfWedding.dateOfEventWedding)
        const errMsgTimeOfEventWedding = FormValidate.inputContentEmpty(value.timeAndLocationOfWedding.timeOfEventWedding)
        const errMsgLocationOfWedding = FormValidate.inputContentEmpty(value.timeAndLocationOfWedding.locationOfWedding)
        const errMsgMapDirectLink = FormValidate.inputContentEmpty(value.timeAndLocationOfWedding.mapDirectLink)
        const errMsgTitleTemplate = FormValidate.inputContentEmpty(value.arraylist[0].contentOfCountDown)


        // refDateOfEventWedding.current?.setErrorMsg(errMsgDateOfEventWedding)
        // refTimeOfEventWedding.current?.setErrorMsg(errMsgTimeOfEventWedding)
        // refLocationOfWedding.current?.setErrorMsg(errMsgLocationOfWedding)
        // refMapDirectLink.current?.setErrorMsg(errMsgMapDirectLink)
        // refTitleTemplate.current?.setErrorMsg(errMsgTitleTemplate)

        if (`${errMsgDateOfEventWedding}${errMsgTimeOfEventWedding}${errMsgLocationOfWedding}${errMsgMapDirectLink}${errMsgTitleTemplate}`.length === 0) {
            return true
        }
        return true

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case TIME_AND_LOCATION.dateOfEventWedding:
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfWedding: {
                        ...prevValues.timeAndLocationOfWedding,
                        dateOfEventWedding: e
                    }
                }));
                value.timeAndLocationOfWedding.dateOfEventWedding = e
                break

            case TIME_AND_LOCATION.timeOfEventWedding:
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfWedding: {
                        ...prevValues.timeAndLocationOfWedding,
                        timeOfEventWedding: e
                    }
                }));
                value.timeAndLocationOfWedding.timeOfEventWedding = e
                break

            case TIME_AND_LOCATION.locationOfWedding:
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfWedding: {
                        ...prevValues.timeAndLocationOfWedding,
                        locationOfWedding: e
                    }
                }));
                value.timeAndLocationOfWedding.locationOfWedding = e
                break

            case TIME_AND_LOCATION.mapDirectLink:
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfWedding: {
                        ...prevValues.timeAndLocationOfWedding,
                        mapDirectLink: e
                    }
                }));
                value.timeAndLocationOfWedding.mapDirectLink = e
                break

            case TIME_AND_LOCATION.isDisplayCountDown:
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfWedding: {
                        ...prevValues.timeAndLocationOfWedding,
                        isDisplayCountDown: e
                    }
                }));
                value.timeAndLocationOfWedding.isDisplayCountDown = e
                break

            default:
                break
        }


    }, [setValue]);

    const onKeyPress = useCallback(() => {

        return

    }, []);

    const renderInput = useCallback(
        (
            ref,
            label,
            placehodel,
            name,
            values,
            type,
            maxLength,
            isIcon,
            icon
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

    const onChangeOpenCountdownTemplate = () => {
        setCheckParams(CheckParams.TITLE_TIME_TEMPLATES)
        refModal.current?.showModal();
    }

    const onChangeCountdownTemp = useCallback((e) => {
        setCountdownTemp(e.target.value)
        value.arraylist[0].contentOfCountDown = e.target.value
    }, [value])


    return (
        <div className='sec_time_location_wed float_display'>

            <TitleCreate title={Languages.text.timeAndLocation} divided={true} />

            <div className='double_input_row'>
                <div className='half_row_hor_input'>
                    {renderInput(refDateOfEventWedding, Languages.text.wedding, Languages.text.wedding, TIME_AND_LOCATION.dateOfEventWedding, value.timeAndLocationOfWedding.dateOfEventWedding, 'date', 200, false)}
                </div>
                <div className='half_row_hor_input'>
                    {renderInput(refTimeOfEventWedding, Languages.text.timer, Languages.text.timer, TIME_AND_LOCATION.timeOfEventWedding, value.timeAndLocationOfWedding.timeOfEventWedding, 'time', 200, false)}
                </div>
            </div>

            <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                    {renderInput(refLocationOfWedding, Languages.text.placeWedding, 'Nhập ' + Languages.text.placeWedding, TIME_AND_LOCATION.locationOfWedding, value.timeAndLocationOfWedding.locationOfWedding, 'text', 200, true, <FaMap />)}
                </div>

                <div className='single_hor_input'>
                    {renderInput(refMapDirectLink, Languages.text.mapPlaceWedding, 'Nhập ' + Languages.text.mapPlaceWedding, TIME_AND_LOCATION.mapDirectLink, value.timeAndLocationOfWedding.mapDirectLink, 'text', 200, true, <FaLink />)}
                </div>

                <div className='single_hor_input checkbox_inline_colum'>
                    <div className="item_field_single">
                        <div className="Input_boxGroupInput__8ghvv man_inputStyle">
                            <label className="Input_label__XHiJ4">{Languages.text.displayDateCoundown}</label>
                            <div className="Input_formGroup__Ln91z ">
                                <input name="" defaultChecked={true} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, TIME_AND_LOCATION.isDisplayCountDown)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='single_hor_input'>

                    <MyTextArea
                        ref={refTitleTemplate}
                        value={countdownTemp}
                        label={Languages.inputText.contentInvite}
                        placeHolder={Languages.inputText.contentInvite}
                        maxLength={500}
                        onChangeText={onChangeCountdownTemp}
                    />
                    <Button

                        label={Languages.buttonText.titleTemplate}
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                        isLowerCase
                        onPress={onChangeOpenCountdownTemplate}
                    />

                </div>
            </div>
            {renderModal}
        </div>

    )
});

export default TimeandLocation;
