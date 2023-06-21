import React, { useEffect } from 'react'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import IcFacebook from '@/assets/home-image/IcFacebook.svg'
import IcGoogle from '@/assets/home-image/IcGoogle.svg'
import FacebookLogin from '@greatsumini/react-facebook-login'
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script'

const LoginSocial = () => {

  useEffect(() => {

    function start() {
      gapi.client.init({
        clientId: "714927639601-9opts6sksavno6i1h6pjik4avt5vvnnj.apps.googleusercontent.com",
        scope: ""
      })
    }

    gapi.load('client:auth2', start)

  }, [])

  const responseGoogle = (response) => {
    console.log(response);
  }

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
          console.log('Login Success!', response.profileObj);
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
      <GoogleLogin
        clientId="714927639601-9opts6sksavno6i1h6pjik4avt5vvnnj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

    </div>
  )
}

export default LoginSocial
