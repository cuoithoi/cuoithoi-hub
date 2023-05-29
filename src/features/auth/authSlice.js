import { customFetch } from '@/utils/axios'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/localStorage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const initialState = {
  isLoading: false,
  isSignupSuccess: false,
  user: getUserFromLocalStorage(),
  hash: '',
  userId: '',
  emailVerify: {
    hash: '',
  },
}

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/signup', user)
      return resp.data.data
      // toast message
    } catch (error) {
      const msg = error.response.data.message
      toast.error(msg)
    }
  }
)

export const signinUser = createAsyncThunk(
  'auth/signin',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/signin', user)
      console.log(response)
      if (response.data.data.errorCode)
        throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác')
      return response.data
    } catch (error) {
      toast.error(error)
    }
  }
)

// this function use for verify email when user forgot password
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (email) => {
    try {
      const response = await customFetch.post('/verify-user-by-email', email)
      return response.data.data
    } catch (error) {
      toast.error(
        'Xác thực email thất bại, Vui lòng kiểm tra lại',
        error.response.message
      )
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/verifyOtp',
  async (otp, thunkAPI) => {
    try {
      const response = await customFetch.post('/signup-verify-otp', otp)
      return response.data.data
    } catch (error) {
      toast.error('Xác thực OTP thất bại, Vui lòng kiểm tra lại')
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isSignupSuccess = false
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.hash = payload.hash
      state.email = payload.email
      state.userId = payload._id
      state.isSignupSuccess = true
      toast.success('Đăng ký thành công!')
    },
    [verifyOTP.fulfilled]: (state, { payload }) => {
      const user = {
        userId: payload.userId[0],
        email: payload.email,
        token: payload.token,
      }
      state.user = user
      addUserToLocalStorage(payload)
      toast.success('Xác thực OTP thành công!')
    },
    [signinUser.pending]: (state) => {
      state.isLoading = false
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      if (payload.errorCode) {
        toast.error('Email hoặc mật khẩu không đúng')
        return
      }
      state.user = payload.data
      toast.success('Đăng nhập thành công!')
      addUserToLocalStorage(payload.data)
      state.isLoading = false
    },
    [verifyEmail.pending]: (state) => {
      state.isLoading = true
    },
    [verifyEmail.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.emailVerify.hash = payload.hash
    },
  },
})
export const { logoutUser } = authSlice.actions
export default authSlice.reducer
