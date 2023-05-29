import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LetterPage from './pages/LetterPage'
import HomePage from './pages/Homepage/Homepage'
import { Alias } from './commons/Constant.ts'
import Login from './pages/Login'
import RecoveryPwd from './pages/RecoveryPwd'
import Mypage from './pages/MyPage'
import Notfound from './pages/Notfound'
import Services from './pages/Services'
import CommentDetail from './pages/CommentDetail'

import VerifyOtp from './pages/VerifyOTP'
import EmailOtp from './pages/EmailOtp'
import CreatePage from './pages/Createpage/CreatePage'
import ProtectedRoute from './pages/ProtectedRoute'
// import CreatePageStructure from './pages/CreatePageStructure'

// trial
import RegisterRefactor from './pages/RegisterRefactor'
import CustomerCare from './pages/CustomerCare'
import 'react-toastify/dist/ReactToastify.css'
import Languages from './commons/Languages'

export const PageTitle = (props) => {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
};

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path={Alias.homePage} element={<PageTitle title={Languages.menu.home}><HomePage /></PageTitle>} />
          <Route path={Alias.mypage} element={<PageTitle title={Languages.menu.myPage}><Mypage /></PageTitle>} />
          <Route path={`${Alias.letterPage}`} element={<PageTitle title={Languages.menu.yourPage}><ProtectedRoute /></PageTitle>}>
            <Route index element={<LetterPage />} />
            <Route path={`${Alias.congrats}`} element={<PageTitle title={Languages.menu.commentPage}><CommentDetail /></PageTitle>} />
          </Route>
          <Route path={`${Alias.letterPage}/:id`} element={<PageTitle title={Languages.menu.yourPage}><LetterPage /></PageTitle>} />
          {/* <Route
            path={`${Alias.letterPage}`}
            element={
              <ProtectedRoute>
                <LetterPage />
              </ProtectedRoute>
            }
          >
            <Route path={`${Alias.congrats}`} element={<CommentDetail />} />
          </Route> */}

          <Route path={Alias.createPage} element={<PageTitle title={Languages.menu.createPage}><CreatePage /></PageTitle>} />
          <Route path={`${Alias.editor}/:id`} element={<PageTitle title={Languages.menu.editorPage}><CreatePage /></PageTitle>} />
          <Route path={Alias.pwdRecovery} element={<PageTitle title={Languages.menu.recoveryPwd}><RecoveryPwd /></PageTitle>} />
          <Route path={Alias.register} element={<PageTitle title={Languages.menu.register}><RegisterRefactor /></PageTitle>} />
          <Route path={Alias.login} element={<PageTitle title={Languages.menu.login}><Login /></PageTitle>} />
          <Route path={Alias.customerCare} element={<PageTitle title={Languages.menu.customerCare}><CustomerCare /></PageTitle>} />
          <Route path={Alias.services} element={<PageTitle title={Languages.menu.services}><Services /></PageTitle>} />
          <Route path={Alias.verifyOtp} element={<PageTitle title={Languages.menu.verifyOtp}><VerifyOtp /></PageTitle>} />
          <Route path={Alias.emailOtp} element={<PageTitle title={Languages.menu.emailOtp}><EmailOtp /></PageTitle>} />
          <Route path='*' element={<PageTitle title={Languages.menu.notfound}><Notfound /></PageTitle>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
