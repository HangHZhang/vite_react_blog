import { IconHome,IconEdit,IconOrderedList,IconApps,IconUser } from '@douyinfe/semi-icons';
import {
    MenuUnfoldOutlined,
    UnorderedListOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';

const menuList =  [
    {
        title:'首页',    //菜单标题名称
        key:'/home',   //对应的path
        icon:<IconHome />,     //图标名称
    },
    {
        title:'文章管理',    
        key:'/articles',   
        icon: <IconApps />,   
        children: [
            {
                title:'文章列表',  
                key:'/article/list', 
                icon: <IconOrderedList />,   
            },
            {
                title:'文章添加',  
                key:'/article/create', 
                icon: <IconEdit />,   
            },
        ] 
    },
    {
        title:'分类管理',    
        key:'/categorys',   
        icon:<MenuUnfoldOutlined />,   
        children: [
            {
                title:'分类列表',  
                key:'/category/list', 
                icon: <UnorderedListOutlined />,   
            },
            {
                title:'分类添加',  
                key:'/category/create', 
                icon:<AppstoreAddOutlined />,   
            },
        ] 
    },
    {
        title:'个人中心',  
        key:'/person', 
        icon: <IconUser />,   
    },
]

const getKeyList = menuList => {
    // 方式1
    return menuList.map(item => {
        if(item.children) return [item.key, ...getKeyList(item.children)];
        return item.key;
    }).flat();
    // 方式2
    // return menuList.reduce((pre,item) => {
    //     return [...pre,item.key,...(item.children ? getKeyList(item.children) : [])]
    // },[])
    // 方式3
    // return menuList.flatMap(item => {
    //     if (item.children) return [item.key, ...getKeyList(item.children)];
    //     return item.key;
    // })
}

export const keyList = getKeyList(menuList);

export default menuList

