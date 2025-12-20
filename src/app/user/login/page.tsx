"use client"
import {
    LockOutlined,
    UserOutlined,

} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormText,

} from '@ant-design/pro-components';
import {message} from 'antd';
import React from 'react';
import Link from "next/link";
import {userLoginUsingPost} from "@/api/userController";
import {ProForm} from "@ant-design/pro-form/lib";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {setLoginUser} from "@/stores/loginUser";
import {useRouter} from "next/navigation";



const UserLogin:React.FC = () => {

    const [form] = ProForm.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


        const submit =  async  (value: API.UserLoginRequest) => {
            try {
                const res = await userLoginUsingPost(value);
                console.log(res.data.data)
                if (res.data.code !== undefined && res.data.code !== null) {

                    message.success("登录成功");
                    form.resetFields;
                    router.replace("/");
                    dispatch(setLoginUser(res.data.data));

                }
            } catch (e) {
                message.error("登录失败" + e.message);
            }
        }



    return (
        <ProConfigProvider hashed={false}>
            <div>
                <LoginForm
                    form={form}
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    title="面试鸭"
                    subTitle="面试鸭-用户登录"
                    onFinish={submit}
                >
                    { (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'请输入用户名!'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    strengthText:
                                        'Password should contain numbers, letters and special characters, at least 8 characters long.',
                                    statusRender: (value) => {
                                        const getStatus = () => {
                                            if (value && value.length > 12) {
                                                return 'ok';
                                            }
                                            if (value && value.length > 6) {
                                                return 'pass';
                                            }
                                            return 'poor';
                                        };
                                        const status = getStatus();

                                        return (
                                            <div>强度：弱</div>
                                        );
                                    },
                                }}
                                placeholder={'请输入密码！'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                            <Link href={'/user/register'}>
                                还没有账号？去注册
                            </Link>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default UserLogin;