import React from 'react'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import IcFacebook from '@/assets/home-image/IcFacebook.svg'
import IcGoogle from '@/assets/home-image/IcGoogle.svg'

const LoginSocial = () => {

    return (
        <div className='otherLoginSocial'>
            <div className='titleOrther'>
                <span>
                    {Languages.inputText.or}
                </span>
            </div>
            <Button
                label={Languages.inputText.continueWithFB}
                width={100}
                isLowerCase
                leftIcon={<img src={IcFacebook} className='icon_login' title={Languages.inputText.continueWithFB} />}
            />
            <Button
                label={Languages.inputText.continueWithGG}
                width={100}
                isLowerCase
                leftIcon={<img src={IcGoogle} className='icon_login' title={Languages.inputText.continueWithFB} />}
            />
        </div>
    )
}


export default LoginSocial
