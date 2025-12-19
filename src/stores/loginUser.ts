import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import accessEnum from "@/access/accessEnum";

const DefauleUser: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userRole: accessEnum.NOT_LOGIN
}

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