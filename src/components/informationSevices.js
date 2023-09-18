import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Popup from "./modal/Popup";
import { MyTextInput } from "./input";
import Languages from "@/commons/Languages";
import { APi, BUTTON_STYLES, CheckParams, Convert, INPUT_FIELDS, config } from "@/commons/Constant.ts";
import { Button } from "./button";
import Validate from "@/utils/Validate";
import { useBaseService } from "@/utils/BaseServices";
import { toast } from "react-toastify";
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import PackageProduct from "@/pages/Createpage/PackageProduct";
import { RadioButton } from "./RadioButton";
import ReferCodePopup from "@/pages/Createpage/ReferCodePopup";
import AnotherProduct from "@/pages/Createpage/AnotherProduct";
import { Payment } from "./Payment";
import axios from "axios";
import Select from 'react-select';


export const InformationSevices = forwardRef(
    (
        {
        },
        ref
    ) => {
        useImperativeHandle(ref, () => ({
            show,
            hide,
            handlegetId
        }));

        const refModal = useRef(null)
        const refPayment = useRef(null)

        const [values, setValues] = useState(fiedlsCreatePage)
        const [valuedataAnother, setValueDataAnother] = useState([])

        const [getId, setGetId] = useState('')

        const [checkParams, setCheckParams] = useState(CheckParams.CONFIRM_PACKAGE)

        const [pointer, setPointer] = useState(false)
        const [codeinvite, setCodeinvite] = useState('')
        const [percentOff, setPercentOff] = useState(0)
        const [dataPackage, setDataPackage] = useState([])
        const [dataAnother, setDataAnother] = useState([])

        const [amountPackage, setAmountPackage] = useState(0)
        const [namePackage, setNamePackage] = useState(0)

        const [provinces, setProvinces] = useState([]);
        const [districts, setDistricts] = useState([]);
        const [wards, setWards] = useState([]);
        const [selectedProvince, setSelectedProvince] = useState('');
        const [selectedDistrict, setSelectedDistrict] = useState('');
        const [selectedWard, setSelectedWard] = useState('');

        const [radioDataPackage, setRadioDataPackage] = useState('none')

        const [messageCodeInvite, setMessageCodeInvite] = useState('')
        const [valuedataAnotherTotalPrice, setValuedataAnotherTotalPrice] = useState(0)

        const refUnderfine = useRef(null)
        const refConfirmName = useRef(null)
        const refConfirmPhone = useRef(null)
        const refConfirmEmail = useRef(null)
        const refConfirmAddress = useRef(null)
        const anotherProductRef = useRef()
        const packageProductRef = useRef()
        const referCodePopupRef = useRef()
        const refCodeinvite = useRef(null)

        const { get, post } = useBaseService()

        const show = () => {
            setCheckParams(CheckParams.CONFIRM_PACKAGE)
            refModal?.current?.showModal();
        }

        const hide = () => {
            refModal?.current?.hideModal()
        }

        const handlegetId = (id) => {
            setGetId(id)
        }

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

        useEffect(() => {
            // Gọi API để lấy danh sách tỉnh
            axios.get('https://vapi.vnappmob.com/api/province/')
                .then((response) => {
                    setProvinces(response.data.results);
                })
                .catch((error) => {
                    console.error('Error fetching provinces:', error);
                });
        }, []);

        const handleProvinceChange = (e) => {
            const provinceId = e.value;
            setSelectedProvince(provinceId);

            // Gọi API để lấy danh sách quận/huyện theo tỉnh đã chọn
            axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
                .then((response) => {
                    setDistricts(response.data.results);
                    setWards([]);
                })
                .catch((error) => {
                    console.error('Error fetching districts:', error);
                });
        };

        useEffect(() => {
            values.confirmProvince = provinces.find((p) => p.province_id === selectedProvince)?.province_name;
            values.confirmDistrict = districts.find((d) => d.district_id === selectedDistrict)?.district_name;
            values.confirmWardt = wards.find((w) => w.ward_id === selectedWard)?.ward_name;

        }, [selectedProvince, selectedDistrict, selectedWard]);

        const handleDistrictChange = (e) => {
            const districtId = e.value;
            setSelectedDistrict(districtId);

            // Gọi API để lấy danh sách phường/xã theo quận/huyện đã chọn
            axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
                .then((response) => {
                    setWards(response.data.results);
                })
                .catch((error) => {
                    console.error('Error fetching wards:', error);
                });
        };

        const handleWardChange = (e) => {
            setSelectedWard(e.value);
        };

        const optionListProvinces = provinces.map(function (item) {
            return { value: item?.province_id, label: item?.province_name }
        });

        const optionListDistrict = districts.map(function (item) {
            return { value: item?.district_id, label: item?.district_name }
        });

        const optionListWards = wards.map(function (item) {
            return { value: item?.ward_id, label: item?.ward_name }
        });

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

        const renderRadio = useCallback((id, label, value, onChange, name, isSelected) => {
            return (
                <div className='options_select'>
                    <RadioButton
                        id={id}
                        label={label}
                        value={value}
                        onChange={onChange}
                        name={name}
                        isSelected={isSelected === value}
                    />
                </div>
            )
        }, [])

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

        const radioChangeHandler = (e) => {
            setRadioDataPackage(e.target.value)
            values.effectImage = e.target.value
            const { id, name } = e.target
            setAmountPackage(id)
            setNamePackage(name)
        }

        const onChangeModalConfirm = useCallback(async () => {
            if (radioDataPackage === 'none')
                toast.error('Vui lòng chọn gói sản phẩm', {
                    autoClose: 1000,
                    closeButton: false
                })
            else {
                const jsonData = {
                    "_id": getId,
                    "status": '4',
                    "productId": radioDataPackage,
                    "anotherProduct": valuedataAnother,
                    "codeInvite": codeinvite,
                }

                const totalSumAnother = valuedataAnother.reduce((acc, curr) => {
                    const arrayItem = curr.split(',', 2).slice(0, 1).map(Number)
                    const sum = parseInt(arrayItem[0])
                    return acc + sum
                }, 0)

                const discount = parseInt((1 - percentOff) * 100)
                const total =
                    (parseInt(amountPackage) + totalSumAnother) * (discount / 100)
                setValuedataAnotherTotalPrice(total)

                const response = await post(APi.updateInvitation, jsonData, config)

                if (response.errorCode == 0) {
                    toast.success(Languages.errorMsg.updatesuccess, {
                        autoClose: 1000,
                        closeButton: false
                    })
                } else {
                    toast.error(Languages.errorMsg.errorSuccess, {
                        autoClose: 1000,
                        closeButton: false
                    })
                }
                setTimeout(() => {
                    setCheckParams(CheckParams.CONFIRM_INFO)
                }, 2000);
            }
        }, [radioDataPackage, valuedataAnother, radioDataPackage, getId, codeinvite, amountPackage])

        const onChangeModalConfirmPayment = useCallback(async () => {
            const jsonData = {
                "_id": getId,
                "status": '4',
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
                hide()
                refPayment?.current?.show()
                refPayment?.current?.handlegetId(getId)
                refPayment?.current?.handleggetAmount(valuedataAnotherTotalPrice)
            } else {
                toast.error(Languages.errorMsg.errorSuccess)
            }
        }, [values, valuedataAnotherTotalPrice, getId, hide])

        const renderContentModal = useMemo(() => {
            return <>
                {
                    checkParams === CheckParams.CONFIRM_PACKAGE &&
                    <div className='renderContentModal text-left'>
                        <div className='form_confirm_info'>
                            <div className='header text-uppercase'>
                                <h2 style={{ textTransform: 'uppercase' }}>Các gói sản phẩm</h2>
                            </div>
                            <div className='body_form'>
                                <div className='wrap_form'>
                                    <div className="head_option">
                                        <h4>Chọn gói sản phẩm muốn mua</h4>
                                        <div
                                            className=' ml-4 font-bold w-7 text-center text-lg  h-7 rounded-full border-2 border-b-text cursor-pointer'
                                            onClick={() => packageProductRef.current.showModal()}
                                        >
                                            ?
                                        </div>
                                    </div>
                                    <Popup
                                        ref={packageProductRef}
                                        // height={'75vh'}
                                        content={<PackageProduct />}
                                        maxWidth={1400}
                                    />
                                    <div className="group_options">
                                        {
                                            dataPackage.map(function (item, index) {
                                                return <div className={`group__items ${radioDataPackage === item._id ? 'active' : ''}`} key={index}>
                                                    {renderRadio(
                                                        item.amount,
                                                        item.name,
                                                        item._id,
                                                        radioChangeHandler,
                                                        item.name,
                                                        radioDataPackage,
                                                    )}
                                                </div>
                                            })

                                        }
                                    </div>
                                </div>
                                <div className='wrap_form'>
                                    <div className="head_option">
                                        <h4>Sản phẩm PAS (Optional)</h4>
                                        <div
                                            className=' ml-4 font-bold w-7 text-center text-lg  h-7 rounded-full border-2 border-b-text cursor-pointer'
                                            onClick={() => anotherProductRef.current.showModal()}
                                        >
                                            ?
                                        </div>
                                    </div>
                                    <Popup
                                        ref={anotherProductRef}
                                        height={'80vh'}
                                        content={<AnotherProduct />}
                                        maxWidth={1500}
                                    />
                                    {
                                        <div className='sec_group_panel_checkbox'>
                                            {dataAnother.map(function (item, index) {
                                                const itemToCheck = `${item.amount},${item.name}`;
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`single_hor_input checkbox_inline_colum ${valuedataAnother.some(item => item === itemToCheck) ? 'active' : ''}`}
                                                    >
                                                        <div className='item_field_single'>
                                                            <div className='Input_boxGroupInput__8ghvv man_inputStyle'>
                                                                <label className='Input_label__XHiJ4'>
                                                                    {item.name}
                                                                    <span className="price">
                                                                        {Validate.formatMoney(item.amount)}
                                                                    </span>
                                                                </label>
                                                                <div className='Input_formGroup__Ln91z '>
                                                                    <input
                                                                        name={item.name}
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
                                    }
                                </div>
                                <div className='wrap_form'>
                                    <div className="head_option">
                                        <h4>Mã giới thiệu</h4>
                                        <div
                                            className=' ml-4 font-bold w-7 text-center text-lg  h-7 rounded-full border-2 border-b-text cursor-pointer'
                                            onClick={() => referCodePopupRef.current.showModal()}
                                        >
                                            ?
                                        </div>
                                    </div>
                                    <Popup ref={referCodePopupRef} content={<ReferCodePopup />} />
                                    <div className='wrap_package_referralcode'>
                                        <div className='fullwidth_input_colum'>
                                            <div className='single_hor_input'>
                                                <MyTextInput
                                                    ref={refCodeinvite}
                                                    value={codeinvite}
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
                                </div>
                            </div>
                        </div>
                        <Button
                            label={'Tiếp tục'}
                            autocenter
                            buttonStyle={BUTTON_STYLES.PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            onPress={onChangeModalConfirm}
                        />
                    </div>
                    ||
                    checkParams === CheckParams.CONFIRM_INFO &&
                    <div className='renderContentModal text-left'>
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

                                        <div className='address_province_'>

                                            <Select
                                                options={optionListProvinces}
                                                placeholder={'Chọn Tình/Thành'}
                                                className='form_sellect_control select_province'
                                                name='form_sellect_stt'
                                                onChange={handleProvinceChange}
                                            />

                                            <Select
                                                options={optionListDistrict}
                                                placeholder={'Chọn Quận/Huyện'}
                                                className='form_sellect_control select_district'
                                                name='form_sellect_stt'
                                                onChange={handleDistrictChange}
                                            />

                                            <Select
                                                options={optionListWards}
                                                placeholder={'Chọn Phường/Xã'}
                                                className='form_sellect_control select_wardt'
                                                name='form_sellect_stt'
                                                onChange={handleWardChange}
                                            />

                                        </div>

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
                                            <p>{namePackage}</p>
                                        </div>
                                        <div className='box_right'>
                                            <h5>{Validate.formatMoney(amountPackage)}</h5>
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
                        <Button
                            label={'Tiếp tục'}
                            autocenter
                            buttonStyle={BUTTON_STYLES.PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            onPress={onChangeModalConfirmPayment}
                        />
                    </div>
                }
            </>
        }, [
            checkParams,
            codeinvite,
            messageCodeInvite,
            dataPackage,
            onChangeCodePress,
            radioDataPackage,
            onCheckedDataAnother,
            dataAnother,
            valuedataAnother,
            namePackage,
            amountPackage,
            values,
            valuedataAnotherTotalPrice,
            percentOff,
            renderInput,
            optionListWards,
            optionListProvinces,
            optionListDistrict,
            handleProvinceChange,
            handleDistrictChange,
            handleWardChange
        ])

        const renderModal = useMemo(() => {
            return (
                <Popup
                    ref={refModal}
                    content={renderContentModal}
                    maxWidth={checkParams === CheckParams.PAYMENTSUCCESS ? Convert.W_400 : 1000}
                />
            )
        }, [renderContentModal])

        return <>{renderModal} <Payment ref={refPayment} /></>;
    });
