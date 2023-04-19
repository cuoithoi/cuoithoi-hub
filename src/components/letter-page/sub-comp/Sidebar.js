import React from 'react'
import { navData } from '../../../utils/nav-data'
const Sidebar = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <div>
      <div
        className={isNavOpen ? 'overlay' : ''}
        onClick={() => setIsNavOpen(false)}
      ></div>
      <div className={`nav-content fixed ${isNavOpen ? 'active' : ''}`}>
        <ul className='nav-list'>
          {navData.map((navItem, index) => {
            if (index === 0) {
              return (
                <li
                  key={index}
                  className='close-nav block'
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  <a>{navItem.title}</a>
                </li>
              )
            }
            return (
              <li
                key={index}
                className='navigate-nav block'
                onClick={() => setIsNavOpen(false)}
              >
                <a href={`#${navItem.href}`}>{navItem.title}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
