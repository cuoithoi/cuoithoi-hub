import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckParams, BUTTON_STYLES, Convert, INPUT_FIELDS, APi, Alias, config } from '@/commons/Constant.ts'
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
import Footer from "../Footer/Footer"
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
import { toast } from 'react-toastify'
import { uploadImage } from '@/utils/axios'
import { useSelector } from 'react-redux'
import { useBaseService } from '@/utils/BaseServices'
import Validate from '@/utils/Validate'
import { getItemFromLocalStorage, getStorage, removeStorage, setStorage } from '@/utils/localStorage'
import ProvinceDistrictList from './ProvinceDistrictList'

const CreatePage = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const [values, setValues] = useState(fiedlsCreatePage)

  const [editor, setEditor] = useState(false)
  const [idCreateRespon, setIdCreateRespon] = useState(false)

  const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

  const [imagesCover, setImagesCover] = useState([])
  const [images, setImages] = useState([])
  const [album, setAlbum] = useState([])

  const [imagesCoverURL, setImagesCoverURL] = useState([])
  const [imagesURL, setImagesURL] = useState([])
  const [albumURL, setAlbumURL] = useState([])

  const [messageCodeInvite, setMessageCodeInvite] = useState('')

  const [guestbookTemp, setGuestbookTemp] = useState('')

  const [radioEffectImage, setRadioEffectImage] = useState('none')

  const [radioGuestbookTemplate, setRadioGuestbookTemplate] = useState('none')
  const [radioStyleTitle, setRadioStyleTitle] = useState('pacifico')
  const [radioStyleContent, setRadioStyleContent] = useState('inter')
  const [radioTypeBg, setRadioTypeBg] = useState('none')
  const [radioColorBg, setRadioColorBg] = useState('none')
  const [radioEffectBg, setRadioEffectBg] = useState('none')
  const [radioMusic, setRadioMusic] = useState(0)

  const [openPanel, setOpenPanel] = useState(true)

  const [pointer, setPointer] = useState(true)
  const [disable, setDisable] = useState(true)
  const [dataPackage, setDataPackage] = useState([]);
  const [dataAnother, setDataAnother] = useState([]);
  const [valuedataAnother, setValueDataAnother] = useState([]);
  const [packageType, setPackageType] = useState([])
  const [valuedataAnotherTotalPrice, setValuedataAnotherTotalPrice] = useState(0)
  const [codeinvite, setCodeinvite] = useState('')
  const [percentOff, setPercentOff] = useState(1)
  const [checkUrl, setCheckUrl] = useState(true)

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
  const refConfirmName = useRef(null)
  const refConfirmPhone = useRef(null)
  const refConfirmEmail = useRef(null)
  const refConfirmAddress = useRef(null)
  const refModal = useRef(null)
  const refCodeinvite = useRef(null)

  const { post, get } = useBaseService()
  const { user } = useSelector((store) => store.auth)


  values.isUseConfirm = true
  values.isUseGuestBook = true
  values.isEffectOfOpenning = true

  useEffect(() => {
    if (location.state?.createpage) {
      removeStorage('createLeter')
      removeStorage('hasReloaded')
      setCheckUrl(true)
    }
  }, [])

  useEffect(() => {
    if (location.state?.editor) {
      setIdCreateRespon(location.state?.id)
      setEditor(location.state?.editor)
      setCheckUrl(false)
      const asyncDetails = async () => {
        try {
          const response = await get(APi.invitationDetail, config, {
            _id: location.state?.id,
          })

          setStorage('createLeter', JSON.stringify(response.data), 10 * 86400)
          const hasReloaded = getStorage('hasReloaded');
          if (!hasReloaded) {
            setStorage('hasReloaded', true);
            window.location.reload();
          }
          setCodeinvite(response.data?.codeInvite)
          setPackageType([response.data?.productId?.name, response.data?.productId?.amount, response.data?.productId?._id])
          setValueDataAnother(response.data?.anotherProduct)
          setValuedataAnotherTotalPrice(response.data?.totalAmount)
          setAlbumURL(response.data?.album)
          setImagesURL(response.data?.thumbnailImage)
          setImagesCoverURL([...response.data?.coverImage])
        } catch (error) {
          console.error('Đã xảy ra lỗi:', error)
        }
      }
      asyncDetails()
    }

  }, [])

  useEffect(() => {

    const asyncListProduct = async () => {
      const response = await get(APi.listProduct, config);
      setDataPackage(response.data)
    };

    const asyncListProductAnother = async () => {
      const response = await get(APi.anotherProduct, config);
      setDataAnother(response.data)
    };

    asyncListProduct();
    asyncListProductAnother();

  }, [])

  const itemLocal = getItemFromLocalStorage('createLeter')

  useEffect(() => {

    if (itemLocal) {

      itemLocal?.song && setRadioMusic(itemLocal?.song)
      itemLocal?.fontStyleOfTitle && setRadioStyleTitle(itemLocal?.fontStyleOfTitle.value)
      itemLocal?.fontStyleOfContent && setRadioStyleContent(itemLocal?.fontStyleOfContent.value)
      itemLocal?.styleBackground && setRadioTypeBg(itemLocal?.styleBackground.value)
      itemLocal?.backgroundColor && setRadioColorBg(itemLocal?.backgroundColor.value)
      itemLocal?.effectBackgroud && setRadioEffectBg(itemLocal?.effectBackgroud.value)
      itemLocal?.effectImage && setRadioEffectImage(itemLocal?.effectImage)
      // itemLocal?.coverImage && (values.coverImage = itemLocal?.coverImage)
      // itemLocal?.thumbnailImage && (values.thumbnailImage = itemLocal?.thumbnailImage)
      // itemLocal?.album && (values.album = itemLocal?.album)
    }

  }, [values, setRadioMusic, setRadioStyleTitle, setRadioStyleContent, setRadioTypeBg, setRadioColorBg, setRadioEffectBg])

  useEffect(() => {

    if (!user) {
      alert(Languages.text.noneToken)
      navigate(Alias.mypage)
    }

  }, [user])


  const onNavigateMypage = () => {
    navigate(Alias.mypage)
    removeStorage('hasReloaded')
  }

  const radioChangeHandlerGuestbookTemplate = (text, value) => {
    setRadioGuestbookTemplate(value)
    setGuestbookTemp(text)
  }

  const radioChangeHandlerStyleTitle = (text, value) => {
    setRadioStyleTitle(value)
    values.fontStyleOfTitle.value = value
  }

  const radioChangeHandlerStyleContent = (text, value) => {
    setRadioStyleContent(value)
    values.fontStyleOfContent.value = value
  }

  const radioChangeHandlerTypebg = (text, value) => {
    setRadioTypeBg(value)
    values.styleBackground.value = value
  }

  const radioChangeHandlerColorBg = (text, value) => {
    setRadioColorBg(value)
    values.backgroundColor.value = value
  }

  const radioChangeHandlerEffectBg = (text, value) => {
    setRadioEffectBg(value)
    values.effectBackgroud.value = value
  }

  const radioChangeHandler = (e) => {
    setRadioEffectImage(e.target.value)
    values.effectImage = e.target.value
  }

  const radioChangeHandlerMusic = (text, value) => {
    setRadioMusic(value)
    values.song = value
  }


  const onChange = (imageList) => {
    setImages(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImagesURL(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          });
      })
    }
  }

  const onChangeCoverImage = (imageList) => {
    setImagesCover(imageList)
    if (imageList.length > 0) {

      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImagesCoverURL(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          });
      })

    }
  }

  const onChangeAlbum = (imageList) => {

    setAlbum(imageList)

    if (imageList.length > 0) {

      imageList.slice(-1).map(function (item) {

        return uploadImage(item.file)
          .then((response) => {
            values.album.push([response.data.data])
            setAlbumURL([...response.data.data])
          })
          .catch((error) => {
            toast.error(error)
          });
      })
    }
  }

  const onSortEnd = useCallback((oldIndex, newIndex) => {
    setAlbum((array) => arrayMove(array, oldIndex, newIndex))
  }, [])

  const onChangeCreatLetter = useCallback(() => {

    const errMsgPassword = FormValidate.inputContentEmpty(values.password)
    const errMsgContentGuestBook = FormValidate.inputContentEmpty(guestbookTemp)

    // if (pointer) refPassword.current?.setErrorMsg(errMsgPassword)

    // refContentGuestBook.current?.setErrorMsg(errMsgContentGuestBook)

    if (`${errMsgPassword}${errMsgContentGuestBook}`.length === 0) {
      setOpenPanel(true)
      return true
    }
    setOpenPanel(false)
    return true

  }, [values, guestbookTemp, pointer])

  const onChangeText = useCallback((e, name) => {

    switch (name) {

      case INPUT_FIELDS.isUseConfirm:
        values.isUseConfirm = e;
        setValues(prevValues => ({
          ...prevValues,
          isUseConfirm: e
        }));
        break

      case INPUT_FIELDS.isUseGuestBook:
        values.isUseGuestBook = e;
        setValues(prevValues => ({
          ...prevValues,
          isUseGuestBook: e
        }));
        setPointer(!pointer)
        break

      case INPUT_FIELDS.password:
        values.password = e;
        setValues(prevValues => ({
          ...prevValues,
          password: e
        }));
        break

      case INPUT_FIELDS.isEffectOfOpenning:
        values.isEffectOfOpenning = e;
        setValues(prevValues => ({
          ...prevValues,
          isEffectOfOpenning: e
        }));
        break

      case INPUT_FIELDS.referralCode:
        setCodeinvite(e)
        break

      case INPUT_FIELDS.confirmName:
        values.confirmName = e;
        setValues(prevValues => ({
          ...prevValues,
          confirmName: e
        }));
        break

      case INPUT_FIELDS.confirmPhone:
        values.confirmPhone = e;
        setValues(prevValues => ({
          ...prevValues,
          confirmPhone: e
        }));
        break

      case INPUT_FIELDS.confirmEmail:
        values.confirmEmail = e;
        setValues(prevValues => ({
          ...prevValues,
          confirmEmail: e
        }));
        break

      case INPUT_FIELDS.confirmAdd:
        values.confirmAddress = e;
        setValues(prevValues => ({
          ...prevValues,
          confirmAddress: e
        }));
        break

      case INPUT_FIELDS.confirmNote:
        values.confirmNote = e;
        setValues(prevValues => ({
          ...prevValues,
          confirmNote: e
        }));
        break

      default:
        break
    }

  }, [values, setPointer, pointer, setCodeinvite]);

  const onChangeOpenGuestbookTemplate = () => {
    setCheckParams(CheckParams.TITLE_SAVE_PEN_TEMPLATES)
    refModal.current?.showModal();
  }

  const onChangePackage = useCallback((e) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const dataId = option.getAttribute('data--id');

    setPackageType([e.target.options[e.target.selectedIndex].text, e.target.value, dataId]);

  }, [values, setPackageType]);

  const onCheckedDataAnother = useCallback((e) => {

    var updatedList = [...valuedataAnother];
    if (e.target.checked) {
      updatedList = [...valuedataAnother, e.target.value];
    } else {
      updatedList.splice(valuedataAnother.indexOf(e.target.value), 1);
    }
    values.anotherProduct = updatedList
    setValueDataAnother(updatedList);
  }, [valuedataAnother])

  const onChangeSaveDraff = useCallback(() => {

    removeStorage('createLeter')
    setStorage('createLeter', JSON.stringify(values), 10 * 86400)
    toast.success(Languages.text.draff)

  }, [values, itemLocal])

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
    [onKeyPress, onChangeText]
  )

  const renderImageUploadSingle = useCallback(
    (title, images, desc, allowDrag, onChange, urlLocal, max, height, icon, titleImages) => {
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
            itemLocal?.album,
            30,
            150
          )}
        </div>
      </div>
    </Panel>
  }, [album, onChangeAlbum])

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
    return !editor && <Panel title={Languages.text.confirmAttend}>

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
  }, [editor])

  const renderGuestbook = useMemo(() => {

    return !editor && <Panel title={Languages.text.guestbook} valiOpen={openPanel}>

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
            <form>
              {renderInput(refPassword, Languages.text.settingPwd, Languages.text.settingPwd, INPUT_FIELDS.password, 'password', 50, false)}
            </form>
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
            textStyle={BUTTON_STYLES.WHITE}
            isLowerCase
            onPress={onChangeOpenGuestbookTemplate}

          />
        </div>
      </div>

    </Panel>

  }, [guestbookTemp, onChangeOpenGuestbookTemplate, onChangeGuestbookTemp, pointer, editor])

  const renderOpenStartEffect = useMemo(() => {

    return !editor && <Panel title={Languages.text.startEffect}>

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

  }, [editor])

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

    return !editor && <div className='sec_group_panel_collape'>
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
                onChange={onChangePackage}
              >
                <option value='-1'>{Languages.text.packagePro}</option>
                {
                  dataPackage.map(function (item, index) {

                    return <option data--id={item._id} key={index} value={item.amount}>{item.name} </option>

                  })
                }

              </select>
            </div>
          </div>
        </div>
      </Panel>
    </div>

  }, [dataPackage, editor, onChangePackage])

  const renderProductAnother = useMemo(() => {

    return !editor && <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.anotherPro}>
        <div className='wrap_package_product_another'>
          {
            dataAnother.map(function (item, index) {
              return <div key={index} className='single_hor_input checkbox_inline_colum'>
                <div className="item_field_single">
                  <div className="Input_boxGroupInput__8ghvv man_inputStyle">
                    <label className="Input_label__XHiJ4">{item.name} - {Validate.formatMoney(item.amount)}</label>
                    <div className="Input_formGroup__Ln91z ">
                      <input name={item.name} defaultChecked={false} type="checkbox" data--amount={item.amount} value={[item.amount, item.name]} onChange={(e) => onCheckedDataAnother(e)} className="Input_form_control__zkQn6 checkbox_input_style " />
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </Panel>
    </div>

  }, [dataAnother, valuedataAnother, editor, onCheckedDataAnother])

  const onChangeCodePress = useCallback(async (e) => {

    setCodeinvite(e)
    const response = await post(APi.codeSale, { "code": e }, config);
    if (response.data === null) {
      refCodeinvite?.current?.setErrorMsg(Languages.errorMsg.errorCode)
      setMessageCodeInvite('')
      setCodeinvite('')
    } else {
      setCodeinvite(response.data.code)
      setMessageCodeInvite(Languages.errorMsg.correctCode)
      setPercentOff(response.data.percentOff)
    }

  }, [setMessageCodeInvite, setCodeinvite])

  const renderReferralCode = useMemo(() => {

    return !editor && <div className='sec_group_panel_collape'>
      <Panel title={Languages.text.referralCode}>
        <div className='wrap_package_referralcode'>
          <div className='fullwidth_input_colum'>
            <div className='single_hor_input'>
              <MyTextInput
                ref={refCodeinvite}
                value={codeinvite}
                label={Languages.text.referralCode}
                name={INPUT_FIELDS.referralCode}
                placeHolder={Languages.text.referralCode}
                type={'text'}
                maxLength={20}
                styleGroup={'man_inputStyle'}
                onChangeText={(e) => onChangeCodePress(e.target.value)}
                disabled={messageCodeInvite.length > 0 ? false : true}
              />
              <div className='messageSuccess'>
                <p>{messageCodeInvite}</p>
              </div>
            </div>
          </div>

        </div>
      </Panel>
    </div>

  }, [editor, codeinvite, messageCodeInvite])

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
      === true) {
      return true
    }
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

  }, [onChangeCreatLetter, values])

  const onChangeSaveSetting = useCallback(async () => {

    const jsonData = {
      "userId": user?.userId,
      "coverImage": imagesCoverURL,
      "thumbnailImage": imagesURL,
      "effectImage": radioEffectImage,
      "informationOfGroom":
      {
        "firstName": values.informationOfGroom[0].firstName,
        "middleName": values.informationOfGroom[0].middleName,
        "name": values.informationOfGroom[0].name,
        "isOldBrotherGroom": values.informationOfBride[0].isOldBrotherGroom,
        "codingRegion": "84",
        "phoneNumberOfGroom": values.informationOfGroom[0].phoneNumberOfGroom,
        "firstFatherNameOfGroom": values.informationOfGroom[0].firstFatherNameOfGroom,
        "middleFatherNameOfGroom": values.informationOfGroom[0].middleFatherNameOfGroom,
        "fatherNameOfGroom": values.informationOfGroom[0].fatherNameOfGroom,
        "phoneNumberOfFatherGroom": values.informationOfGroom[0].phoneNumberOfFatherGroom,
        "isGoneFather": values.informationOfGroom[0].isGoneFather,
        "firstMotherNameOfGroom": values.informationOfGroom[0].firstMotherNameOfGroom,
        "middleMotherNameOfGroom": values.informationOfGroom[0].middleMotherNameOfGroom,
        "motherNameOfGroom": values.informationOfGroom[0].motherNameOfGroom,
        "phoneNumberOfMotherGroom": values.informationOfGroom[0].phoneNumberOfMotherGroom,
        "isGoneMother": values.informationOfGroom[0].isGoneMother,
        "nameBankOfGroom": values.informationOfGroom[0].nameBankOfGroom,
        "ownerBankOfGroom": values.informationOfGroom[0].ownerBankOfGroom,
        "bankOfNumberGroom": values.informationOfGroom[0].bankOfNumberGroom,
        "qrCodeGroomLink": values.informationOfGroom[0].qrCodeGroomLink,
        "nameBankOfFatherGroom": values.informationOfGroom[0].nameBankOfFatherGroom,
        "ownerBankOfFatherGroom": values.informationOfGroom[0].ownerBankOfFatherGroom,
        "bankOfNumberFatherGroom": values.informationOfGroom[0].bankOfNumberFatherGroom,
        "qrCodeFatherGroomLink": values.informationOfGroom[0].qrCodeFatherGroomLink,
        "nameBankOfMotherGroom": values.informationOfGroom[0].nameBankOfMotherGroom,
        "ownerBankOfMotherGroom": values.informationOfGroom[0].ownerBankOfMotherGroom,
        "bankOfNumberMotherGroom": values.informationOfGroom[0].bankOfNumberMotherGroom,
        "qrCodeMotherGroomLink": values.informationOfGroom[0].qrCodeMotherGroomLink
      },
      "informationOfBride":
      {
        "firstName": values.informationOfBride[0].firstName,
        "middleName": values.informationOfBride[0].middleName,
        "name": values.informationOfBride[0].name,
        "isOldBrotherBride": values.informationOfBride[0].isOldBrotherBride,
        "codingRegion": "84",
        "phoneNumberOfBride": values.informationOfBride[0].phoneNumberOfBride,
        "firstFatherNameOfBride": values.informationOfBride[0].firstFatherNameOfBride,
        "middleFatherNameOfBride": values.informationOfBride[0].middleFatherNameOfBride,
        "fatherNameOfBride": values.informationOfBride[0].fatherNameOfBride,
        "phoneNumberOfFatherBride": values.informationOfBride[0].phoneNumberOfFatherBride,
        "isGoneFatherBride": values.informationOfBride[0].isGoneFatherBride,
        "firstMotherNameOfBride": values.informationOfBride[0].firstMotherNameOfBride,
        "middleMotherNameOfBride": values.informationOfBride[0].middleMotherNameOfBride,
        "motherNameOfBride": values.informationOfBride[0].motherNameOfBride,
        "phoneNumberOfMotherBride": values.informationOfBride[0].phoneNumberOfMotherBride,
        "isGoneMotherOfBride": values.informationOfBride[0].isGoneMotherOfBride,
        "nameBankOfBride": values.informationOfBride[0].nameBankOfBride,
        "ownerBankOfBride": values.informationOfBride[0].ownerBankOfBride,
        "bankOfNumberBride": values.informationOfBride[0].bankOfNumberBride,
        "qrCodeBrideLink": values.informationOfBride[0].qrCodeBrideLink,
        "nameBankOfFatherBride": values.informationOfBride[0].nameBankOfFatherBride,
        "ownerBankOfFatherBride": values.informationOfBride[0].ownerBankOfFatherBride,
        "bankOfNumberFatherBride": values.informationOfBride[0].bankOfNumberFatherBride,
        "qrCodeFatherBrideLink": values.informationOfBride[0].qrCodeFatherBrideLink,
        "nameBankOfMotherBride": values.informationOfBride[0].nameBankOfMotherBride,
        "ownerBankOfMotherBride": values.informationOfBride[0].ownerBankOfMotherBride,
        "bankOfNumberMotherBride": values.informationOfBride[0].bankOfNumberMotherBride,
        "qrCodeMotherBrideLink": values.informationOfBride[0].qrCodeMotherBrideLink
      },
      "isDisplayGonePeople": values.informationOfBride[0].isDisplayGonePeople,
      "contentOfInvitation": values.informationOfBride[0].contentOfInvitation,
      "timeAndLocationOfWedding": {
        "dateOfEventWedding": values.timeAndLocationOfWedding.dateOfEventWedding,
        "timeOfEventWedding": values.timeAndLocationOfWedding.timeOfEventWedding,
        "locationOfWedding": values.timeAndLocationOfWedding.locationOfWedding,
        "mapDirectLink": values.timeAndLocationOfWedding.mapDirectLink,
        "isDisplayCountDown": values.timeAndLocationOfWedding.isDisplayCountDown,
        "contentOfCountDown": values.arraylist[0].contentOfCountDown
      },
      "timeAndLocationOfEgagement": {
        "dateOfEventEgagement": values.timeAndLocationOfEgagement.dateOfEventEgagement,
        "timeOfEventEgagement": values.timeAndLocationOfEgagement.timeOfEventEgagement,
        "locationOfEgagement": values.timeAndLocationOfEgagement.locationOfEgagement
      },
      "timeAndLocationOfInterrogation": {
        "dateOfEventInterrogation": values.timeAndLocationOfInterrogation.dateOfEventInterrogation,
        "timeOfEventInterrogation": values.timeAndLocationOfInterrogation.timeOfEventInterrogation,
        "locationOfInterrogation": values.timeAndLocationOfInterrogation.locationOfInterrogation
      },
      "album": values.album,
      "videoLink": values.videoLink,
      "eventOfProgram": {
        "timeToWellcome": values.eventOfProgram.timeToWellcome,
        "timeToCelebrate": values.eventOfProgram.timeToCelebrate,
        "timeToDinner": values.eventOfProgram.timeToDinner,
        "timeToMusic": values.eventOfProgram.timeToMusic
      },
      "song": radioMusic,
      "fontStyleOfTitle": {
        "value": radioStyleTitle
      },
      "fontStyleOfContent": {
        "value": radioStyleContent
      },
      "styleBackground": {
        "value": radioTypeBg
      },
      "backgroundColor": {
        "value": radioColorBg
      },
      "effectBackgroud": {
        "value": radioEffectBg
      },
    }

    if (checkUrl) {
      const response = await post(APi.createInvitation, Object.assign(jsonData, {
        "isUseConfirm": values.isUseConfirm,
        "isUseGuestBook": values.isUseGuestBook,
        "password": values.password,
        "contentGuestBook": values.contentGuestBook,
        "isEffectOfOpenning": values.isEffectOfOpenning,
        "packageType": packageType,
        "anotherProduct": values.anotherProduct,
        "codeInvite": codeinvite,
        "productId": packageType[2],
        "status": '2'
      }), config);
      removeStorage('createLeter')
      if (response.errorCode == 0) {
        toast.success(Languages.errorMsg.success)
        setIdCreateRespon(response.data._id)
        setDisable(false)
        console.log(response)
        // setStorage('createLeter', JSON.stringify(response.data), 10 * 86400)
      }
      else {
        toast.error(Languages.errorMsg.errorSuccess)
      }
    } else {

      const responseupdate = await post(APi.updateInvitation, Object.assign(jsonData, {
        "_id": idCreateRespon
      }), config);
      if (responseupdate.errorCode == 0) {
        toast.success(Languages.errorMsg.updatesuccess)
        setDisable(false)
      }
      else {
        toast.error(Languages.errorMsg.errorSuccess)
      }

    }

  }, [imagesURL, imagesCoverURL, album, packageType, user, codeinvite, idCreateRespon])

  const onOpenSuccessConfirm = useCallback(() => {
console.log(imagesCoverURL)
    try {
      if (imagesCoverURL.length === 0 || imagesURL.length === 0 || albumURL.length === 0) {

        toast.error(Languages.errorMsg.uploadingEmpty);

      } else if (passValidateSuccess() !== true) {
        toast.error(Languages.errorMsg.noEmpty)
        onChangeSaveSetting()

      } else {
        onChangeSaveSetting()
        const totalSum = valuedataAnother.reduce((acc, curr) => {
          const arrayItem = curr.split(",", 2).slice(0, 1).map(Number);
          const sum = parseInt(arrayItem[0]);
          return acc + sum;
        }, 0);

        const discount = percentOff === 1 ? percentOff === 0 : percentOff
        const total = parseInt(packageType[1]) + totalSum * (parseInt(1 - discount));
        setValuedataAnotherTotalPrice(total)

        setCheckParams(CheckParams.CONFIRM_INFO)
        refModal.current?.showModal()
      }

    } catch {
      window.location.reload()
    }

  }, [onChangeSaveSetting, passValidateSuccess, setValuedataAnotherTotalPrice, imagesCoverURL, imagesURL, albumURL  , codeinvite, percentOff])


  const onChangeValidateConfirm = useCallback(async () => {

    // const errMsgCornfimName = FormValidate.inputContentEmpty(values.confirmName)
    // const errMsgCornfimPhone = FormValidate.passConFirmPhone(values.confirmPhone)
    // const errMsgCornfimEmail = FormValidate.emailValidate(values.confirmEmail)
    // const errMsgCornfimAddress = FormValidate.inputContentEmpty(values.confirmAddress)

    // refConfirmName.current?.setErrorMsg(errMsgCornfimName)
    // refConfirmPhone.current?.setErrorMsg(errMsgCornfimPhone)
    // refConfirmEmail.current?.setErrorMsg(errMsgCornfimEmail)
    // refConfirmAddress.current?.setErrorMsg(errMsgCornfimAddress)

    // if (`${errMsgCornfimName}${errMsgCornfimPhone}${errMsgCornfimEmail}${errMsgCornfimAddress}`.length === 0) {

    const jsonData = {
      "_id": idCreateRespon,
      "status": "4",
      "confirmName": values.confirmName,
      "confirmPhone": values.confirmPhone,
      "confirmEmail": values.confirmEmail,
      "confirmAddress": values.confirmAddress,
      "confirmNote": values.confirmNote,
      "confirmProvince": values.confirmProvince,
      "confirmDistrict": values.confirmDistrict,
      "confirmWardt": values.confirmWardt,
      "totalAmount": valuedataAnotherTotalPrice,
    }

    const response = await post(APi.updateInvitation, jsonData, config);

    if (response.errorCode == 0) {
      toast.success(Languages.errorMsg.updatesuccess)
      setDisable(false)
    }
    else {
      toast.error(Languages.errorMsg.errorSuccess)
    }


    // }
    // return false

  }, [values, valuedataAnotherTotalPrice])

  const onShowModalAgree = () => {

    setCheckParams(CheckParams.AFFTER)
    refModal.current?.showModal()

  }

  const onPressHandleModal = useCallback(() => {

    switch (checkParams) {

      case CheckParams.AFFTER:
        navigate('/')
        removeStorage('hasReloaded')
        break

      case CheckParams.CONFIRM_INFO:
        onChangeValidateConfirm()
        break

      default:
        break
    }

  }, [checkParams, onChangeValidateConfirm])

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

      || checkParams === CheckParams.SUCCESS_CREATE && <div className='renderContentModal' >
        <div className='head'>
          <img src={IcInf} alt={'icinf'} />
          <h2>{Languages.text.success}</h2>
        </div>
        <div className='contentModal'>
          <p>{Languages.text.happysuccess}</p>
        </div>
      </div >

      || checkParams === CheckParams.CONFIRM_INFO && <div className='renderContentModal' >
        <div className='form_confirm_info'>
          <div className='header'>
            <h2>
              {Languages.text.confimSuccess}
            </h2>
          </div>
          <div className='body_form'>
            <div className='wrap_form'>
              <h4>{Languages.text.ReceiverPerson}</h4>
              <div className='form_group_info'>
                <div className='double_input_row'>
                  <div className='half_row_hor_input'>
                    {renderInput(refConfirmName, '', Languages.inputText.name, INPUT_FIELDS.confirmName, 'text', 100, false)}
                  </div>
                  <div className='half_row_hor_input'>
                    {renderInput(refConfirmPhone, '', Languages.inputText.phone, INPUT_FIELDS.confirmPhone, 'number', 10, false)}
                  </div>
                </div>
                <div className='fullwidth_input_colum'>
                  <div className='single_hor_input'>
                    {renderInput(refConfirmEmail, '', 'Email', INPUT_FIELDS.confirmEmail, 'text', 50, true)}
                  </div>
                </div>
                <div className='fullwidth_input_colum'>
                  <div className='single_hor_input'>
                    {renderInput(refConfirmAddress, '', Languages.inputText.address, INPUT_FIELDS.confirmAdd, 'text', 200, true)}
                  </div>
                </div>

                <ProvinceDistrictList />

                <div className='fullwidth_input_colum'>
                  <div className='single_hor_input'>
                    {renderInput('', '', Languages.inputText.note, INPUT_FIELDS.confirmNote, 'text', 200, true)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='body_info_price'>
            <div className='bode_info_head'>
              <h4>{Languages.text.servicesInfo}</h4>
            </div>
            <div className='body_info_list_product'>
              <div className='package_box'>
                <div className='box_left'>
                  <h5>
                    {Languages.text.packageSer}
                  </h5>
                  <p>{packageType[0]}</p>
                </div>
                <div className='box_right'>
                  <h5>
                    {Validate.formatMoney(packageType[1])}
                  </h5>
                </div>
              </div>
              <div className='package_box' style={{ display: 'block' }}>

                <div className='another_item'>
                  <h5>
                    {Languages.text.anotherPro}
                  </h5>
                  {
                    valuedataAnother.map(function (item, index) {
                      const arrayItem = item.split(",", 2)
                      return <div key={index}>
                        <div className='box_left'>
                          <p>{arrayItem[1]}</p>
                        </div>
                        <div className='box_right'>
                          <h5>
                            {Validate.formatMoney(arrayItem[0])}
                          </h5>
                        </div>
                      </div>
                    })
                  }

                </div>
              </div>
              <div className='package_box'>
                <div className='box_left'>
                  <h5>
                    {Languages.text.referralCode}
                  </h5>
                  <p>{codeinvite}</p>
                </div>
                <div className='box_right'>
                  <h5>
                    {
                      parseInt(percentOff * 100)
                    }%
                  </h5>
                </div>
              </div>
              <div className='total_price'>
                <h5>
                  {Languages.text.total}
                </h5>
                <span className='amount'>
                  {Validate.formatMoney(valuedataAnotherTotalPrice)}
                </span>
              </div>
              <p className='free14day'>
                {Languages.text.free14day}
              </p>
              <div className='bottom_form_btn_success'>
                <p className='des_pay_services'>
                  {Languages.text.payServices}
                </p>
                <p className='contact'>
                  Zalo: 090932421 - Hotline: (+84) 083595123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div >

      || checkParams === CheckParams.TITLE_SAVE_PEN_TEMPLATES && renderMapRadio(Languages.text.inviteTitle, SelectSavePenTemplate, radioChangeHandlerGuestbookTemplate, radioGuestbookTemplate)

    )
  }, [
    checkParams,
    radioGuestbookTemplate,
    valuedataAnother,
    valuedataAnotherTotalPrice,
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
            {
              checkUrl ? <Button
                label={Languages.common.saveDraf}
                buttonStyle={BUTTON_STYLES.GRAY}
                isLowerCase
                onPress={onOpenSuccessConfirm}
              /> : ''
            }

            <Button
              label={Languages.common.continue}
              buttonStyle={BUTTON_STYLES.PINK}
              textStyle={BUTTON_STYLES.WHITE}
              isLowerCase
              disabled={disable}
              onPress={onNavigateMypage}
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
                  onChangeCoverImage,
                  itemLocal?.coverImage
                )}
              </div>
              {renderImageUploadSingle(
                Languages.text.chooseThumbs,
                images,
                Languages.text.smallsize,
                false,
                onChange,
                itemLocal?.thumbnailImage
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
              <Panel title={Languages.text.informationBanking}>
                <BankingGroom ref={refBankingGroom} />
                <BankingBrice ref={refBankingBride} />
              </Panel>
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
                  textStyle={BUTTON_STYLES.WHITE}
                  autocenter
                  onPress={onOpenSuccessConfirm}
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
