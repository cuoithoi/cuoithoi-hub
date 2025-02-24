import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Popup from "./modal/Popup";
import { MyTextInput } from "./input";
import Languages from "@/commons/Languages";
import ICQrLogo from '@/assets/home-image/QR_code.png'
import ICMomo from '@/assets/home-image/IcMomo.svg'
import { APi, BUTTON_STYLES, CheckParams, Convert, config } from "@/commons/Constant.ts";
import { Button } from "./button";
import IcCheck from '@/assets/home-image/IcCheck.svg'
import Validate from "@/utils/Validate";
import FormValidate from "@/utils/FormValidate";
import { useBaseService } from "@/utils/BaseServices";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";

export const Payment = forwardRef(
    (
        {

        },
        ref
    ) => {
        useImperativeHandle(ref, () => ({
            show,
            hide,
            handlegetId,
            handleggetAmount
        }));

        const refModal = useRef(null)
        const refCode = useRef(null)

        const [value, setValue] = useState('')

        const [getId, setGetId] = useState('')
        const [getAmount, setGetAmount] = useState(0)

        const [checkParams, setCheckParams] = useState(CheckParams.PAYMENT)

        const [data, setData] = useState('');

        const { get, post } = useBaseService()

        const show = () => {
            setCheckParams(CheckParams.PAYMENT)
            refModal?.current?.showModal();
        }

        const handlegetId = (id) => {
            setGetId(id)
            setValue(`${'CTODID' + id.substr(-4, 4).toUpperCase()}`)
        }

        const handleggetAmount = (amount) => {
            setGetAmount(amount)
        }

        const hide = () => {
            refModal?.current?.hideModal()
        }

        useEffect(() => {

            const asyncLimit = async () => {
                try {
                    const response = await get(APi.getInformationBase)
                    setData(response.data[0].data)
                } catch (error) {
                    console.error('Đã xảy ra lỗi:', error)
                }
            }
            asyncLimit()

        }, [])

        const onChangePayment = useCallback(async () => {

            const errMsgValue = FormValidate.inputContentEmpty(value);
            refCode.current?.setErrorMsg(errMsgValue);

            if (`${errMsgValue}`.length === 0) {

                const dataUpdate = {
                  _id: getId,
                  status: "6",
                  OID: value,
                  expiredTime: dayjs()
                    .add(90, "day")
                    .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                };

                const responseupdate = await post(APi.updateInvitation, dataUpdate, config);
                if (responseupdate.errorCode == 0) {
                    toast.success(Languages.errorMsg.expireRequest)
                    setCheckParams(CheckParams.PAYMENTSUCCESS)
                    refModal?.current?.showModal()
                }
                else {
                    toast.error(Languages.errorMsg.errorSuccess)
                }
            }

        }, [value])

        const onChangeCloseModal = useCallback(() => {
            refModal?.current?.hideModal();
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1000);
        })

        const modalRef = useRef(null);

        const executeScroll = () => modalRef.current.scrollIntoView();

        const renderContentModal = useMemo(() => {
            return <>
                {
                    checkParams === CheckParams.PAYMENTSUCCESS
                        ? <div className='renderContentModal'>
                            <div className="modal_box_success_payment">
                                <img src={IcCheck} alt="iccheck" />
                                <h3>
                                    {Languages.text.paymentSuccess}
                                </h3>
                                <p>
                                    {Languages.text.alertSendPayment}
                                </p>
                                <div className="br"></div>
                                <div className="contact_now">
                                    <h4>{Languages.text.contactnow}</h4>
                                    <p>Số điện thoại: {data[data.length - 1]?.numberPhone}</p>
                                    <p>Email liên hệ:  {data[data.length - 1]?.emailCompany}</p>
                                    <p>Thời gian làm việc: {data[data.length - 1]?.timeWork}</p>
                                </div>
                                <Button
                                    label={Languages.common.agree}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    textStyle={BUTTON_STYLES.WHITE}
                                    autocenter
                                    onPress={onChangeCloseModal}
                                />
                            </div>
                        </div>

                        : <div className='renderContentModal'>
                            <div className='bock_content_modal scroll-smooth'>
                                <div className='block_step block_step_1'>
                                    <div className='name_step'>
                                        <p><strong>Bước 1: </strong>Quét mã chuyển tiền</p>
                                    </div>
                                    <div className='content_step'>
                                        <img src={ICQrLogo} alt='qr' />
                                        <div className="flex justify-center items-center gap-2 mt-4 underline text-lg" onClick={executeScroll}>
                                            <span>Tiếp tục</span>
                                            <span><FaArrowRight /></span>
                                        </div>
                                    </div>
                                </div>
                                <div ref={modalRef} className='block_step block_step_2'>
                                    <div className='name_step'>
                                        <p><strong>Bước 2: </strong>Nhập Số tiền và mã giao dịch</p>
                                    </div>
                                    <div className='content_step'>
                                        Số tiền thanh toán<p className='warn'> {Validate.formatMoney(getAmount)}</p>
                                        Mã giao dịch của quý khách
                                        <div className='demo'>
                                            <p>CTODID{getId.substr(-4, 4).toUpperCase()}</p>
                                        </div>
                                        <p className='note'>Lưu ý: Quý khách vui lòng chuyển khoản đúng theo cú pháp để đơn hàng được hệ thống cập nhật nhanh chóng.</p>

                                        <Button
                                            onPress={onChangePayment}
                                            label={Languages.common.pay}
                                            buttonStyle={BUTTON_STYLES.PINK}
                                            textStyle={BUTTON_STYLES.WHITE}
                                            autocenter
                                        />
                                    </div>
                                </div>
                                <div className='block_step block_step_4 hidden'>
                                    <div className='name_step'>
                                        <p><strong>Bước 3: </strong>Nhập mã giao dịch</p>
                                    </div>
                                    <div className='content_step'>
                                        <MyTextInput
                                            ref={refCode}
                                            value={value}
                                            placeHolder={'Nhập mã giao dịch'}
                                            type={'text'}
                                            onChangeText={onChangeText}
                                        />
                                        <img src={ICMomo} alt='ICMomo' />
                                    </div>
                                </div>
                            </div>
                            <div className='chuy'>
                                <p>Lưu ý: <strong>Sau khi chuyển khoản xong</strong> thì bạn mới nhấn thanh toán để hệ thống ghi nhận giao dịch.</p>
                            </div>

                        </div>
                }
            </>
        }, [value, onChangeText, checkParams, getAmount])

        function onChangeText(event) {
            setValue(event.target.value);
        }

        const renderModal = useMemo(() => {
            return (
                <Popup
                    ref={refModal}
                    content={renderContentModal}
                    maxWidth={checkParams === CheckParams.PAYMENTSUCCESS ? Convert.W_400 : 800}
                />
            )
        }, [renderContentModal])

        return (renderModal);
    });
