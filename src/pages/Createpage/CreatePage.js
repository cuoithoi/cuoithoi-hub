import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CheckParams,
  BUTTON_STYLES,
  Convert,
  INPUT_FIELDS,
  APi,
  Alias,
  config,
} from '@/commons/Constant.ts'
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
import {
  SelectColorBg,
  SelectEffectBg,
  SelectInvitationStyle,
  SelectMusic,
  SelectSavePenTemplate,
  SelectStyleTContent,
  SelectStyleTitle,
  SelectTypeBg,
  fiedlsCreatePage,
} from '@/commons/FieldsDataObj'

import { Panel } from '@/components/panel'
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
import {
  getItemFromLocalStorage,
  getStorage,
  removeStorage,
  setStorage,
} from '@/utils/localStorage'
import ProvinceDistrictList from './ProvinceDistrictList'
import Song_1 from '@/assets/audio/vudieutinhyeu.mp3'
import Song_2 from '@/assets/audio/huongnangha.mp3'
import Song_3 from '@/assets/audio/buochanhoanggia.mp3'
import Ic_heart from '@/assets/home-image/Ic_heart.png'
import Ic_RedHeart from '@/assets/home-image/Ic_RedHeart.png'
import Ic_PurpleHeart from '@/assets/home-image/Ic_PurpleHeart.png'
import AnotherProduct from './AnotherProduct'
import PackageProduct from './PackageProduct'
import ReferCodePopup from './ReferCodePopup'

const CreatePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState(fiedlsCreatePage)

  const [editor, setEditor] = useState(false)
  const [idCreateRespon, setIdCreateRespon] = useState(false)

  const [checkParams, setCheckParams] = useState(CheckParams.AFFTER)

  const [imagesCover, setImagesCover] = useState([])
  const [images, setImages] = useState([])
  const [album, setAlbum] = useState([])

  const [imagesCoverURL, setImagesCoverURL] = useState('')
  const [imagesURL, setImagesURL] = useState('')
  const [albumURL, setAlbumURL] = useState([])

  const [messageCodeInvite, setMessageCodeInvite] = useState('')

  const [guestbookTemp, setGuestbookTemp] = useState('')

  const [radioEffectImage, setRadioEffectImage] = useState('none')

  const [radioGuestbookTemplate, setRadioGuestbookTemplate] = useState('none')
  const [radioInvitationStyle, setRadioInvitationStyle] = useState('default')
  const [radioStyleTitle, setRadioStyleTitle] = useState('pacifico')
  const [radioStyleContent, setRadioStyleContent] = useState('inter')
  const [radioTypeBg, setRadioTypeBg] = useState('none')
  const [radioColorBg, setRadioColorBg] = useState('none')
  const [radioEffectBg, setRadioEffectBg] = useState('none')
  const [radioMusic, setRadioMusic] = useState(0)

  const [maxLenghtAlbum, setMaxLenghtAlbum] = useState(15)

  const [openPanel, setOpenPanel] = useState(true)

  const [pointer, setPointer] = useState(false)
  const [disable, setDisable] = useState(true)
  const [dataPackage, setDataPackage] = useState([])
  const [dataAnother, setDataAnother] = useState([])
  const [valuedataAnother, setValueDataAnother] = useState([])
  const [packageType, setPackageType] = useState([])
  const [valuedataAnotherTotalPrice, setValuedataAnotherTotalPrice] =
    useState(0)
  const [codeinvite, setCodeinvite] = useState('')
  const [percentOff, setPercentOff] = useState(0)
  const [checkUrl, setCheckUrl] = useState(true)
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(false)

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
  const anotherProductRef = useRef()
  const packageProductRef = useRef()
  const referCodePopupRef = useRef()
  const { post, get } = useBaseService()
  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    if (location.state?.createpage) {
      removeStorage('createLeter')
      removeStorage('hasReloaded')
      setCheckUrl(true)
    }
  }, [])

  useEffect(() => {
    if (location.state?.editor != null) {
      setIdCreateRespon(location.state?.id)
      setEditor(location.state?.editor)
      setCheckUrl(false)
      const asyncDetails = async () => {
        try {
          const response = await get(APi.invitationDetail, config, {
            _id: location.state?.id,
          })
          setStorage('createLeter', JSON.stringify(response.data), 10 * 86400)
          const hasReloaded = getStorage('hasReloaded')
          if (!hasReloaded) {
            setStorage('hasReloaded', true)
            window.location.reload()
          }
          const anotherProduct = response.data?.anotherProduct.filter(
            (item, index, self) => {
              return index === self.findIndex((t) => t === item)
            }
          )
          setPercentOff(
            response.data?.codeInvite[0]?.percentOff
              ? response.data?.codeInvite[0]?.percentOff
              : 0
          )
          setCodeinvite(
            response.data?.codeInvite[0]?.code
              ? response.data?.codeInvite[0]?.code
              : ''
          )
          setPackageType([
            response.data?.productId[0]?.name,
            response.data?.productId[0]?.amount,
            response.data?.productId[0]?._id,
          ])
          setValueDataAnother(anotherProduct)
          setValuedataAnotherTotalPrice(response.data?.totalAmount)
          setAlbumURL(response.data?.album)
          setImagesURL(response.data?.thumbnailImage)
          setImagesCoverURL(response.data?.coverImage)
          setIsPaid(response.data?.isPaid)
          setPointer(response.data?.isUseGuestBook)
          setMaxLenghtAlbum(15 - response.data?.album.length)
          setRadioInvitationStyle(response.data?.invitationStyle)
        } catch (error) {
          console.error('Đã xảy ra lỗi:', error)
        }
      }
      asyncDetails()
    }
  }, [])

  useEffect(() => {
    const asyncListProduct = async () => {
      const response = await get(APi.listProduct, config)
      setDataPackage(response.data)
    }

    const asyncListProductAnother = async () => {
      const response = await get(APi.anotherProduct, config)
      setDataAnother(response.data)
    }

    asyncListProduct()
    asyncListProductAnother()
  }, [])

  const itemLocal = getItemFromLocalStorage('createLeter')

  useEffect(() => {
    if (itemLocal) {
      itemLocal?.song && setRadioMusic(itemLocal?.song)
      itemLocal?.invitationStyle && (values.styleOfInvitation.value = itemLocal?.invitationStyle)
      itemLocal?.fontStyleOfTitle &&
        setRadioStyleTitle(itemLocal?.fontStyleOfTitle.value)
      itemLocal?.fontStyleOfContent &&
        setRadioStyleContent(itemLocal?.fontStyleOfContent.value)
      itemLocal?.styleBackground &&
        setRadioTypeBg(itemLocal?.styleBackground.value)
      itemLocal?.backgroundColor &&
        setRadioColorBg(itemLocal?.backgroundColor.value)
      itemLocal?.effectBackgroud &&
        setRadioEffectBg(itemLocal?.effectBackgroud.value)
      itemLocal?.effectImage && setRadioEffectImage(itemLocal?.effectImage)
      // itemLocal?.coverImage && (values.coverImage = itemLocal?.coverImage)
      // itemLocal?.thumbnailImage && (values.thumbnailImage = itemLocal?.thumbnailImage)
      itemLocal?.album && (values.album = itemLocal?.album)
      itemLocal?.isUseConfirm && (values.isUseConfirm = itemLocal?.isUseConfirm)
      itemLocal?.isUseGuestBook &&
        (values.isUseGuestBook = itemLocal?.isUseGuestBook)
      itemLocal?.isEffectOfOpenning &&
        (values.isEffectOfOpenning = itemLocal?.isEffectOfOpenning)
      itemLocal?.confirmName && (values.confirmName = itemLocal?.confirmName)
      itemLocal?.confirmEmail && (values.confirmEmail = itemLocal?.confirmEmail)
      itemLocal?.confirmPhone && (values.confirmPhone = itemLocal?.confirmPhone)
      itemLocal?.confirmAddress &&
        (values.confirmAddress = itemLocal?.confirmAddress)
      itemLocal?.confirmNote && (values.confirmNote = itemLocal?.confirmNote)
      itemLocal?.password && (values.password = itemLocal?.password)
      itemLocal?.isUseBanking && (values.arraylist[0].isUseBanking = itemLocal?.isUseBanking)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      alert(Languages.text.noneToken)
      navigate(Alias.mypage)
    }
  }, [user])

  const onNavigateMypage = () => {
    setCheckParams(CheckParams.SUCCESS_CREATE)
    refModal.current?.showModal()
  }

  const radioChangeHandlerGuestbookTemplate = (item) => {
    setRadioGuestbookTemplate(item.value)
    setGuestbookTemp(item.text)
  }

  const radioChangeHandlerInvitationStyle = (item) => {
    setRadioInvitationStyle(item.value)
    values.styleOfInvitation.value = item.value
  }

  const radioChangeHandlerStyleTitle = (item) => {
    setRadioStyleTitle(item.value)
    setRadioStyleContent(item.styleContent)
    values.fontStyleOfContent.value = item.styleContent
    values.fontStyleOfTitle.value = item.value
  }

  const radioChangeHandlerStyleContent = (item) => {
    setRadioStyleContent(item.value)
    setRadioStyleTitle(item.styleTitle)
    values.fontStyleOfTitle.value = item.styleTitle
    values.fontStyleOfContent.value = item.value
  }

  const radioChangeHandlerTypebg = (text, value) => {
    setRadioTypeBg(value)
    values.styleBackground.value = value
  }

  const radioChangeHandlerColorBg = (text, value) => {
    setRadioColorBg(value)
    values.backgroundColor.value = value
  }

  const radioChangeHandlerEffectBg = (item) => {
    setRadioEffectBg(item.value)
    values.effectBackgroud.value = item.value
  }

  const radioChangeHandler = (e) => {
    setRadioEffectImage(e.target.value)
    values.effectImage = e.target.value
  }
  const radioChangeHandlerMusic = (item) => {
    setRadioMusic(item.value)
    values.song = item.value
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
          })
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
          })
      })
    }
  }

  const onChangeAlbum = async (imageList) => {
    setAlbum(imageList);
    values.album = [];

    if (values.albumLocal.length === 0 && itemLocal) {
      values.album = itemLocal?.album
    }

    const totalSize = imageList.reduce((accumulator, image) => accumulator + image.file.size, 0);

    if (imageList.length > 0) {
      if (totalSize < 900971520) {
        try {
          await processImageList(imageList, 0);
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.warning('Quá tải dung lượng, xin hãy bỏ bớt ảnh', {
          autoClose: 1000
        });
      }
    }
  };

  const processImageList = async (imageList, index) => {
    if (index >= imageList.length) {
      // Khi đã xử lý xong tất cả các phần tử trong danh sách, tiến hành các thao tác sau
      setLoading(false);
      return;
    }

    const imageUrl = imageList[index];

    setLoading(true);
    try {
      const response = await uploadImage(imageUrl.file);
      values.album.push(response.data.data);
      setAlbumURL((prevAlbumURL) => [...prevAlbumURL, response.data.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }

    // Gọi đệ quy để xử lý phần tử tiếp theo sau khi đã hoàn thành phần tử hiện tại
    await processImageList(imageList, index + 1);
  };

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

  const onChangeText = useCallback(
    (e, name) => {
      switch (name) {
        case INPUT_FIELDS.isUseBanking:
          values.arraylist[0].isUseBanking = e
          setValues((prevValues) => {
            const newArray = [...prevValues.arraylist]
            newArray[0]['isUseBanking'] = e
            return {
              ...prevValues,
              arraylist: newArray,
            }
          })
          break

        case INPUT_FIELDS.isUseGuestBook:
          setValues((prevValues) => ({
            ...prevValues,
            isUseGuestBook: e,
          }))
          values.isUseGuestBook = e
          setPointer(!pointer)
          break

        case INPUT_FIELDS.isUseConfirm:
          setValues((prevValues) => ({
            ...prevValues,
            isUseConfirm: e,
          }))
          values.isUseConfirm = e
          break

        case INPUT_FIELDS.password:
          values.password = e
          setValues((prevValues) => ({
            ...prevValues,
            password: e,
          }))
          break

        case INPUT_FIELDS.isEffectOfOpenning:
          values.isEffectOfOpenning = e
          setValues((prevValues) => ({
            ...prevValues,
            isEffectOfOpenning: e,
          }))
          break

        case INPUT_FIELDS.confirmName:
          values.confirmName = e
          setValues((prevValues) => ({
            ...prevValues,
            confirmName: e,
          }))
          break

        case INPUT_FIELDS.confirmPhone:
          values.confirmPhone = e
          setValues((prevValues) => ({
            ...prevValues,
            confirmPhone: e,
          }))
          break

        case INPUT_FIELDS.confirmEmail:
          values.confirmEmail = e
          setValues((prevValues) => ({
            ...prevValues,
            confirmEmail: e,
          }))
          break

        case INPUT_FIELDS.confirmAdd:
          values.confirmAddress = e
          setValues((prevValues) => ({
            ...prevValues,
            confirmAddress: e,
          }))
          break

        case INPUT_FIELDS.confirmNote:
          values.confirmNote = e
          setValues((prevValues) => ({
            ...prevValues,
            confirmNote: e,
          }))
          break

        default:
          break
      }
    },
    [values, setPointer, pointer, setCodeinvite]
  )

  const onChangeOpenGuestbookTemplate = () => {
    setCheckParams(CheckParams.TITLE_SAVE_PEN_TEMPLATES)
    refModal.current?.showModal()
  }

  const onChangePackage = useCallback(
    (e) => {
      const idx = e.target.selectedIndex
      const option = e.target.querySelectorAll('option')[idx]
      const dataId = option.getAttribute('data--id')

      setPackageType([
        e.target.options[e.target.selectedIndex].text,
        e.target.value,
        dataId,
      ])
    },
    [values, setPackageType]
  )

  const onCheckedDataAnother = useCallback(
    (e) => {
      var updatedList = [...valuedataAnother]
      if (e.target.checked) {
        updatedList = [...valuedataAnother, e.target.value]
      } else {
        updatedList.splice(valuedataAnother.indexOf(e.target.value), 1)
      }
      values.anotherProduct = updatedList
      setValueDataAnother(updatedList)
    },
    [valuedataAnother]
  )

  const onChangeSaveDraff = useCallback(() => {
    removeStorage('createLeter')
    setStorage('createLeter', JSON.stringify(values), 10 * 86400)
    toast.success(Languages.text.draff)
  }, [values, itemLocal])

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

  const renderMapRadio = useCallback(
    (title, data, radioChangeHandlerTemplate, selected) => {
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
                  () => radioChangeHandlerTemplate(item),
                  selected
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    []
  )

  const onKeyPress = useCallback(() => {
    return
  }, [])

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
      value
    ) => {
      return (
        <div className='item_field_single'>
          <MyTextInput
            ref={ref === '' ? refUnderfine : ref}
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
            value={value}
          />
        </div>
      )
    },
    [onKeyPress, onChangeText]
  )

  const renderImageUploadSingle = useCallback(
    (
      title,
      images,
      desc,
      allowDrag,
      onChange,
      urlLocal,
      max,
      height,
      icon,
      titleImages,
      maxFileSize,
      loading
    ) => {
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
            idCreateRespon={idCreateRespon}
            maxFileSize={maxFileSize}
            loading={loading}
          />
        </div>
      )
    },
    [onSortEnd, idCreateRespon]
  )

  const renderAlbum = useMemo(() => {
    return (
      <Panel
        title={
          <div className='left'>
            <img src={Ic_heart} alt='Ic_heart' />
            {Languages.text.albumWed}
            <img src={Ic_heart} alt='Ic_heart' />
          </div>
        }
      >
        <div className='album_list_thumb_wedding'>
          <div className='album_notifi'>
            <ul className='notifi'>
              <li>{Languages.text.sortImage}</li>
              <li>{Languages.text.maximumUpload}</li>
              <li>{Languages.text.performance}</li>
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
              maxLenghtAlbum,
              150,
              '',
              '',
              30000000,
              loading
            )}
            {loading && <div className="progress progress-striped">
              <div className="progress-bar">
              </div>
            </div>}
          </div>
        </div>
      </Panel>
    )
  }, [album, onChangeAlbum, loading, maxLenghtAlbum])

  const renderMusic = useMemo(() => {
    return (
      <div className='sec_group_panel_collape'>
        <Panel title={Languages.text.music}>
          <div className='custom_display_sec_radio_music'>
            {renderMapRadio(
              '',
              SelectMusic,
              radioChangeHandlerMusic,
              radioMusic
            )}
            <MultiPlayer urls={[Song_1, Song_2, Song_3]} />
          </div>
        </Panel>
      </div>
    )
  }, [radioMusic, radioChangeHandlerMusic])

  const renderConfirmAttend = useMemo(() => {
    return (
      <Panel title={Languages.text.confirmAttend} noFields={true}>
        <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
          <div className='title'>{Languages.text.useFeatureAttend}</div>
          <div className='single_hor_input checkbox_inline_colum'>
            <div className='item_field_single'>
              <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
                <label className='Input_label__XHiJ4'>
                  {Languages.text.use}
                </label>
                <div className='Input_formGroup__Ln91z '>
                  <input
                    name=''
                    defaultChecked={itemLocal?.isUseConfirm}
                    type='checkbox'
                    className='Input_form_control__zkQn6 checkbox_input_style '
                    onChange={(e) =>
                      onChangeText(e.target.checked, INPUT_FIELDS.isUseConfirm)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='details_attend'>
            <p>
              {Languages.text.attend} <b>{Languages.text.confirmAttend}</b>
              {Languages.text.enableAttend}
            </p>
            <p>{Languages.text.readChart}</p>
          </div>
        </div>
      </Panel>
    )
  }, [])

  const renderGuestbook = useMemo(() => {
    return (
      <Panel
        noFields={true}
        title={Languages.text.guestbook}
        valiOpen={openPanel}
      >
        <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
          <div className='title'>{Languages.text.useGuestbook}</div>
          <div className='single_hor_input checkbox_inline_colum'>
            <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
              <label className='Input_label__XHiJ4'>{Languages.text.use}</label>
              <div className='Input_formGroup__Ln91z '>
                <input
                  name=''
                  defaultChecked={itemLocal?.isUseGuestBook}
                  type='checkbox'
                  className='Input_form_control__zkQn6 checkbox_input_style '
                  onChange={(e) =>
                    onChangeText(e.target.checked, INPUT_FIELDS.isUseGuestBook)
                  }
                />
              </div>
            </div>
          </div>
          <div
            className={`${pointer ? 'double_input_row' : 'double_input_row disable'
              }`}
          >
            <div className='half_row_hor_input'>
              <form>
                {renderInput(
                  refPassword,
                  Languages.text.settingPwd,
                  Languages.text.settingPwd,
                  INPUT_FIELDS.password,
                  'password',
                  50,
                  false,
                  '',
                  '',
                  values.password
                )}
              </form>
            </div>
            <div className='half_row_hor_input'>
              <span>{Languages.text.minPwd}</span>
            </div>
          </div>
          <div className='details_attend'>
            <span>{Languages.text.obligatory}</span>
          </div>
          <div className='single_hor_input' style={{ display: 'none' }}>
            <MyTextArea
              ref={refContentGuestBook}
              value={guestbookTemp}
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
    )
  }, [
    guestbookTemp,
    onChangeOpenGuestbookTemplate,
    onChangeGuestbookTemp,
    pointer,
  ])

  const renderOpenStartEffect = useMemo(() => {
    return (
      <Panel title={Languages.text.startEffect}>
        <div className='sec_panel_use_feature_attend fullwidth_input_colum'>
          <div className='title'>{Languages.text.checkedUseStartEffect}</div>
          <div className='single_hor_input checkbox_inline_colum'>
            <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
              <label className='Input_label__XHiJ4'>
                {Languages.text.use}
              </label>
              <div className='Input_formGroup__Ln91z '>
                <input
                  name=''
                  defaultChecked={
                    itemLocal ? itemLocal?.isEffectOfOpenning : false
                  }
                  type='checkbox'
                  className='Input_form_control__zkQn6 checkbox_input_style '
                  onChange={(e) =>
                    onChangeText(
                      e.target.checked,
                      INPUT_FIELDS.isEffectOfOpenning
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Panel>
    )
  }, [editor])

  const renderComponentStyle = useCallback(
    (classstyle, title, data, onChangeRadio, state) => {
      return (
        <div className={`${'option_type_container'}  ${classstyle}`}>
          <div className='option_title_head'>
            <h5>{title}</h5>
          </div>
          <div className='option_select custom_style_radio'>
            {renderMapRadio('', data, onChangeRadio, state)}
            <div className='tooltip_effect_bg'>
              {state === SelectEffectBg[0].value && (
                <p>Phong cách đơn giản, tinh tế và không có sự chuyển động</p>
              )}
              {state === SelectEffectBg[1].value && (
                <p>
                  Hiệu ứng Animation Những cánh hoa đào rơi, tượng trưng cho sự
                  tươi mới và tình yêu.
                </p>
              )}
              {state === SelectEffectBg[2].value && (
                <p>
                  Hiệu ứng Animation Những chiếc lá vàng rơi nhẹ nhàng, tạo
                  không gian ấm áp và lãng mạn.
                </p>
              )}
              {state === SelectEffectBg[3].value && (
                <p>
                  {' '}
                  Hiệu ứng Animation Những bông tuyết bay lượn múa, mang đến cảm
                  giác mùa đông lạnh giá và thần tiên.
                </p>
              )}
              {state === SelectEffectBg[4].value && (
                <p>
                  Sự lấp lánh của những hạt kim tuyến tạo ra không gian rực rỡ
                  và tráng lệ
                </p>
              )}
            </div>
          </div>
        </div>
      )
    },
    []
  )

  const renderInvitationStyle = useMemo(() => {
    return (
      <Panel title={Languages.text.textStyleInvitation}>
        <div className='sec_options_select_type'>
          {renderComponentStyle(
            'option_invitation_style',
            Languages.text.chooseInvitationStyle,
            SelectInvitationStyle,
            radioChangeHandlerInvitationStyle,
            radioInvitationStyle
          )}
        </div>
      </Panel>
    )
  }, [
    radioStyleTitle,
    radioStyleContent,
    radioChangeHandlerStyleContent,
    radioChangeHandlerStyleTitle,
  ])

  const renderTextStyle = useMemo(() => {
    return (
      <Panel title={Languages.text.textStyleFont}>
        <div className='sec_options_select_type'>
          {renderComponentStyle(
            'option_title',
            Languages.text.chooseFontTitle,
            SelectStyleTitle,
            radioChangeHandlerStyleTitle,
            radioStyleTitle
          )}
          {renderComponentStyle(
            'option_content',
            Languages.text.chooseFontContent,
            SelectStyleTContent,
            radioChangeHandlerStyleContent,
            radioStyleContent
          )}
        </div>
      </Panel>
    )
  }, [
    radioStyleTitle,
    radioStyleContent,
    radioChangeHandlerStyleContent,
    radioChangeHandlerStyleTitle,
  ])

  const renderEffectBgStyle = useMemo(() => {
    return (
      <Panel title={Languages.text.effectBg}>
        <div className='sec_options_select_type'>
          {/* {renderComponentStyle('option_type_bg', Languages.text.typeBg, SelectTypeBg, radioChangeHandlerTypebg, radioTypeBg)}
        {renderComponentStyle('option_color_bg', Languages.text.colorBg, SelectColorBg, radioChangeHandlerColorBg, radioColorBg)} */}
          {renderComponentStyle(
            'option_effect_bg',
            Languages.text.effectBg,
            SelectEffectBg,
            radioChangeHandlerEffectBg,
            radioEffectBg
          )}
        </div>
      </Panel>
    )
  }, [
    radioEffectBg,
    radioColorBg,
    radioTypeBg,
    radioChangeHandlerTypebg,
    radioChangeHandlerColorBg,
    radioChangeHandlerEffectBg,
  ])

  const renderBuyPackageProduct = useMemo(() => {
    return (
      !editor && (
        <>
          <div className='flex justify-center items-center pt-6'>
            <TitleCreate title={Languages.text.packageProduct} divided={true} />
            <div
              className=' ml-4 font-bold w-7 text-center text-lg mb-5 h-7 rounded-full border-2 border-b-text cursor-pointer'
              onClick={() => packageProductRef.current.showModal()}
            >
              ?
            </div>
            <Popup
              ref={packageProductRef}
              // height={'75vh'}
              content={<PackageProduct />}
              maxWidth={Convert.W_800}
            />
          </div>
          <div
            className='sec_group_panel_collape'
            style={{ marginBottom: 30, marginTop: 30 }}
          >
            <select
              className='form_sellect_control'
              name='form_sellect_stt'
              onChange={onChangePackage}
              style={{ maxWidth: 'unset' }}
            >
              <option value='-1'>
                {itemLocal?.productId[0]?.name
                  ? itemLocal?.productId[0]?.name
                  : Languages.text.packagePro}
              </option>
              {dataPackage.map(function (item, index) {
                return (
                  <option data--id={item._id} key={index} value={item.amount}>
                    {item.name}{' '}
                  </option>
                )
              })}
            </select>
          </div>
        </>
      )
    )
  }, [dataPackage, editor, onChangePackage])

  const renderProductAnother = useMemo(() => {
    return (
      !editor && (
        <>
          <div className='flex justify-center items-center'>
            <TitleCreate title={Languages.text.anotherPro} divided={true} />
            <div
              className=' ml-4 font-bold w-7 text-center text-lg mb-5 h-7 rounded-full border-2 border-b-text cursor-pointer'
              onClick={() => anotherProductRef.current.showModal()}
            >
              ?
            </div>
            <Popup
              ref={anotherProductRef}
              height={'80vh'}
              content={<AnotherProduct />}
              maxWidth={Convert.W_800}
            />
          </div>
          <div className='sec_group_panel_collape'>
            {dataAnother.map(function (item, index) {
              return (
                <div
                  key={index}
                  className='single_hor_input checkbox_inline_colum'
                >
                  <div className='item_field_single'>
                    <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
                      <label className='Input_label__XHiJ4'>
                        {item.name} - {Validate.formatMoney(item.amount)}
                      </label>
                      <div className='Input_formGroup__Ln91z '>
                        <input
                          name={item.name}
                          defaultChecked={
                            itemLocal?.anotherProduct.find((items) =>
                              items.includes(item.name)
                            ) ===
                              item.amount + ',' + item.name
                              ? true
                              : false
                          }
                          type='checkbox'
                          data--amount={item.amount}
                          value={[item.amount, item.name]}
                          onChange={(e) => onCheckedDataAnother(e)}
                          className='Input_form_control__zkQn6 checkbox_input_style '
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )
    )
  }, [dataAnother, editor, onCheckedDataAnother])

  const onChangeCodePress = useCallback(
    async (e) => {
      setCodeinvite(e)
      const response = await post(APi.codeSale, { code: e }, config)
      if (JSON.stringify(response.data) === JSON.stringify({})) {
        refCodeinvite?.current?.setErrorMsg(Languages.errorMsg.errorCode)
        setMessageCodeInvite('')
        setPercentOff(0)
      } else {
        setTimeout(() => {
          refCodeinvite?.current?.setNoErrorMsg()
          setCodeinvite(response.data.code)
          setMessageCodeInvite(Languages.errorMsg.correctCode)
          setPercentOff(response.data.percentOff)
        }, 1000)
      }
    },
    [setMessageCodeInvite, setCodeinvite, refCodeinvite?.current?.setErrorMsg()]
  )

  const renderReferralCode = useMemo(() => {
    return (
      !editor && (
        <div className='sec_group_panel_collape relative'>
          <Panel
            title={Languages.text.referralCode}
            noFields={true}
            textNofields={'(nếu có)'}
          >
            <div
              className=' ml-4 font-bold w-7 text-center text-lg mb-5 h-7 rounded-full border-2 border-b-text cursor-pointer absolute left-24 bottom-9'
              onClick={() => referCodePopupRef.current.showModal()}
            >
              ?
            </div>
            <Popup ref={referCodePopupRef} content={<ReferCodePopup />} />
            <div className='wrap_package_referralcode'>
              <div className='fullwidth_input_colum'>
                <div className='single_hor_input'>
                  <MyTextInput
                    ref={refCodeinvite}
                    value={codeinvite}
                    label={Languages.text.referralCode}
                    name={INPUT_FIELDS.referralCode}
                    placeHolder={'Nhập ' + Languages.text.referralCode}
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
      )
    )
  }, [editor, codeinvite, messageCodeInvite])

  function onChangeGuestbookTemp(event) {
    setGuestbookTemp(event.target.value)
    values.contentGuestBook = event.target.value
  }

  const passValidateSuccess = useCallback(() => {
    if (
      refGroom.current?.onChangeCreatLetter() &&
      refBrice.current?.onChangeCreatLetter() &&
      refTimeandLocation.current?.onChangeCreatLetter() &&
      refDamngovaAnhoi.current?.onChangeCreatLetter() &&
      refVideovaSukien.current?.onChangeCreatLetter() &&
      refBankingGroom.current?.onChangeCreatLetter() &&
      refBankingBride.current?.onChangeCreatLetter() &&
      onChangeCreatLetter() === true
    ) {
      return true
    } else {
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
      "informationOfGroom": {
        "firstName": values.informationOfGroom[0].firstName,
        "middleName": values.informationOfGroom[0].middleName,
        "name": values.informationOfGroom[0].name,
        "isOldBrotherGroom": values.informationOfGroom[0].isOldBrotherGroom,
        "codingRegion": '84',
        "phoneNumberOfGroom": values.informationOfGroom[0].phoneNumberOfGroom,
        "firstFatherNameOfGroom":
          values.informationOfGroom[0].firstFatherNameOfGroom,
        "middleFatherNameOfGroom":
          values.informationOfGroom[0].middleFatherNameOfGroom,
        "fatherNameOfGroom": values.informationOfGroom[0].fatherNameOfGroom,
        "phoneNumberOfFatherGroom":
          values.informationOfGroom[0].phoneNumberOfFatherGroom,
        "isGoneFather": values.informationOfGroom[0].isGoneFather || false,
        "firstMotherNameOfGroom":
          values.informationOfGroom[0].firstMotherNameOfGroom,
        "middleMotherNameOfGroom":
          values.informationOfGroom[0].middleMotherNameOfGroom,
        "motherNameOfGroom": values.informationOfGroom[0].motherNameOfGroom,
        "phoneNumberOfMotherGroom":
          values.informationOfGroom[0].phoneNumberOfMotherGroom,
        "isGoneMother": values.informationOfGroom[0].isGoneMother || false,
        "nameBankOfGroom": values.informationOfGroom[0].nameBankOfGroom,
        "ownerBankOfGroom": values.informationOfGroom[0].ownerBankOfGroom,
        "bankOfNumberGroom": values.informationOfGroom[0].bankOfNumberGroom,
        "qrCodeGroomLink": values.informationOfGroom[0].qrCodeGroomLink,
        "nameBankOfFatherGroom":
          values.informationOfGroom[0].nameBankOfFatherGroom,
        "ownerBankOfFatherGroom":
          values.informationOfGroom[0].ownerBankOfFatherGroom,
        "bankOfNumberFatherGroom":
          values.informationOfGroom[0].bankOfNumberFatherGroom,
        "qrCodeFatherGroomLink":
          values.informationOfGroom[0].qrCodeFatherGroomLink,
        "nameBankOfMotherGroom":
          values.informationOfGroom[0].nameBankOfMotherGroom,
        "ownerBankOfMotherGroom":
          values.informationOfGroom[0].ownerBankOfMotherGroom,
        "bankOfNumberMotherGroom":
          values.informationOfGroom[0].bankOfNumberMotherGroom,
        "qrCodeMotherGroomLink":
          values.informationOfGroom[0].qrCodeMotherGroomLink,
      },
      "informationOfBride": {
        "firstName": values.informationOfBride[0].firstName,
        "middleName": values.informationOfBride[0].middleName,
        "name": values.informationOfBride[0].name,
        "isOldBrotherBride":
          values.informationOfBride[0].isOldBrotherBride || false,
        "codingRegion": '84',
        "phoneNumberOfBride": values.informationOfBride[0].phoneNumberOfBride,
        "firstFatherNameOfBride":
          values.informationOfBride[0].firstFatherNameOfBride,
        "middleFatherNameOfBride":
          values.informationOfBride[0].middleFatherNameOfBride,
        "fatherNameOfBride": values.informationOfBride[0].fatherNameOfBride,
        "phoneNumberOfFatherBride":
          values.informationOfBride[0].phoneNumberOfFatherBride,
        "isGoneFatherBride":
          values.informationOfBride[0].isGoneFatherBride || false,
        "firstMotherNameOfBride":
          values.informationOfBride[0].firstMotherNameOfBride,
        "middleMotherNameOfBride":
          values.informationOfBride[0].middleMotherNameOfBride,
        "motherNameOfBride": values.informationOfBride[0].motherNameOfBride,
        "phoneNumberOfMotherBride":
          values.informationOfBride[0].phoneNumberOfMotherBride,
        "isGoneMotherOfBride":
          values.informationOfBride[0].isGoneMotherOfBride || false,
        "nameBankOfBride": values.informationOfBride[0].nameBankOfBride,
        "ownerBankOfBride": values.informationOfBride[0].ownerBankOfBride,
        "bankOfNumberBride": values.informationOfBride[0].bankOfNumberBride,
        "qrCodeBrideLink": values.informationOfBride[0].qrCodeBrideLink,
        "nameBankOfFatherBride":
          values.informationOfBride[0].nameBankOfFatherBride,
        "ownerBankOfFatherBride":
          values.informationOfBride[0].ownerBankOfFatherBride,
        "bankOfNumberFatherBride":
          values.informationOfBride[0].bankOfNumberFatherBride,
        "qrCodeFatherBrideLink":
          values.informationOfBride[0].qrCodeFatherBrideLink,
        "nameBankOfMotherBride":
          values.informationOfBride[0].nameBankOfMotherBride,
        "ownerBankOfMotherBride":
          values.informationOfBride[0].ownerBankOfMotherBride,
        "bankOfNumberMotherBride":
          values.informationOfBride[0].bankOfNumberMotherBride,
        "qrCodeMotherBrideLink":
          values.informationOfBride[0].qrCodeMotherBrideLink,
      },
      "isDisplayGonePeople":
        values.informationOfBride[0].isDisplayGonePeople || false,
      "contentOfInvitation": values.informationOfBride[0].contentOfInvitation,
      "timeAndLocationOfWedding": {
        "dateOfEventWedding": values.timeAndLocationOfWedding.dateOfEventWedding,
        "timeOfEventWedding": values.timeAndLocationOfWedding.timeOfEventWedding,
        "namelocationOfWedding":
          values.timeAndLocationOfWedding.namelocationOfWedding,
        "locationOfWedding": values.timeAndLocationOfWedding.locationOfWedding,
        "mapDirectLink": values.timeAndLocationOfWedding.mapDirectLink,
        "isDisplayCountDown": values.timeAndLocationOfWedding.isDisplayCountDown,
        "contentOfCountDown": values.arraylist[0].contentOfCountDown,
      },
      "timeAndLocationOfEgagement": {
        "dateOfEventEgagement":
          values.timeAndLocationOfEgagement.dateOfEventEgagement,
        "timeOfEventEgagement":
          values.timeAndLocationOfEgagement.timeOfEventEgagement,
        "locationOfEgagement":
          values.timeAndLocationOfEgagement.locationOfEgagement,
      },
      "timeAndLocationOfInterrogation": {
        "dateOfEventInterrogation":
          values.timeAndLocationOfInterrogation.dateOfEventInterrogation,
        "timeOfEventInterrogation":
          values.timeAndLocationOfInterrogation.timeOfEventInterrogation,
        "locationOfInterrogation":
          values.timeAndLocationOfInterrogation.locationOfInterrogation,
      },
      "album": [...new Set(values.album.concat(values.albumLocal))],
      "videoLink": values.videoLink,
      "eventOfProgram": {
        "eventOfProgramEditOne": values.eventOfProgram.eventOfProgramEditOne,
        "eventOfProgramEditTwo": values.eventOfProgram.eventOfProgramEditTwo,
        "eventOfProgramEditThree": values.eventOfProgram.eventOfProgramEditThree,
        "eventOfProgramEditFour": values.eventOfProgram.eventOfProgramEditFour,
        "timeToWellcome": values.eventOfProgram.timeToWellcome,
        "timeToCelebrate": values.eventOfProgram.timeToCelebrate,
        "timeToDinner": values.eventOfProgram.timeToDinner,
        "timeToMusic": values.eventOfProgram.timeToMusic,
      },
      "song": radioMusic,
      "fontStyleOfTitle": {
        "value": radioStyleTitle,
      },
      "fontStyleOfContent": {
        "value": radioStyleContent,
      },
      "styleBackground": {
        "value": radioTypeBg,
      },
      "backgroundColor": {
        "value": radioColorBg,
      },
      "effectBackgroud": {
        "value": radioEffectBg,
      },
      "productId": packageType[2],
      "anotherProduct": valuedataAnother,
      "isUseConfirm": values.isUseConfirm,
      "isUseGuestBook": values.isUseGuestBook,
      "isUseBanking": values.arraylist[0].isUseBanking,
      "password": values.password,
      "contentGuestBook": values.contentGuestBook,
      "isEffectOfOpenning": values.isEffectOfOpenning,
      "codeInvite": codeinvite,
      "isUseVideo": values.arraylist[0].isUseVideo,
      "isUseEvent": values.arraylist[0].isUseEvent,
      "isUseDamNgo": values.arraylist[0].isUseDamNgo,
      "note": values.note,
      "confirmName": values.confirmName,
      "confirmPhone": values.confirmPhone,
      "confirmEmail": values.confirmEmail,
      "confirmAddress": values.confirmAddress,
      "confirmNote": values.confirmNote,
      "confirmProvince": values.confirmProvince,
      "confirmDistrict": values.confirmDistrict,
      "confirmWard": values.confirmWardt,
      "weddingVow": values.informationOfBride[0].weddingVow,
      "imgWeddingVow": values.informationOfBride[0].imgWeddingVow,
      "invitationStyle": values.styleOfInvitation.value
    }

    if (checkUrl) {
      const response = await post(
        APi.createInvitation,
        Object.assign(jsonData, {
          "status": '2',
        }),
        config
      )

      removeStorage('createLeter')

      if (response.errorCode == 0) {
        toast.success(Languages.errorMsg.success)
        setIdCreateRespon(response.data.invitation._id)
        setDisable(false)
        // setStorage('createLeter', JSON.stringify(response.data), 10 * 86400)
      } else {
        toast.error(Languages.errorMsg.errorSuccess)
      }
    } else {
      const dataUpdate = Object.assign(jsonData, {
        _id: idCreateRespon,
        "status": isPaid ? '1' : 3,
      })



      const responseupdate = await post(
        APi.updateInvitation,
        dataUpdate,
        config
      )

      if (responseupdate.errorCode == 0) {
        // setStorage('createLeter', JSON.stringify(responseupdate.data), 10 * 86400)
        toast.success(Languages.errorMsg.updatesuccess)
        setDisable(false)
        removeStorage('hasReloaded')
      } else {
        toast.error(Languages.errorMsg.errorSuccess)
      }
    }
  }, [
    imagesURL,
    imagesCoverURL,
    album,
    albumURL,
    packageType,
    user,
    codeinvite,
    idCreateRespon,
    values,
    valuedataAnother,
    radioMusic,
    radioStyleTitle,
    radioStyleContent,
    radioTypeBg,
    radioColorBg,
    radioEffectBg,
    radioEffectImage,
  ])

  const onOpenSuccessConfirm = useCallback(() => {

    try {
      if (
        imagesCoverURL.length === 0 ||
        imagesURL.length === 0 ||
        values.album.length === 0
      ) {
        toast.error(Languages.errorMsg.uploadingEmpty)
      }
      // else if (passValidateSuccess() !== true) {
      //   setDisable(false)
      //   if (disable)
      //     onChangeSaveSetting()
      // }
      else {
        setDisable(false)
        if (disable) {
          onChangeSaveSetting()
        }

        const totalSumAnother = valuedataAnother.reduce((acc, curr) => {
          const arrayItem = curr.split(',', 2).slice(0, 1).map(Number)
          const sum = parseInt(arrayItem[0])
          return acc + sum
        }, 0)

        const discount = parseInt((1 - percentOff) * 100)
        const total =
          (parseInt(packageType[1]) + totalSumAnother) * (discount / 100)
        setValuedataAnotherTotalPrice(total)

        if (editor) {
          setTimeout(() => {
            navigate(Alias.mypage)
          }, 3000)
        } else {
          setTimeout(() => {
            // setCheckParams(CheckParams.CONFIRM_INFO)
            // refModal.current?.showModal()
            navigate(Alias.mypage)
          }, 4000)
        }
      }
    } catch {
      window.location.reload()
    }
  }, [
    onChangeSaveSetting,
    passValidateSuccess,
    setValuedataAnotherTotalPrice,
    imagesCoverURL,
    imagesURL,
    albumURL,
    codeinvite,
    percentOff,
    disable,
    editor,
  ])

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
      "status": isPaid ? '1' : '4',
      "confirmName": values.confirmName,
      "confirmPhone": values.confirmPhone,
      "confirmEmail": values.confirmEmail,
      "confirmAddress": values.confirmAddress,
      "confirmNote": values.confirmNote,
      "confirmProvince": values.confirmProvince,
      "confirmDistrict": values.confirmDistrict,
      "confirmWard": values.confirmWardt,
      "totalAmount": valuedataAnotherTotalPrice,
    }

    const response = await post(APi.updateInvitation, jsonData, config)

    if (response.errorCode == 0) {
      toast.success(Languages.errorMsg.updatesuccess)
      setDisable(false)
    } else {
      toast.error(Languages.errorMsg.errorSuccess)
    }

    navigate(Alias.mypage)

    // }
    // return false
  }, [values, valuedataAnotherTotalPrice, idCreateRespon])

  const onShowModalAgree = () => {
    setCheckParams(CheckParams.SUCCESS_CREATE)
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

      case CheckParams.SUCCESS_CREATE:
        navigate(Alias.mypage)
        removeStorage('hasReloaded')
        break

      default:
        break
    }
  }, [checkParams, onChangeValidateConfirm])

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
      (checkParams === CheckParams.SUCCESS_CREATE && (
        <div className='renderContentModal'>
          <div className='head'>
            <img src={IcInf} alt={'icinf'} />
            <h2>{Languages.text.waring}</h2>
          </div>
          <div className='contentModal'>
            <p>{Languages.text.outPageCreate}</p>
          </div>
        </div>
      )) ||
      (checkParams === CheckParams.CONFIRM_INFO && (
        <div className='renderContentModal'>
          <div className='form_confirm_info'>
            <div className='header'>
              <h2>{Languages.text.confimSuccess}</h2>
            </div>
            <div className='body_form'>
              <div className='wrap_form'>
                <h4>{Languages.text.ReceiverPerson}</h4>
                <div className='form_group_info'>
                  <div className='double_input_row'>
                    <div className='half_row_hor_input'>
                      {renderInput(
                        refConfirmName,
                        '',
                        Languages.inputText.name,
                        INPUT_FIELDS.confirmName,
                        'text',
                        100,
                        false,
                        '',
                        '',
                        values.confirmName
                      )}
                    </div>
                    <div className='half_row_hor_input'>
                      {renderInput(
                        refConfirmPhone,
                        '',
                        Languages.inputText.phone,
                        INPUT_FIELDS.confirmPhone,
                        'number',
                        10,
                        false,
                        '',
                        '',
                        values.confirmPhone
                      )}
                    </div>
                  </div>
                  <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                      {renderInput(
                        refConfirmEmail,
                        '',
                        'Email',
                        INPUT_FIELDS.confirmEmail,
                        'text',
                        50,
                        true,
                        '',
                        '',
                        values.confirmEmail
                      )}
                    </div>
                  </div>
                  <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                      {renderInput(
                        refConfirmAddress,
                        '',
                        Languages.inputText.address,
                        INPUT_FIELDS.confirmAdd,
                        'text',
                        200,
                        true,
                        '',
                        '',
                        values.confirmAddress
                      )}
                    </div>
                  </div>

                  <ProvinceDistrictList />

                  <div className='fullwidth_input_colum'>
                    <div className='single_hor_input'>
                      {renderInput(
                        '',
                        '',
                        Languages.inputText.note,
                        INPUT_FIELDS.confirmNote,
                        'text',
                        200,
                        true,
                        '',
                        '',
                        values.confirmNote
                      )}
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
                    <h5>{Languages.text.packageSer}</h5>
                    <p>{packageType[0]}</p>
                  </div>
                  <div className='box_right'>
                    <h5>{Validate.formatMoney(packageType[1])}</h5>
                  </div>
                </div>
                <div className='package_box' style={{ display: 'block' }}>
                  <div className='another_item'>
                    <h5>{Languages.text.anotherPro}</h5>
                    {valuedataAnother.map(function (item, index) {
                      const arrayItem = item.split(',', 2)
                      return (
                        <div key={index}>
                          <div className='box_left'>
                            <p>{arrayItem[1]}</p>
                          </div>
                          <div className='box_right'>
                            <h5>{Validate.formatMoney(arrayItem[0])}</h5>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='package_box'>
                  <div className='box_left'>
                    <h5>{Languages.text.referralCode}</h5>
                    <p>{codeinvite}</p>
                  </div>
                  <div className='box_right'>
                    <h5>{parseInt(percentOff * 100)}%</h5>
                  </div>
                </div>
                <div className='total_price'>
                  <h5>{Languages.text.total}</h5>
                  <span className='amount'>
                    {Validate.formatMoney(valuedataAnotherTotalPrice)}
                  </span>
                </div>
                <p className='free14day'>{Languages.text.free14day}</p>
                <div className='bottom_form_btn_success'>
                  <p className='des_pay_services'>
                    {Languages.text.payServices}
                  </p>
                  <p className='contact'>
                    Zalo: 0933619010 - Hotline: (+84) 933619010
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) ||
      (checkParams === CheckParams.TITLE_SAVE_PEN_TEMPLATES &&
        renderMapRadio(
          Languages.text.inviteTitle,
          SelectSavePenTemplate,
          radioChangeHandlerGuestbookTemplate,
          radioGuestbookTemplate
        ))
    )
  }, [
    checkParams,
    radioGuestbookTemplate,
    valuedataAnother,
    valuedataAnotherTotalPrice,
    values,
    renderMapRadio,
    radioChangeHandlerGuestbookTemplate,
  ])

  const renderModal = useMemo(() => {
    return (
      <Popup
        ref={refModal}
        content={renderContentModal}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.agree}
        onSuccessPress={onPressHandleModal}
        maxWidth={
          checkParams === CheckParams.AFFTER ||
            checkParams === CheckParams.SUCCESS_CREATE
            ? Convert.W_400
            : Convert.W_800
        }
      />
    )
  }, [renderContentModal, checkParams])

  return (
    <div className='Createpage'>
      <Loading />
      <div className='my_input_form_data_group'>
        <div className='header_editpage'>
          <div className='container mx-auto'>
            <div className='header header_edit'>
              <h1>{Languages.text.togetherCreate}</h1>
              <div className='buttton_header'>
                <Button
                  label={Languages.common.back}
                  isLowerCase
                  onPress={onShowModalAgree}
                />
              </div>

              <div className='btn_group_r'>
                {/* {
              checkUrl ? <Button
                label={Languages.common.saveDraf}
                buttonStyle={BUTTON_STYLES.GRAY}
                isLowerCase
                onPress={onOpenSuccessConfirm}
              /> : ''
            } */}

                {/* <Button
                label={Languages.common.listLetter}
                buttonStyle={BUTTON_STYLES.PINK}
                textStyle={BUTTON_STYLES.WHITE}
                isLowerCase
                onPress={onNavigateMypage}
              /> */}
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto'>
          <div className='upload_represent_box'>
            <div className='md:grid md:grid-cols-3 md:gap-5'>
              <div className='col-span-2'>
                <div className='img_upload_box'>
                  {renderImageUploadSingle(
                    <>
                      <img src={Ic_RedHeart} alt='Ic_RedHeart' />
                      {Languages.text.chooseCoverImage}
                    </>,
                    imagesCover,
                    Languages.text.bigsize,
                    false,
                    onChangeCoverImage,
                    itemLocal?.coverImage
                  )}
                </div>
              </div>
              {renderImageUploadSingle(
                <>
                  <img src={Ic_PurpleHeart} alt='Ic_RedHeart' />
                  {Languages.text.chooseThumbs}
                </>,
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

            {renderRadio(
              'suong-mai',
              'Sương Mai',
              'suong-mai',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'huong-diem',
              'Hương Điểm',
              'huong-diem',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'song-vu',
              'Sóng Vũ',
              'song-vu',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'tinh-khoi',
              'Tinh Khôi',
              'tinh-khoi',
              radioChangeHandler,
              radioEffectImage
            )}
            {renderRadio(
              'vuon-xuan',
              'Vườn Xuân',
              'vuon-xuan',
              radioChangeHandler,
              radioEffectImage
            )}
          </div>

          <div className='wrapper_information_wedding'>
            <TitleCreate
              title={Languages.text.inforWed}
              divided={false}
              classNameCus={'title_comp_wed_add_cus'}
            />

            <FamilyGroom ref={refGroom} />
            <FamilyBride ref={refBrice} idCreateRespon={idCreateRespon} />
            <TimeandLocation ref={refTimeandLocation} />
            <div className='sec_group_panel_collape float_display'>
              {/* <DamNgoAnHoi ref={refDamngovaAnhoi} /> */}
              {renderAlbum}
              <VideoandEvent ref={refVideovaSukien} />
              <Panel
                title={Languages.text.informationBanking}
                noFields={true}
                icon={'💵'}
                style={'panel_icon_style'}
              >
                <div className='title'>{Languages.text.useBanking}</div>
                <div className='single_hor_input checkbox_inline_colum'>
                  <div className='item_field_single'>
                    <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
                      <label className='Input_label__XHiJ4'>
                        {Languages.text.use}
                      </label>
                      <div className='Input_formGroup__Ln91z '>
                        <input
                          name=''
                          defaultChecked={itemLocal?.isUseBanking}
                          type='checkbox'
                          className='Input_form_control__zkQn6 checkbox_input_style '
                          onChange={(e) =>
                            onChangeText(
                              e.target.checked,
                              INPUT_FIELDS.isUseBanking
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <BankingGroom ref={refBankingGroom} />
                <BankingBrice ref={refBankingBride} />
              </Panel>
              {renderMusic}
              {renderConfirmAttend}
              {renderGuestbook}
              {renderOpenStartEffect}
              {renderInvitationStyle}
              {/* {renderTextStyle} */}
              {renderEffectBgStyle}
              {/* {renderReferralCode}
              {renderBuyPackageProduct}
              {renderProductAnother} */}

              <div className='savesetting_btn'>
                <Button
                  label={Languages.buttonText.saveSettings}
                  buttonStyle={BUTTON_STYLES.PINK}
                  textStyle={BUTTON_STYLES.WHITE}
                  onPress={onOpenSuccessConfirm}
                  width={100}
                />
              </div>
              <div className='wrap_flop_note_using float_display'>
                <div className='box_note_using'>
                  <ul>
                    <li>{Languages.text.changePlan}</li>
                    <li>{Languages.text.useMax7day}</li>
                    <li>{Languages.text.useActive90day}</li>
                    <li>{Languages.text.contactSupport}</li>
                  </ul>
                </div>
              </div>
              <div className='clear'></div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
      </div>
      {renderModal}
    </div>
  )
}

export default CreatePage
