import { configureStore } from '@reduxjs/toolkit'
import musicVid from './features/letter-page/music-vid-reducer'
import authSlice from './features/auth/authSlice'
export const store = configureStore({
  reducer: {
    musicVid: musicVid,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
