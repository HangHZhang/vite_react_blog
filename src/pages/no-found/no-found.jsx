import React from "react";
import { Button } from "antd";
import {useNavigate} from 'react-router-dom';
import './index.less';

function NoFound() {
  const navigate = useNavigate();
  const goBack = () => {navigate(-1);};
  return (
    <div class="page">
      <div class="code">
        4<span>0</span>4
      </div>
      <div class="desc">访问页面不存在哦~</div>
      <div class="handle">
        <Button className="btn1" type="link" size="large" onClick={() => navigate('/home')}>
          返回至首页
        </Button>
        <Button type="link" size="large" onClick={goBack}>
          返回至上一页
        </Button>
      </div>
    </div>
  );
}
export default NoFound;