import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DefauleUser} from "@/constants/UserState";


/**
 * 登录用户的全局状态
 */
export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: DefauleUser,
    reducers: {
        setLoginUser: (state, action:PayloadAction<API.LoginUserVO>) => {
            return {
                ...action.payload,
            }
        }
    }
})
export  const {setLoginUser} = loginUserSlice.actions;
export default loginUserSlice.reducer;