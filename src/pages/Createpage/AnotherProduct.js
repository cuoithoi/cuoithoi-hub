import React, { useCallback, useState } from 'react'

import itemImageServices1 from '@/assets/home-image/IMG_Sv1.png'
import itemImageServices2 from '@/assets/home-image/IMG_Sv2.png'
import itemImageServices3 from '@/assets/home-image/IMG_Sv3.png'
import itemImageShowServices1 from "@/assets/home-image/Img_Show.jpg";
import itemImageShowServices2 from "@/assets/home-image/Img_Show2.png";
import itemImageShowServices3 from "@/assets/home-image/Img_Show3.png";
import { FaCheck } from 'react-icons/fa'
import { Button } from '@/components/button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'

const AnotherProduct = () => {

  const [checkTypeIdProduct, setCheckTypeIdProduct] = useState('tab_one')

  const onChangeBox = useCallback((value) => {
    setCheckTypeIdProduct(value)
  }, [])

  return (
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
                  <h3>We got married (2023)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Heerak Park, South Korea
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                  </div>
                  <Button
                    label={"Xem chi tiết sản phẩm"}
                    autocenter
                    buttonStyle={BUTTON_STYLES.PINK}
                    textStyle={BUTTON_STYLES.WHITE}
                    onPress={() => onChangeBox('tab_one')}
                  />
                </div>
              </div>
              <div className="item">
                <div className="item_img">
                  <img src={itemImageServices2} alt="itemImageServices2" />
                </div>
                <div className="item_content">
                  <h3>Couple at the races (1916)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Ethel Plummer, America
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                  </div>
                  <Button
                    label={"Xem chi tiết sản phẩm"}
                    autocenter
                    buttonStyle={BUTTON_STYLES.PINK}
                    textStyle={BUTTON_STYLES.WHITE}
                    onPress={() => onChangeBox('tab_two')}
                  />
                </div>
              </div>
              <div className="item">
                <div className="item_img">
                  <img src={itemImageServices3} alt="itemImageServices3" />
                </div>
                <div className="item_content">
                  <h3>Love. Neue graphik (1968)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Robert Indiana, America
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                  </div>
                  <Button
                    label={"Xem chi tiết sản phẩm"}
                    autocenter
                    buttonStyle={BUTTON_STYLES.PINK}
                    textStyle={BUTTON_STYLES.WHITE}
                    onPress={() => onChangeBox('tab_three')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          checkTypeIdProduct === 'tab_one' && <div className="box_details_services">
            <div className="md:grid md:grid-cols-3 md:gap-12">
              <div className="image_box_left">
                <img src={itemImageShowServices1} alt='itemimageservices1' />
              </div>
              <div className="content_box_right col-span-2">
                <div className="content">
                  <h3>We got married (2023)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Heerak Park, South Korea
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                    <div className="price">
                      <p>
                        80$ <span>(Không tính chi phí khắc chữ theo yêu cầu)</span>
                      </p>
                    </div>
                  </div>
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
        }
        {
          checkTypeIdProduct === 'tab_two' && <div className="box_details_services">
            <div className="md:grid md:grid-cols-3 md:gap-12">
              <div className="image_box_left">
                <img src={itemImageShowServices2} alt='itemimageservices1' />
              </div>
              <div className="content_box_right col-span-2">
                <div className="content">
                  <h3>Couple at the races (1916)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Ethel Plummer, America
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                    <div className="price">
                      <p>
                        80$ <span>(Không tính chi phí khắc chữ theo yêu cầu)</span>
                      </p>
                    </div>
                  </div>
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
        }
        {
          checkTypeIdProduct === 'tab_three' && <div className="box_details_services">
            <div className="md:grid md:grid-cols-3 md:gap-12">
              <div className="image_box_left">
                <img src={itemImageShowServices3} alt='itemimageservices1' />
              </div>
              <div className="content_box_right col-span-2">
                <div className="content">
                  <h3>Love. Neue graphik (1968)</h3>
                  <div className="property_type">
                    <div className="property_desc">
                      Robert Indiana, America
                    </div>
                    <div className="property_size">
                      <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
                    </div>
                    <div className="price">
                      <p>
                        80$ <span>(Không tính chi phí khắc chữ theo yêu cầu)</span>
                      </p>
                    </div>
                  </div>
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
        }
      </div>
    </div>
  )
}

export default AnotherProduct
