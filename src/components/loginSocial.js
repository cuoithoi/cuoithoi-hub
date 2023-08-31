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

  useEffect(() => {
    const handleZaloCallback = async () => {
      const ZALO_APP_ID = '1641121800720236421';
      const ZALO_APP_SECRET = 'BWrB0QGvKrUF421KEgF6';

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      if (code) {
        try {
          const response = await fetch('https://oauth.zaloapp.com/v4/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'secret_key': ZALO_APP_SECRET,
            },
            body: new URLSearchParams({
              app_id: ZALO_APP_ID,
              code: code,
              grant_type: 'authorization_code',
            }),
          });

          const authData = await response.json();
          const token = authData.access_token;
          const refresh_token = authData.refresh_token;
          const expires_in = authData.expires_in;

          if (token) {
            const profileResponse = await fetch(`https://graph.zalo.me/v2.0/me?access_token=${token}&fields=id,birthday,name,gender,picture,email`);
            const profileData = await profileResponse.json();
            const id = profileData.id;
            const name = profileData.name;

            // Thực hiện xử lý với thông tin người dùng
            // ...

            console.log(profileData)

          } else {
            console.log('Có lỗi xảy ra Zalo 501');
          }
        } catch (error) {
          console.error('Có lỗi xảy ra: ', error);
        }
      }
    };

    handleZaloCallback();
  }, []);

  return (
    <div className='otherLoginSocial'>


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
        style={{
          backgroundColor: '#fff',
          color: '#000',
          fontSize: '16px',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontFamily: 'Quicksand',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30
        }}
      >

        <img
          src={IcFacebook}
          className='icon_login'
          title={Languages.inputText.continueWithFB}
        />
        <span>{Languages.inputText.continueWithFB}</span>
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
      <a href="https://oauth.zaloapp.com/v4/permission?app_id=1641121800720236421&redirect_uri=http://localhost:3000/login&state=100">Đăng nhập bằng ZALO</a>
      <div className='titleOrther'>
        <span>{Languages.inputText.or}</span>
      </div>
    </div>
  )
}

export default LoginSocial

