import React, { useRef, useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Message,
  DatePicker,
  Card,
} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.min.css";
import { message } from "antd";
import {useSelector} from 'react-redux';
import {reqCreateArticle} from '../../../api';
import DescEditor from './rich-text-editor'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function ArticleCreate() {
  const formRef = useRef();
  const editor = useRef();
  const [options, setOptions] = useState([]);

  const user = useSelector(state => state.user);

  useEffect(() => {
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  const getOptions = async () => {
    const result = await reqCategoryList();
    if (result.status === 0) {
      const options = result.data.map((article) => ({
        label: article.category_name,
        value: article._id,
      }));
      setOptions(options);
    } else {
      message.warning("网络不好，获取分类列表失败，稍后再试...");
    }
  };

  const onSubmit = (values) => {
    const result = reqCreateArticle(values);
    result.then((res) => {
      if (res.status === 0) {
        message.success(`${values.name}文章创建成功~`)
      } else {
        message.error(`${values.name}文章创建失败~`)
      }
    })
  }

  return (
    <Card title="文章添加" style={{ minHeight: "100%" }} bordered={false}>
      <Form
        ref={formRef}
        autoComplete="off"
        {...formItemLayout}
        scrollToFirstError
        onSubmit={onSubmit}
        style={{ minWidth: 1000 }}
        initialValues={{
          owner: user.userInfo.username || '游客',
        }}
      >
        <FormItem
          label="文章名称"
          field="article_name"
          rules={[{ required: true, message: "文章名称是必填项"}]}
        >
          <Input placeholder="请输入..." />
        </FormItem>
        <FormItem label="所有者" field="owner">
          <Input readOnly={true} />
        </FormItem>
        <FormItem
          label="文章分类"
          field="category_name"
          rules={[{ required: true, message: "文章分类是必选项"}]}
          onClick={getOptions}
        >
          <Select placeholder="请选择..." options={options} />
        </FormItem>
        <FormItem
          label="标签"
          tooltip="标签最少不小于1个，最多不能大于5个"
          field="tags"
          style={{maxHeight: 32}}
        >
          <Input.Group compact={true}>
            <FormItem
              field="tags_1"
              rules={[{ required: true, message: '文章标签为必填项' }]}
              style={{width: 80, marginRight: 5, display: 'inline-block'}}
            >
              <Input placeholder="请输入..."/>
            </FormItem>
            <FormItem
              field="tags_2"
              style={{width: 80, marginRight: 5, display: 'inline-block'}}
            >
              <Input placeholder="请输入..."/>
            </FormItem>
            <FormItem
              field="tags_3"
              style={{width: 80, marginRight: 5, display: 'inline-block'}}
            >
              <Input placeholder="请输入..."/>
            </FormItem>
            <FormItem
              field="tags_4"
              style={{width: 80, marginRight: 5, display: 'inline-block'}}
            >
              <Input placeholder="请输入..."/>
            </FormItem>
            <FormItem
              field="tags_5"
              style={{width: 80, marginRight: 5, display: 'inline-block'}}
            >
              <Input placeholder="请输入..."/>
            </FormItem>
          </Input.Group>
        </FormItem>
        <FormItem label="创建时间" field="updateTime" rules={[{ required: true, message: "文章创建时间是必选项" }]}>
          <DatePicker showTime />
        </FormItem>
        <FormItem label="文章描述" field="desc" >
          <DescEditor ref={editor}/>
        </FormItem>
        <div>
          <Button
            onClick={async () => {
              // editor.current.getDetail()
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                  Message.info("校验通过，提交成功！");
                } catch (_) {
                  console.log(formRef.current.getFieldsError());
                  Message.error("校验失败，请检查字段！");
                }
              }
            }}
            type="primary"
            style={{ margin: '0 10px 0 48px' }}
            htmlType="submit"
          >
            提交
          </Button>
          <Button
            onClick={() => {
              formRef.current.resetFields();
            }}
          >
            重置
          </Button>
        </div>
      </Form>
    </Card>
  );
}
