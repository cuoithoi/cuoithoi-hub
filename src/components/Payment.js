import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Popup from "./modal/Popup";
import { MyTextInput } from "./input";
import Languages from "@/commons/Languages";
import ICQrLogo from '@/assets/home-image/qrcode.jpg'
import ICMomo from '@/assets/home-image/IcMomo.svg'
import { APi, BUTTON_STYLES, CheckParams, Convert, config } from "@/commons/Constant.ts";
import { Button } from "./button";
import IcCheck from '@/assets/home-image/IcCheck.svg'
import Validate from "@/utils/Validate";
import FormValidate from "@/utils/FormValidate";
import { useBaseService } from "@/utils/BaseServices";
import { toast } from "react-toastify";

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

        const { post } = useBaseService()

        const show = () => {
            setCheckParams(CheckParams.PAYMENT)
            refModal?.current?.showModal();
        }

        const handlegetId = (id) => {
            setGetId(id)
        }

        const handleggetAmount = (amount) => {
            setGetAmount(amount)
        }

        const hide = () => {
            refModal?.current?.hideModal()
        }

        const onChangePayment = useCallback(async () => {

            const errMsgValue = FormValidate.inputContentEmpty(value);
            refCode.current?.setErrorMsg(errMsgValue);

            if (`${errMsgValue}`.length === 0) {

                const dataUpdate = {
                    "_id": getId,
                    "status": "4",
                }

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
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })

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
                                    <p>Số điện thoại: (+84) 083595123 - (+84) 028451245</p>
                                    <p>Email liên hệ:  info@cuoithoi.com.vn</p>
                                    <p>Thời gian làm việc: 09h Sáng - 18h Chiều / Thứ 2 - Thứ 6</p>
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
                            <div className='bock_content_modal'>
                                <div className='block_step block_step_1'>
                                    <div className='name_step'>
                                        <p><strong>Bước 1: </strong>Quét mã chuyển tiền</p>
                                    </div>
                                    <div className='content_step'>
                                        <img src={ICQrLogo} alt='qr' />
                                        <div className='infor'>
                                            <span>Tên ngân hàng: Shinhan Bank</span>
                                            <span>Số tài khoản: 7000 2557 1768</span>
                                            <span>Tên chủ tài khoản: RYU SUN HWAN</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='block_step block_step_2'>
                                    <div className='name_step'>
                                        <p><strong>Bước 2: </strong>Nhập Số tiền và nội dung</p>
                                    </div>
                                    <div className='content_step'>
                                        Số tiền thanh toán<p className='warn'> {Validate.formatMoney(getAmount)}</p>
                                        Nội dung
                                        <div className='demo'>
                                            <p>CTODID{getId.substr(-4, 4).toUpperCase()}</p>
                                        </div>
                                        <p className='note'>Lưu ý: Quý khách vui lòng chuyển khoản đúng theo cú pháp để đơn hàng được hệ thống cập nhật nhanh chóng.</p>
                                    </div>
                                </div>
                                <div className='block_step block_step_4'>
                                    <div className='name_step'>
                                        <p><strong>Bước 2: </strong>Nhập mã giao dịch</p>
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
                            <Button
                                onPress={onChangePayment}
                                label={Languages.common.pay}
                                buttonStyle={BUTTON_STYLES.PINK}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                            />
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
                    maxWidth={checkParams === CheckParams.PAYMENTSUCCESS ? Convert.W_400 : 1200}
                />
            )
        }, [renderContentModal])

        return (renderModal);
    });
