import Validate from '@/utils/Validate'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import styles from './Input.module.css'

// import Ic_error from '@/assets/images/ic_error.png';
import Ic_success from '@/assets/home-image/ic_success.png'

// eslint-disable-next-line react/display-name

export const Input = ({
  register,
  name,
  value,
  type,
  label,
  disabled,
  styleGroup,
  styleDisable,
  inputStyle,
  errors,
  // errMsg,
  isIcon,
  icon,
  placeHolder,
  containerInput,
}) => {
  const containerStyle = useMemo(() => {
    let style = ' '

    if (containerInput) {
      style += containerInput + ' '
    }

    if (errors[name]) {
      style += styles.errMsg
    }

    return style
  }, [containerInput, errors[name]])

  return (
    <div className={`${styles.boxGroupInput} ${styleGroup}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.formGroup}${containerStyle}`}>
        <input
          type={type}
          // disabled={!disabled}
          // id={name}
          {...register(name)}
          placeholder={placeHolder}
          className={`${styles.form_control} ${inputStyle ? inputStyle : ''} ${
            !disabled ? styleDisable : ''
          }`}
        />
        {isIcon && <div className={styles.ic_icon}>{icon}</div>}
      </div>
      {errors[name] && (
        <div className={styles.messageError}>
          <p>{errors[name].message}</p>
        </div>
      )}
    </div>
  )
}
// export default Input
