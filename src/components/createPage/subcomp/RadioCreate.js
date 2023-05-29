
import React from 'react'
import { RadioButton } from '@/components/RadioButton'
const RadioCreate = ({ id, label, value }) => {

import { RadioButton } from '@/components/RadioButton'
const RadioCreate = ({ id, label, value }) => {
  const [radioValue, setRadioValue] = useState('')
  const radioChangeHandler = (e) => {
    setRadioValue(e.target.value)
  }

  return (
    <div className='options_select'>
      <RadioButton
        id={id}
        label={label}
        value={value}
        onChange={radioChangeHandler}
        isSelected={radioEffectImage === value}

      />
    </div>
  )
}

export default RadioCreate
