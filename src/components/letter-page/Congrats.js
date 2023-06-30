import React, { useRef } from 'react'
import TitleSection from './sub-comp/TitleSection'
import InforPhone from './sub-comp/InforPhone'
import Popup from '../modal/Popup'
import Languages from '@/commons/Languages'
import BankInfo from './sub-comp/BankInfo'
import { Button } from '../button'
import { BUTTON_STYLES } from '@/commons/Constant.ts'

const Congrats = ({ informationOfBride, informationOfGroom, isuseBanking }) => {
  const {
    firstName: firstNameBride,
    name: nameBride,
    middleName: middleNameBride,
    firstFatherNameOfBride,
    middleFatherNameOfBride,
    fatherNameOfBride,
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
    isGoneFatherBride,
    isGoneMotherOfBride,
  } = informationOfBride
  const {
    firstName: firstNameGroom,
    name: nameGroom,
    middleName: middleNameGroom,
    firstFatherNameOfGroom,
    middleFatherNameOfGroom,
    fatherNameOfGroom,
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
    isGoneFather,
    isGoneMother,
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
          name={`${nameGroom}`}
          phoneNumber={phoneNumberOfGroom}
          phoneColor='main'
          nameSizeLg={true}
        />
        <InforPhone
          title='Cô dâu'
          name={`${nameBride}`}
          phoneNumber={phoneNumberOfBride}
          nameSizeLg={true}
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Bố'
          name={`Ông. ${fatherNameOfGroom} ${isGoneFather ? '(Cố)' : ''}`}
          phoneNumber={phoneNumberOfFatherGroom}
          phoneColor='main'
        />
        <InforPhone
          title='Bố'
          name={`Ông. ${fatherNameOfBride} ${isGoneFatherBride ? '(Cố)' : ''}`}
          phoneNumber={phoneNumberOfFatherBride}
        />
      </div>
      <div className='flex justify-around'>
        <InforPhone
          title='Mẹ'
          name={`Bà. ${motherNameOfGroom} ${isGoneMother ? '(Cố)' : ''}`}
          phoneNumber={phoneNumberOfMotherGroom}
          phoneColor='main'
        />
        <InforPhone
          title='Mẹ'
          name={`Bà. ${motherNameOfBride} ${isGoneMotherOfBride ? '(Cố)' : ''}`}
          phoneNumber={phoneNumberOfMotherBride}
        />
      </div>
      {
        isuseBanking && <div className='flex justify-around items-center py-4'>
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
      }

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
            isGoneFather={isGoneFather}
            isGoneMother={isGoneMother}
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
            isGoneFather={isGoneFatherBride}
            isGoneMother={isGoneMotherOfBride}
          />
        }
      />
    </div>
  )
}

export default Congrats
