import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { Egagement, Interrogation } from "@/commons/Constant.ts";
import { FaMap } from "react-icons/fa";
import { Panel } from "@/components/panel";
import FormValidate from "@/utils/FormValidate";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const DamNgoAnHoi = forwardRef(({ }, ref) => {

    useImperativeHandle(ref, () => ({

        onChangeCreatLetter

    }));

    const refUnderfine = useRef(null)
    const refDateOfEgagement = useRef(null)
    const refTimeOfEgagement = useRef(null)
    const refLocationOfEgagement = useRef(null)
    const refDateOfEventInterrogation = useRef(null)
    const refTimeOfEventInterrogation = useRef(null)
    const refLocationOfEventInterrogation = useRef(null)

    const [openPanel, setOpenPanel] = useState(true)

    const [value, setValue] = useState(fiedlsCreatePage)

    const itemLocal = getItemFromLocalStorage('createLeter')

    useEffect(() => {
        if (itemLocal) {
            itemLocal.timeAndLocationOfEgagement.dateOfEventEgagement && (value.timeAndLocationOfEgagement.dateOfEventEgagement = itemLocal.timeAndLocationOfEgagement.dateOfEventEgagement)
            itemLocal.timeAndLocationOfEgagement.timeOfEventEgagement && (value.timeAndLocationOfEgagement.timeOfEventEgagement = itemLocal.timeAndLocationOfEgagement.timeOfEventEgagement)
            itemLocal.timeAndLocationOfEgagement.locationOfEgagement && (value.timeAndLocationOfEgagement.locationOfEgagement = itemLocal.timeAndLocationOfEgagement.locationOfEgagement)
            itemLocal.timeAndLocationOfInterrogation.dateOfEventInterrogation && (value.timeAndLocationOfInterrogation.dateOfEventInterrogation = itemLocal.timeAndLocationOfInterrogation.dateOfEventInterrogation)
            itemLocal.timeAndLocationOfInterrogation.timeOfEventInterrogation && (value.timeAndLocationOfInterrogation.timeOfEventInterrogation = itemLocal.timeAndLocationOfInterrogation.timeOfEventInterrogation)
            itemLocal.timeAndLocationOfInterrogation.locationOfInterrogation && (value.timeAndLocationOfInterrogation.locationOfInterrogation = itemLocal.timeAndLocationOfInterrogation.locationOfInterrogation)
        } else {
            value.timeAndLocationOfEgagement.dateOfEventEgagement = ''
            value.timeAndLocationOfEgagement.timeOfEventEgagement = ''
            value.timeAndLocationOfEgagement.locationOfEgagement = ''
            value.timeAndLocationOfInterrogation.dateOfEventInterrogation = ''
            value.timeAndLocationOfInterrogation.timeOfEventInterrogation = ''
            value.timeAndLocationOfInterrogation.locationOfInterrogation = ''
        }

    }, [])

    const onChangeCreatLetter = useCallback(() => {

        const errMsgDateOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.dateOfEventEgagement)
        const errMsgTimeOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.timeOfEventEgagement)
        const errMsgLocationOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.locationOfEgagement)

        const errMsgDateOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.dateOfEventInterrogation)
        const errMsgTimeOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.timeOfEventInterrogation)
        const errMsgLocationOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.locationOfInterrogation)


        // refDateOfEgagement.current?.setErrorMsg(errMsgDateOfEgagement)
        // refTimeOfEgagement.current?.setErrorMsg(errMsgTimeOfEgagement)
        // refLocationOfEgagement.current?.setErrorMsg(errMsgLocationOfEgagement)
        // refDateOfEventInterrogation.current?.setErrorMsg(errMsgDateOfEventInterrogation)
        // refTimeOfEventInterrogation.current?.setErrorMsg(errMsgTimeOfEventInterrogation)
        // refLocationOfEventInterrogation.current?.setErrorMsg(errMsgLocationOfEventInterrogation)

        if (`${errMsgDateOfEgagement}${errMsgTimeOfEgagement}${errMsgLocationOfEgagement}${errMsgDateOfEventInterrogation}${errMsgTimeOfEventInterrogation}${errMsgLocationOfEventInterrogation}`.length === 0) {
            setOpenPanel(true)
            return true
        }
        setOpenPanel(false)
        return false

    }, [value])

    const onChangeText = useCallback((e, name) => {

        switch (name) {

            case Egagement.dateOfEventEgagement:
                value.timeAndLocationOfEgagement.dateOfEventEgagement = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfEgagement: {
                        ...prevValues.timeAndLocationOfEgagement,
                        dateOfEventEgagement: e
                    }
                }));
                break

            case Egagement.timeOfEventEgagement:
                value.timeAndLocationOfEgagement.timeOfEventEgagement = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfEgagement: {
                        ...prevValues.timeAndLocationOfEgagement,
                        timeOfEventEgagement: e
                    }
                }));
                break

            case Egagement.locationOfEgagement:
                value.timeAndLocationOfEgagement.locationOfEgagement = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfEgagement: {
                        ...prevValues.timeAndLocationOfEgagement,
                        locationOfEgagement: e
                    }
                }));
                break

            case Interrogation.dateOfEventInterrogation:
                value.timeAndLocationOfInterrogation.dateOfEventInterrogation = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfInterrogation: {
                        ...prevValues.timeAndLocationOfInterrogation,
                        dateOfEventInterrogation: e
                    }
                }));
                break

            case Interrogation.timeOfEventInterrogation:
                value.timeAndLocationOfInterrogation.timeOfEventInterrogation = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfInterrogation: {
                        ...prevValues.timeAndLocationOfInterrogation,
                        timeOfEventInterrogation: e
                    }
                }));
                break

            case Interrogation.locationOfInterrogation:
                value.timeAndLocationOfInterrogation.locationOfInterrogation = e;
                setValue(prevValues => ({
                    ...prevValues,
                    timeAndLocationOfInterrogation: {
                        ...prevValues.timeAndLocationOfInterrogation,
                        locationOfInterrogation: e
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

    return (
        <Panel title={Languages.text.daringAndFlirting} valiOpen={openPanel}>
            <div className='double_input_row'>
                <div className='half_row_hor_input'>
                    {renderInput(refDateOfEgagement, Languages.text.Egagement, Languages.text.Egagement, Egagement.dateOfEventEgagement, value.timeAndLocationOfEgagement.dateOfEventEgagement, 'date', 200, false)}
                </div>
                <div className='half_row_hor_input'>
                    {renderInput(refTimeOfEgagement, Languages.text.timer, Languages.text.timer, Egagement.timeOfEventEgagement, value.timeAndLocationOfEgagement.timeOfEventEgagement, 'time', 200, false)}
                </div>
            </div>

            <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                    {renderInput(refLocationOfEgagement, Languages.text.placeEagement, Languages.text.placeEagement, Egagement.locationOfEgagement, value.timeAndLocationOfEgagement.locationOfEgagement, 'text', 200, true, <FaMap />, '', value.timeAndLocationOfEgagement.locationOfEgagement)}
                </div>
            </div>

            <div className='double_input_row'>
                <div className='half_row_hor_input'>
                    {renderInput(refDateOfEventInterrogation, Languages.text.interrogation, Languages.text.interrogation, Interrogation.dateOfEventInterrogation, value.timeAndLocationOfInterrogation.dateOfEventInterrogation, 'date', 200, false)}
                </div>
                <div className='half_row_hor_input'>
                    {renderInput(refTimeOfEventInterrogation, Languages.text.timer, Languages.text.timer, Interrogation.timeOfEventInterrogation, value.timeAndLocationOfInterrogation.timeOfEventInterrogation, 'time', 200, false)}
                </div>
            </div>

            <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                    {renderInput(refLocationOfEventInterrogation, Languages.text.placeInterrogation, Languages.text.placeInterrogation, Interrogation.locationOfInterrogation, value.timeAndLocationOfInterrogation.locationOfInterrogation, 'text', 200, true, <FaMap />)}
                </div>
            </div>

        </Panel>

    )
});

export default DamNgoAnHoi;
