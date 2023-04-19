import React, { useMemo, useRef } from "react";
import Header from "@/components/header";
import Footer from "./Footer/Footer";
import Icpolygon from "@/assets/home-image/IcPolygon.svg";
import Languages from "@/commons/Languages";
import { Button } from "@/components/button";
import { BUTTON_STYLES } from "@/commons/Constant.ts";
import ChooseTypeBlock from "@/components/chooseTypeBlock";
import Loading from "@/components/Loading";
import { Alias } from "@/commons/Constant.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "@/components/modal/Popup";
import IcInf from '@/assets/home-image/IcInf.svg'

const Mypage = () => {

  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth)

  const refModal = useRef(null)

  const navigateLetterpage = () => {
    if (user)
      navigate(Alias.createPage);
    else {
      refModal.current?.showModal()
    }
  };

  const onPressLogin = () => {
    navigate(Alias.login);
  }

  const renderContentModal = useMemo(() => {
    return (
      <div className='renderContentModal'>
        <div className='head'>
          <img src={IcInf} alt={'icinf'} />
          <h2>{Languages.text.nologin}</h2>
        </div>
        <div className='contentModal'>
          <p>{Languages.text.nologinContent}</p>
        </div>
      </div>
    )
  }, [])

  const renderModal = useMemo(() => {
    return (
      <Popup
        ref={refModal}
        content={renderContentModal}
        btnCancelText={Languages.common.cancel}
        btnSubmitText={Languages.common.agree}
        onSuccessPress={onPressLogin}
      />
    )
  }, [])

  const renderTable = useMemo(() => {
    return (
      <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
        <th className="p-3 text-center">{Languages.text.productNumber}</th>
        <th className="p-3 text-center">{Languages.text.status}</th>
        <th className="p-3 text-center" width="200px">
          {Languages.text.date}
        </th>
        <th className="p-3 text-center" width="200px">
          {Languages.text.packageServices}
        </th>
        <th className="p-3 text-center" width="300px">
          {Languages.buttonText.edit}
        </th>
        <th className="p-3 text-center" width="300px">
          {Languages.text.manager}
        </th>
      </tr>
    );
  }, []);

  return (
    <div className="mypage">
      <Loading />
      <Header
        background={"var(--white-color)"}
        colorText={"var(--text-color-darkmode)"}
        borderColor={"var(--gray-color-2)"}
      />
      <div className="wrapper_box_create">
        {!user && <div className="container mx-auto">
          <div className="btn_box_create">
            <img src={Icpolygon} title="polygon" />
            <h2>{Languages.text.createaWeddingYourOwn}</h2>
            <Button
              label={Languages.buttonText.createTypeTC}
              buttonStyle={BUTTON_STYLES.PINK}
              width={100}
              textStyle={BUTTON_STYLES.PINK}
              isLowerCase
              onPress={navigateLetterpage}
            />
          </div>
        </div>}

        {!user && <ChooseTypeBlock />}

        {user && (
          <div className="flex items-center justify-center">
            <div className="container">
              <h2 className="managertc">
                {Languages.text.managerTc}
              </h2>
              <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 text-center">
                <thead className="text-white">{renderTable}</thead>
                <tbody className="flex-1 sm:flex-none">
                  <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                    <td className="border-grey-light hover:bg-gray-100 p-3">
                      <p className="formatnotColor free">
                        No.00000011
                      </p>
                    </td>
                    <td className="border-grey-light hover:bg-gray-100 p-3 truncate">
                      <p className="formatnotColor free">
                        {Languages.text.free}
                      </p>
                      <p className="formatnotColor payment">
                        {Languages.buttonText.payment}
                      </p>
                      <p className="formatnotColor complete">
                        {Languages.text.complete}
                      </p>
                      <p className="autodelete">{Languages.text.autoDelete}</p>
                    </td>
                    <td className="border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      <p className="date">20/03/2024</p>
                      <p className="onlydateplus">{Languages.text.onlyDate}</p>
                    </td>
                    <td className="border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      <p className="date">Basic</p>
                      <p className="autodelete">(Mobile Invitation)</p>
                    </td>
                    <td className="border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      <Button
                        label={Languages.buttonText.edit}
                        buttonStyle={BUTTON_STYLES.BLUE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />
                      <Button
                        label={Languages.buttonText.seeBefore}
                        buttonStyle={BUTTON_STYLES.ORRANGE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />

                      <Button
                        label={Languages.buttonText.copylink}
                        buttonStyle={BUTTON_STYLES.DARKMODE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />
                    </td>
                    <td className="border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      <Button
                        label={Languages.buttonText.payment}
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />

                      <Button
                        label={Languages.buttonText.dowloadTc}
                        buttonStyle={BUTTON_STYLES.PINK}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />

                      <Button
                        label={Languages.buttonText.dowloadClient}
                        buttonStyle={BUTTON_STYLES.BLUE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={75}
                        isLowerCase
                      />

                      <Button
                        label={Languages.buttonText.checkGuest}
                        buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={70}
                        isLowerCase
                      />

                      <Button
                        label={Languages.buttonText.delete}
                        buttonStyle={BUTTON_STYLES.DARKMODE}
                        textStyle={BUTTON_STYLES.PINK}
                        autocenter
                        width={60}
                        isLowerCase
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {user && (
          <div className="container mx-auto">
            <div className="btn_box_create onlogged_show">
              <img src={Icpolygon} title="polygon" />
              <h2>{Languages.text.createaWeddingYourOwn}</h2>
              <Button
                label={Languages.buttonText.createTypeTC}
                buttonStyle={BUTTON_STYLES.PINK}
                textStyle={BUTTON_STYLES.PINK}
                isLowerCase
                onPress={navigateLetterpage}
              />
            </div>
          </div>
        )}

      </div>
      {renderModal}
      <Footer />
    </div>
  );
};

export default Mypage;
