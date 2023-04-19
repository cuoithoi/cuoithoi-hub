import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckParams, BUTTON_STYLES, Convert, INPUT_FIELDS } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'
import { Button } from '@/components/button'
import Languages from '@/commons/Languages'
import { ImageUpload } from '@/components/imageUpload'
import ImgUploadIcon from '@/components/icons/ImgUploadIcon'
import arrayMove from 'array-move-e5'
import { RadioButton } from '@/components/RadioButton'
import IcInf from '@/assets/home-image/IcInf.svg'
import Popup from '@/components/modal/Popup'
import { MyTextArea } from '@/components/textarea'
import { SelectColorBg, SelectEffectBg, SelectMusic, SelectSavePenTemplate, SelectStyleTContent, SelectStyleTitle, SelectTypeBg, fiedlsCreatePage } from '@/commons/FieldsDataObj'
import { Panel } from '@/components/panel'
import Footer from "../Footer/Footer";
import MultiPlayer from '@/components/multiAudio'
import FamilyGroom from './FamilyGroom'
import FamilyBride from './FamilyBride'
import TimeandLocation from './TimeandLocation'
import DamNgoAnHoi from './DamNgoAnHoi'
import VideoandEvent from './VideoandEvent'
import BankingGroom from './BankingGroom'
import BankingBrice from './BankingBrice'
import TitleCreate from '@/components/createPage/subcomp/TitleCreate'
import FormValidate from '@/utils/FormValidate'
import { toast } from 'react-toastify';
import { uploadImage } from '@/utils/axios'

const CreatePage = () => {

  const navigate = useNavigate()

  const [values] = useState(fiedlsCreatePage)
  const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

  const [imagesCover, setImagesCover] = useState([])
  const [images, setImages] = useState([])
  const [album, setAlbum] = useState([])

  const [guestbookTemp, setGuestbookTemp] = useState('')

  const [radioEffectImage, setRadioEffectImage] = useState('none')

  const [radioGuestbookTemplate, setRadioGuestbookTemplate] = useState('none')
  const [radioStyleTitle, setRadioStyleTitle] = useState('pacifico')
  const [radioStyleContent, setRadioStyleContent] = useState('inter')
  const [radioTypeBg, setRadioTypeBg] = useState('none')
  const [radioColorBg, setRadioColorBg] = useState('none')
  const [radioEffectBg, setRadioEffectBg] = useState('none')
  const [radioMusic, setRadioMusic] = useState('none')

  const [openPanel, setOpenPanel] = useState(true)

  const [pointer, setPointer] = useState(true)

  const refUnderfine = useRef(null)
  const refGroom = useRef(null)
  const refBrice = useRef(null)
  const refTimeandLocation = useRef(null)
  const refDamngovaAnhoi = useRef(null)
  const refVideovaSukien = useRef(null)
  const refBankingGroom = useRef(null)
  const refBankingBride = useRef(null)
  const refPassword = useRef(null)
  const refContentGuestBook = useRef(null)
  const refModal = useRef(null)

  values.isUseConfirm = true
  values.isUseGuestBook = true
  values.isEffectOfOpenning = true

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

  const radioChangeHandlerGuestbookTemplate = (text, value) => {
    setRadioGuestbookTemplate(value)
    setGuestbookTemp(text)
  }

  const radioChangeHandlerStyleTitle = (text, value) => {
    setRadioStyleTitle(value)
  }

  const radioChangeHandlerStyleContent = (text, value) => {
    setRadioStyleContent(value)
  }

  const radioChangeHandlerTypebg = (text, value) => {
    setRadioTypeBg(value)
  }

  const radioChangeHandlerColorBg = (text, value) => {
    setRadioColorBg(value)
  }

  const radioChangeHandlerEffectBg = (text, value) => {
    setRadioEffectBg(value)
  }

  const radioChangeHandler = (e) => {
    setRadioEffectImage(e.target.value)
    values.effectImage = e.target.value
  }

  const radioChangeHandlerMusic = (text, value) => {
    setRadioMusic(value)
  }

  const onUploadImage = useCallback((file) => {
    if (file.length > 0) {
      uploadImage(file[0].file)
        .then((response) => {
          values.thumbnailImage = response.data.data;
          console.log(response.data.data)
        })
        .catch((error) => {
          toast.error(error)
        });
    }
  }, [])

  const onChange = (imageList) => {
    setImages(imageList)
    onUploadImage(imageList)

  }

  const onChangeCoverImage = (imageList) => {
    setImagesCover(imageList)
    onUploadImage(imageList)
  }

  const onChangeAlbum = (imageList) => {
    setAlbum(imageList)
    onUploadImage(imageList)
  }

  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setAlbum((array) => arrayMove(array, oldIndex, newIndex))
  }, [])

  const onChangeCreatLetter = useCallback(() => {

    const errMsgPassword = FormValidate.inputContentEmpty(values.password)
    const errMsgContentGuestBook = FormValidate.inputContentEmpty(guestbookTemp)

    if (pointer) refPassword.current?.setErrorMsg(errMsgPassword)

    refContentGuestBook.current?.setErrorMsg(errMsgContentGuestBook)

    if (`${errMsgPassword}${errMsgContentGuestBook}`.length === 0) {
      console.log('Password - ContentGuestBook')
      setOpenPanel(true)
      return true
    }
    setOpenPanel(false)
    return false

  }, [values, guestbookTemp, pointer])

  const onChangeText = useCallback((e, name) => {

    switch (name) {

      case INPUT_FIELDS.isUseConfirm:
        values.isUseConfirm = e;
        break

      case INPUT_FIELDS.isUseGuestBook:
        values.isUseGuestBook = e;
        setPointer(!pointer)
        break

      case INPUT_FIELDS.password:
        values.password = e;
        break

      case INPUT_FIELDS.isEffectOfOpenning:
        values.isEffectOfOpenning = e;
        break

      default:
        break
    }

  }, [values, setPointer, pointer]);

  const onChangeOpenGuestbookTemplate = () => {
    setCheckParams(CheckParams.TITLE_SAVE_PEN_TEMPLATES)
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

      checkParams === CheckParams.AFFTER &&

      <div className='renderContentModal' >
        <div className='head'>
          <img src={IcInf} alt={'icinf'} />
          <h2>{Languages.text.createAfter}</h2>
        </div>
        <div className='contentModal'>
          <p>{Languages.text.contentAfter}</p>
        </div>
      </div >

      || checkParams === CheckParams.TITLE_SAVE_PEN_TEMPLATES && renderMapRadio(Languages.text.inviteTitle, SelectSavePenTemplate, radioChangeHandlerGuestbookTemplate, radioGuestbookTemplate)

    )
  }, [
    checkParams,
    radioGuestbookTemplate,
    renderMapRadio,
    radioChangeHandlerGuestbookTemplate
  ])

  const renderModal = useMemo(() => {

    return (
      <Popup
        ref={refModal}
        content={renderContentModal}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.agree}
        onSuccessPress={onPressHandleModal}
        maxWidth={checkParams === CheckParams.AFFTER ? Convert.W_400 : Convert.W_800}
      />
    )
  }, [renderContentModal, checkParams])

  const renderImageUploadSingle = useCallback(
    (title, images, desc, allowDrag, onChange, max, height, icon, titleImages) => {
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
          />
        </div>
      )
    },
    [onSortEnd]
  )

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
    []
  )

  const renderAlbum = useMemo(() => {
    return <Panel title={Languages.text.albumWed}>
      <div className='album_list_thumb_wedding'>
        <div className='album_notifi'>
          <ul className='notifi'>
            <li>
              {Languages.text.sortImage}
            </li>
            <li>
              {Languages.text.maximumUpload}
            </li>
            <li>
              {Languages.text.performance}
            </li>
          </ul>
        </div>
        <div className='list_album_uploads'>
          {renderImageUploadSingle(
            '',
            album,
            '',
            true,
            onChangeAlbum,
            30,
            150
          )}
        </div>
      </div>
    </Panel>
  }, [album, onChangeAlbum])

  const renderBanking = useMemo(() => {
    return <Panel title={Languages.text.informationBanking}>
      <BankingGroom ref={refBankingGroom} />
      <BankingBrice ref={refBankingBride} />
    </Panel>
  }, [])

  const renderMusic = useMemo(() => {

    return <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.music}>
        <div className='custom_display_sec_radio_music'>
          {renderMapRadio('', SelectMusic, radioChangeHandlerMusic, radioMusic)}
          <MultiPlayer
            urls={[
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            ]}
          />
        </div>
      </Panel>
    </div>

  }, [radioMusic, radioChangeHandlerMusic])

  const renderConfirmAttend = useMemo(() => {
    return <Panel title={Languages.text.confirmAttend}>

      <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
        <div className='title'>
          {Languages.text.useFeatureAttend}
        </div>
        <div className='single_hor_input checkbox_inline_colum'>
          <div className="item_field_single">
            <div className="Input_boxGroupInput__8ghvv man_inputStyle">
              <label className="Input_label__XHiJ4">{Languages.text.use}</label>
              <div className="Input_formGroup__Ln91z ">
                <input name="" defaultChecked={true} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, INPUT_FIELDS.isUseConfirm)} />
              </div>
            </div>
          </div>
        </div>
        <div className='details_attend'>
          <p>
            {Languages.text.attend} <b>{Languages.text.confirmAttend}</b>{Languages.text.enableAttend}
          </p>
          <p>{Languages.text.readChart}</p>
        </div>
      </div>

    </Panel>
  }, [])

  const renderGuestbook = useMemo(() => {

    return <Panel title={Languages.text.guestbook} valiOpen={openPanel}>

      <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
        <div className='title'>
          {Languages.text.useGuestbook}
        </div>
        <div className='single_hor_input checkbox_inline_colum'>
          <div className="Input_boxGroupInput__8ghvv man_inputStyle">
            <label className="Input_label__XHiJ4">{Languages.text.use}</label>
            <div className="Input_formGroup__Ln91z ">
              <input name="" defaultChecked={true} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, INPUT_FIELDS.isUseGuestBook)} />
            </div>
          </div>

        </div>
        <div className={`${pointer ? 'double_input_row' : 'double_input_row disable'}`}>
          <div className='half_row_hor_input'>
            {renderInput(refPassword, Languages.text.settingPwd, Languages.text.settingPwd, INPUT_FIELDS.password, 'password', 50, false)}
          </div>
          <div className='half_row_hor_input'>
            <span>
              {Languages.text.minPwd}
            </span>
          </div>
        </div>
        <div className='details_attend'>
          <span>{Languages.text.obligatory}</span>
        </div>
        <div className='single_hor_input'>
          <MyTextArea
            ref={refContentGuestBook}
            value={guestbookTemp}
            label={Languages.inputText.contentInvite}
            placeHolder={Languages.inputText.contentInvite}
            maxLength={500}
            onChangeText={onChangeGuestbookTemp}
          />
          <Button

            label={Languages.buttonText.titleTemplate}
            buttonStyle={BUTTON_STYLES.PINK}
            textStyle={BUTTON_STYLES.PINK}
            isLowerCase
            onPress={onChangeOpenGuestbookTemplate}

          />
        </div>
      </div>

    </Panel>

  }, [guestbookTemp, onChangeOpenGuestbookTemplate, onChangeGuestbookTemp, pointer])

  const renderOpenStartEffect = useMemo(() => {

    return <Panel title={Languages.text.startEffect}>

      <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
        <div className='title'>
          {Languages.text.checkedUseStartEffect}
        </div>
        <div className='single_hor_input checkbox_inline_colum'>
          <div className="Input_boxGroupInput__8ghvv man_inputStyle">
            <label className="Input_label__XHiJ4">{Languages.text.use}</label>
            <div className="Input_formGroup__Ln91z ">
              <input name="" defaultChecked={true} type="checkbox" className="Input_form_control__zkQn6 checkbox_input_style " onChange={(e) => onChangeText(e.target.checked, INPUT_FIELDS.isEffectOfOpenning)} />
            </div>
          </div>
        </div>
      </div>

    </Panel>

  }, [])

  const renderComponentStyle = useCallback((classstyle, title, data, onChangeRadio, state) => {
    return <div className={`${'option_type_container'}  ${classstyle}`} >
      <div className='option_title_head'>
        <h5>
          {title}
        </h5>
      </div>
      <div className='option_select custom_style_radio'>
        {renderMapRadio('', data, onChangeRadio, state)}
      </div>
    </div>
  }, [])

  const renderTextStyle = useMemo(() => {

    return <Panel title={Languages.text.textStyleFont}>

      <div className='sec_options_select_type'>

        {renderComponentStyle('option_title', Languages.text.chooseFontTitle, SelectStyleTitle, radioChangeHandlerStyleTitle, radioStyleTitle)}
        {renderComponentStyle('option_content', Languages.text.chooseFontContent, SelectStyleTContent, radioChangeHandlerStyleContent, radioStyleContent)}

      </div>

    </Panel>

  }, [radioStyleTitle, radioStyleContent, radioChangeHandlerStyleContent, radioChangeHandlerStyleTitle])

  const renderEffectBgStyle = useMemo(() => {

    return <Panel title={Languages.text.effectBg}>

      <div className='sec_options_select_type'>

        {renderComponentStyle('option_type_bg', Languages.text.typeBg, SelectTypeBg, radioChangeHandlerTypebg, radioTypeBg)}
        {renderComponentStyle('option_color_bg', Languages.text.colorBg, SelectColorBg, radioChangeHandlerColorBg, radioColorBg)}
        {renderComponentStyle('option_effect_bg', Languages.text.effectBg, SelectEffectBg, radioChangeHandlerEffectBg, radioEffectBg)}

      </div>

    </Panel>

  }, [radioEffectBg, radioColorBg, radioTypeBg, radioChangeHandlerTypebg, radioChangeHandlerColorBg, radioChangeHandlerEffectBg])

  const renderBuyPackageProduct = useMemo(() => {

    return <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.packageProduct}>
        <div className='wrap_package_product'>
          <div className='item_field_single'>
            <div className='sellect_option'>
              <label className='Input_label__90o4b'>
                {Languages.text.packagePro}
              </label>
              <select
                className='form_sellect_control'
                name='form_sellect_stt'
              >
                <option value='1'>{Languages.inputText.top1}</option>
                <option value='2'>{Languages.inputText.notTop}</option>
              </select>
            </div>
          </div>
        </div>
      </Panel>
    </div>

  }, [])

  const renderProductAnother = useMemo(() => {

    return <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.anotherPro}>
        <div className='wrap_package_product_another'>

        </div>
      </Panel>
    </div>

  }, [])

  const renderReferralCode = useMemo(() => {

    return <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.referralCode}>
        <div className='wrap_package_referralcode'>
          <div className='fullwidth_input_colum'>
            <div className='single_hor_input'>
              {renderInput('', '', Languages.text.referralCode, Languages.text.referralCode, 'text', 200, false)}
            </div>
          </div>

        </div>
      </Panel>
    </div>

  }, [])

  function onChangeGuestbookTemp(event) {
    setGuestbookTemp(event.target.value)
    values.contentGuestBook = event.target.value
  }

  const passValidateSuccess = useCallback(() => {

    if (refGroom.current?.onChangeCreatLetter()
      && refBrice.current?.onChangeCreatLetter()
      && refTimeandLocation.current?.onChangeCreatLetter()
      && refDamngovaAnhoi.current?.onChangeCreatLetter()
      && refVideovaSukien.current?.onChangeCreatLetter()
      && refBankingGroom.current?.onChangeCreatLetter()
      && refBankingBride.current?.onChangeCreatLetter()
      && onChangeCreatLetter()
      === true) return true
    else {
      refGroom.current?.onChangeCreatLetter()
      refBrice.current?.onChangeCreatLetter()
      refTimeandLocation.current?.onChangeCreatLetter()
      refDamngovaAnhoi.current?.onChangeCreatLetter()
      refVideovaSukien.current?.onChangeCreatLetter()
      refBankingGroom.current?.onChangeCreatLetter()
      refBankingBride.current?.onChangeCreatLetter()
      onChangeCreatLetter()
    }

    return false

  }, [onChangeCreatLetter])

  const onChangeSaveSetting = useCallback(() => {

    try {
      if (imagesCover.length === 0 || images.length === 0 || album.length === 0) {

        toast.error(Languages.errorMsg.uploadingEmpty, {
          position: toast.POSITION.TOP_CENTER
        });

      } else if (passValidateSuccess !== true) {

        toast.error(Languages.errorMsg.noEmpty, {
          position: toast.POSITION.TOP_CENTER
        })
        passValidateSuccess()

      } else {

        console.log('passes')

      }

    } catch {
      window.location.reload()
    }

  }, [images, imagesCover, album, passValidateSuccess])

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
            />
            <Button
              label={Languages.common.continue}
              buttonStyle={BUTTON_STYLES.PINK}
              textStyle={BUTTON_STYLES.WHITE}
              isLowerCase
            />
          </div>
        </div>
      </div>
      <div className='my_input_form_data_group'>
        <div className='container mx-auto'>
          <div className='upload_represent_box'>
            <div className='md:grid md:grid-cols-3 md:gap-5'>
              <div className='col-span-2'>
                {renderImageUploadSingle(
                  Languages.text.chooseCoverImage,
                  imagesCover,
                  Languages.text.bigsize,
                  false,
                  onChangeCoverImage
                )}
              </div>
              {renderImageUploadSingle(
                Languages.text.chooseThumbs,
                images,
                Languages.text.smallsize,
                false,
                onChange
              )}
            </div>
          </div>
          <div className='effect_image_options'>
            <div className='title'>{Languages.text.effectImage}</div>

            {renderRadio('none', 'none', 'none', radioChangeHandler, radioEffectImage)}
            {renderRadio('Light', 'Light', 'Light', radioChangeHandler, radioEffectImage)}
            {renderRadio('Wave', 'Wave', 'Wave', radioChangeHandler, radioEffectImage)}
            {renderRadio('Heart Frame', 'Heart Frame', 'Heart Frame', radioChangeHandler, radioEffectImage)}

          </div>

          <div className='wrapper_information_wedding'>

            <TitleCreate title={Languages.text.inforWed} divided={false} classNameCus={'title_comp_wed_add_cus'} />

            <FamilyGroom ref={refGroom} />
            <FamilyBride ref={refBrice} />
            <TimeandLocation ref={refTimeandLocation} />
            <div className='sec_group_panel_collape float_display'>

              <DamNgoAnHoi ref={refDamngovaAnhoi} />
              {renderAlbum}
              <VideoandEvent ref={refVideovaSukien} />
              {renderBanking}
              {renderMusic}
              {renderConfirmAttend}
              {renderGuestbook}
              {renderOpenStartEffect}
              {renderTextStyle}
              {renderEffectBgStyle}
              {renderBuyPackageProduct}
              {renderProductAnother}
              {renderReferralCode}

              <div className='savesetting_btn'>
                <Button
                  label={Languages.buttonText.saveSettings}
                  buttonStyle={BUTTON_STYLES.PINK}
                  textStyle={BUTTON_STYLES.PINK}
                  autocenter
                  onPress={onChangeSaveSetting}
                />
              </div>
              <div className='wrap_flop_note_using float_display'>
                <div className='box_note_using'>
                  <ul>
                    <li>
                      {Languages.text.changePlan}
                    </li>
                    <li>
                      {Languages.text.useMax7day}
                    </li>
                    <li>
                      {Languages.text.useActive90day}
                    </li>
                    <li>
                      {Languages.text.contactSupport}
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {renderModal}

      <Footer />
    </div>
  )
}

export default CreatePage
