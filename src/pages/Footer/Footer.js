
import Languages from '@/commons/Languages'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import IcZalo from '@/assets/home-image/IcZalo.svg'
import IcPhone from '@/assets/home-image/IcPhone.svg'
import { Button } from '@/components/button'
import { APi, BUTTON_STYLES } from '@/commons/Constant.ts'
import { FaAngleDown, FaRegClock } from 'react-icons/fa'
import Iclogo from '@/assets/home-image/IcLogo.svg'
import { useBaseService } from '@/utils/BaseServices'
import ICQrLogo from '@/assets/home-image/qrcode.jpg'
import Popup from '@/components/modal/Popup'


const Footer = () => {

    const refModal = useRef(null)

    const onChangeShowModalPayment = () => {
        refModal?.current?.showModal();
    }

    const { get } = useBaseService();

    const [data, setData] = useState('');

    useEffect(() => {

        const asyncLimit = async () => {
            try {
                const response = await get(APi.getInformationBase, '', {
                    created: "643d0497d04d231dc24a2765"
                })
                setData(response.data[0].data)
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error)
            }
        }
        asyncLimit()

    }, [])

    const renderContentModal = useMemo(() => {
        return <>
            {
                <div className='renderContentModal'>
                    <div className='bock_content_modal'>
                        <div className='block_step '>
                            <div className='content_step'>
                                <img src={ICQrLogo} alt='qr' />
                                <div className='infor'>
                                    <span>Tên ngân hàng: {data[data.length - 1]?.nameBank}</span>
                                    <span>Số tài khoản: {data[data.length - 1]?.numberBank}</span>
                                    <span>Tên chủ tài khoản: {data[data.length - 1]?.holder}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='chuy'>
                        <p>Lưu ý: <strong>Sau khi chuyển khoản xong</strong> thì bạn mới nhấn thanh toán để hệ thống ghi nhận giao dịch.</p>
                    </div>
                </div>
            }
        </>
    }, [data])

    const renderModal = useMemo(() => {
        return (
            <Popup
                ref={refModal}
                content={renderContentModal}
            />
        )
    }, [renderContentModal])

    return (
        <div className='footer'>

            <div className='container mx-auto'>

                <div className='lg:grid lg:grid-cols-3 lg:gap-4'>

                    <div className='component_ShowInf_Company divided-right'>
                        <input className="checkbox" id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1" className="checkbox-label">
                            <h2>{Languages.text.supportCustormer}</h2>
                            <div className='icon_toogle'>
                                <FaAngleDown />
                            </div>
                        </label>
                        <div id='checkbox1_info' className='infomationDetails'>
                            <p>{Languages.text.timeWork}</p>
                            <br />
                            <p>Email : CS@cuoithoi.com.vn</p>
                            <div className='contact_phone'>
                                <img src={IcZalo} title='zalo' />
                                <p>Zalo: {data[data.length - 1]?.zaloNumber}</p>
                            </div>
                            <div className='contact_phone'>
                                <img src={IcPhone} title='phone' />
                                <div>
                                    <p>{data[data.length - 1]?.numberPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='component_ShowInf_Company divided-right'>
                        <input className="checkbox" id="checkbox2" type="checkbox" />
                        <label htmlFor="checkbox2" className="checkbox-label">
                            <h2>{Languages.text.bankInf}</h2>
                            <div className='icon_toogle'>
                                <FaAngleDown />
                            </div>
                        </label>
                        <div className='infomationDetails'>
                            <div className='contact'>
                                <p>Ngân hàng: {data[data.length - 1]?.nameBank}</p>
                                <p>Số tk: {data[data.length - 1]?.numberBank}</p>
                                <p>Holder: Ryu Sunhwan</p>
                            </div>
                            <Button
                                label={Languages.buttonText.scanQr}
                                buttonStyle={BUTTON_STYLES.PINK}
                                textStyle={BUTTON_STYLES.WHITE}
                                rightIcon={<FaRegClock className='iconQrcode' />}
                                isLowerCase
                                onPress={onChangeShowModalPayment}
                            />
                        </div>
                    </div>

                    <div className='component_ShowInf_Company infoCompany'>
                        <input className="checkbox" id="checkbox3" type="checkbox" /><label htmlFor="checkbox3" className="checkbox-label">
                            <div className='logo_footer'>
                                <img src={data[data.length - 1]?.qrCode} alt='logo' />
                            </div>
                            <div className='icon_toogle'>
                                <FaAngleDown />
                            </div>
                        </label>
                        <div className='infomationDetails'>
                            <div className='contact'>
                                <p>Công ty TNHH Cưới Thôi</p>
                                <p>CEO: {data[data.length - 1]?.ceoPeople}</p>
                                <p>Company No: {data[data.length - 1]?.companyNumber}</p>
                                <p>Email: {data[data.length - 1]?.emailCompany}</p>
                                <p>Address: {data[data.length - 1]?.adressCompany}</p>
                            </div>
                        </div>
                    </div>
                    {renderModal}
                </div>
            </div>
        </div>
    )
}


export default Footer

