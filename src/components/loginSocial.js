import React from 'react'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import IcFacebook from '@/assets/home-image/IcFacebook.svg'
import IcGoogle from '@/assets/home-image/IcGoogle.svg'
// import FacebookLogin from '@greatsumini/react-facebook-login'
const LoginSocial = () => {
  return (
    <div className='otherLoginSocial'>
      <div className='titleOrther'>
        <span>{Languages.inputText.or}</span>
      </div>

      {/* <Button
        label={Languages.inputText.continueWithFB}
        width={100}
        isLowerCase
        leftIcon={
          <img
            src={IcFacebook}
            className='icon_login'
            title={Languages.inputText.continueWithFB}
          />
        }
      /> */}

      {/* <FacebookLogin
        appId="483402090594315"
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
      > */}
        <Button
          label={Languages.inputText.continueWithFB}
          width={100}
          isLowerCase
          leftIcon={
            <img
              src={IcFacebook}
              className='icon_login'
              title={Languages.inputText.continueWithFB}
            />
          }
        />
      {/* </FacebookLogin> */}
      
      <Button
        label={Languages.inputText.continueWithGG}
        width={100}
        isLowerCase
        leftIcon={
          <img
            src={IcGoogle}
            className='icon_login'
            title={Languages.inputText.continueWithFB}
          />
        }
      />
    </div>
  )
}

export default LoginSocial
