import React from 'react'
import footerIconBottom from '../../assets/home-image/footer-icon-bottom.svg'
import footerIconTop from '../../assets/home-image/footer-icon-top.svg'
import backgroundFooter from '../../assets/home-image/background-footer.png'
import footerLogo from '../../assets/home-image/footer-logo.jpg'
const Footer = () => {
  return (
    <div
      className='layout-mw section-mb footer-container w-12 bg-center bg-cover min-h-screen min-w-full bg-no-repeat '
      style={{ backgroundImage: `url(${backgroundFooter})` }}
    >
      <div className='footer-icon-top  min-w-full'>
        <img src={footerIconTop} alt='' className='min-w-full' />
      </div>
      <div className='footer-qoute'>
        <h2 className='text-9xl italic text-white qoute-footer-top '>"</h2>
        <p className='text-text  px-11 italic'>
          Gặp gỡ, yêu và cưới. Điều bạn vừa nghe không nằm trong một câu chuyện
          cổ tích, mà chính là câu chuyện về cuộc đời hai chúng tôi. <br />
          <br /> Chúng tôi sẽ yêu thương, chăm sóc, trân trọng và nắm tay nhau
          cùng đi đến hết cuộc đời này. <br />
          <br />
          Thật là một niềm vinh hạnh lớn khi ngày hạnh phúc nhất cuộc đời chúng
          tôi có sự hiện diện và chúc phúc của bạn!
        </p>
        <h2 className='text-9xl italic text-white qoute-footer-bottom '>"</h2>
      </div>
      <div className='footer-logo w-20 h-20 bottom-6 flex items-center justify-center'>
        <img src={footerLogo} alt='' />
      </div>
      <div className='footer-icon-bottom'>
        <img src={footerIconBottom} alt='' />
      </div>
    </div>
  )
}

export default Footer
