import React, { useCallback, useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from './Footer/Footer'
import Loading from '@/components/Loading'
import Languages from '@/commons/Languages'
import { APi, BUTTON_STYLES, config } from '@/commons/Constant.ts'
import BlockUI from '@/components/blockUI'
import IcSystem from '@/assets/home-image/IcSystem.svg'
import IcReview from '@/assets/home-image/IcReview.svg'
import IcCheck from '@/assets/home-image/IcCheck.svg'
import IcSuccess from '@/assets/home-image/ic_success.png'
import { Button } from '@/components/button'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import ChooseTypeBlock from '@/components/chooseTypeBlock'
import { BACKGROUND_STYLES } from '@/commons/Constant.ts'
import { useBaseService } from '@/utils/BaseServices'

const Services = () => {

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 5)
        }, 1500);
    }, [])

    const renderList = useCallback((title) => {
        return <li>
            <img src={IcSuccess} alt='check' />
            <p>{title}</p>
        </li>
    }, [])

    const { get } = useBaseService()
    const [data, setData] = useState([]);

    useEffect(() => {
        const asyncListProduct = async () => {
            const response = await get(APi.listProduct, config);
            setData(response.data)
        };
        asyncListProduct();
    }, [])

    return (
        <div className='Login'>
            <Loading />
            <Header background={'var(--white-color)'} colorText={'var(--text-color-darkmode)'} borderColor={"var(--gray-color-2)"} />
            <div className='main'>
                <BlockUI
                    isright
                    isbutton
                    title={Languages.text.notrushpay}
                    img={IcSystem}
                    label={Languages.buttonText.tryIt}
                    buttonStyle={BUTTON_STYLES.PINK}
                    isLowerCase
                    textStyleButton={BUTTON_STYLES.PINK}
                    animateImg={'animate__fadeInBottomLeft'}
                    animateContent={'animate__fadeInUpBig'}
                    offset={10} initiallyVisible={true} animatePreScroll={false} duration={2}
                >
                    <h2 className='wraps_title'>
                        {Languages.text.freeDraft}
                    </h2>
                    {Languages.text.beauToday}
                </BlockUI>
                <div className='wrap_ds_review'>
                    <div className='container mx-auto'>
                        <div className="md:grid md:grid-cols-3 md:gap-4">
                            <div className="col-span-2">
                                <AnimationOnScroll animateIn={'animate__fadeInRight'} offset={10} initiallyVisible={true} animatePreScroll={false} duration={2}>
                                    <div className='image_style_in_box'>
                                        <img className='image_review' src={IcReview} alt='review' />
                                    </div>
                                </AnimationOnScroll>
                            </div>
                            <div className="box_details_ds">
                                <AnimationOnScroll animateIn={'animate__fadeInLeft'} offset={10} initiallyVisible={true} animatePreScroll={false} duration={2}>
                                    <div className='details'>
                                        <span className='only'>{Languages.text.only}</span>
                                        <h2 className='price'>{Languages.text.price}</h2>
                                        <p>{Languages.text.packAllDs}</p>
                                        <ul className='list_details'>
                                            {renderList(Languages.text.mUse)}
                                            {renderList(Languages.text.savePen)}
                                            {renderList(Languages.text.album)}
                                            {renderList(Languages.text.confirmInvite)}
                                            {renderList('V..v')}
                                        </ul>
                                        <Button
                                            label={Languages.menu.register}
                                            buttonStyle={BUTTON_STYLES.PINK}
                                            textStyle={BUTTON_STYLES.PINK}
                                            autocenter
                                            isLowerCase
                                        />
                                    </div>
                                </AnimationOnScroll>
                            </div>

                        </div>
                    </div>
                </div>
                <ChooseTypeBlock
                    backgroundColor={BACKGROUND_STYLES.WHITE}
                />
                <div className='all_services'>
                    <div className='container mx-auto'>
                        <div className='all_services_types'>
                            <div className='head_hot'>
                                <h2>
                                    {Languages.text.packageServices}
                                </h2>
                                <span>
                                    {Languages.text.hot}
                                </span>
                            </div>
                            <div className='package_Box_sellect'>
                                <div className='md:grid md:grid-cols-4 md:gap-10'>
                                    {
                                        data.map(function (item, index) {
                                            return <AnimationOnScroll key={index} animateIn={'animate__fadeInRight'} offset={100} initiallyVisible={true} animatePreScroll={false} duration={2}>
                                                <div className='item_package_level'>
                                                    <div className='header'>
                                                        {item.name}
                                                    </div>
                                                    <div className='List_item_show'>
                                                        {
                                                            item.subProduct.map(function (item, index) {
                                                                return <div key={index} className='item_single_line'>
                                                                    <img src={IcCheck} alt='IcCheck' />
                                                                    {item.name}
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </AnimationOnScroll>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Services
