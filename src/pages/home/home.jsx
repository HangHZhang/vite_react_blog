import React,{useEffect,useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";

import MainControl from "./mainControl/main-control";
import ModuleChart from "./module-chart/module-chart";
import Tags from "./tags/tags";
import MyContext from "./context";

import { reqArticleList } from "../../api"; 
import { reqCategoryList } from "../../api"; 

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    if (location.pathname !== '/home') {
      navigate('/home')
    }
    getData()
  },[])
  const getData = () => {
    reqArticleList().then((res) => {
      if (res.status === 0) {setArticleData(res.data)}
    })
    reqCategoryList().then((res) => {
      if (res.status === 0) {setCategoryData(res.data)}
    })
  }
  return (
    <MyContext.Provider value ={{articleData,categoryData}}>
      <MainControl />
      <ModuleChart />
      <Tags />
    </MyContext.Provider>
  );
}
