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
    // {
    //     title:'图形图表',
    //     key:'/charts',
    //     icon:<AreaChartOutlined />,
    //     children:[
    //         {
    //             title:'饼图',
    //             key:'/charts/pie',
    //             icon:<PieChartOutlined />
    //         },
    //         {
    //             title:'柱形图',
    //             key:'/charts/bar',
    //             icon: <BarChartOutlined />
    //         },
    //     ]
    // }
]

export default menuList

