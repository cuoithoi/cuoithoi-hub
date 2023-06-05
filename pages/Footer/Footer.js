
import Languages from '@/commons/Languages'
import React, { useRef } from 'react'
import IcZalo from '@/assets/home-image/IcZalo.svg'
import IcPhone from '@/assets/home-image/IcPhone.svg'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { FaAngleDown, FaRegClock } from 'react-icons/fa'
import Iclogo from '@/assets/home-image/IcLogo.svg'
import { Payment } from '@/components/Payment'

const Footer = () => {

    const ref = useRef(null);


    const onChangeShowModalPayment = () => {
        ref?.current?.show();
    }

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
                            <div className='contact_phone'>
                                <img src={IcZalo} title='zalo' />
                                <p>Zalo: 090932421</p>
                            </div>
                            <div className='contact_phone'>
                                <img src={IcPhone} title='phone' />
                                <div>
                                    <p>+84 083595123</p>
                                    <p>+84 028451245</p>
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
                                <p>Ngân hàng: Shinhan</p>
                                <p>Số tk: 220-232-23223</p>
                                <p>Holder: Cuoithoi</p>
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
                                <img src={Iclogo} alt='logo' />
                            </div>
                            <div className='icon_toogle'>
                                <FaAngleDown />
                            </div>
                        </label>
                        <div className='infomationDetails'>
                            <div className='contact'>
                                <p>CEO: Đặng Hoàng Minh</p>
                                <p>Company No: 0110245404</p>
                                <p>Email: info@cuoithoi.com.vn</p>
                                <p>Address: 14-15A, Tầng 7, Tòa nhà Charmvit, số 117 Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội</p>
                            </div>
                        </div>
                    </div>
                    <Payment
                        ref={ref}
                    />
                </div>
            </div>
        </div>
    )
}


export default Footer

