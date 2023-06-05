import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/header'
import Footer from './Footer/Footer'
import Icpolygon from '@/assets/home-image/IcPolygon.svg'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import {
  APi,
  BUTTON_STYLES,
  CheckParams,
  Status,
} from '@/commons/Constant.ts'
import ChooseTypeBlock from '@/components/chooseTypeBlock'
import Loading from '@/components/Loading'
import { Alias } from '@/commons/Constant.ts'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Popup from '@/components/modal/Popup'
import IcInf from '@/assets/home-image/IcInf.svg'
import {
  getLocalAccessToken,
  removeStorage,
} from '@/utils/localStorage'
import { csv, useBaseService } from '@/utils/BaseServices'
import dayjs from 'dayjs'
import fileDownload from 'js-file-download'
import { Payment } from '@/components/Payment'

const Mypage = () => {
  const navigate = useNavigate()

  const [checkParams, setCheckParams] = useState(CheckParams.NOTOKEN)
  const [listDataApi, setListDataApi] = useState([])
  const { user } = useSelector((store) => store.auth)

  const refModal = useRef(null)
  const refPayment = useRef(null)

  const { get, del } = useBaseService()

  useEffect(() => {
    window.scrollTo(0, 0)
    removeStorage('hasReloaded');
  }, [])

  const config = {
    headers: { Authorization: 'Bearer ' + user?.token },
  }

  useEffect(() => {
    if (!user) return
    // if (user?.token) {
    const asyncListPage = async () => {
      try {
        const response = await get(APi.listInvitation, config, {
          userId: user?.userId,
        })
        setListDataApi(response.data)
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error)
      }
    }
    asyncListPage()
    // }
  }, [])

  const navigateLetterpage = () => {
    if (user) {
      navigate(Alias.createPage, {
        state: {
          createpage: true,
        },
      })
      window.location.reload()
    } else {
      setCheckParams(CheckParams.NOTOKEN)
      refModal.current?.showModal()
    }
  }

  const onPressLogin = () => {
    navigate(Alias.login)
  }

  const renderContentModal = useMemo(() => {
    return (
      (checkParams == CheckParams.NOTOKEN && (
        <div className='renderContentModal'>
          <div className='head'>
            <img src={IcInf} alt={'icinf'} />
            <h2>{Languages.text.nologin}</h2>
          </div>
          <div className='contentModal'>
            <p>{Languages.text.nologinContent}</p>
          </div>
        </div>
      )) ||
      (checkParams == CheckParams.EDITOR && (
        <div className='renderContentModal'>
          <div className='head'>
            <img src={IcInf} alt={'icinf'} />
            <h2>{Languages.text.noletter}</h2>
          </div>
          <div className='contentModal'>
            <p>{Languages.text.noletterContent}</p>
          </div>
        </div>
      ))
    )
  }, [checkParams])

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
      <tr className='bg-teal-400 wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
        <th className='p-3 text-center'>{Languages.text.productNumber}</th>
        <th className='p-3 text-center'>{Languages.text.status}</th>
        <th className='p-3 text-center' width='200px'>
          {Languages.text.date}
        </th>
        <th className='p-3 text-center' width='200px'>
          {Languages.text.packageServices}
        </th>
        <th className='p-3 text-center' width='300px'>
          {Languages.buttonText.edit}
        </th>
        <th className='p-3 text-center' width='300px'>
          {Languages.text.manager}
        </th>
      </tr>
    )
  }, [])

  const onChangeEditor = useCallback(
    (id) => {
      if (id) {
        navigate(`${Alias.editor}/${id}`, {
          state: {
            editor: true,
            id: id,
          },
        })
      } else {
        setCheckParams(CheckParams.EDITOR)
        refModal.current?.showModal()
      }
    },
    [setCheckParams]
  )

  const onChangeSeeBefore = useCallback(
    (id) => {
      if (id) {
        navigate(`${Alias.letterPage}/${id}`)
      } else {
        setCheckParams(CheckParams.EDITOR)
        refModal.current?.showModal()
      }
    },
    [setCheckParams]
  )

  const renderStatus = useCallback((value) => {
    if (value === Status.ACTIVE)
      return (
        <p className='formatnotColor complete'>{Languages.text.complete}</p>
      )
    else if (value === Status.INACTIVE)
      return <p className='formatnotColor free'>{Languages.text.free}</p>
    else if (value === Status.DRAFT)
      return (
        <p className='formatnotColor free'>{Languages.text.draffversion}</p>
      )
    else if (value === Status.REQUEST_PAYMENT)
      return (
        <p className='formatnotColor payment'>{Languages.buttonText.payment}</p>
      )
    else if (value === Status.EXPIRE)
      return (
        <p className='formatnotColor free'>{Languages.buttonText.expire}</p>
      )
    else
      return (
        <>
          <p className='formatnotColor free'>{Languages.text.draffversion}</p>
          {/* <p className='autodelete'>{Languages.text.autoDelete}</p> */}
        </>
      )
  }, [])

  const renderCoundownTimeStart = useCallback((value) => {
    const currentDate = dayjs().format('YYYY/MM/DD')
    const timeLeft = dayjs(value) - dayjs(currentDate)
    const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    if (dayjs(value) > dayjs(currentDate))
      return '(Còn ' + `${dayLeft}` + ' ngày)'
    else return Languages.errorMsg.noCorect
  }, [])

  const onChangeDetele = useCallback(async (id) => {
    const confirmed = window.confirm(Languages.text.deleteItem)
    if (confirmed) {
      await del(APi.deleteInvitation, { _id: id })
      window.location.reload()
    }
  }, [])

  const onChangeDowloadClient = useCallback(async (id) => {
    const accessToken = getLocalAccessToken()

    try {
      const response = await csv.get(APi.excelClient, {
        params: {
          _id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      fileDownload(response.data, `Quản lý thu hồi.xlsx`)
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }, [])

  const onChangeDowloadWish = useCallback(async (id) => {
    const accessToken = getLocalAccessToken()
    try {
      const response = await csv.get(APi.exportWish, {
        params: {
          _id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      await fileDownload(response.data, `Danh sách Lời chúc.xlsx`)
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  }, [])

  const onChangePayment = useCallback(() => {
    refPayment?.current?.show()
  }, [])

  return (
    <div className='mypage'>
      <Loading />
      <Header
        background={'var(--white-color)'}
        colorText={'var(--text-color-darkmode)'}
        borderColor={'var(--gray-color-2)'}
      />
      <div className='wrapper_box_create'>
        {!user && (
          <div className='container mx-auto'>
            <div className='btn_box_create'>
              <img src={Icpolygon} title='polygon' />
              <h2>{Languages.text.createaWeddingYourOwn}</h2>
              <Button
                label={Languages.buttonText.createTypeTC}
                buttonStyle={BUTTON_STYLES.PINK}
                width={100}
                textStyle={BUTTON_STYLES.WHITE}
                isLowerCase
                onPress={navigateLetterpage}
              />
            </div>
          </div>
        )}

        {!user && <ChooseTypeBlock />}

        {user && (
          <div className='flex items-center justify-center'>
            <div className='container'>
              <h2 className='managertc'>{Languages.text.managerTc}</h2>
              <table className='respon-table w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 text-center'>
                <thead className='text-white'>{renderTable}</thead>
                <tbody className='flex-1 sm:flex-none'>
                  {listDataApi.length === 0 ? (
                    <tr className='flex noItemTd flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'>
                      <td className='border-grey-light hover:bg-gray-100 p-3'>
                        <p className='noItem'>
                          {Languages.errorMsg.nocreaptePage}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    listDataApi.map(function (item, index) {
                      return (
                        <tr
                          key={index}
                          className='wrap sm:table-row mb-2 sm:mb-0'
                        >
                          <td className='border-grey-light hover:bg-gray-100 p-3'>
                            <p className='formatnotColor free'>{item?._id}</p>
                          </td>
                          <td className='border-grey-light hover:bg-gray-100 p-3 truncate'>
                            {renderStatus(item?.status)}
                          </td>
                          <td className='border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                            <p className='date'>
                              {
                                item?.timeAndLocationOfWedding
                                  ?.dateOfEventWedding
                              }
                            </p>
                            <p className='onlydateplus'>
                              {renderCoundownTimeStart(
                                item?.timeAndLocationOfWedding
                                  ?.dateOfEventWedding
                              )}
                            </p>
                          </td>
                          <td className='border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                            <p className='date'>{item?.productId?.name}</p>
                            <p className='autodelete'>(Full Package)</p>
                          </td>
                          <td className='border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                            {item?.status != Status.EXPIRE && (
                              <Button
                                label={Languages.buttonText.edit}
                                buttonStyle={BUTTON_STYLES.BLUE}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={60}
                                isLowerCase
                                onPress={() => onChangeEditor(item?._id)}
                              />
                            )}

                            {item?.status != Status.EXPIRE && (
                              <Button
                                label={Languages.buttonText.seeBefore}
                                buttonStyle={BUTTON_STYLES.ORRANGE}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={60}
                                isLowerCase
                                onPress={() => onChangeSeeBefore(item?._id)}
                              />
                            )}

                            {item?.isPaid === true && (
                              <Button
                                label={Languages.buttonText.copylink}
                                buttonStyle={BUTTON_STYLES.DARKMODE}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={60}
                                isLowerCase
                              />
                            )}
                          </td>

                          <td className='border-grey-light hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                            {item?.status != Status.ACTIVE && (
                              <Button
                                label={Languages.buttonText.payment}
                                buttonStyle={BUTTON_STYLES.PINK}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={60}
                                isLowerCase
                                onPress={onChangePayment}
                              />
                            )}

                            {item?.isPaid === true && (
                              <Button
                                label={Languages.buttonText.dowloadTc}
                                buttonStyle={BUTTON_STYLES.PINK}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={60}
                                isLowerCase
                              />
                            )}

                            {item?.isPaid === true && (
                              <Button
                                label={Languages.buttonText.dowloadClient}
                                buttonStyle={BUTTON_STYLES.BLUE}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={75}
                                isLowerCase
                                onPress={() => onChangeDowloadClient(item?._id)}
                              />
                            )}

                            {item?.isPaid === true && (
                              <Button
                                label={Languages.buttonText.checkGuest}
                                buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
                                textStyle={BUTTON_STYLES.WHITE}
                                autocenter
                                width={70}
                                isLowerCase
                                onPress={() => onChangeDowloadWish(item?._id)}
                              />
                            )}

                            <Button
                              label={Languages.buttonText.delete}
                              buttonStyle={BUTTON_STYLES.DARKMODE}
                              textStyle={BUTTON_STYLES.WHITE}
                              autocenter
                              width={60}
                              isLowerCase
                              onPress={() => onChangeDetele(item._id)}
                            />
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {user && (
          <div className='container mx-auto'>
            <div className='btn_box_create onlogged_show'>
              <img src={Icpolygon} title='polygon' />
              <h2>{Languages.text.createaWeddingYourOwn}</h2>
              <Button
                label={Languages.buttonText.createTypeTC}
                buttonStyle={BUTTON_STYLES.PINK}
                textStyle={BUTTON_STYLES.WHITE}
                isLowerCase
                onPress={navigateLetterpage}
              />
            </div>
          </div>
        )}
      </div>
      {renderModal}
      <Payment ref={refPayment} />
      <Footer />
    </div>
  )
}

export default Mypage
