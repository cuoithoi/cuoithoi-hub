import React from 'react'
import menuNav from '../../../assets/home-image/menu-nav.svg'
import AudioPlay from './AudioPlay'
const NavButton = ({ setIsNavOpen, song }) => {
  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        zIndex: '10',
        top: '12px',
      }}
      className='nav-btn-container'
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            maxWidth: '560px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AudioPlay song={song} />
          <button className='button-nav ' onClick={() => setIsNavOpen(true)}>
            <img src={menuNav} alt='' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavButton
