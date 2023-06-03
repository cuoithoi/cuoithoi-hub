import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './button';
import { BUTTON_STYLES } from '@/commons/Constant.ts';
import Languages from '@/commons/Languages';
import itemImage from '@/assets/home-image/item.png'


function ChooseTypeBlock({
    backgroundColor
}) {

    const [heightImg, setHeightImg] = useState('auto')

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const heightBoxTopFooter = windowHeight / 2
        if (windowHeight < 700)
            setHeightImg(heightBoxTopFooter)
    }, [])

    const renderSection = useCallback((label, title) => {
        return <div className='slide-item'>
            <div className='box-image'>
                <img style={{ height: heightImg }} src={itemImage} title={'item'} alt={label} />
            </div>
            <div className='title'>
                <span>{label}</span>
                <h3>{title}</h3>
            </div></div >

    }, [heightImg]);


    return (
        <div className='section_wrap_type_ds' style={{ background: backgroundColor }}>

            <div className='container mx-auto'>
                <div className='head text-center'>
                    <h2>
                        {Languages.text.typeDs}
                    </h2>
                </div>
                <div className='slide-track scroll-item-horizontal slide-group-item'>


                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}
                    {renderSection('Mẫu 35', 'Mùa hè kỉ niệm')}


                </div>
                <div className='bottom-button-click center'>
                    <Button
                        label={Languages.buttonText.seeAll}
                        buttonStyle={BUTTON_STYLES.PINK}
                        isLowerCase
                        textStyle={BUTTON_STYLES.WHITE}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChooseTypeBlock;
