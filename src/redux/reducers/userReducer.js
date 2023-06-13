import { createSlice } from '@reduxjs/toolkit'
// import {LOGIN_SUCCESS, LOGOUT, SHOW_ERROR_MSG} from '../actions/actionTypes'
import storageUtils from '../../utils/storageUtils';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: storageUtils.getUser() || {},
    isLoading: false,
  },
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.userInfo = action.payload;
    },
    loginError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null
    }
  }
})

// 导出 action creators
export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;
// 导出 reducer
export default userSlice.reducer;

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       // ES14 的 with 可以尝试下
//       return action.payload;
//     case SHOW_ERROR_MSG:
//       const errorMsg = action.payload;
//       return {...state, errorMsg};
//     case LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// }