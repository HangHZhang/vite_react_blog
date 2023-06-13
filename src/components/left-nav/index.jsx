import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";

import "./index.css";
import Logo from "../../assets/imgs/logo.png";
import menuList from "../../config/menuConfig";
import useComponentWillMount from "../../hooks/useComponentWillMount";


export default function LeftNav({collapsed}) {

  const location = useLocation()

  const navigate = useNavigate()

  const getMenuNodes = menuList => menuList.reduce((pre,item) => {
    !item.children?
    pre.push(
      {
        key: item.key,
        icon: item.icon,
        label: item.title,
      }
    ) :
    pre.push(
      {
        key: item.key,
        icon: item.icon,
        label: item.title,
        children: getMenuNodes(item.children)
      }
    )
    return pre
  },[])

  const getDefaultOpenKeys = () => {
    let defaultOpenKeys = ''
    menuList.forEach(item => {
      /*
        'zhh'.indexOf('zhh')  0
        'azhh'.indexOf('zhh') 1
        'zhh'.indexOf('azhh') -1
      */

      const cItem = item.children && item.children.find(cItem => location.pathname.indexOf(cItem.key) === 0)
      if (cItem) {
        defaultOpenKeys = item.key
      }
    })
    return defaultOpenKeys
  }

  const menuNodes = useComponentWillMount(() =>  getMenuNodes(menuList))

  return (
    <div className="left-nav">
      <Link to='/' className="left-nav-header" style={{ backgroundColor: '#343434'}}>
        <img src={Logo} alt="logo"/>
        <h1 style={collapsed ? {opacity: '0', transition: 'all .05s ease-in-out'}: {opacity: '1',transition: 'all .05s ease-in-out'}}>博客管理系统</h1>
      </Link>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[getDefaultOpenKeys()]}
        style={{
          height: "100vh",
          borderRight: 0,
          backgroundColor: '#E2DCDD',
        }}
        onClick = {({key}) => {
          navigate(key)
        }}  /* 时刻注意自己所在的编译环境,以及编程式路由导航 */
        items={menuNodes}
      />
    </div>
  );
}
