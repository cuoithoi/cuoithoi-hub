import Languages from '@/commons/Languages'
import React from 'react'
import IcZalo from '@/assets/home-image/IcZalo.svg'
import IcPhone from '@/assets/home-image/IcPhone.svg'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { FaRegClock } from 'react-icons/fa'
import Iclogo from '@/assets/home-image/IcLogo.svg'

const Footer = () => {
    return (
        <div className='footer'>
            
            <div className='container mx-auto'>

                <div className='md:grid md:grid-cols-3 md:gap-4'>

                    <div className='component_ShowInf_Company divided-right'>
                        <h2>{Languages.text.supportCustormer}</h2>
                        <div className='infomationDetails'>
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
                        <h2>{Languages.text.bankInf}</h2>
                        <div className='infomationDetails'>
                            <div className='contact'>
                                <p>Ngân hàng: Shinhan</p>
                                <p>Số tk: 220-232-23223</p>
                                <p>Holder: Cuoithoi</p>
                            </div>
                            <Button
                                label={Languages.buttonText.scanQr}
                                buttonStyle={BUTTON_STYLES.PINK}
                                getTextStyle={BUTTON_STYLES.WHITE}
                                rightIcon={<FaRegClock className='iconQrcode' />}
                                isLowerCase
                                textStyle={BUTTON_STYLES.PINK}
                            />
                        </div>
                    </div>

                    <div className='component_ShowInf_Company infoCompany'>

                        <div className='logo_footer'>
                            <img src={Iclogo} alt='logo' />
                        </div>

                        <div className='infomationDetails'>
                            <div className='contact'>
                                <p>CEO: Đặng Hoàng Minh</p>
                                <p>Company No: 0110245404</p>
                                <p>Email: info@cuoithoi.com.vn</p>
                                <p>Address: 14-15A, Tầng 7, Tòa nhà Charmvit, số 117 Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Footer
