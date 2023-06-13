import { useRef, useState } from "react";
import { Layout } from "antd";
import { Routes, Route, useLocation,Navigate } from "react-router-dom";

import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

import Home from "../../pages/home/home";
// import Article from '../../pages/article/article'
import ArticleList from "../../pages/article/article-list/article-list";
import ArticleCreate from "../../pages/article/article-create/article-create";
// import Category from '../../pages/category/category'
import CategoryList from "../../pages/category/category-list/category-list";
import CategoryCreate from "../../pages/category/category-create/category-create";
import Person from "../../pages/person/person";
import NoFound from "../no-found/no-found";
// import Redirect from '../../components/redirect'
import BcComponent from "../../components/BC-component/BC-component";

import storageUtils from "../../utils/storageUtils";
import Redirect from "../../components/redirect";
import no_BC_menu_list from "../../config/no_BC_menu";
import {keyList} from '../../config/menuConfig';

const { Footer, Sider, Content } = Layout;

function Admin() {
  const user = storageUtils.getUser();
  if (!user || !user._id) {
    /* 空对象和数组的boolean都为true */
    return <Redirect to="/login" />;
  }

  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const headerComponnet = useRef('');

  return (
    <Layout style={{minHeight: "100%"}}>
      <div
        style={
          collapsed
            ? {
                minWidth: 80,
                transition: 'all .1s ease-in-out'
              }
            : { 
                minWidth: 220,
                transition: 'all .1s ease-in-out'
              }
        }
      >
        <Sider
          width={220}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            maxWidth: 300,
          }}
        >
          <LeftNav collapsed={collapsed}/>
        </Sider>
      </div>
      <Layout>
        <Header
          ref={headerComponnet}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        {
          (no_BC_menu_list.indexOf(location.pathname) === -1 && keyList.indexOf(location.pathname) !== -1) && (
            <BcComponent/>
          )
        }
        <Content style={{ backgroundColor: "#f5f5f5", margin: 10, padding: 20}}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/article/list" element={<ArticleList />} />
            <Route path="/article/create" element={<ArticleCreate />} />
            <Route path="/category/list" element={<CategoryList />} />
            <Route path="/category/create" element={<CategoryCreate />} />
            <Route path="/person" element={<Person />} />
            <Route path="/charts/pie" element={<ChartsPie />} />
            <Route path="/charts/bar" element={<ChartsBar />} />
            <Route path="/404" element={<NoFound />} />
            <Route path="/*" element={<Navigate to={location.pathname === '/' ? '/home' : '/404'}/>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center", color: "#E6755F" }}>
          你好呀，今天也要开心呀
        </Footer>
      </Layout>
    </Layout>
  );
}
export default Admin;
