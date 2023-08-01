import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './button';
import { Alias, BUTTON_STYLES } from '@/commons/Constant.ts';
import Languages from '@/commons/Languages';
import itemImageNone from '@/assets/home-image/none.png'
import itemImageCrown from '@/assets/home-image/crown.png'
import itemImageWave from '@/assets/home-image/wave.png'
import itemImageHeart from '@/assets/home-image/heart.png'
import { useNavigate } from 'react-router-dom';
import itemPDFNone from '@/assets/pdf/pdf_none.pdf'
import itemPDFCrown from '@/assets/pdf/pdf_crown.pdf'
import itemPDFWave from '@/assets/pdf/pdf_wave.pdf'
import itemPDFHeart from '@/assets/pdf/pdf_heart.pdf'

function ChooseTypeBlock({
    backgroundColor
}) {

    const navigate = useNavigate();
    const [heightImg, setHeightImg] = useState('600px')

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const heightBoxTopFooter = windowHeight / 2
        if (windowHeight < 900)
            setHeightImg(heightBoxTopFooter)
    }, [])

    const renderSection = useCallback((label, title, itemImage, href) => {
        return <div className='slide-item'>
            <a href={href} target='_blank' title={title}>
                <div className='box-image'>
                    <img style={{ height: heightImg }} src={itemImage} alt={label} />
                </div>
                <div className='title'>
                    <span>{label}</span>
                    <h3>{title}</h3>
                </div>
            </a>
        </div >

    }, [heightImg]);

    const onChangeToServices = () => navigate(Alias.services)

    return (
        <div className='section_wrap_type_ds' style={{ background: backgroundColor }}>

            <div className='container mx-auto'>
                <div className='head text-center'>
                    <h2>
                        {Languages.text.typeDs}
                    </h2>
                </div>
                <div className='slide-track scroll-item-horizontal slide-group-item'>

                    {renderSection('Mẫu 1', 'Memory Bliss', itemImageNone, 'https://cuoithoi.com.vn/letterPage/64c88fdf32892a6ee8435f40')}
                    {renderSection('Mẫu 2', 'Royal Romance', itemImageCrown, 'https://cuoithoi.com.vn/letterPage/64c88fdf32892a6ee8435f40')}
                    {renderSection('Mẫu 3', 'Magic Moments', itemImageWave, 'https://cuoithoi.com.vn/letterPage/64c892a532892a6ee8435fcc')}
                    {renderSection('Mẫu 4', 'Lovestruck', itemImageHeart, 'https://cuoithoi.com.vn/letterPage/64c8941632892a6ee8436067')}

                </div>
                <div className='bottom-button-click center'>
                    <Button
                        label={Languages.buttonText.tryIt}
                        buttonStyle={BUTTON_STYLES.PINK}
                        isLowerCase
                        textStyle={BUTTON_STYLES.WHITE}
                        onPress={onChangeToServices}

                    />
                </div>
            </div>
        </div>
    );
}

export default ChooseTypeBlock;
