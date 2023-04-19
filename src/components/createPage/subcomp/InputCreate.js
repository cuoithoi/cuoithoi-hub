import React from 'react'
import { useCallback, useRef } from 'react'
import Languages from '@/commons/Languages'
// component
import { MyTextInput } from '@/components/input'
const InputCreate = ({
  ref = '',
  value = '',
  label,
  placeholder,
  type,
  maxLength,
  isIcon = false,
  icon = false,
  inputStyle,
  styleGroup,
}) => {
  const refUnderfine = useRef(null)
  const onChangeText = useCallback((value, tag) => {
    switch (tag) {
      case Languages.inputText.firstName:
        console.log(value)
        break
      case Languages.inputText.firstAnother:
        console.log(value)
        break
      case Languages.inputText.namesingle:
        console.log(value)
        break

      default:
        break
    }
  }, [])
  const onChange = (text, placeholder) => {
    onChangeText(text, placeholder)
  }
  return (
    <div className='item_field_single'>
      <MyTextInput
        ref={ref === '' ? refUnderfine : ' '}
        value={value}
        label={label}
        placeHolder={placeholder}
        type={type}
        maxLength={maxLength}
        isIcon={isIcon}
        icon={icon}
        styleGroup={styleGroup && 'man_inputStyle'}
        onChangeText={onChange}
        inputStyle={inputStyle}
      />
    </div>
  )
}

export default InputCreate
