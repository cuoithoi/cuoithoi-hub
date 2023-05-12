import Languages from '../commons/Languages'
import React, { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/Homepage/HomePage.module.css'
import { Button } from './button'
import { BUTTON_STYLES } from '../commons/Constant.ts'
import { FaOutdent, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa'
import { useNavigate, NavLink } from 'react-router-dom'
import { Alias } from '@/commons/Constant.ts'
import IcLogoBlack from '@/assets/home-image/IcLogoBlack.svg'
import IcInf from '@/assets/home-image/IcInf.svg'
import Popup from './modal/Popup'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/features/auth/authSlice'
function MenuBar({ colorText }) {
  const { user } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)

  const refModal = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate(Alias.login)
  }

  const _onOpenMenu = useCallback(() => {
    setOpen(!open)
  }, [open])

  const onOpenDropdown = useCallback(() => {
    setOpen(!open)
  }, [open])

  const onOpenModal = useCallback(() => {
    refModal.current?.showModal()
  }, [])

  const isactive = useCallback(({ isPending, isActive }) => {
    return isPending ? styles.pending : isActive ? styles.active : ''
  }, [])

  const onPressLogout = useCallback(() => {
    dispatch(logoutUser())
    navigate(Alias.login)
  }, [])

  const renderContentModal = useMemo(() => {
    return (
      <div className='renderContentModal'>
        <div className='head'>
          <img src={IcInf} alt={'icinf'} />
          <h2>{Languages.text.logout}</h2>
        </div>
        <div className='contentModal'>
          <p>{Languages.text.logoutSure}</p>
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
        onSuccessPress={onPressLogout}
      />
    )
  }, [])

  return (
    <nav className={styles.navbar}>
      <button
        onClick={_onOpenMenu}
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        {!open ? (
          <FaOutdent style={{ color: colorText }} />
        ) : (
          <FaTimes style={{ color: colorText }} />
        )}
      </button>

      <div className='navbar_collapse' id='navbarSupportedContent'>
        <ul className={`${styles.navbar_nav} ${open ? styles.open : ''}`}>
          <Link to='/'>
            <img
              className={styles.styleImageLogoMB}
              src={IcLogoBlack}
              alt={'logo'}
            />
          </Link>
          <li className={styles.nav_item}>
            <NavLink
              to={Alias.services}
              className={isactive && `${styles.nav_link}`}
              style={{ color: colorText }}
            >
              {Languages.menu.services}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to={Alias.customerCare}
              className={isactive && `${styles.nav_link}`}
              style={{ color: colorText }}
            >
              {Languages.menu.customerCare}
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to={Alias.mypage}
              className={isactive && `${styles.nav_link}`}
              style={{ color: colorText }}
            >
              {Languages.menu.myPage}
            </NavLink>
          </li>

          <li className={styles.nav_item}>
            {!user ? (
              <Button
                label={Languages.menu.login}
                onPress={navigateLogin}
                buttonStyle={BUTTON_STYLES.PINK}
                width={100}
                textStyle={BUTTON_STYLES.WHITE}
                leftIcon={<FaUserAlt style={{ color: BUTTON_STYLES.WHITE }} />}
                isLowerCase
              />
            ) : (
              <Button
                onPress={onOpenDropdown}
                buttonStyle={BUTTON_STYLES.PINK}
                width={'auto'}
                textStyle={BUTTON_STYLES.WHITE}
                leftIcon={<FaUserAlt style={{ color: BUTTON_STYLES.WHITE }} />}
                isLowerCase
                autocenter
              />
            )}
          </li>

          {open && (
            <div className={styles.dropdownbutton}>
              <div className={styles.text}>
                <span>{Languages.text.hello} {user && user.email}</span>
                <p onClick={onOpenModal}>
                  <FaSignOutAlt /> {Languages.text.logout}
                </p>
              </div>
            </div>
          )}
          {renderModal}
        </ul>
      </div>
    </nav>
  )
}

export default MenuBar
