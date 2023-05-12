import React, { useCallback, useMemo } from 'react';
import styles from './blockUI.module.css'
import { Button } from '../button';
import { BACKGROUND_STYLES } from '@/commons/Constant.ts';
import { AnimationOnScroll } from 'react-animation-on-scroll';

function BlockUI({
    containerCustormStyle,
    backgroundColor,
    isLeft,
    isright,
    isbutton,
    onPress,
    buttonStyle,
    width,
    img,
    styleImg,
    title,
    label,
    styleBoxText,
    isLowerCase,
    textStyleButton,
    animateContent,
    animateImg,
    children,
    styleBoxImg,
    ...rest
}) {

    const _onPress = useCallback(() => {
        onPress?.(label);
    }, [label, onPress]);

    const getContainerStyle = useMemo(() => {

        let containerStyle = styles.yellowsButton;

        switch (backgroundColor) {

            case BACKGROUND_STYLES.YELLOWS:
                containerStyle = styles.yellowsBg;
                break;

            case BACKGROUND_STYLES.GREEN:
                containerStyle = styles.greenBg;
                break;

            case BACKGROUND_STYLES.TRANPARENTGREEN:
                containerStyle = styles.tranparentgreenBg;
                break;

            case BACKGROUND_STYLES.DRAK:
                containerStyle = styles.darkBg;
                break;

            default:
                containerStyle = styles.whiteBg;
                break;
        }

        return `${styles.container} ${containerStyle} ${containerCustormStyle}`;
    }, [backgroundColor]);

    return (
        <div className={getContainerStyle}>

            <div className='container mx-auto'>

                <div className='md:grid md:grid-cols-2 md:gap-4'>
                    {
                        isLeft && <AnimationOnScroll animateIn={animateImg ? animateImg : 'animate__fadeInLeft'}  {...rest}><div className={`${styles.blockUIimage} ${styleBoxImg ? styleBoxImg : ''}`}>
                            <img src={img} className={styleImg} alt={title} />
                        </div></AnimationOnScroll>
                    }

                    <div className={styles.blockUIText}>
                        <AnimationOnScroll animateIn={animateContent ? animateContent : 'animate__fadeInUp'} {...rest}>
                            <div className={`${styles.wrapper_content} ${styleBoxText ? styleBoxText : ''}`}>
                                <h2 className={styles.blockUIhead}>
                                    {title}
                                </h2>
                                <div className={styles.blockUIContent}>
                                    {children}
                                </div>
                                {
                                    isbutton && <Button
                                        label={label}
                                        buttonStyle={buttonStyle}
                                        width={width}
                                        onPress={_onPress}
                                        isLowerCase={isLowerCase}
                                        textStyle={textStyleButton}
                                    />
                                }
                                <div />
                            </div>
                        </AnimationOnScroll>
                    </div>
                    {
                        isright && <AnimationOnScroll animateIn={animateImg ? animateImg : 'animate__fadeInRight'} {...rest}><div className={`${styles.blockUIimage} ${styleBoxImg ? styleBoxImg : ''}`}>
                            <img src={img} className={styleImg} alt={title} />
                        </div></AnimationOnScroll>
                    }
                </div>
            </div>
        </div>
    );
}

export default BlockUI;
