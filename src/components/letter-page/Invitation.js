import React from 'react'
import invitationBg from '../../assets/home-image/invitation-bg.jpg'
// import invitationBg
import InvitationRight from '../icons/InvitationRight'
import InvitationLeft from '../icons/InvitationLeft'
import TitleSection from './sub-comp/TitleSection'
const Invitation = () => {
  return (
    <section
      className='bg-center bg-no-repeat bg-cover section-mb layout-mw'
      id='invitation'
      style={{ backgroundImage: `url(${invitationBg})` }}
    >
      <div className='section-mb text-center py-14 pr-2 pl-2'>
        <TitleSection title='LỜI MỜI' />
        <p className='border-section-1 pb-4'>
          <p className='text-lg '>Trân trọng kính mời,</p>
          <p />
          đến dự buổi tiệc chung vui cùng gia đình chúng tôi
        </p>
        <div>
          <div className='flex justify-center'>
            <div className='text-center px-4'>
              <h2 className='text-main'>Nhà trai</h2>
              <p>Chú rể</p>
              <h1>Việt Anh</h1>
              <p>Trưởng nam</p>
              <p>Bố</p>
              <p>Ông. Nguyễn Duy Đông</p>
              <p>Mẹ</p>
              <p>Bà. Trần Thị Tuyết</p>
            </div>
            <div className='text-center px-4'>
              <h2 className='text-second'>Nhà Gái</h2>
              <p>Cô dâu</p>
              <h1>Phương Anh</h1>
              <p>Trưởng nữ</p>
              <p>Bố</p>
              <p>Ông. Thạch Quốc Trưởng</p>
              <p>Mẹ</p>
              <p>Bà. Trần Thị Thủy</p>
            </div>
          </div>
          <h2 className='py-4'>Thứ bảy, ngày 18/02/2023</h2>
          <h2 className='text-second'>Địa chỉ</h2>
          <p className='px-20 pb-6 border-section-1'>
            Khách sạn Petro Thái Bình Số 458 Lý Bôn, P. Đề Thám, TP. Thái Bình
          </p>
          <p className='px-20'>
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Invitation
