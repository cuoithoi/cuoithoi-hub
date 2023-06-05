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

const Congrats = ({ informationOfBride, informationOfGroom }) => {
  const {
    firstName: firstNameBride,
    name: nameBride,
    firstFatherNameOfBride,
    middleFatherNameOfBride,
    fatherNameOfBride,
    isOldBrotherBride,
    firstMotherNameOfBride,
    middleMotherNameOfBride,
    motherNameOfBride,
    phoneNumberOfBride,
    phoneNumberOfFatherBride,
    phoneNumberOfMotherBride,
    nameBankOfBride,
    nameBankOfFatherBride,
    nameBankOfMotherBride,
    qrCodeBrideLink,
    qrCodeFatherBrideLink,
    qrCodeMotherBrideLink,
  } = informationOfBride
  const {
    firstName: firstNameGroom,
    name: nameGroom,
    firstFatherNameOfGroom,
    middleFatherNameOfGroom,
    fatherNameOfGroom,
    isOldBrotherGroom,
    firstMotherNameOfGroom,
    middleMotherNameOfGroom,
    motherNameOfGroom,
    phoneNumberOfGroom,
    phoneNumberOfFatherGroom,
    phoneNumberOfMotherGroom,
    nameBankOfGroom,
    nameBankOfFatherGroom,
    nameBankOfMotherGroom,
    qrCodeGroomLink,
    qrCodeFatherGroomLink,
    qrCodeMotherGroomLink,
  } = informationOfGroom
  const modalRef = useRef()
  const modalRef1 = useRef()
  const handleShowModal = () => {
    modalRef.current.showModal()
  }
  const handleShowModal1 = () => {
    modalRef1.current.showModal()
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
          name={`${firstNameGroom} ${nameGroom}`}
          phoneNumber={phoneNumberOfGroom}
          phoneColor='main'
          nameSizeLg={true}
        />
        <InforPhone
          title='Cô dâu'
          name={`${firstNameBride} ${nameBride}`}
          phoneNumber={phoneNumberOfBride}
          nameSizeLg={true}
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Bố'
          name={`Ông. ${firstFatherNameOfGroom} ${middleFatherNameOfGroom} ${fatherNameOfGroom}`}
          phoneNumber={phoneNumberOfFatherGroom}
          phoneColor='main'
        />
        <InforPhone
          title='Bố'
          name={`Ông. ${firstFatherNameOfBride} ${middleFatherNameOfBride} ${fatherNameOfBride}`}
          phoneNumber={phoneNumberOfFatherBride}
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Mẹ'
          name={`Bà. ${firstMotherNameOfGroom} ${middleMotherNameOfGroom} ${motherNameOfGroom}`}
          phoneNumber={phoneNumberOfMotherGroom}
          phoneColor='main'
        />
        <InforPhone
          title='Mẹ'
          name={`Bà. ${firstMotherNameOfBride} ${middleMotherNameOfBride} ${motherNameOfBride}`}
          phoneNumber={phoneNumberOfMotherBride}
        />
      </div>
      <div className='flex justify-around items-center py-4'>
        <Button
          buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
          label='Gửi chúc phúc'
          rounded={true}
          onPress={() => {
            handleShowModal1()
          }}
        />
        <Button
          buttonStyle={BUTTON_STYLES.ORANGE}
          label='Gửi chúc phúc'
          rounded={true}
          onPress={() => {
            handleShowModal()
          }}
        />
      </div>

      <h3 className='pt-4 text-center '>Rất hân hạnh được đón tiếp!</h3>
      <Popup
        ref={modalRef1}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.delete}
        content={
          <BankInfo
            nameBank={nameBankOfGroom}
            nameBankOfFather={nameBankOfFatherGroom}
            nameBankOfMother={nameBankOfMotherGroom}
            qrCode={qrCodeGroomLink}
            qrCodeFatherLink={qrCodeFatherGroomLink}
            qrCodeMotherLink={qrCodeMotherGroomLink}
            isBride={false}
          />
        }
      />
      <Popup
        ref={modalRef}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.delete}
        content={
          <BankInfo
            nameBank={nameBankOfBride}
            nameBankOfFather={nameBankOfFatherBride}
            nameBankOfMother={nameBankOfMotherBride}
            qrCode={qrCodeBrideLink}
            qrCodeFatherLink={qrCodeFatherBrideLink}
            qrCodeMotherLink={qrCodeMotherBrideLink}
            isBride={true}
          />
        }
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
