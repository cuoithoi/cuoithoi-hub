import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { SelectWarningTemplate, fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BUTTON_STYLES, CheckParams, Convert, EventOfProgram, INPUT_FIELDS, itemLocal } from "@/commons/Constant.ts";
import { FaClock, FaLink, FaMicrophone } from "react-icons/fa";
import { Panel } from "@/components/panel";
import FormValidate from "@/utils/FormValidate";
import Popup from "@/components/modal/Popup";
import { RadioButton } from "@/components/RadioButton";
import { MyTextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import Ic_Edit from '@/assets/home-image/Ic_createOutline.png'
import { AiFillVideoCamera } from "react-icons/ai";

const VideoandEvent = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [value, setValue] = useState(fiedlsCreatePage)
    const [openPanel, setOpenPanel] = useState(true)
    const [radioWarnTemplate, setRadioWarnTemplate] = useState('none')
    const [warnTemp, setWarnTemp] = useState('')
    const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)
    const [block, setBlock] = useState(false)
    const [blockEvent, setBlockEvent] = useState(false)

    const [blockEvent1, setBlockEvent1] = useState(true)
    const [blockEvent2, setBlockEvent2] = useState(true)
    const [blockEvent3, setBlockEvent3] = useState(true)
    const [blockEvent4, setBlockEvent4] = useState(true)

    const refUnderfine = useRef(null)
    const refVideoLink = useRef(null)
    const refTimeToWellcome = useRef(null)
    const refTimeToCelebrate = useRef(null)
    const refTimeToDinner = useRef(null)
    const refTimeToMusic = useRef(null)
    const refEdit1 = useRef(null)
    const refEdit2 = useRef(null)
    const refEdit3 = useRef(null)
    const refEdit4 = useRef(null)
    const refWarn = useRef(null)
    const refModal = useRef(null)
    const itemLocal = getItemFromLocalStorage('createLeter')
    useEffect(() => {
        if (itemLocal) {
            itemLocal.videoLink && (value.videoLink = itemLocal.videoLink)
            itemLocal.eventOfProgram.timeToWellcome && (value.eventOfProgram.timeToWellcome = itemLocal.eventOfProgram.timeToWellcome)
            itemLocal.eventOfProgram.timeToCelebrate && (value.eventOfProgram.timeToCelebrate = itemLocal.eventOfProgram.timeToCelebrate)
            itemLocal.eventOfProgram.timeToDinner && (value.eventOfProgram.timeToDinner = itemLocal.eventOfProgram.timeToDinner)
            itemLocal.eventOfProgram.timeToMusic && (value.eventOfProgram.timeToMusic = itemLocal.eventOfProgram.timeToMusic)
            itemLocal.eventOfProgram.eventOfProgramEditOne && (value.eventOfProgram.eventOfProgramEditOne = itemLocal.eventOfProgram.eventOfProgramEditOne)
            itemLocal.eventOfProgram.eventOfProgramEditTwo && (value.eventOfProgram.eventOfProgramEditTwo = itemLocal.eventOfProgram.eventOfProgramEditTwo)
            itemLocal.eventOfProgram.eventOfProgramEditThree && (value.eventOfProgram.eventOfProgramEditThree = itemLocal.eventOfProgram.eventOfProgramEditThree)
            itemLocal.eventOfProgram.eventOfProgramEditFour && (value.eventOfProgram.eventOfProgramEditFour = itemLocal.eventOfProgram.eventOfProgramEditFour)
            itemLocal.note && setWarnTemp(itemLocal.note)
            itemLocal?.isUseVideo && (value.arraylist[0].isUseVideo = itemLocal?.isUseVideo)
            itemLocal?.isUseEvent && (value.arraylist[0].isUseEvent = itemLocal?.isUseEvent)
            setBlock(itemLocal?.isUseVideo)
            setBlockEvent(itemLocal?.isUseEvent)
        } else {
            value.videoLink = ''
            value.eventOfProgram.timeToWellcome = ''
            value.eventOfProgram.timeToCelebrate = ''
            value.eventOfProgram.timeToDinner = ''
        }
    }, [])

    const radioChangeHandlerWarnTemplate = (text, values) => {
        setRadioWarnTemplate(values)
        setWarnTemp(text)
        value.note = text
    }

    const onChangeCreatLetter = useCallback(() => {

        const errMsgVideoLink = FormValidate.inputContentEmpty(value.videoLink)
        const errMsgTimeToWellcome = FormValidate.inputContentEmpty(value.eventOfProgram.timeToWellcome)
        const errMsgTimeToCelebrate = FormValidate.inputContentEmpty(value.eventOfProgram.timeToCelebrate)
        const errMsgTimeToDinner = FormValidate.inputContentEmpty(value.eventOfProgram.timeToDinner)
        const errMsgTimeToMusic = FormValidate.inputContentEmpty(value.eventOfProgram.timeToMusic)
        // const errMsgWarn = FormValidate.inputContentEmpty(warnTemp)

        // refVideoLink.current?.setErrorMsg(errMsgVideoLink)
        // refTimeToWellcome.current?.setErrorMsg(errMsgTimeToWellcome)
        // refTimeToCelebrate.current?.setErrorMsg(errMsgTimeToCelebrate)
        // refTimeToDinner.current?.setErrorMsg(errMsgTimeToDinner)
        // refTimeToMusic.current?.setErrorMsg(errMsgTimeToMusic)
        // refWarn.current?.setErrorMsg(errMsgWarn)

        if (`${errMsgVideoLink}${errMsgTimeToWellcome}${errMsgTimeToCelebrate}${errMsgTimeToDinner}${errMsgTimeToMusic}`.length === 0) {
            setOpenPanel(true)
            return true
        }
        setOpenPanel(false)
        return false

    }, [value, warnTemp])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case INPUT_FIELDS.videoLink:
                value.videoLink = e
                setValue(prevValues => ({
                    ...prevValues,
                    videoLink: e
                }));
                break

            case EventOfProgram.timeToWellcome:
                value.eventOfProgram.timeToWellcome = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        timeToWellcome: e
                    }
                }));
                break

            case EventOfProgram.timeToCelebrate:
                value.eventOfProgram.timeToCelebrate = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        timeToCelebrate: e
                    }
                }));
                break

            case EventOfProgram.timeToDinner:
                value.eventOfProgram.timeToDinner = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        timeToDinner: e
                    }
                }));
                break

            case EventOfProgram.timeToMusic:
                value.eventOfProgram.timeToMusic = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        timeToMusic: e
                    }
                }));
                break

            case EventOfProgram.eventOfProgramEditOne:
                value.eventOfProgram.eventOfProgramEditOne = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        eventOfProgramEditOne: e
                    }
                }));
                break

            case EventOfProgram.eventOfProgramEditTwo:
                value.eventOfProgram.eventOfProgramEditTwo = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        eventOfProgramEditTwo: e
                    }
                }));
                break
            case EventOfProgram.eventOfProgramEditThree:
                value.eventOfProgram.eventOfProgramEditThree = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        eventOfProgramEditThree: e
                    }
                }));
                break

            case EventOfProgram.eventOfProgramEditFour:
                value.eventOfProgram.eventOfProgramEditFour = e
                setValue(prevValues => ({
                    ...prevValues,
                    eventOfProgram: {
                        ...prevValues.eventOfProgram,
                        eventOfProgramEditFour: e
                    }
                }));
                break

            case INPUT_FIELDS.isUseVideo:
                setValue(prevValues => {
                    const newArray = [...prevValues.arraylist];
                    newArray[0]['isUseVideo'] = e;
                    return {
                        ...prevValues,
                        arraylist: newArray
                    };
                });
                setBlock(!block)
                break

            case INPUT_FIELDS.isUseEvent:
                setValue(prevValues => {
                    const newArray = [...prevValues.arraylist];
                    newArray[0]['isUseEvent'] = e;
                    return {
                        ...prevValues,
                        arraylist: newArray
                    };
                });
                setBlockEvent(!blockEvent)
                break

            default:
                break
        }


    }, [value, block, blockEvent]);

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
            values,
            disabled
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
                        value={values}
                        disabled={disabled}
                    />
                </div>
            )
        },
        [refUnderfine]
    )

    const onChangeOpenWarnTemplate = () => {
        setCheckParams(CheckParams.WARNNING_TEMPLATES)
        refModal.current?.showModal();
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
            renderMapRadio(Languages.text.inviteTitle, SelectWarningTemplate, radioChangeHandlerWarnTemplate, radioWarnTemplate)
        )
    }, [
        radioWarnTemplate,
        renderMapRadio,
        radioChangeHandlerWarnTemplate
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

    function onChangeWarnTemp(event) {
        value.note = event.target.value
        setWarnTemp(event.target.value)
    }

    const onChangeBlockEvent = (event) => {
        if (blockEvent) {
            switch (event) {
                case 'event1':
                    setBlockEvent1(!blockEvent1)
                    refEdit1.current?.focus()
                    break;
                case 'event2':
                    setBlockEvent2(!blockEvent2)
                    refEdit2.current?.focus()
                    break;
                case 'event3':
                    setBlockEvent3(!blockEvent3)
                    refEdit3.current?.focus()
                    break;
                case 'event4':
                    setBlockEvent4(!blockEvent4)
                    refEdit4.current?.focus()
                    break;
                default:
                    break
            }
            return
        }
        return false
    }

    return (

        <>
            <Panel noFields={true} title={Languages.text.video} valiOpen={openPanel} icon={'🎥'} style={'panel_icon_style'}>
                <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
                    <div className='title'>
                        {Languages.text.useFeatureVideo}
                    </div>
                    <div className='single_hor_input checkbox_inline_colum'>
                        <div className="item_field_single">
                            <div className="Input_boxGroupInput__8ghvv man_inputStyle">
                                <label className="Input_label__XHiJ4">{Languages.text.use}</label>
                                <div className="Input_formGroup__Ln91z ">
                                    <input name="" defaultChecked={itemLocal?.isUseVideo} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, INPUT_FIELDS.isUseVideo)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='details_attend'>
                        <p style={{ marginBottom: 0 }}>
                            {Languages.text.enablevideo}
                        </p>
                    </div>
                </div>
                <div className='video_event_wedding'>
                    <div className='fullwidth_input_colum'>
                        <div className='single_hor_input'>
                            {renderInput(refVideoLink, '', 'Nhập ' + Languages.text.linkVideo, INPUT_FIELDS.videoLink, 'text', 200, true, <FaLink />, '', value.videoLink, block)}
                        </div>
                    </div>
                </div>
            </Panel>

            {/* <Panel noFields={true} title={Languages.text.weddingProgram} valiOpen={openPanel} icon={'🎤'} style={'panel_icon_style'}>
                <div className='program_wedding'>
                    <div className='title'>
                        {Languages.text.useFeatureEvent}
                    </div>
                    <div className='single_hor_input checkbox_inline_colum'>
                        <div className="item_field_single">
                            <div className="Input_boxGroupInput__8ghvv man_inputStyle">
                                <label className="Input_label__XHiJ4">{Languages.text.use}</label>
                                <div className="Input_formGroup__Ln91z ">
                                    <input name="" defaultChecked={itemLocal?.isUseEvent} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, INPUT_FIELDS.isUseEvent)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput(refEdit1, '', Languages.text.welcomeGuest, EventOfProgram.eventOfProgramEditOne, 'text', 200, false, '', blockEvent1 && 'disable', value.eventOfProgram.eventOfProgramEditOne)}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToWellcome, '', '', EventOfProgram.timeToWellcome, 'time', 200, true, <FaClock />, '', value.eventOfProgram.timeToWellcome, blockEvent)}
                        </div>
                        <div className="ic_ceateoutline" onClick={() => onChangeBlockEvent('event1')}>
                            <img src={Ic_Edit} alt="Ic_Edit" />
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput(refEdit2, '', Languages.text.celebrate, EventOfProgram.eventOfProgramEditTwo, 'text', 200, false, '', blockEvent2 && 'disable', value.eventOfProgram.eventOfProgramEditTwo)}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToCelebrate, '', '', EventOfProgram.timeToCelebrate, 'time', 200, true, <FaClock />, '', value.eventOfProgram.timeToCelebrate, blockEvent)}
                        </div>
                        <div className="ic_ceateoutline" onClick={() => onChangeBlockEvent('event2')}>
                            <img src={Ic_Edit} alt="Ic_Edit" />
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput(refEdit3, '', Languages.text.dinner, EventOfProgram.eventOfProgramEditThree, 'text', 200, false, '', blockEvent3 && 'disable', value.eventOfProgram.eventOfProgramEditThree)}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToDinner, '', '', EventOfProgram.timeToDinner, 'time', 200, true, <FaClock />, '', value.eventOfProgram.timeToDinner, blockEvent)}
                        </div>
                        <div className="ic_ceateoutline" onClick={() => onChangeBlockEvent('event3')}>
                            <img src={Ic_Edit} alt="Ic_Edit" />
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput(refEdit4, '', Languages.text.music, EventOfProgram.eventOfProgramEditFour, 'text', 200, false, '', blockEvent4 && 'disable', value.eventOfProgram.eventOfProgramEditFour)}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToMusic, '', '', EventOfProgram.timeToMusic, 'time', 200, true, <FaClock />, '', value.eventOfProgram.timeToMusic, blockEvent)}
                        </div>
                        <div className="ic_ceateoutline" onClick={() => onChangeBlockEvent('event4')}>
                            <img src={Ic_Edit} alt="Ic_Edit" />
                        </div>
                    </div>

                </div>
            </Panel> */}

            <Panel title={Languages.text.warnning} valiOpen={openPanel} noFields={true} icon={'❗️'} style={'panel_icon_style'}>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        <MyTextArea
                            ref={refWarn}
                            value={warnTemp}
                            placeHolder={'Nhập ' + Languages.text.contentWarnning}
                            maxLength={500}
                            onChangeText={onChangeWarnTemp}
                        />
                        <Button

                            label={Languages.buttonText.titleTemplate}
                            buttonStyle={BUTTON_STYLES.PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            isLowerCase
                            onPress={onChangeOpenWarnTemplate}
                        />
                    </div>
                </div>
                {renderModal}
            </Panel>
        </>
    )
});

export default VideoandEvent;
