import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import CreatePage from './pages/Createpage/CreatePage'

// import CreatePageStructure from './pages/CreatePageStructure'

// trial
import RegisterRefactor from './pages/RegisterRefactor'
import CustomerCare from './pages/CustomerCare'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path={Alias.letterPage} element={<LetterPage />}></Route>
          <Route path={Alias.congrats} element={<CommentDetail />} />

          <Route path={Alias.createPage} element={<CreatePage />} />
          <Route path={Alias.customerCare} element={<CustomerCare />} />
          <Route path={Alias.login} element={<Login />} />
          <Route path={Alias.register} element={<RegisterRefactor />} />
          <Route path={Alias.pwdRecovery} element={<RecoveryPwd />} />
          <Route path={Alias.mypage} element={<Mypage />} />
          <Route path={Alias.services} element={<Services />} />
          <Route path={Alias.verifyOtp} element={<VerifyOtp />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
