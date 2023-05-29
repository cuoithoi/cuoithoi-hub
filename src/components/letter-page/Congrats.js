import React, { useRef } from 'react'
import TitleSection from './sub-comp/TitleSection'
import TitleDescribe from './sub-comp/TitleDescribe'
import phoneMain from '../../assets/home-image/phone-main.svg'
import phoneSecond from '../../assets/home-image/phone-second.svg'
import InforPhone from './sub-comp/InforPhone'
import Popup from '../modal/Popup'
import Languages from '@/commons/Languages'
import BankInfo from './sub-comp/BankInfo'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'

const Congrats = ({ setModalContent, setIsOpen }) => {
  const modalRef = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  return (
    <div
      className='py-10 section-mb layout-mw border-section-main border-section'
      id='congrat'
    >
      <TitleSection title='CHÚC PHÚC' />
      <div className='flex justify-around'>
        <InforPhone
          title='Chú rể'
          name='Việt Anh'
          phoneNumber='0985 145 293'
          phoneColor='main'
          nameSizeLg={true}
        />
        <InforPhone
          title='Chú rể'
          name='Phương Anh'
          phoneNumber='0985 145 293'
          nameSizeLg={true}
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Bố'
          name='Ông. Nguyễn Duy Đông'
          phoneNumber='0985 145 293'
          phoneColor='main'
        />
        <InforPhone
          title='Bố'
          name='Ông. Nguyễn Cảnh Mỹ'
          phoneNumber='0985 145 293'
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Mẹ'
          name='Bà. Trần Thị Tuyết'
          phoneNumber='0985 145 293'
          phoneColor='main'
        />
        <InforPhone
          title='Mẹ'
          name='Bà. Nguyễn Thị Thủy'
          phoneNumber='0985 145 293'
        />
      </div>
      <div className='flex justify-around items-center py-4'>
        <Button
          buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
          label='Gửi chúc phúc'
          rounded={true}
          onPress={() => {
            console.log('show modal')
            handleShowModal()
          }}
        />
        <Button
          buttonStyle={BUTTON_STYLES.ORANGE}
          label='Gửi chúc phúc'
          rounded={true}
        />
      </div>

      <h3 className='pt-4 text-center '>Rất hân hạnh được đón tiếp!</h3>
      <Popup
        ref={modalRef}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.delete}
        content={<BankInfo />}
      />
    </div>
  )
}

export default Congrats
// <button onClick={() => handleShowModal()}>click</button>
// <Popup
//   ref={modalRef}
//   btnCancelText={Languages.common.cancel}
//   btnSubmitText={Languages.common.delete}
// />
