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
            const response = await get(APi.faq);
            setData(response.data);
        };
        const asyncListNotifi = async () => {
            const response = await get(APi.notifi);
            setDataNotifi(response.data);
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

    const onNavigateZalo = () => window.open('https://zalo.me/' + dataInfor[data.length -1]?.zaloNumber)

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
                                <Panel title={'Câu 1: Hướng Dẫn Viết Nội Dung Thiệp Báo Hỷ Sau Cưới 2023'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Bước 1: Đăng nhập vàp trang chủ bằng ID đã tạo ra thiệp cưới<br />
                                            Bước 2: Trong Page Trang của tôi, Click chọn button “Kiểm tra khách mời"<br />
                                            Bước 3: Xem danh sách khách mời trong trang RVSP<br />

                                            Số liệu thống kê chỉ có thể được kiểm tra bởi cô dâu và chú rể, vì vậy bạn phải kiểm tra lời mời đám cưới khi đăng nhập để xem nó.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 2: MẪU TIN NHẮN MỜI ĐÁM CƯỚI QUA ĐIỆN THOẠI HAY, LỊCH SỰ'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Ngày nay với cuộc sống phát triển, mỗi người đều trở nên bận rộn. Không phải ai cũng ở gần để bạn có cơ hội gửi thiệp cưới đến tận tay. Thế nên việc lựa chọn gửi lời mời đám cưới qua tin nhắn là một phương thức được sử dụng phổ biến. Tuy nhiên bạn đã biết cách soạn tin nhắn mời đám cưới như thế nào để hay, ý nghĩa và lịch sự hay chưa? Dưới đây sẽ là mẫu tin nhắn mời đám cưới qua điện thoại khiến khách mời ở xa vô cùng hài lòng.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 3: KHI NÀO NÊN MỜI QUAN KHÁCH DỰ ĐÁM CƯỚI QUA ĐIỆN THOẠI?'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Với một sự kiện quan trọng của đời người như đám cưới, ai cũng mong được cầm tấm thiệp cưới trao tận tay và thông báo về ngày vui của mình. Bởi nó không chỉ là hình thức chia sẻ niềm vui mà còn là sự trân trọng đối với khách mời.
                                            Thế nhưng nhiều người đang ở một khoảng cách rất xa xôi. Thậm chí là ở nước ngoài.
                                            Sự phát triển của công nghệ biến điện thoại thành phương tiện liên lạc chính. Nhiều người lựa chọn phương thức này để gửi tin nhắn mời cưới. Nhất là trong thời điểm dịch bệnh bùng phát như hiện nay. Mời cưới thông qua điện thoại vừa tiện lợi, an toàn, vừa tuân thủ quy định nhà nước.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 4: TRƯỜNG HỢP NÀO KHÔNG NÊN MỜI DỰ ĐÁM CƯỚI QUA ĐIỆN THOẠI?'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Tuy việc mời qua điện thoại tiện lợi, nhanh chóng và không mất nhiều thời gian nhưng không phải trường hợp nào cũng có thể áp dụng. Asiana Plaza khuyên cô dâu chú rể không nên sử dụng cách thức này trong những trường hợp mời các bậc cao niên trong dòng họ.

                                            Đây là những người đã có tuổi, tư tưởng truyền thống, xem trọng lễ tiết. Nếu như không mang thiệp đến trực tiếp mời cưới thì bạn sẽ bị đánh giá là thiếu tôn trọng và dễ đụng chạm đến lòng tự ái của người được mời.
                                        </div>
                                    </div>
                                </Panel>
                                <Panel title={'Câu 5: NHỮNG NỘI DUNG CẦN CÓ KHI MỜI CƯỚI BẰNG ĐIỆN THOẠI'} date={'20/2/2023'}>
                                    <div className='panel_colisape_description'>
                                        <div className='entry'>
                                            Lời mời đám cưới qua điện thoại cần được chú trọng để vừa cung cấp đủ nội dung thông tin vừa không gây khó chịu cho người được mời. Những nội dung quan trọng cần phải có bao gồm:

                                            Lời chào: Đây là bước đầu tiên của bất cứ cuộc nói chuyện hay trao đổi thông tin nào qua điện thoại. Trước khi đưa ra lý do gọi điện hãy cho đầu dây bên kia biết mình là ai và chảo hỏi chân thành.
                                            Đưa ra lý do không thể trực tiếp trao thiệp mời: Lý do cần chính xác và sử dụng ngôn từ khiêm nhường để tạo sự thông cảm từ đối phương. Lời mời cũng dễ dàng được chấp thuận và đến dự đám cưới của bạn một cách vui vẻ, thoải mái.
                                            Đưa ra thời gian cụ thể và địa điểm tổ chức tiệc để người được mời có thể sắp xếp công việc và tham dự.
                                            Nhấn mạnh mong muốn về sự có mặt của người được mời cưới thông qua các cụm từ như “Mình hy vọng bạn sẽ sắp xếp được công việc để tham dự”, “Chúng mình sẽ rất vui khi có sự hiện diện của bạn tại đám cưới”,…
                                            Kết thúc cuộc gọi, gửi lời chào tạm biệt và không quên cảm ơn.
                                            Nên soạn sẵn mẫu tin nhắn mời dự đám cưới qua điện thoại để tránh xảy ra trục trặc trong quá trình thực hiện. Bạn cũng cần chú ý cẩn trọng lời nói và thái độ để người được mời luôn có cảm giác được coi trọng khi nhận cuộc gọi.
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
                                Câu hỏi thường gặp
                            </h2>
                        </div>
                        {
                            data.map(function (item, indexParent) {
                                return item.data.map(function (item, index) {
                                    return <div className='panel_colisape_group' key={index - indexParent}>
                                        <div className='category_name_group'>
                                            <h3>{item.content}</h3>
                                        </div> {
                                            <PaginatedList data={item.questions} itemsPerPage={5} />
                                        }

                                    </div>
                                })
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
