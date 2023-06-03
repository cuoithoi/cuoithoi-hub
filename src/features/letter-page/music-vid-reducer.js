import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prevAudioPlay: false,
  isAudioPlay: true,
  audioElement: null,
  isYoutubePlay: false,
}
export const musicVidSlice = createSlice({
  name: 'musicVid',
  initialState,
  reducers: {
    toggleAudioPlay: (state) => {
      state.isAudioPlay = !state.isAudioPlay
    },
    setIsAudioPlay: (state, { payload }) => {
      state.isAudioPlay = payload
    },
    setAudioElement: (state, { payload }) => {
      state.audioElement = payload
    },
    setPrevAudioPlay: (state, { payload }) => {
      state.prevAudioPlay = payload
    },
  },
})

export const {
  toggleAudioPlay,
  setIsAudioPlay,
  setAudioElement,
  setPrevAudioPlay,
} = musicVidSlice.actions

export default musicVidSlice.reducer
