
export default function LoginFacebookBtn() {

  return (
    <Button
      label={Languages.inputText.continueWithFB}
      width={100}
      isLowerCase
      onPress={handleLogin}
      leftIcon={
        <img
          src={IcFacebook}
          className='icon_login'
          title={Languages.inputText.continueWithFB}
        />
      }
    />
  )
}
