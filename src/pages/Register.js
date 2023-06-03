import React, { useState, useCallback } from 'react'
import Languages from '@/commons/Languages'
import Header from '@/components/header'
import { MyTextInput } from '@/components/input'
import { useRef } from 'react'
import { BUTTON_STYLES } from '@/commons/Constant.ts'
import { Button } from '@/components/button'
import { Link } from 'react-router-dom'
import LoginSocial from '@/components/loginSocial'
import Footer from './Footer/Footer'
import FormValidate from '@/utils/FormValidate';
import { Alias } from '@/commons/Constant.ts'
import Loading from '@/components/Loading'

const Register = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const refName = useRef(null);
    const refPwd = useRef(null);
    const refPhone = useRef(null);
    const refEmail = useRef(null);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangePwd(event) {
        setPwd(event.target.value);
    }

    function handleChangePhone(event) {
        setPhone(event.target.value);
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    const registerToken = useCallback(() => {

        const errMsgName = FormValidate.userNameValidate(name)
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgEmail = FormValidate.emailValidate(email)
        const errMsgPwd = FormValidate.passValidate(pwd);


        refName.current?.setErrorMsg(errMsgName);
        refPhone.current?.setErrorMsg(errMsgPhone);
        refEmail.current?.setErrorMsg(errMsgEmail);
        refPwd.current?.setErrorMsg(errMsgPwd);

        if (`${errMsgName}${errMsgPhone}${errMsgEmail}${errMsgPwd}`.length === 0) {
            console.log('name:', name);
            console.log('phone:', phone);
            console.log('email:', email);
            console.log('pass:', pwd);
        }

    }, [name, pwd, phone, email]);

    return (
        <div className='Login'>
            <Loading />
            <Header background={'var(--white-color)'} colorText={'var(--text-color-darkmode)'} />
            <div className='bg_form'>
                <div className='main-form-user'>
                    <div className='backgroundFromUser'>
                        <div className='userFields_head'>
                            <h1>{Languages.menu.register}</h1>
                        </div>
                        <div className='fillDataForm'>
                            <div className='fieldscli_data'>
                                <MyTextInput
                                    ref={refName}
                                    value={name}
                                    type={'text'}
                                    placeHolder={Languages.inputText.name}
                                    onChangeText={handleChangeName}
                                    inputStyle={'form-control'}
                                />

                                <MyTextInput
                                    ref={refPhone}
                                    value={phone}
                                    type={'text'}
                                    placeHolder={Languages.inputText.phone}
                                    onChangeText={handleChangePhone}
                                    inputStyle={'form-control'}
                                />

                                <MyTextInput
                                    ref={refEmail}
                                    value={email}
                                    type={'text'}
                                    placeHolder={'email'}
                                    onChangeText={handleChangeEmail}
                                    inputStyle={'form-control'}
                                />

                                <MyTextInput
                                    ref={refPwd}
                                    value={pwd}
                                    type={'password'}
                                    placeHolder={Languages.inputText.password}
                                    onChangeText={handleChangePwd}
                                    inputStyle={'form-control'}
                                />

                                <Button
                                    label={Languages.menu.register}
                                    onPress={registerToken}
                                    buttonStyle={BUTTON_STYLES.PINK}
                                    width={100}
                                    textStyle={BUTTON_STYLES.WHITE}
                                    isLowerCase
                                />
                            </div>
                            <LoginSocial />
                        </div>
                    </div>
                    <div className='footerFormData'>
                        <Link to={Alias.login}>
                            {Languages.inputText.youhaveAccount}
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Register
