import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LetterPage from './pages/LetterPage'
import HomePage from './pages/Homepage/Homepage'
import { Alias } from './commons/Constant.ts'
import Login from './pages/Login'
import Register from './pages/Register'
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

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path={Alias.homePage} element={<HomePage />} />
          <Route path={Alias.mypage} element={<Mypage />} />
          <Route
            path={Alias.letterPage}
            element={
              <ProtectedRoute>
                <LetterPage />
              </ProtectedRoute>
            }
          />
          <Route path={Alias.congrats} element={<CommentDetail />} />
          <Route path={Alias.createPage} element={<CreatePage />} />
          <Route path={Alias.editor} element={<CreatePage />} />
          <Route path={Alias.pwdRecovery} element={<RecoveryPwd />} />
          <Route path={Alias.register} element={<RegisterRefactor />} />
          <Route path={Alias.login} element={<Login />} />
          <Route path={Alias.customerCare} element={<CustomerCare />} />
          <Route path={Alias.services} element={<Services />} />
          <Route path={Alias.verifyOtp} element={<VerifyOtp />} />
          <Route path={Alias.emailOtp} element={<EmailOtp />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
