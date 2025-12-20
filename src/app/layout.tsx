"use client"
import "./globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";


const InitLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();
    const doInitLoinUser = useCallback( async () => {
        const res = await getLoginUserUsingGet();
        if (res.data){
            //更新用户全局状态
            dispatch(setLoginUser(res.data));
        }else {
            dispatch((setLoginUser({userName: "测试用户"})))
        }
    },[])
    // 只执行一次
    useEffect(() => {
        doInitLoinUser();
    }, [])
    return children;
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="zh">
      <body>
      <AntdRegistry>
          <Provider store={store}>
              <InitLayout>
                  <BasicLayout>
                      <AccessLayout>
                          {children}
                      </AccessLayout>
                  </BasicLayout>
              </InitLayout>
          </Provider>
      </AntdRegistry>
      </body>
      </html>
  );
}

