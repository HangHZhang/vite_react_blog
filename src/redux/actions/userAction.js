// import {LOGIN_SUCCESS, LOGOUT, SHOW_ERROR_MSG} from './actionTypes';
import {reqLogin} from '../../api';
import storageUtils from '../../utils/storageUtils';

import { loginStart, loginSuccess, loginError,logout } from '../reducers/userReducer';

// 异步action
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const result = await reqLogin(username, password);
      if (result.status === 0) {
        const user = result.data;
        storageUtils.saveUser(user);
        dispatch(loginSuccess(user));
        return Promise.resolve(user);
      } else {
        const msg = result.msg;
        dispatch(loginError(msg));
        return Promise.reject(msg);
      }
    } catch (error) {
      dispatch(loginError(error.message));
      throw error;
    }
  }
}
// 异步action获取token，退出登陆
// export const logout = () => {
//   storageUtils.removeUser();
//   logout();
// };


// /* 
// 登陆成功的同步 action
// */
// export const loginSuccess = (userData) => ({
//   type: LOGIN_SUCCESS,
//   payload: userData,
// });

// /* 
// 退出登陆的同步 action
// */
// export const logout = () => {
//   storageUtils.removeUser();
//   return {type: LOGOUT}
// };

// /* 
// 显示错误信息的同步 action
// */
// export const showErrorMsg = errorMsg => ({type: SHOW_ERROR_MSG,payload: errorMsg}) 

// /* 
// 登陆请求的异步 action
// */
// export const login = (username, password) => {
//   return async (dispatch) => {
//     const result = await reqLogin(username, password);
//     if (result.status === 0) {
//       const user = result.data;
//       storageUtils.saveUser(user);
//       dispatch(loginSuccess(user));
//     } else {
//       const msg = result.msg;
//       dispatch(showErrorMsg(msg));
//     }
//   }
// }