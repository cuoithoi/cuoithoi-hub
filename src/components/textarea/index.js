import Validate from "@/utils/Validate";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Textarea.module.css";


// eslint-disable-next-line react/display-name
export const MyTextArea = forwardRef(
  (
    {
      id,
      label,
      name,
      value,
      placeHolder,
      onChangeText,
      maxLength,
      disabled = true,
      containerInput,
      inputStyle,
      styleDisable,
      styleGroup,
      onKeyPress,
      isIcon = false,
      icon,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      setValue,
      fillValue,
      getValue,
      focus,
      blur,
      setErrorMsg,
    }));

    const [textfieldVal, setTextfieldVal] = useState(`${value}`);
    const [errMsg, setErrMsg] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const orgTextInput = useRef(null);

    const getValue = useCallback(() => {
      return textfieldVal.trim();
    }, [textfieldVal]);

    const setValue = useCallback((text) => {
      if (text) {
        setTextfieldVal?.(text);
      }
      setErrMsg("");
    }, []);

    const fillValue = useCallback(
      (text) => {
        setValue(text);
      },
      [setValue]
    );

    useEffect(() => {
      if (!Validate.isEmpty(value)) {
        setValue(value);
      }
    }, [setValue, value]);

    useEffect(() => {
      if (Validate.isEmpty(value)) {
        setIsFocus(false);
      }
    }, [setValue, value]);

    const focus = useCallback(() => {
      if (orgTextInput.current) {
        orgTextInput.current?.focus();
      }
      setIsFocus(true);
    }, []);

    const blur = useCallback(() => {
      if (orgTextInput.current) {
        orgTextInput.current?.blur();
      }
    }, []);

    const setErrorMsg = useCallback((msg) => {
      if (Validate.isStringEmpty(msg)) {
        return;
      }
      setIsFocus(false);
      setErrMsg(msg);
    }, []);

    const errorMessage = useMemo(() => {
      if (!Validate.isStringEmpty(errMsg)) {
        return (
          <div className={styles.messageError}>
            <p>{errMsg}</p>
          </div>
        );
      }
      return null;
    }, [errMsg]);

    const containerStyle = useMemo(() => {
      let style = " ";

      if (containerInput) {
        style += containerInput + " ";
      }

      if (errMsg !== "") {
        style += styles.errMsg;
      }

      return style;
    }, [containerInput, errMsg]);

    return (
      <div className={`${styles.boxGroupInput} ${styleGroup}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={`${styles.formGroup}${containerStyle}`}>
          <textarea
            id={id}
            name={name}
            ref={orgTextInput}
            onChange={onChangeText}
            placeholder={placeHolder}
            value={value}
            maxLength={maxLength}
            disabled={!disabled}
            readOnly={!disabled}
            autoCapitalize="none"
            onFocus={focus}
            onKeyUp={onKeyPress}
            className={`${styles.form_control} ${
              inputStyle ? inputStyle : ""
            } ${!disabled ? styleDisable : ""}`}
          />
          {isIcon && <div className={styles.ic_icon}>{icon}</div>}
        </div>
        {errorMessage}
      </div>
    );
  }
);
