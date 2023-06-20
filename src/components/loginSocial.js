import React from 'react'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import IcFacebook from '@/assets/home-image/IcFacebook.svg'
import IcGoogle from '@/assets/home-image/IcGoogle.svg'
import FacebookLogin from '@greatsumini/react-facebook-login'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

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

      <FacebookLogin
        appId="6234250993358177"
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
      >
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
      </FacebookLogin>
      <GoogleOAuthProvider>

        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}

          onError={() => {
            console.log('Login Failed');
          }}
          text={Languages.inputText.continueWithGG}
        />

      </GoogleOAuthProvider>

    </div>
  )
}

export default LoginSocial
