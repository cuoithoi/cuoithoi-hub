import { MyTextInput } from "@/components/input";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Languages from '@/commons/Languages'
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { Egagement, Interrogation } from "@/commons/Constant.ts";
import { FaMap } from "react-icons/fa";
import { Panel } from "@/components/panel";
import FormValidate from "@/utils/FormValidate";

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

    const [value] = useState(fiedlsCreatePage)

    const onChangeCreatLetter = useCallback(() => {

        const errMsgDateOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.dateOfEventEgagement)
        const errMsgTimeOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.timeOfEventEgagement)
        const errMsgLocationOfEgagement = FormValidate.inputContentEmpty(value.timeAndLocationOfEgagement.locationOfEgagement)
        
        const errMsgDateOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.dateOfEventInterrogation)
        const errMsgTimeOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.timeOfEventInterrogation)
        const errMsgLocationOfEventInterrogation = FormValidate.inputContentEmpty(value.timeAndLocationOfInterrogation.locationOfInterrogation)


        refDateOfEgagement.current?.setErrorMsg(errMsgDateOfEgagement)
        refTimeOfEgagement.current?.setErrorMsg(errMsgTimeOfEgagement)
        refLocationOfEgagement.current?.setErrorMsg(errMsgLocationOfEgagement)
        refDateOfEventInterrogation.current?.setErrorMsg(errMsgDateOfEventInterrogation)
        refTimeOfEventInterrogation.current?.setErrorMsg(errMsgTimeOfEventInterrogation)
        refLocationOfEventInterrogation.current?.setErrorMsg(errMsgLocationOfEventInterrogation)

        if (`${errMsgDateOfEgagement}${errMsgTimeOfEgagement}${errMsgLocationOfEgagement}${errMsgDateOfEventInterrogation}${errMsgTimeOfEventInterrogation}${errMsgLocationOfEventInterrogation}`.length === 0) {
            console.log('DamNgoAnHoi')
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
                break

            case Egagement.timeOfEventEgagement:
                value.timeAndLocationOfEgagement.timeOfEventEgagement = e;
                break

            case Egagement.locationOfEgagement:
                value.timeAndLocationOfEgagement.locationOfEgagement = e;
                break

            case Interrogation.dateOfEventInterrogation:
                value.timeAndLocationOfInterrogation.dateOfEventInterrogation = e;
                break

            case Interrogation.timeOfEventInterrogation:
                value.timeAndLocationOfInterrogation.timeOfEventInterrogation = e;
                break

            case Interrogation.locationOfInterrogation:
                value.timeAndLocationOfInterrogation.locationOfInterrogation = e;
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

    return (
        <Panel title={Languages.text.daringAndFlirting} valiOpen={openPanel}>
            <div className='double_input_row'>
                <div className='half_row_hor_input'>
                    {renderInput(refDateOfEgagement, Languages.text.Egagement, Languages.text.Egagement, Egagement.dateOfEventEgagement, 'date', 200, false)}
                </div>
                <div className='half_row_hor_input'>
                    {renderInput(refTimeOfEgagement, Languages.text.timer, Languages.text.timer, Egagement.timeOfEventEgagement, 'time', 200, false)}
                </div>
            </div>

            <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                    {renderInput(refLocationOfEgagement, Languages.text.placeEagement, Languages.text.placeEagement, Egagement.locationOfEgagement, 'text', 200, true, <FaMap />)}
                </div>
            </div>

            <div className='double_input_row'>
                <div className='half_row_hor_input'>
                    {renderInput(refDateOfEventInterrogation, Languages.text.interrogation, Languages.text.interrogation, Interrogation.dateOfEventInterrogation, 'date', 200, false)}
                </div>
                <div className='half_row_hor_input'>
                    {renderInput(refTimeOfEventInterrogation, Languages.text.timer, Languages.text.timer, Interrogation.timeOfEventInterrogation, 'time', 200, false)}
                </div>
            </div>

            <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                    {renderInput(refLocationOfEventInterrogation, Languages.text.placeInterrogation, Languages.text.placeInterrogation, Interrogation.locationOfInterrogation, 'text', 200, true, <FaMap />)}
                </div>
            </div>

        </Panel>

    )
});

export default DamNgoAnHoi;
