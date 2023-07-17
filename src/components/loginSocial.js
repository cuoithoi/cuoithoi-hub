import React, { useEffect } from 'react'
import Languages from '@/commons/Languages'
import { Button } from '@/components/button'
import IcFacebook from '@/assets/home-image/IcFacebook.svg'
import FacebookLogin from '@greatsumini/react-facebook-login'
import GoogleLogin from 'react-google-login';
import { useBaseService } from '@/utils/BaseServices'
import { APi, Alias } from '@/commons/Constant.ts'
import { toast } from 'react-toastify'
import { addUserToLocalStorage } from '@/utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { gapi } from 'gapi-script'

const LoginSocial = () => {

  const { post } = useBaseService()

  const navigate = useNavigate()

  const clientID = "714927639601-9opts6sksavno6i1h6pjik4avt5vvnnj.apps.googleusercontent.com"

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const responseGoogle = async (response) => {

    const dataUpdate = {
      "googleId": response?.googleId,
      "username": response?.profileObj?.familyName + ' ' + response?.profileObj?.givenName,
      "email": response?.profileObj?.email
    }

    const res = await post(APi.loginWithGoogle, dataUpdate)

    if (res.errorCode === 0) {

      addUserToLocalStorage(res.data)

      toast.warning('Đang liên kết', {
        autoClose: 1000,
      })

      setTimeout(() => {
        toast.success('Liên kết thành công... Đang chuyển hướng')
      }, 2000);

      setTimeout(() => {
        window.location.reload()
        navigate(Alias.mypage)
      }, 4000);
    }
  }

  const responseFacebook = async (response) => {

    const dataUpdate = {
      "googleId": response?.id,
      "username": response?.name,
      "email": response?.email
    }

    const res = await post(APi.loginWithGoogle, dataUpdate)

    if (res.errorCode === 0) {

      addUserToLocalStorage(res.data)

      toast.warning('Đang liên kết', {
        autoClose: 1000,
      })

      setTimeout(() => {
        toast.success('Liên kết thành công... Đang chuyển hướng')
      }, 2000);

      setTimeout(() => {
        window.location.reload()
        navigate(Alias.mypage)
      }, 4000);
    }
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
        appId="223400743980380"
        onSuccess={responseFacebook}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={responseFacebook}
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
        clientId={clientID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        accessType={'online'}
        buttonText='Đăng nhập với Google'
        className='social_login'
      />

    </div>
  )
}

export default LoginSocial

