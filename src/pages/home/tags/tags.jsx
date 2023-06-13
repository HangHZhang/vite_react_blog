import React from "react";
import { Card } from "@arco-design/web-react";
import { Tag, Space } from "antd";

import "./index.less";

export default function Tags() {
  return (
    <Card title={<span className="tag-title">标签词云</span>} className="tags">
      <Space size='large' style={{display: "flex", justifyContent: 'center'}}>
        <Tag color="#55acee">博客后台</Tag>
        <Tag color="#cd201f">配置</Tag>
        <Tag color="#3b5999">学习笔记</Tag>
        <Tag color="#55acee">源码</Tag>
        <Tag color="#55acee">前端开发</Tag>
        <Tag color="#cd201f">人工智能</Tag>
        <Tag color="#3b5999">机器学习</Tag>
        <Tag color="#55acee">深度学习</Tag>
        <Tag color="#55acee">心得</Tag>
        <Tag color="#cd201f">工作总结</Tag>
        <Tag color="#3b5999">技术栈</Tag>
        <Tag color="#55acee">设计</Tag>
      </Space>
    </Card>
  );
}