import React from 'react';

import MenuBar from '@/components/navbar'
import Iclogo from '@/assets/home-image/IcLogo.svg'
import IcLogoBlack from '@/assets/home-image/IcLogoBlack.svg'
import styles from '@/pages/Homepage/HomePage.module.css';
import { Link } from 'react-router-dom';
import { BACKGROUND_STYLES } from '@/commons/Constant.ts';

function Header({background, colorText, typeLogo, borderColor}) {
    const title = window.document.title;

    return (
        <div className={`${styles.header_top}`} style={{backgroundColor: background, borderColor: borderColor}}>
            <div className='container mx-auto'>
                <div className={`${styles.header_top_bar}`}>
                    <div className={`${styles.homepage_box_logo}`}>
                        <Link to='/' title={title}>
                            <img className={styles.styleImageLogo} src={ typeLogo == BACKGROUND_STYLES.WHITE ? Iclogo : IcLogoBlack } alt={title} />
                        </Link>
                    </div>
                    <div className={`${styles.homepage_box_navbar}`}>
                        <MenuBar colorText={colorText} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
