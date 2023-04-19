import React, { useCallback, useMemo } from 'react';
import { Button } from './button';
import { BUTTON_STYLES } from '@/commons/Constant.ts';
import Languages from '@/commons/Languages';
import itemImage from '@/assets/home-image/item.png'
import { AnimationOnScroll } from 'react-animation-on-scroll';

function ChooseTypeBlock({
    backgroundColor
}) {

    const renderSection = useCallback((label, title) => {
        return <div className='slide-item'>
            <AnimationOnScroll animateIn="animate__fadeInLeft" offset={10} initiallyVisible={true} animatePreScroll={false} duration={2}><div className='box-image'>
                <img src={itemImage} title={'item'} />
            </div>
                <div className='title'>
                    <span>{label}</span>
                    <h3>{title}</h3>
                </div></AnimationOnScroll></div >

    }, []);


    return (
        <AnimationOnScroll animateIn="animate__fadeInUp" offset={10} initiallyVisible={true} animatePreScroll={false} duration={2}>
            <div className='section_wrap_type_ds' style={{background: backgroundColor}}>

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
                            textStyle={BUTTON_STYLES.PINK}
                        />
                    </div>
                </div>

            </div>
        </AnimationOnScroll>
    );
}

export default ChooseTypeBlock;
