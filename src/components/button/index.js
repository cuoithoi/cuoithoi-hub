import React, { useCallback, useMemo } from "react";
import { BUTTON_STYLES } from "../../commons/Constant.ts";
import styles from "./Button.module.css";

export const Button = ({
    type,
    label,
    isLoading,
    onPress,
    disabled,
    textColor,
    isLowerCase,
    leftIcon,
    rightIcon,
    tag,
    buttonStyle,
    textStyle,
    borderStyle,
    width,
    rounded,
    autocenter,
    backgroundImageUrl = null,
}) => {
    const _onPress = useCallback(() => {
        onPress?.(tag || label);
    }, [label, onPress, tag]);

    const getContainerStyle = useMemo(() => {
        let containerStyle = styles.pinkButton;

        switch (buttonStyle) {
            case BUTTON_STYLES.PINK:
                containerStyle = styles.pinkButton;
                break;

            case BUTTON_STYLES.GOLDEN:
                containerStyle = styles.goldenButton;
                break;

            case BUTTON_STYLES.PASTEL_PINK:
                containerStyle = styles.pastelPinkButton;
                break;

            case BUTTON_STYLES.LIGHT_PASTEL_PINK:
                containerStyle = styles.lightPastelPinkButton;
                break;

            case BUTTON_STYLES.WHITE:
                containerStyle = styles.whiteButton;
                break;

            case BUTTON_STYLES.ORRANGE:
                containerStyle = styles.orangeButton;
                break;
            case BUTTON_STYLES.ORANGE:
                containerStyle = styles.orangeButton;
                break;
            case BUTTON_STYLES.LIGHT_BLUE:
                containerStyle = styles.lightBlueButton;
                break;

            case BUTTON_STYLES.BORDER_LIGHT_BLUE:
                containerStyle = styles.borderLightBlueButton;
                break;

            case BUTTON_STYLES.BORDER_PINK:
                containerStyle = styles.borderPink;
                break;

            case BUTTON_STYLES.DARKMODE:
                containerStyle = styles.darkmodeButton;
                break;

            case BUTTON_STYLES.BLUE:
                containerStyle = styles.blueButton;
                break;

            case BUTTON_STYLES.GRAY:
                containerStyle = styles.grayButton;
                break;

            case BUTTON_STYLES.GRAY:
                containerStyle = styles.grayButton;
                break;

            default:
                containerStyle = styles.defaultButton;
                break;
        }

        return `${styles.container} ${containerStyle} ${styles.buttonHover}`;
    }, [buttonStyle]);

    const getTextColor = useMemo(() => {
        let color;

        switch (textStyle) {
            case BUTTON_STYLES.PINK:
                color = styles.pink;
                break;
            case BUTTON_STYLES.WHITE:
                color = styles.white;
                break;
            case BUTTON_STYLES.BORDER_PINK:
                color = styles.textPink;
                break;
            case BUTTON_STYLES.BORDER_PASTEL_PINK:
                color = styles.textPastelPink;
                break;
            case BUTTON_STYLES.BORDER_GOLDEN:
                color = styles.textGolden;
                break;
            default:
                color = styles.black;
                break;
        }
        return textColor || color;
    }, [textStyle, textColor]);

    const getBorderColor = useMemo(() => {
        let color;

        switch (borderStyle) {
            case BUTTON_STYLES.BORDER_PASTEL_PINK:
                color = styles.borderPastelPink;
                break;
            case BUTTON_STYLES.BORDER_GOLDEN:
                color = styles.borderGolden;
                break;
        }
        return color;
    }, [borderStyle]);

    const getTextStyle = useMemo(() => {
        const color = getTextColor;

        return `${styles.text} ${styles.padding} ${color}`;
    }, [getTextColor]);

    let style = {
        width: width + "%",
    };

    if (backgroundImageUrl) {
        style = {
            backgroundImage: `url(` + backgroundImageUrl + `)`,
            width: width + "%",
        };
    }

    return (
        <button
            type={type}
            disabled={isLoading || disabled}
            className={`bg-contain ${getContainerStyle} ${getBorderColor}  ${
                rounded ? styles.borderFull : ""
            } ${autocenter && styles.autocenter}`}
            style={style}
            onClick={_onPress}
        >
            {leftIcon}
            {label && (
                <span className={getTextStyle}>
                    {isLowerCase ? label : `${label} `.toUpperCase()}
                </span>
            )}

            {rightIcon}
        </button>
    );
};
