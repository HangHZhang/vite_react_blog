import React from "react";
import { Grid, Card } from "@arco-design/web-react";
import ReactEcharts from "echarts-for-react";
import { Chart, Tooltip, Interval } from "bizcharts";

import "./index.less";

const { Row, Col } = Grid;

export default function ModuleChart() {
  const getCategoryOption = () => {
    return {
      title: {
        text: "分类表图",
        subtext: "文章分类",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "分类图表",
          type: "pie",
          radius: "50%",
          data: [
            { value: 17, name: "博客相关" },
            { value: 25, name: "前端三件客" },
            { value: 30, name: "前端框架-vue、react" },
            { value: 15, name: "java" },
            { value: 20, name: "python" },
            { value: 14, name: "c语言" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  const getArticleData = () => {
    return [
      { name: '管理员', 月份: '1月', 文章数: 20 },
      { name: '管理员', 月份: '2月', 文章数: 30 },
      { name: '管理员', 月份: '3月', 文章数: 15 },
      { name: '管理员', 月份: '4月', 文章数: 30 },
      { name: '管理员', 月份: '5月', 文章数: 10 },
      { name: '管理员', 月份: '6月', 文章数: 15 },
      { name: '管理员', 月份: '7月', 文章数: 20 },
      { name: '管理员', 月份: '8月', 文章数: 22 },
      { name: '管理员', 月份: '9月', 文章数: 11 },
      { name: '管理员', 月份: '10月', 文章数: 13 },
      { name: '管理员', 月份: '11月', 文章数: 11 },
      { name: '管理员', 月份: '12月', 文章数: 23 },
      { name: '张行行', 月份: '1月', 文章数: 34 },
      { name: '张行行', 月份: '2月', 文章数: 28 },
      { name: '张行行', 月份: '3月', 文章数: 20 },
      { name: '张行行', 月份: '4月', 文章数: 19 },
      { name: '张行行', 月份: '5月', 文章数: 21 },
      { name: '张行行', 月份: '6月', 文章数: 20 },
      { name: '张行行', 月份: '7月', 文章数: 32 },
      { name: '张行行', 月份: '8月', 文章数: 12 },
      { name: '张行行', 月份: '9月', 文章数: 21 },
      { name: '张行行', 月份: '10月', 文章数: 12 },
      { name: '张行行', 月份: '11月', 文章数: 13 },
      { name: '张行行', 月份: '12月', 文章数: 23 },
    ];
  };
  return (
    <Row className="module-chart" gutter={12}>
      <Col span={12}>
        <Card title={<span className="module-title">分类模块</span>}>
          <ReactEcharts option={getCategoryOption()} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={<span className="module-title">文章模块</span>}>
          <Chart height={300} padding="auto" data={getArticleData()} autoFit>
            <div style={{ textAlign: "center", fontSize: "12px", fontWeight: "bold", marginTop: -5}}>
              近一年不同高级用户发文量统计
            </div>
            <Interval
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 0,
                },
              ]}
              color="name"
              position="月份*文章数"
            />
            <Tooltip shared />
          </Chart>
        </Card>
      </Col>
    </Row>
  );
}