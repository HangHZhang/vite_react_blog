import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Divider,
  Table,
  Radio,
  Card,
  Tag,
  message,
  Popconfirm,
  Modal,
  Form,
  Select,
  Input,
} from "antd";
import moment from "moment";

import LinkButton from "../../../components/link-button";
import {
  reqCategoryList,
  reqDeleteCategory,
  reqAddOrEditCategory,
} from "../../../api";
import { mockCategoryList } from "../../../mock/category";

const { Title } = Typography;
const Item = Form.Item;
const Option = Select.Option;

export default function CategoryList() {
  const [loading, setLoading] = useState(false); // ？？？？
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = Form.useForm();

  const columns = [
    {
      title: "分类名称",
      dataIndex: "category_name",
      render: (category, record) => {
        const { color } = record;
        const colorArray = color.split("-");
        const tagcolor =
          colorArray[1] === "hex" ? colorArray[0] : `rgba(${colorArray[0]})`;
        return (
          <Tag color={tagcolor}>
            <span style={{ color: "#141412", fontWeight: 600 }}>
              {category}
            </span>
          </Tag>
        );
      },
    },
    {
      title: "创建者",
      dataIndex: "create_by",
      render: (name) => {
        return (
          <span style={{ color: "#6A5F6C", fontWeight: 650 }}>{name}</span>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      // render: timeStamp => getDate(timeStamp * Math.random() * 1000)
      // render: timeStamp => moment(timeStamp).format("YYYY-MM-DD HH:mm:ss")
      render: (timeStamp) => moment(+timeStamp).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      render: () => {
        return (
          <>
            <LinkButton
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              编辑
            </LinkButton>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => removeCategory()}
              okText="确定"
              cancelText="取消"
            >
              <LinkButton children="删除" />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const rowSelection = {
    onSelect: (selectedRows) => {
      setCategory(selectedRows);
    },
  };

  const getinitialValues = () => {
    const { category_name, create_by, create_at, color, desc } = category;
    return {
      category_name,
      create_by,
      create_at,
      color: color ? color.split("-")[0] : {} /* 括号的重要性 */,
      desc,
    };
  };

  const suffixSelector = (
    <Item
      name="suffix"
      noStyle
      initialValue={
        category.color
          ? category.color.split("-")[1] === "hex"
            ? "-hex"
            : "-rgba"
          : "-hex"
      }
    >
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

  // const getCategoryList = async () => {
  //   setLoading(true)
  //   const result = await reqCategoryList()
  //   setLoading(false)
  //   if (result.status === 0) {
  //     setCategoryList(result.data)
  //   } else {
  //     message.error('请求分类数据失败')
  //     setCategoryList([])
  //   }
  // }
  const getCategoryList = () => {
    setCategoryList(mockCategoryList);
  };

  // const removeCategory = async () => {
  //   const { _id } = category
  //   // console.log(_id);
  //   const result = await reqDeleteCategory(_id);
  //   if (result.status === 0) {
  //     message.success('删除分类成功')
  //     getCategoryList()
  //   } else {
  //     message.error('删除分类失败，请稍后再试·­·­·')
  //   }
  // }
  const removeCategory = () => {
    const { _id } = category;
    // console.log(_id)
    /* filter函数 */
    const newMockCategory = [...mockCategoryList].filter(
      (mockCategory) => mockCategory._id != _id
    );
    setCategoryList(newMockCategory);
    message.success("删除分类成功");
  };

  /* 
    高阶函数 为行属性绑定 点击事件
  */
  const onRow = (category) => {
    return {
      onClick: () => {
        setCategory(category);
      },
    };
  };

  // const handleOk = async () => {
  //   /* 发送网络请求 */
  //   const {name,create_by,color,des} = form[0].getFieldsValue();
  //   const newCategory = {...category}
  //   newCategory.name = name
  //   newCategory.create_by = create_by
  //   newCategory.create_at = Date.now()
  //   newCategory.color = color
  //   newCategory.des = des
  //   const result = await reqAddOrCategory(newCategory)
  //   if (result.status) {
  //     message.success('更新分类信息成功')
  //     setIsModalOpen(false);
  //   } else {
  //     message.success('更新分类信息失败，请稍后再试...')
  //     setIsModalOpen(false);
  //   }
  //   setCategory(newCategory)
  // };
  const handleOk = () => {
    const { name, create_by, color, desc } = form[0].getFieldsValue();
    let mockCategory = [...mockCategoryList].find(
      (mockCategory) => mockCategory._id == category._id
    );
    console.log(mockCategory);
    mockCategory.name = name;
    mockCategory.create_by = create_by;
    mockCategory.create_at = Date.now();
    mockCategory.color = color;
    mockCategory.desc = desc;
    setCategoryList(mockCategoryList);
    message.success("更新分类信息成功");
    setIsModalOpen(false);
  };

  useEffect(() => {
    // console.log('@@')
    getCategoryList();
    form[0].setFieldsValue(getinitialValues()) // 替代 initialValues 很关键
  }, [isModalOpen]); /* 哪个状态也不监测 */

  return (
    <>
      <Card>
        <Table
          rowKey={category => category._id}
          bordered
          loading={loading}
          rowSelection={{
            type: Radio,
            selectedRowKeys: [category._id],
            ...rowSelection,
          }}
          columns={columns}
          dataSource={categoryList}
          pagination={{
            defaultPageSize: 5,
            hideOnSinglePage: true,
          }}
          onRow={onRow}
        />
        <Modal
          title="分类更新"
          open={isModalOpen}
          onOk={handleOk}
          okText="确定"
          cancelText="取消"
          onCancel={() => {
            setIsModalOpen(false);
          }}
          destroyOnClose={true}
        >
          <Form
            name="更新分类信息收集表"
            style={{
              maxWidth: 1450,
            }}
            form={form[0]}
            initialValues={getinitialValues()}
          >
            <Item
              name="category_name"
              rules={[
                {
                  required: true,
                  message: "请输入分类名称",
                },
              ]}
              style={{ marginLeft: 20, marginTop: 22 }}
            >
              <Input size="large" />
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
          </Form>
        </Modal>
      </Card>
    </>
  );
}
