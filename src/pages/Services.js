import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "./Footer/Footer";
import Loading from "@/components/Loading";
import Languages from "@/commons/Languages";
import { APi, BUTTON_STYLES, config } from "@/commons/Constant.ts";
import BlockUI from "@/components/blockUI";
import IcSystem from "@/assets/home-image/IcSystem.svg";
import IcReview from "@/assets/home-image/IcReview.svg";
import IcCheck from "@/assets/home-image/IcCheck.svg";
import ICFrameVideo from "@/assets/home-image/Ic_frameVideo.png";
import IcSuccess from "@/assets/home-image/ic_success.png";
import video_wedding from "@/assets/audio/videoplayback.mp4";
import { Button } from "@/components/button";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useBaseService } from "@/utils/BaseServices";
import TabContent from "@/components/Tabcontent";
import itemImageServices1 from "@/assets/home-image/IMG_Sv1.svg";
import itemImageServices2 from "@/assets/home-image/IMG_Sv2.svg";
import itemImageServices3 from "@/assets/home-image/IMG_Sv3.svg";
import itemImageServicesShow from "@/assets/home-image/IMG_S_Show.svg";
import { FaCheck } from "react-icons/fa";

const Services = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 5);
    }, 1500);
  }, []);

  const renderList = useCallback((title) => {
    return (
      <li>
        <img src={IcSuccess} alt="check" />
        <p>{title}</p>
      </li>
    );
  }, []);

  const { get } = useBaseService();
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncListProduct = async () => {
      const response = await get(APi.listProduct, config);
      setData(response.data);
    };
    asyncListProduct();
  }, []);

  return (
    <div className="Login">
      <Loading />
      <Header
        background={"var(--white-color)"}
        colorText={"var(--text-color-darkmode)"}
        borderColor={"var(--gray-color-2)"}
      />
      <div className="main">
        <BlockUI
          isright
          isbutton
          title={Languages.text.notrushpay}
          img={IcSystem}
          label={Languages.buttonText.tryIt}
          buttonStyle={BUTTON_STYLES.PINK}
          isLowerCase
          textStyleButton={BUTTON_STYLES.WHITE}
          animateImg={"animate__fadeInBottomLeft"}
          animateContent={"animate__fadeInUpBig"}
          offset={10}
          initiallyVisible={true}
          animatePreScroll={false}
          duration={2}
        >
          <h2 className="wraps_title">{Languages.text.freeDraft}</h2>
          {Languages.text.beauToday}
        </BlockUI>
        <div className="all_services">
          <div className="container mx-auto">
            <div className="all_services_types">
              <div className="head_hot">
                <h2>{Languages.text.packageServices}</h2>
                <span>{Languages.text.hot}</span>
              </div>
              <div className="package_Box_sellect">
                <div className="md:grid md:grid-cols-4 md:gap-10">
                  {data.map(function (item, index) {
                    return (
                      <AnimationOnScroll
                        key={index}
                        animateIn={"animate__fadeInRight"}
                        offset={100}
                        initiallyVisible={true}
                        animatePreScroll={false}
                        duration={2}
                      >
                        <div className="item_package_level">
                          <div className="header">{item.name}</div>
                          <div className="List_item_show">
                            {item.subProduct.map(function (item, index) {
                              return (
                                <div key={index} className="item_single_line">
                                  <img src={IcCheck} alt="IcCheck" />
                                  {item.name}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </AnimationOnScroll>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap_ds_review">
          <div className="container mx-auto">
            <div className="md:grid md:grid-cols-3 md:gap-4">
              <div className="col-span-2">
                <AnimationOnScroll
                  animateIn={"animate__fadeInRight"}
                  offset={10}
                  initiallyVisible={true}
                  animatePreScroll={false}
                  duration={2}
                >
                  <div className="image_style_in_box">
                    <img className="image_review" src={IcReview} alt="review" />
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="box_details_ds">
                <AnimationOnScroll
                  animateIn={"animate__fadeInLeft"}
                  offset={10}
                  initiallyVisible={true}
                  animatePreScroll={false}
                  duration={2}
                >
                  <div className="details">
                    <span className="only">{Languages.text.only}</span>
                    <h2 className="price">{Languages.text.price}</h2>
                    <p>{Languages.text.packAllDs}</p>
                    <ul className="list_details">
                      {renderList(Languages.text.mUse)}
                      {renderList(Languages.text.savePen)}
                      {renderList(Languages.text.album)}
                      {renderList(Languages.text.confirmInvite)}
                      {renderList("V..v")}
                    </ul>
                    <Button
                      label={Languages.menu.register}
                      buttonStyle={BUTTON_STYLES.PINK}
                      textStyle={BUTTON_STYLES.WHITE}
                      autocenter
                      isLowerCase
                    />
                  </div>
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </div>

        <div className="section_video_NFT">
          <div className="container mx-auto">
            <div className="md:grid md:grid-cols-2 md:gap-4">
              <TabContent>
                <div title="Video Clip Service" className="tab-content">
                  <div className="tab_index_container">
                    <h3>
                      Video ngắn với hiệu ứng độc quyền chỉ có tại Cưới Thôi
                    </h3>
                    <strong>Mô tả</strong>
                    <ul>
                      <li>
                        Gửi lời mời cho ngày đặc biệt của bạn dưới dạng video
                        clip
                      </li>
                      <li>
                        Chỉ cần sử dụng 5 tấm ảnh hạnh phúc của các bạn, Cưới
                        Thôi sẽ lo hết
                      </li>
                      <li>
                        Dễ dàng để chia sẻ trên mạng xã hội, gửi cho bạn bè, và
                        nhiều hơn nữa
                      </li>
                    </ul>
                    <Button
                      label={Languages.buttonText.tryIt}
                      buttonStyle={BUTTON_STYLES.PINK}
                      textStyle={BUTTON_STYLES.WHITE}
                    />
                    <div className="box_abs_image_video animate__fadeInLeft_phone">
                      <div className="frame_video_box">
                        <img src={ICFrameVideo} alt="video" />
                        <video controls autoPlay={true} loop>
                          <source src={video_wedding} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
                <div title="NFT Service" className="tab-content">
                  <p>This is the content of Tab 2.</p>
                  <p>It can contain multiple HTML tags.</p>
                </div>
              </TabContent>
            </div>
          </div>
        </div>

        <div className="another_service_box">
          <div className="container mx-auto">
            <div className="choose_ser_another">
              <div className="box_head">
                <h2>
                  Giới thiệu Bộ sưu tập giới hạn PAS, chỉ có tại Cuoi Thoi!
                </h2>
                <p>
                  Sản phẩm được tạo ra bởi các nhà thiết kế quốc tế, đảm bảo
                  chất lượng hàng đầu với phong cách độc đáo.
                </p>
              </div>
              <div className="list_item_services_another">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="item">
                    <div className="item_img">
                      <img src={itemImageServices1} alt="itemImageServices1" />
                    </div>
                    <div className="item_content">
                      <h3>Type1</h3>
                      <Button
                        label={"Xem chi tiết sản phẩm"}
                        autocenter
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="item_img">
                      <img src={itemImageServices2} alt="itemImageServices2" />
                    </div>
                    <div className="item_content">
                      <h3>Product Name #2</h3>
                      <Button
                        label={"Xem chi tiết sản phẩm"}
                        autocenter
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="item_img">
                      <img src={itemImageServices3} alt="itemImageServices3" />
                    </div>
                    <div className="item_content">
                      <h3>Product Name #3</h3>
                      <Button
                        label={"Xem chi tiết sản phẩm"}
                        autocenter
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.WHITE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="box_details_services">
              <div className="md:grid md:grid-cols-3 md:gap-12">
                <div className="image_box_left">
                  <img src={itemImageServicesShow} alt='itemimageservices1' />
                </div>
                <div className="content_box_right col-span-2">
                  <div className="content">
                    <h3>Type 1</h3>
                    <div className="descreption">
                      <div className="block">
                        <div className="block_title">
                          <span>1</span><p>Trang trí ngôi nhà của bạn trở nên ngọt ngào hơn bao giờ hết.</p>
                        </div>
                        <div className="block_content">
                          <ul>
                            <li>
                              <FaCheck /> Cưới Thôi sẽ giao hàng trực tiếp tới cửa nhà bạn đảm bảo tiện lợi tối đa
                            </li>
                            <li>
                              <FaCheck />Nếu bạn muốn mua tặng cho người bạn bè hoặc người thân yêu của mình, chỉ cần liên hệ với chúng tôi qua Zalo hoặc email.
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="block">
                        <div className="block_title">
                          <span>2</span><p>Bạn muốn sản phẩm trở nên cá nhân hóa hơn theo sở thích của bạn</p>
                        </div>
                        <div className="block_content">
                          <ul>
                            <li>
                              <FaCheck />Sử dụng Dịch vụ Chữ Cá Nhân của chúng tôi và khắc tên của bạn vào sản phẩm <br />
                              (Sẽ có thêm chút phụ phí nhé).
                            </li>
                            <li>
                              <FaCheck /> Đừng ngần ngại hỏi thêm thông tin qua Zalo hoặc email
                            </li>
                            <li>
                              <FaCheck /> Hãy tạo ra những phép màu lãng mạn để tô điểm tổ ấm của bạn
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
