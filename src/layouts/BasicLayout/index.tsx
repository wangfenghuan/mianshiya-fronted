"use client"
import {
    GithubFilled,
    LogoutOutlined,
    PlusCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import {
    ProLayout,
} from '@ant-design/pro-components';
import {
    Dropdown,
    Input, message,
    theme,
} from 'antd';
import React from 'react'; // 移除了不用的 useState
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import menus from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import {getAccessibleMenus} from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {set} from "lodash-es";
import {setLoginUser} from "@/stores/loginUser";
import {DefauleUser} from "@/constants/UserState";

// 1. 这里的 key 属性去掉了，因为它应该在调用方使用
const SearchInput = () => {
    const { token } = theme.useToken();
    return (
        <div
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover, // 稍微优化了一下样式
                }}
                prefix={
                    <SearchOutlined />
                }
                placeholder="搜索方案"
                variant="borderless"
            />
            <PlusCircleFilled
                style={{
                    color: token.colorPrimary, // 使用主题色
                    fontSize: 24,
                }}
            />
        </div>
    );
};

// 2. 修正拼写 Prpos -> Props
interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
    const pathName = usePathname();
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const logout = async () => {
        try {
            const res = await userLogoutUsingPost();
            if (res.data.code){
                message.success("账号已经退出");
                dispatch(setLoginUser(DefauleUser));
                router.push("/user/login");
            }
        } catch (e) {
            message.error("退出失败" + e.message);
        }

    }
    return (
        <div
            id="basiclayout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProLayout
                title={"面试鸭刷题平台"}
                suppressHydrationWarning
                // 3. 移除了 prefixCls="my-prefix" 以免丢失样式
                layout="top" // 这里保留你想要的顶部布局
                logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" // 建议加一个 Logo
                location={{
                    pathname: pathName, // 注意：ProLayout 属性通常是 pathname 而不是 pathName (虽然部分版本兼容)
                }}
                avatarProps={{
                    src: loginUser.userAvatar,
                    size: 'small',
                    title: loginUser.userName || '面试鸭用户',
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: '退出登录',
                                        },
                                    ],
                                    onClick: async (event: {key: React.Key }) => {
                                        const {key} = event;
                                        if (key === "logout") {
                                            await logout();
                                        }
                                    }
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        // 4. key 应该加在这里
                        <SearchInput key="search" />,
                        <a key="github" href="https://github.com/wangfenghuan/mianshiya-fronted.git" target="_blank" rel="noreferrer">
                            <GithubFilled />
                        </a>
                    ];
                }}
                // 5. 移除了导致 SSR 报错的 headerTitleRender 逻辑
                // 如果你想在小屏幕隐藏标题，ProLayout 会自动处理。
                // 如果必须手动控制，请只返回 defaultDom，不要做 window/document 判断
                headerTitleRender={(logo, title, _) => {
                    return (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                }}
                // 6. 稍微规范化菜单配置
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                footerRender={(props) => {
                   return <GlobalFooter/>
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
};