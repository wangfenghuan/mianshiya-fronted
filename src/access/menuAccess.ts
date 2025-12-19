import {MenuDataItem} from "@ant-design/pro-layout";
import menus from "../../config/menu";
import checkAccess from "@/access/checkAccess";
import {it} from "node:test";

export const getAccessibleMenus = (loginUser: API.LoginUserVO, menuItems: MenuDataItem[] = menus)=> {
    return menuItems.filter((item) => {
        if (!checkAccess(loginUser, item.access)){
            return false;
        }
        if (item.children) {
            item.children = getAccessibleMenus(loginUser, item.children);
        }
        return  true;
    })
}