import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/header'
import Footer from './Footer/Footer'
import Loading from '@/components/Loading'
import { Panel } from '@/components/panel'
import { FaHeadphones } from 'react-icons/fa'
import { Button } from '@/components/button'
import { APi, BUTTON_STYLES, config } from '@/commons/Constant.ts'
import { Link } from 'react-router-dom'
import { useBaseService } from '@/utils/BaseServices'
import PaginatedList from '@/components/pagination'
import dayjs from 'dayjs'

const CustomerCare = () => {
    const refNotice = useRef(null);
    const refFaq = useRef(null);
    const refManual = useRef(null);
    const refCS = useRef(null);

    const [heightVideo, setHeightVideo] = useState(0)

    const heightScreen = window.innerHeight * 2
    const widthScreen = window.innerWidth

    useEffect(() => {
        if (widthScreen > 768) setHeightVideo(heightScreen / 3)
        else setHeightVideo(200)
    }, [])

    const { get } = useBaseService();
    const [data, setData] = useState([]);
    const [dataNotifi, setDataNotifi] = useState([]);
    const [dataInfor, setDataInfor] = useState([]);

    useEffect(() => {
        const asyncListFAQ = async () => {
            const response = await get(APi.faq, '', {
                isNotification: 2
            });
            setData(response.data);
        };
        const asyncListNotifi = async () => {
            const response = await get(APi.notifi, '', {
                created: '643d0497d04d231dc24a2765'
            });
            setDataNotifi(response.data[0].data);
        };
        asyncListFAQ();
        asyncListNotifi();
    }, []);

    useEffect(() => {

        const asyncLimit = async () => {
            try {
                const response = await get(APi.getInformationBase)
                setDataInfor(response.data[0].data)
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error)
            }
        }
        asyncLimit()

    }, [])

    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    };

    const onNavigateZalo = () => window.open('https://zalo.me/' + dataInfor[data.length - 1]?.zaloNumber)

    const onscrollTop = () => window.scrollTo(0, 0)
    
    return (
        <div className='customer_care_page'>
            <Loading />
            <Header
                background={'var(--white-color)'}
                colorText={'var(--text-color-darkmode)'}
            />

            <div className='wrap_customer_care'>

                <div className='box_notice'>
                    <div className='container mx-auto'>
                        <div className='menu_bar_fix_top'>
                            <ul>
                                <li onClick={() => handleClick(refNotice)}>
                                    <Link to='#'>Thông báo</Link>
                                </li>
                                <li onClick={() => handleClick(refFaq)}>
                                    <Link to='#'>Câu hỏi thường gặp</Link>
                                </li>
                                <li onClick={() => handleClick(refManual)}>
                                    <Link to='#'>Hướng dẫn</Link>
                                </li>
                                <li onClick={() => handleClick(refCS)}>
                                    <Link to='#'>Thông tin liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div ref={refNotice} className='container mx-auto'>
                        <div className='faq_box_custormer'>
                            <div className='head'>
                                <h1>
                                    Thông báo
                                </h1>
                            </div>
                            <div className='panel_colisape_group'>
                                {
                                    dataNotifi.map(function (item, index) {
                                        return <Panel key={index} title={item?.title} date={dayjs(item?.createTime).format('DD/MM/YYYY')}>
                                            <div className='panel_colisape_description'>
                                                <div className='entry'>
                                                    {item?.description}
                                                </div>
                                            </div>
                                        </Panel>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={refFaq} className='container mx-auto'>
                    <div className='faq_box_custormer'>
                        <div className='head'>
                            <h2>
                                Câu hỏi thường gặp
                            </h2>
                        </div>
                        {

                            data.map(function (item, indexParent) {
                                return <div className='panel_colisape_group' key={indexParent}>
                                    <div className='category_name_group'>
                                        <h3>{item.content}</h3>
                                    </div> {
                                        <PaginatedList data={item?.questions} itemsPerPage={5} />
                                    }

                                </div>
                            })
                        }
                    </div>
                </div>
                <div ref={refManual} className='sec_video'>

                    <div className='container mx-auto'>
                        <div className='faq_box_custormer'>
                            <div className='head'>
                                <h2>
                                    Hướng dẫn
                                </h2>
                            </div>
                        </div>
                        <iframe width="100%" height={heightVideo} src="https://www.youtube.com/embed/qnXQgQfwJU4" title="Người được chọn tên Hoa - 23/11/2021" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
                <div ref={refCS} className='sec_quickly_answer'>
                    <div className='container mx-auto'>
                        <div className='faq_box_custormer'>
                            <div className='head'>
                                <h2>
                                    Thông tin liên hệ
                                </h2>
                            </div>
                        </div>
                        <div className='box_support_guest'>
                            <div className='all_ready'>
                                <FaHeadphones /> <span>Chúng tôi luôn hỗ trợ bạn sớm nhất có thể</span>
                            </div>
                            <div className='timetowork'>
                                <p>Mon to Fri : 09:00 ~ 18:00</p>
                                <p>Lunch Time : 12:00 ~ 13:00</p>
                                <p>Sat, Sun, Official Holiday off</p>
                            </div>
                            <div className='bottom_btn'>
                                <Button
                                    label={'Zalo id: 0933619010'}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    textStyle={BUTTON_STYLES.WHITE}
                                    onPress={onNavigateZalo}
                                />
                                <Button
                                    label={'1:1 Q&A'}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    textStyle={BUTTON_STYLES.WHITE}
                                    onPress={onscrollTop}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default CustomerCare
