import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/header'
import Footer from './Footer/Footer'
import Loading from '@/components/Loading'
import { Panel } from '@/components/panel'
import { FaHeadphones } from 'react-icons/fa'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Link } from 'react-router-dom'

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

    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    };

    return (
        <div className='customer_care_page'>
            <Loading />
            <Header
                background={'var(--white-color)'}
                colorText={'var(--text-color-darkmode)'}
            />
            <div className='menu_bar_fix_top'>
                <ul>
                    <li onClick={() => handleClick(refNotice)}>
                        <Link to='#'>Notice</Link>
                    </li>
                    <li onClick={() => handleClick(refFaq)}>
                        <Link to='#'>FAQ</Link>
                    </li>
                    <li onClick={() => handleClick(refManual)}>
                        <Link to='#'>Manual</Link>
                    </li>
                    <li onClick={() => handleClick(refCS)}>
                        <Link to='#'>CS Info</Link>
                    </li>
                </ul>
            </div>
            <div className='wrap_customer_care'>
                <div className='box_notice'>
                    <div ref={refNotice} className='container mx-auto'>
                        <div className='faq_box_custormer'>
                            <div className='head'>
                                <h1>
                                    Thông báo
                                </h1>
                            </div>
                            <div className='panel_colisape_group'>
                                <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Cách kiểm tra thống kê tham dự<br /><br />

                                            Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                            Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                            Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                            Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Cách kiểm tra thống kê tham dự<br /><br />

                                            Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                            Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                            Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                            Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Cách kiểm tra thống kê tham dự <br /><br />

                                            Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                            Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                            Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                            Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                        </div>
                                    </div>
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={refFaq} className='container mx-auto'>
                    <div className='faq_box_custormer'>
                        <div className='head'>
                            <h2>
                                FAQ
                            </h2>
                        </div>
                        
                        <div className='panel_colisape_group'>
                            <div className='category_name_group'>
                                <h3>Cách làm/Thanh toán</h3>
                            </div>
                            <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'}>
                                <div className='panel_colisape_description'>
                                    <div className='entry'>
                                        Cách kiểm tra thống kê tham dự<br /><br />

                                        Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                        Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                        Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                        Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                    </div>
                                </div>
                            </Panel>
                            <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'}>
                                <div className='panel_colisape_description'>
                                    <div className='entry'>
                                        Cách kiểm tra thống kê tham dự<br /><br />

                                        Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                        Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                        Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                        Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                    </div>
                                </div>
                            </Panel>
                            <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'}>
                                <div className='panel_colisape_description'>
                                    <div className='entry'>
                                        Cách kiểm tra thống kê tham dự <br /><br />

                                        Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                        Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                        Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                        Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                    </div>
                                </div>
                            </Panel>
                            <Panel title={'Câu 1: Làm cách nào để kiểm tra số lượng khách mời tham dự?'}>
                                <div className='panel_colisape_description'>
                                    <div className='entry'>
                                        Cách kiểm tra thống kê tham dự<br /><br />

                                        Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                        Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                        Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                        Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                    </div>
                                </div>
                            </Panel>
                        </div>

                    </div>
                </div>
                <div ref={refManual} className='sec_video'>
                    <div className='container mx-auto'>
                        <iframe width="100%" height={heightVideo} src="https://www.youtube.com/embed/qnXQgQfwJU4" title="Người được chọn tên Hoa - 23/11/2021" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
                <div ref={refCS} className='sec_quickly_answer'>
                    <div className='container mx-auto'>
                        <div className='box_support_guest'>
                            <div className='all_ready'>
                                <FaHeadphones /> <span>We will Answer Quickly</span>
                            </div>
                            <div className='timetowork'>
                                <p>Mon to Fri : 09:00 ~ 18:00</p>
                                <p>Lunch Time : 12:00 ~ 13:00</p>
                                <p>Sat, Sun, Official Holiday off</p>
                            </div>
                            <div className='bottom_btn'>
                                <Button
                                    label={'Zalo id : ~~~~ & QR'}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    textStyle={BUTTON_STYLES.WHITE}
                                />
                                <Button
                                    label={'1:1 Q&A'}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    textStyle={BUTTON_STYLES.WHITE}
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
