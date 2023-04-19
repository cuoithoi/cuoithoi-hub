import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bgImage: [],
  thumbnail: [],
  imageEffect: 'none',
}
export const handleFormReducer = createSlice({
  name: 'handleFormReducer',
  initialState,
  reducers: {
    // handleChangeInputField: (state, { payload }) => {
    //   const { section, name, value } = payload
    //   state[section][name] = value
    // },
  },
})

export const {} = handleFormReducer.actions

export default handleFormReducer.reducer
