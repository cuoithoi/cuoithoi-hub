import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import FormValidate from '@/utils/FormValidate'
import {
  Alias,
  CheckParams,
  BUTTON_STYLES,
  Convert,
} from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { Button } from '@/components/button'
import Languages from '@/commons/Languages'
import { ImageUpload } from '@/components/imageUpload'
import ImgUploadIcon from '@/components/icons/ImgUploadIcon'
import arrayMove from 'array-move-e5'
import { RadioButton } from '@/components/RadioButton'
import IcChrysanthemum from '@/assets/home-image/IcChrysanthemum.svg'
import IcInf from '@/assets/home-image/IcInf.svg'
import Popup from '@/components/modal/Popup'
import { MyTextArea } from '@/components/textarea'
import {
  SelectInvitationTemplate,
  SelectSavePenTemplate,
  SelectTimeTemplate,
  SelectWarningTemplate,
} from '@/commons/FieldsDataObj'
// restructure page//////////////
import TimeAndLocation from '@/components/createPage/TimeAndLocation'
import ImageUploadSingle from '@/components/createPage/subcomp/ImageUploadSingle'
import RadioCreate from '@/components/createPage/subcomp/RadioCreate'
const CreatePageStructure = () => {
  const navigate = useNavigate()

  const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

  const [selectSTT, setSelectSTT] = useState('')

  const [radioEffectImage, setRadioEffectImage] = useState('none')
  const [radioInviteTemplate, setRadioInviteTemplate] = useState('none')
  const [radioDead, setRadioDead] = useState('none')

  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')

  const refUnderfine = useRef(null)
  const refName = useRef(null)
  const refPwd = useRef(null)
  const refModal = useRef(null)

  const onShowModalAgree = () => {
    setCheckParams(CheckParams.AFFTER)
    refModal.current?.showModal()
  }

  const onPressHandleModal = useCallback(() => {
    switch (checkParams) {
      case CheckParams.AFFTER:
        navigate('/')
        break

      default:
        break
    }
  }, [checkParams])

  const radioChangeHandlerInviteTemplate = (e) => {
    setRadioInviteTemplate(e.target.value)
  }

  const radioChangeHandlerDeadman = (e) => {
    setRadioDead(e.target.value)
  }

  const radioChangeHandler = (e) => {
    setRadioEffectImage(e.target.value)
  }

  const renderRadio = useCallback((id, label, value, onChange, isSelected) => {
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
  }, [])

  const renderPopuptemplate = useCallback(
    (title, data) => {
      return (
        <div className='section_choose_template'>
          <div className='head_template'>
            <h3>{title}</h3>
          </div>
          <div className='group_radio_choose_template'>
            {data.map((item, index) => (
              <div className='SelectInvitationTemplate_map' key={index}>
                {renderRadio(
                  item.value,
                  item.text,
                  item.value,
                  radioChangeHandlerInviteTemplate,
                  radioInviteTemplate
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    [radioInviteTemplate, radioChangeHandlerInviteTemplate]
  )

  const renderContentModal = useMemo(() => {
    return (
      (checkParams === CheckParams.AFFTER && (
        <div className='renderContentModal'>
          <div className='head'>
            <img src={IcInf} alt={'icinf'} />
            <h2>{Languages.text.createAfter}</h2>
          </div>
          <div className='contentModal'>
            <p>{Languages.text.contentAfter}</p>
          </div>
        </div>
      )) ||
      (checkParams === CheckParams.INVITE_TEMPLATES &&
        renderPopuptemplate(
          Languages.text.inviteLanguage,
          SelectInvitationTemplate
        )) ||
      (checkParams === CheckParams.TITLE_TIME_TEMPLATES &&
        renderPopuptemplate(
          Languages.text.inviteLanguage,
          SelectTimeTemplate
        )) ||
      (checkParams === CheckParams.WARNNING_TEMPLATES &&
        renderPopuptemplate(
          Languages.text.inviteLanguage,
          SelectWarningTemplate
        )) ||
      (checkParams === CheckParams.TITLE_SAVE_PEN_TEMPLATES &&
        renderPopuptemplate(
          Languages.text.inviteLanguage,
          SelectSavePenTemplate
        ))
    )
  }, [checkParams, renderPopuptemplate])

  const renderModal = useMemo(() => {
    return (
      <Popup
        ref={refModal}
        content={renderContentModal}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.agree}
        onSuccessPress={onPressHandleModal}
        maxWidth={
          checkParams === CheckParams.AFFTER ? Convert.W_400 : Convert.W_800
        }
      />
    )
  }, [renderContentModal, checkParams])

  const renderTitle = (title, divided, classNameCus) => {
    return (
      <div
        className={`${'title_comp_wed'} ${classNameCus ? classNameCus : ''}`}
      >
        <h2>
          {title}
          {divided && <div className='divided'></div>}
        </h2>
      </div>
    )
  }

  const renderInput = useCallback(
    (
      ref,
      value,
      label,
      placehodel,
      type,
      maxLength,
      isIcon,
      icon,
      inputStyle
    ) => {
      const onChange = (text, placehodel) => {
        onChangeText(text, placehodel)
      }

      return (
        <div className='item_field_single'>
          <MyTextInput
            ref={ref === '' ? refUnderfine : ' '}
            value={value}
            label={label}
            placeHolder={placehodel}
            type={type}
            maxLength={maxLength}
            isIcon={isIcon}
            icon={icon}
            styleGroup={'man_inputStyle'}
            onChangeText={onChange}
            inputStyle={inputStyle}
          />
        </div>
      )
    },
    []
  )

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangePwd(event) {
    setPwd(event.target.value)
  }

  const onChangeCreatLetter = useCallback(() => {
    const errMsgPhone = FormValidate.passConFirmPhone(name)
    const errMsgPwd = FormValidate.passValidate(pwd)

    refName.current?.setErrorMsg(errMsgPhone)
    refPwd.current?.setErrorMsg(errMsgPwd)

    if (`${errMsgPhone}${errMsgPwd}`.length === 0) {
      setTimeout(() => {
        navigate(Alias.mypage, {
          state: {
            tokenParam: true,
          },
        })
      }, 1500)
    }
  }, [name, pwd])

  const onChangeText = useCallback((value, tag) => {
    switch (tag) {
      case Languages.inputText.firstName:
        console.log(value)
        break
      case Languages.inputText.firstAnother:
        console.log(value)
        break
      case Languages.inputText.namesingle:
        console.log(value)
        break

      default:
        break
    }
  }, [])

  const onChangeOpenInviteTemplate = () => {
    setCheckParams(CheckParams.INVITE_TEMPLATES)
    refModal.current?.showModal()
  }

  const renderFamilyMan = useMemo(() => {
    return (
      <div className='total_family_one_side'>
        {renderTitle(Languages.text.man, true)}
        <div className='input_fields_control'>
          <div className='place_title_input'>
            <label>{Languages.inputText.groom}</label>
          </div>
          <div className='group_input_control'>
            {renderInput(
              '',
              '',
              Languages.inputText.firstNameGroom,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.nameGroom,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>{Languages.inputText.top1}</option>
                  <option value='2'>{Languages.inputText.notTop}</option>
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
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
              '',
              '',
              Languages.inputText.firstName,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.namesingle,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.death,
              '',
              'checkbox',
              30,
              false,
              false,
              'inputStyle'
            )}
          </div>
        </div>

        <div className='input_fields_control'>
          <div className='place_title_input'>
            <label>{Languages.inputText.mother}</label>
          </div>
          <div className='group_input_control'>
            {renderInput(
              '',
              '',
              Languages.inputText.firstName,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.namesingle,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.death,
              '',
              'checkbox',
              30,
              false,
              false,
              'inputStyle'
            )}
          </div>
        </div>
      </div>
    )
  }, [])

  const renderFamilyWoman = useMemo(() => {
    return (
      <div className='total_family_one_side'>
        {renderTitle(Languages.text.women, true)}
        <div className='input_fields_control'>
          <div className='place_title_input'>
            <label>{Languages.inputText.bride}</label>
          </div>
          <div className='group_input_control'>
            {renderInput(
              '',
              '',
              Languages.inputText.firstNameBride,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.nameGroom,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>{Languages.inputText.top1woman}</option>
                  <option value='2'>{Languages.inputText.notTop}</option>
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
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
              '',
              '',
              Languages.inputText.firstName,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.namesingle,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.death,
              '',
              'checkbox',
              30,
              false,
              false,
              'inputStyle'
            )}
          </div>
        </div>

        <div className='input_fields_control'>
          <div className='place_title_input'>
            <label>{Languages.inputText.mother}</label>
          </div>
          <div className='group_input_control'>
            {renderInput(
              '',
              '',
              Languages.inputText.firstName,
              Languages.inputText.firstName,
              'text',
              15,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.firstAnother,
              Languages.inputText.firstAnother,
              'text',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.namesingle,
              Languages.inputText.namesingle,
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
                  value={selectSTT}
                  onChange={onChangeSelectStt}
                >
                  <option value='1'>+84</option>
                </select>
              </div>
            </div>
            {renderInput(
              '',
              '',
              Languages.inputText.phone,
              Languages.inputText.phonepla,
              'number',
              30,
              false,
              false
            )}
            {renderInput(
              '',
              '',
              Languages.inputText.death,
              '',
              'checkbox',
              30,
              false,
              false,
              'inputStyle'
            )}

            <div className='enable_show_deadman deactive'>
              <div className='label_left'>
                <label>{Languages.text.displayModeDeceased}</label>
              </div>
              <div className='radio_enable'>
                <RadioCreate
                  id='explanatory'
                  label={Languages.text.explanatory}
                  value='explanatory'
                />
                <RadioCreate
                  id='explanatory'
                  label={Languages.text.explanatory}
                  value='explanatory'
                />
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
              value={''}
              label={Languages.inputText.contentInvite}
              placeHolder={Languages.inputText.contentInvite}
              maxLength={500}
              onChangeText={null}
            />

            <Button
              label={Languages.buttonText.invitationTemplate}
              buttonStyle={BUTTON_STYLES.PINK}
              textStyle={BUTTON_STYLES.PINK}
              isLowerCase
              onPress={onChangeOpenInviteTemplate}
            />
          </div>
        </div>
      </div>
    )
  }, [
    radioDead,
    radioChangeHandlerDeadman,
    selectSTT,
    onChangeSelectStt,
    onChangeOpenInviteTemplate,
  ])

  function onChangeSelectStt(event) {
    setSelectSTT(event.target.value)
  }

  return (
    <div className='Createpage'>
      <Loading />
      <div className='header_editpage'>
        <div className='header header_edit'>
          <Button
            label={Languages.common.cancel}
            isLowerCase
            onPress={onShowModalAgree}
          />
          <div className='btn_group_r'>
            <Button
              label={Languages.common.saveDraf}
              buttonStyle={BUTTON_STYLES.GRAY}
              isLowerCase
              onPress={onChangeCreatLetter}
            />
            <Button
              label={Languages.common.continue}
              buttonStyle={BUTTON_STYLES.PINK}
              textStyle={BUTTON_STYLES.WHITE}
              isLowerCase
              onPress={onChangeCreatLetter}
            />
          </div>
        </div>
      </div>
      <div className='my_input_form_data_group'>
        <div className='container mx-auto'>
          <div className='upload_represent_box'>
            <div className='md:grid md:grid-cols-3 md:gap-5'>
              <div className='col-span-2'>
                <ImageUploadSingle
                  title={Languages.text.chooseCoverImage}
                  desc={Languages.text.smallsize}
                  allowDrag={false}
                />
              </div>
              <ImageUploadSingle
                title={Languages.text.chooseThumbs}
                desc={Languages.text.bigsize}
                allowDrag={false}
              />
            </div>
          </div>
          <div className='effect_image_options'>
            <div className='title'>{Languages.text.effectImage}</div>

            {renderRadio(
              'none',
              'none',
              'none',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'Light',
              'Light',
              'Light',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'Wave',
              'Wave',
              'Wave',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'Heart Frame',
              'Heart Frame',
              'Heart Frame',
              radioChangeHandler,
              radioEffectImage
            )}
          </div>

          <div className='wrapper_information_wedding'>
            {renderTitle(
              Languages.text.inforWed,
              false,
              'title_comp_wed_add_cus'
            )}
            {renderFamilyMan}
            {renderFamilyWoman}
          </div>
        </div>
      </div>
      {renderModal}
      <TimeAndLocation />
    </div>
  )
}

export default CreatePageStructure
