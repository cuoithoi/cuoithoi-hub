import React, { useState, useCallback } from 'react'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'
import Footer from './Footer/Footer'
import FormValidate from '@/utils/FormValidate';
import { Alias } from '@/commons/Constant.ts'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Loading from '@/components/Loading'

const RecoveryPwd = () => {

    const [name, setName] = useState('');
    const refName = useRef(null);

    function handleChangeName(event) {
        setName(event.target.value);
    }
    const loginToken = useCallback(() => {

        const errMsgPhone = FormValidate.passConFirmPhone(name);

        refName.current?.setErrorMsg(errMsgPhone);

        if (`${errMsgPhone}`.length === 0) {
            console.log('name:', name);
        }

    }, [name]);

    return (
        <div className='Login'>
            <Loading />
            <Header background={'var(--white-color)'} colorText={'var(--text-color-darkmode)'} />
            <div className='bg_form'>
                <div className='main-form-user'>
                    <div className='backgroundFromUser'>
                        <div className='btn-back'>
                            <Link to={Alias.login}>
                                <FaLongArrowAltLeft />
                                <span>
                                    {Languages.inputText.backIndex}
                                </span>
                            </Link>
                        </div>
                        <div className='userFields_head'>
                            <h1>{Languages.inputText.recoveryPwd}</h1>
                        </div>
                        <div className='fillDataForm'>
                            <div className='fieldscli_data'>
                                <MyTextInput
                                    ref={refName}
                                    value={name}
                                    type={'text'}
                                    placeHolder={Languages.inputText.username}
                                    onChangeText={handleChangeName}
                                    inputStyle={'form-control'}
                                />
                                <Button
                                    label={Languages.inputText.sendEmailRecoveryPwd}
                                    onPress={loginToken}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    width={100}
                                    textStyle={BUTTON_STYLES.PINK}
                                    isLowerCase
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default RecoveryPwd
