import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { SelectWarningTemplate, fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { BUTTON_STYLES, CheckParams, Convert, EventOfProgram, INPUT_FIELDS, itemLocal } from "@/commons/Constant.ts";
import { FaCalendar, FaLink } from "react-icons/fa";
import { Panel } from "@/components/panel";
import FormValidate from "@/utils/FormValidate";
import Popup from "@/components/modal/Popup";
import { RadioButton } from "@/components/RadioButton";
import { MyTextArea } from "@/components/textarea";
import { Button } from "@/components/button";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const VideoandEvent = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const [value, setValue] = useState(fiedlsCreatePage)
    const [openPanel, setOpenPanel] = useState(true)
    const [radioWarnTemplate, setRadioWarnTemplate] = useState('none')
    const [warnTemp, setWarnTemp] = useState('')
    const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

    const refUnderfine = useRef(null)
    const refVideoLink = useRef(null)
    const refTimeToWellcome = useRef(null)
    const refTimeToCelebrate = useRef(null)
    const refTimeToDinner = useRef(null)
    const refTimeToMusic = useRef(null)
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
        } else {
            value.videoLink = ''
            value.eventOfProgram.timeToWellcome = ''
            value.eventOfProgram.timeToCelebrate = ''
            value.eventOfProgram.timeToDinner = ''
            value.eventOfProgram.timeToMusic = ''
        }
    }, [])

    const radioChangeHandlerWarnTemplate = (text, value) => {
        setRadioWarnTemplate(value)
        setWarnTemp(text)
    }

    const onChangeCreatLetter = useCallback(() => {

        const errMsgVideoLink = FormValidate.inputContentEmpty(value.videoLink)
        const errMsgTimeToWellcome = FormValidate.inputContentEmpty(value.eventOfProgram.timeToWellcome)
        const errMsgTimeToCelebrate = FormValidate.inputContentEmpty(value.eventOfProgram.timeToCelebrate)
        const errMsgTimeToDinner = FormValidate.inputContentEmpty(value.eventOfProgram.timeToDinner)
        const errMsgTimeToMusic = FormValidate.inputContentEmpty(value.eventOfProgram.timeToMusic)
        const errMsgWarn = FormValidate.inputContentEmpty(warnTemp)

        refVideoLink.current?.setErrorMsg(errMsgVideoLink)
        refTimeToWellcome.current?.setErrorMsg(errMsgTimeToWellcome)
        refTimeToCelebrate.current?.setErrorMsg(errMsgTimeToCelebrate)
        refTimeToDinner.current?.setErrorMsg(errMsgTimeToDinner)
        refTimeToMusic.current?.setErrorMsg(errMsgTimeToMusic)
        refWarn.current?.setErrorMsg(errMsgWarn)

        if (`${errMsgVideoLink}${errMsgTimeToWellcome}${errMsgTimeToCelebrate}${errMsgTimeToDinner}${errMsgTimeToMusic}${errMsgWarn}`.length === 0) {
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
                        inputStyle={inputStyle}
                        value={values}
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
        setWarnTemp(event.target.value)
    }

    return (

        <>
            <Panel title={Languages.text.video} valiOpen={openPanel}>
                <div className='video_event_wedding'>
                    <div className='fullwidth_input_colum'>
                        <div className='single_hor_input'>
                            {renderInput(refVideoLink, Languages.text.linkVideo, Languages.text.linkVideo, INPUT_FIELDS.videoLink, 'text', 200, true, <FaLink />, '', value.videoLink)}
                        </div>
                    </div>
                </div>
            </Panel>

            <Panel title={Languages.text.weddingProgram} valiOpen={openPanel}>
                <div className='program_wedding'>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput('', '', Languages.text.welcomeGuest, '', 'text', 200, true, <FaCalendar />, 'disable')}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToWellcome, '', '', EventOfProgram.timeToWellcome, 'time', 200, false, '', '', value.eventOfProgram.timeToWellcome)}
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput('', '', Languages.text.celebrate, '', 'text', 200, true, <FaCalendar />, 'disable')}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToCelebrate, '', '', EventOfProgram.timeToCelebrate, 'time', 200, false, '', '', value.eventOfProgram.timeToCelebrate)}
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput('', '', Languages.text.dinner, '', 'text', 200, true, <FaCalendar />, 'disable')}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToDinner, '', '', EventOfProgram.timeToDinner, 'time', 200, false, '', '', value.eventOfProgram.timeToDinner)}
                        </div>
                    </div>

                    <div className='double_input_row'>
                        <div className='half_row_hor_input'>
                            {renderInput('', '', Languages.text.music, '', 'text', 200, true, <FaCalendar />, 'disable')}
                        </div>
                        <div className='half_row_hor_input'>
                            {renderInput(refTimeToMusic, '', '', EventOfProgram.timeToMusic, 'time', 200, false, '', '', value.eventOfProgram.timeToMusic)}
                        </div>
                    </div>

                </div>
            </Panel>

            <Panel title={Languages.text.warnning} valiOpen={openPanel}>
                <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                        <MyTextArea
                            ref={refWarn}
                            value={warnTemp}
                            label={Languages.text.contentWarnning}
                            placeHolder={Languages.text.contentWarnning}
                            maxLength={500}
                            onChangeText={onChangeWarnTemp}
                        />
                        <Button

                            label={Languages.buttonText.titleTemplate}
                            buttonStyle={BUTTON_STYLES.PINK}
                            textStyle={BUTTON_STYLES.PINK}
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
