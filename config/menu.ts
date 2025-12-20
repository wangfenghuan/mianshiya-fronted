import {MenuDataItem} from "@ant-design/pro-layout";
import accessEnum from "@/access/accessEnum";

const menus:MenuDataItem[] = [
    {
        path: "/questions",
        name: "题目",
    },
    {
        path: '/',
        name: "主页",
    },
    {
        path: "/banks",
        name: "题库"
    },
    {
        path: "/admin",
        name: "管理",
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
            },
            {
                path: '/admin/bank',
                name: '题库管理'
            },
            {
                path: '/admin/question',
                name: '题目管理'
            }
        ]


    }
] as MenuDataItem[];

export default menus;

export  const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus, path);
}
export  const findMenuItemByPath = (menus: MenuDataItem[], path: string):MenuDataItem | null => {
    for (const menu of menus){
        if (menu.path === path){
            return menu;
        }
        if (menu.children){
            const matchedMenuItem = findMenuItemByPath(menu.children, path);
            if (matchedMenuItem){
                return matchedMenuItem;
            }
        }
    }
    return null;
}