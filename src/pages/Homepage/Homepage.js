import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./HomePage.module.css";
import Languages from "@/commons/Languages";
import { Button } from "@/components/button";
import BlockUI from "@/components/blockUI";
import { BUTTON_STYLES } from "@/commons/Constant.ts";
import IcDoublePhone from "@/assets/home-image/IcDoublePhone.svg";
import IcPhoneHeart from "@/assets/home-image/IcPhoneHeart.svg";
import IcPhoneAround from "@/assets/home-image/IcPhoneAround.svg";
import IcPhoneList from "@/assets/home-image/IcPhoneList.svg";
import { BACKGROUND_STYLES } from "@/commons/Constant.ts";
import IcCapture from "@/assets/home-image/capture.svg";
import IcFile from "@/assets/home-image/file.svg";
import IcMapMarker from "@/assets/home-image/map-marker.svg";
import Footer from "../Footer/Footer";
import Header from "@/components/header";
import Loading from "@/components/Loading";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Element, Link } from "react-scroll";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import IcTooltip from '@/assets/home-image/Icon-tooltip.svg'
import IcTooltip1 from '@/assets/home-image/Icon-tooltip (1).svg'
import IcTooltip2 from '@/assets/home-image/Icon-tooltip (2).svg'
import IcTooltip3 from '@/assets/home-image/Icon-tooltip (3).svg'
import ImgSection from '@/assets/home-image/imgSection.svg'
import IcPlus from '@/assets/home-image/Icon_Plus.svg'
import IcTooltipMap from '@/assets/home-image/Icon_TooltipMap.svg'
import IcTooltipMedia from '@/assets/home-image/Icon_TooltipMedia.svg'
import IcTooltipExcel from '@/assets/home-image/Icon_TooltipExcel.svg'
import Img_3phone from '@/assets/home-image/Img_3phone.svg'
import ImgFeedback from '@/assets/home-image/ImgFeedback.svg'
import ChooseTypeBlock from "@/components/chooseTypeBlock";

const fadeImages = [
  {
    url: 'https://dalpeng.com/img/main/m_img4.jpg',
  },
  {
    url: 'https://dalpeng.com/img/main/m_img3.jpg',
  },
  {
    url: 'https://dalpeng.com/img/main/m_img2.jpg',
  },
];

const Homepage = () => {


  const [height, setHeight] = useState(0)

  const [heightTopFooter, setHeightTopFooter] = useState(0)
  const refFooter = useRef(null)

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const heightFooter = refFooter.current?.offsetHeight;
    const heightBoxTopFooter = windowHeight - heightFooter
    setHeightTopFooter(heightBoxTopFooter)
  }, [])

  const handleWheel = (e) => {
    const currentScrollPos = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const distanceToScroll = e.deltaY > 0 ? windowHeight : -windowHeight;
    window.scrollBy({ top: distanceToScroll, behavior: "smooth" });
  };

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <>
      <Loading />

      <nav className="dotted_scroll">
        <ul>
          <li>
            <Link to="section1" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section2" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section3" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section4" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section5" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section6" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section7" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
          <li>
            <Link to="section8" spy={true} smooth={true} offset={0} duration={500}>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="main" onWheel={handleWheel}>

        <Element name="section1" className="section" style={{ height: height }}>
          <Header typeLogo={BACKGROUND_STYLES.WHITE} />
          <div className={`${styles.homepage_box}`}>
            <div className="slide-container">
              <Fade autoplay={true}
                duration={2000}
                transitionDuration={1000}
                arrows={false}>
                {fadeImages.map((fadeImage, index) => (
                  <div className="each-fade" key={index} style={{ height: height }}>
                    <div className="image-container" >
                      <img src={fadeImage.url} />
                    </div>
                  </div>
                ))}
              </Fade>
              <div className={`${styles.headerTextCenter}`}>

                <div className="main_tit">
                  <h1 className={`${'tit_type1 fadeIn2 m-block mtit'} ${styles.textStyleFormat}`}>{Languages.text.textBanner}</h1>
                  <p><span className="tit_type2 fadeIn3 m-block m3">{Languages.text.textTinhte}</span></p>
                </div>

                <AnimationOnScroll
                  className={`${styles.buttonBottom_box}`}
                  animateIn="animate__flipInX"
                  offset={10}
                  initiallyVisible={true}
                  animatePreScroll={false}
                >
                  <Button
                    label={Languages.buttonText.createTC}
                    textStyle={BUTTON_STYLES.PINK}
                    isLowerCase
                  />
                  <Button
                    label={Languages.buttonText.anyMore}
                    buttonStyle={BUTTON_STYLES.WHITE}
                    textStyle={BUTTON_STYLES.WHITE}
                    isLowerCase
                  />
                </AnimationOnScroll>

              </div>
            </div>


          </div>
        </Element>

        <Element name="section2" className="section" style={{ height: height }}>
          <BlockUI
            isright
            title={Languages.text.mobileWeddingCard}
            img={IcDoublePhone}
            styleBoxText={styles.styleBoxText}
            offset={100}
            initiallyVisible={false}
            animatePreScroll={false}
            duration={2}
            backgroundColor={BACKGROUND_STYLES.TRANPARENTGREEN}
          >

            {Languages.text.aFewClicks}

            <div className="main-cont-wrap">

              <ul className="step2_list slideDown2">

                <li>
                  <AnimationOnScroll
                    className={`${styles.buttonBottom_box}`}
                    animateIn="animate__fadeInLeft"
                    offset={0}
                    delay={400}
                  >
                    <div className="step2_list">
                      <img src={IcTooltip} alt="tooltip" />
                    </div>
                  </AnimationOnScroll>
                  <div className="tooltip"><strong>Thiệp mời di động</strong>Mang đậm cá tính của riêng bạn trong ngày đặc biệt nhất</div>
                </li>

                <li>
                  <AnimationOnScroll
                    className={`${styles.buttonBottom_box}`}
                    animateIn="animate__fadeInLeft"
                    offset={0}
                    delay={600}
                  >
                    <div className="step2_list">
                      <img src={IcTooltip1} alt="tooltip1" />
                    </div>
                  </AnimationOnScroll>
                  <div className="tooltip"><strong>Bất cứ nơi đâu và bất cứ khi nào</strong>Sửa đổi nội dung và giao diện</div>
                </li>

                <li>
                  <AnimationOnScroll
                    className={`${styles.buttonBottom_box}`}
                    animateIn="animate__fadeInLeft"
                    offset={0}
                    delay={800}
                  >
                    <div className="step2_list">
                      <img src={IcTooltip2} alt="tooltip2" />
                    </div>
                  </AnimationOnScroll>
                  <div className="tooltip"><strong>Chia sẻ khoảnh khắc lãng mạn</strong>Tăng thêm sự gần gũi và kết nối với khách mời của bạn </div>
                </li>

                <li>
                  <AnimationOnScroll
                    className={`${styles.buttonBottom_box}`}
                    animateIn="animate__fadeInLeft"
                    offset={0}
                    delay={1000}
                  >
                    <div className="step2_list">
                      <img src={IcTooltip3} alt="tooltip3" />
                    </div>
                  </AnimationOnScroll>
                  <div className="tooltip"><strong>Tạo thiệp nhanh chóng</strong>Chỉ với 5 phút, tạo thiệp mời của riêng bạn</div>
                </li>

              </ul>

            </div>

          </BlockUI>
        </Element>

        <Element name="section3" className="section" style={{ height: height }}>

          <div className="wrapbox_image_pc">
            <div className="container mx-auto">
              <div className="head">
                <h3>
                  Tạo thiệp dễ dàng <br />
                  chia sẻ nhanh chóng & sửa đổi không giới hạn
                </h3>
              </div>
              <div className="image_single_pc">
                <img src={ImgSection} alt='ImgSection' />
              </div>
            </div>
          </div>

        </Element>

        <Element name="section4" className="section" style={{ height: height }}>
          <div className="wrapbox_image_pc box_3phone_section">
            <div className="container mx-auto">
              <div className="head">

                <h3>
                  Trải nghiệm các tính năng chỉ có ở thiệp cưới di động
                </h3>
                <div className="main-cont-wrap box_3phone_wrap_iconn_section">

                  <ul className="step2_list slideDown2">

                    <li>
                      <AnimationOnScroll
                        className={`${styles.buttonBottom_box}`}
                        animateIn="animate__fadeInLeft"
                        offset={0}
                        delay={300}
                      >
                        <div className="step2_list">
                          <img src={IcTooltipExcel} alt="tooltip" />
                        </div>

                      </AnimationOnScroll>
                      <AnimationOnScroll
                        animateIn="animate__fadeInLeft"
                        offset={0}
                        delay={400}
                      >
                        <div className="step2_list">
                          <img src={IcPlus} alt="tooltip" />
                        </div>
                      </AnimationOnScroll>
                    </li>

                    <li>
                      <AnimationOnScroll
                        className={`${styles.buttonBottom_box}`}
                        animateIn="animate__fadeInLeft"
                        offset={0}
                        delay={600}
                      >
                        <div className="step2_list">
                          <img src={IcTooltipMap} alt="tooltip1" />
                        </div>

                      </AnimationOnScroll>
                      <AnimationOnScroll
                        animateIn="animate__fadeInLeft"
                        offset={0}
                        delay={800}
                      >
                        <div className="step2_list">
                          <img src={IcPlus} alt="tooltip" />
                        </div>
                      </AnimationOnScroll>
                    </li>

                    <li>
                      <AnimationOnScroll
                        className={`${styles.buttonBottom_box}`}
                        animateIn="animate__fadeInLeft"
                        offset={0}
                        delay={1000}
                      >
                        <div className="step2_list">
                          <img src={IcTooltipMedia} alt="tooltip2" />
                        </div>
                      </AnimationOnScroll>
                    </li>

                  </ul>

                </div>
              </div>

              <div className="box_3phone_wrap_image">
                <img src={Img_3phone} alt="img3phone" />
              </div>

            </div>
          </div>
        </Element>

        <Element name="section5" className="section" style={{ height: height }}>
          <BlockUI
            isright
            isbutton
            title={Languages.text.effectOpen}
            img={IcPhoneHeart}
            backgroundColor={BACKGROUND_STYLES.DRAK}
            label={Languages.buttonText.tryIt}
            buttonStyle={BUTTON_STYLES.PINK}
            styleImg={styles.styleImgCustomBox_4}
            containerCustormStyle={`${styles.containerCustormStyle} ${'containerCustormStyle'}`}
            isLowerCase
            textStyleButton={BUTTON_STYLES.WHITE}
            animateImg={"animate__fadeInBottomLeft"}
            animateContent={"animate__fadeInRight"}
          >
            {Languages.text.contentEffect}
          </BlockUI>
        </Element>

        <Element name="section6" className="section" style={{ height: height }}>


          <div className="box_save_wish" >
            <div className="container mx-auto">
              <div className="grid_box_wish">
                <h3>Dễ dàng lưu giữ tin nhắn chúc phúc từ những người thân yêu</h3>
                <AnimationOnScroll
                  className={`${styles.buttonBottom_box}`}
                  animateIn="animate__fadeIn"
                  offset={0}
                  delay={200}
                >
                  <div className="image_show_demo_wish">
                    <img src={ImgFeedback} alt="ImgFeedback" />
                  </div>
                </AnimationOnScroll>
              </div>
            </div>
          </div>


        </Element>
        <Element name="section7" className="section" style={{ height: height }}>
          <div className="choosetypeblock_box">
            <ChooseTypeBlock />
          </div>

        </Element>
        <Element name="section8" className="section" style={{ height: height }}>

          <div className="box_top_footer" style={{ height: heightTopFooter }}>
            <div className="container mx-auto">
              <div className="box_wrap">
                <div className="text">
                  <p>Một lời mời đặc biệt cho ngày đặc biệt của bạn</p>
                  <h3>Bạn muốn tạo lời mời đặc biệt ấy theo cách nào?</h3>
                </div>
                <div className="button">
                  <Button
                    label={Languages.buttonText.svDetails}
                    buttonStyle={BUTTON_STYLES.WHITE}
                    textStyle={BUTTON_STYLES.WHITE}
                    isLowerCase
                    autocenter
                  />
                </div>
              </div>
            </div>
          </div>
          <div ref={refFooter} className="ref_footer_style_Homepage">
            <Footer />
          </div>

        </Element>

      </div>

    </>
  );
};

export default Homepage;
