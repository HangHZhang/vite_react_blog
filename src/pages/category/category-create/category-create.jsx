import React from "react";
import { Card, Form, Input, message, Select,Tooltip  } from "antd";
import { nanoid } from "nanoid";
import { Button,Timeline } from "@douyinfe/semi-ui";
import moment from 'moment'

import { reqAddOrEditCategory } from "../../../api";

import { mockCategoryList } from "../../../mock/category";

const Item = Form.Item;
const Option = Select.Option;
const suffixSelector = (
  <Item name="suffix" noStyle initialValue="-hex">
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="-hex" title="颜色格式">
        HEX
      </Option>
      <Option value="-rgba" title="颜色格式">
        RGBA
      </Option>
    </Select>
  </Item>
);
export default function CategoryCreate() {
  const form = Form.useForm();
  /* 
    发送网络请求
  */
  // const confirmFrom = async values => {
  //   // 收集数据
  //   const category = {}
  //   const {name,create_by,color,desc,suffix} = values
  //   category._id = nanoid()
  //   category.name = name
  //   category.create_by = create_by
  //   category.create_at = Date.now()
  //   category.color = color + suffix
  //   category.desc = desc
  //   // 发送网络请求
  //   const result =  await reqAddOrCategory(category)
  //   if (result.status === 0) {
  //     message.success('添加分类成功')
  //     form[0].resetFields()
  //   } else {
  //     message.error('添加分类失败')
  //   }
  // }
  /* 
  无后端情况
  */
  const confirmFrom = (values) => {
    // 收集数据
    const category = {};
    let newMockCategoryList = [];
    const { name, create_by, color, desc, suffix } = values;
    category._id = nanoid();
    category.name = name;
    category.create_by = create_by;
    category.create_at = "" + Date.now();
    category.color = color + suffix;
    category.desc = desc;
    newMockCategoryList = [...mockCategoryList, category];
    console.log(newMockCategoryList);
    category.mockCategoryList = newMockCategoryList;
    message.success("添加分类成功");
    form[0].resetFields();
  };

  const getItems = () => {
    /* 框架搭的页面千万不能突变参数了 */
    const categoryMap = [...mockCategoryList].length < 5 ? [...mockCategoryList] : [...mockCategoryList].splice(0,5)
    const items = categoryMap.map((category,idx) => {
      if (idx === 4) {
        return ({
          content: (
            <Tooltip title="详情 ­­⇨⇨⇨ 分类列表">
              <span style={{ fontSize: '16px' }}>······</span>
            </Tooltip>
          ),
          color: 'grey',
          type: 'success'
        })
      }
      return ({
        time: moment(+category.create_at).format('YYYY-MM-DD'),
        content: (
          <Tooltip title={category.desc || ''}>
            <span style={{ fontSize: '16px' }}>{category.category_name}</span>
          </Tooltip>
        ),
        color: '#904C22'
      })
    })
    return items
  }

  return (
    <Card title="分类添加" style={{height: '100%'}}>
      <Form
        name="添加分类信息收集表"
        onFinish={confirmFrom}
        style={{
          maxWidth: 1450,
        }}
        form={form[0]}
      >
        <Item
          name="category_name"
          rules={[
            {
              required: true,
              message: "请输入分类名称",
            },
          ]}
          style={{ marginLeft: 20 }}
        >
          <Input size="large" placeholder="分类名称" />
        </Item>

        <Item
          name="create_by"
          rules={[
            {
              required: true,
              message: "请选择创建者",
            },
          ]}
          style={{ marginLeft: 20 }}
        >
          <Select size="large" placeholder="创建者">
            <Select.Option value="admin">admin</Select.Option>
            <Select.Option value="guest">guest</Select.Option>
          </Select>
        </Item>

        <Item
          name="color"
          rules={[
            {
              required: true,
              message: "请选择标签颜色类型并输入",
            },
          ]}
          style={{ marginLeft: 20 }}
        >
          <Input
            size="large"
            placeholder="分类标签色"
            addonAfter={suffixSelector}
          />
        </Item>

        <Item name="desc" style={{ marginLeft: 20 }}>
          <Input.TextArea placeholder="分类描述" size="large" />
        </Item>

        <Button
          theme="solid"
          type="secondary"
          style={{ marginLeft: 20 }}
          htmlType="sumbit"
        >
          提交
        </Button>

        <Button
          theme="solid"
          type="tertiary"
          style={{ marginLeft: 8 }}
          htmlType="reset"
        >
          重置
        </Button>
      </Form>
      <Timeline 
        mode="left"
        dataSource={getItems()}
        style={{margin: '20px 30px 0px 30px'}}
      />
    </Card>
  );
}
