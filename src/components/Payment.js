import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import Popup from "./modal/Popup";
import { MyTextInput } from "./input";
import Languages from "@/commons/Languages";
import ICQrLogo from '@/assets/home-image/IcQrLogo.svg'
import ICMomo from '@/assets/home-image/IcMomo.svg'
import { BUTTON_STYLES, CheckParams, Convert } from "@/commons/Constant.ts";
import { Button } from "./button";
import IcCheck from '@/assets/home-image/IcCheck.svg'

export const Payment = forwardRef(
    (
        {
            id,
            amount
        },
        ref
    ) => {
        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const refModal = useRef(null)

        const [value, setValue] = useState('')

        const [checkParams, setCheckParams] = useState(CheckParams.PAYMENT)

        const show = () => {
            console.log(id, amount)
            setCheckParams(CheckParams.PAYMENT)
            refModal?.current?.showModal();
        }

        const hide = () => {
            refModal?.current?.hideModal();
        }

        const onChangePayment = useCallback(() => {
            setCheckParams(CheckParams.PAYMENTSUCCESS)
            refModal?.current?.showModal();
        }, [])

        const onChangeCloseModal = useCallback(() => {
            refModal?.current?.hideModal();
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
                                            <span>Số tài khoản: 220-232-23223</span>
                                            <span>Tên chủ tài khoản: Cuoithoi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='block_step block_step_2'>
                                    <div className='name_step'>
                                        <p><strong>Bước 2: </strong>Nhập nội dung chuyển tiền</p>
                                    </div>
                                    <div className='content_step'>
                                        <div className='demo'>
                                            <p>Email - Số điện thoại</p>
                                        </div>
                                        <p className='warn'>*Đây là Emai đã dùng để đăng ký tài khoản</p>
                                        <p className='note'>Lưu ý: Quý khách vui lòng chuyển khoản đúng theo cú pháp để đơn hàng được hệ thống cập nhật nhanh chóng.</p>
                                    </div>
                                </div>
                                <div className='block_step block_step_4'>
                                    <div className='name_step'>
                                        <p><strong>Bước 2: </strong>Nhập mã giao dịch</p>
                                    </div>
                                    <div className='content_step'>
                                        <MyTextInput
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
        }, [value, onChangeText, checkParams])

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
