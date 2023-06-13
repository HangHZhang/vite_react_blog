import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  message,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  notification,
  Descriptions,
} from "antd";
import { AuditOutlined } from "@ant-design/icons";
import moment from "moment";
import { IconUser, IconEmail, IconPhone, IconLineHeight, IconCopyright, IconTag } from '@arco-design/web-react/icon';

import UploadAvater from "./upload-avater/upload-avater";
import LeftRight from "./left-right/left-right";

import UserNameSvg from "../../assets/svg/person/user-name.jsx"

import avatar from "../../assets/imgs/avater.jpg";
import { reqUpdatePerson, reqUpdatePersonAvater, reqUpdatePassword } from "../../api/index";
import storageUtils from "../../utils/storageUtils";

const Item = Form.Item;
const Option = Select.Option;

const getUserInfomation = (key) => storageUtils.getUser()[key];

export default function Person() {
  const [centerNumberInfo, setCenterNumberInfo] = useState("0");
  const [debounceNumber, setDebounceNumber] = useState(0);

  const handleSubmitAvater = async (avatarUrl) => {
    const result = await reqUpdatePersonAvater(avatarUrl);
    if (result.status === 0) {
      message.success(result.msg);
    } else {
      message.error(
        <span>用户头像更新失败，请稍后再试&#128522;&#128522;</span>
      );
    }
  };

  const openNotification = () => {
    notification.open({
      message: "个人详情",
      icon: <AuditOutlined />,
      duration: 0,
      description: (
        <Descriptions layout="vertical">
          <Descriptions.Item label="用户名称">
            {getUserInfomation("username")}
          </Descriptions.Item>
          <Descriptions.Item label="用户邮箱">
            {getUserInfomation("email")}
          </Descriptions.Item>
          <Descriptions.Item label="电话">
            {getUserInfomation("phone")}
          </Descriptions.Item>
          <Descriptions.Item label="出生地"> {getUserInfomation("brith")}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {moment(+getUserInfomation("create_at")).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="院校">{getUserInfomation("school")}</Descriptions.Item>
          <Descriptions.Item label="证件号">
            {getUserInfomation("idCard")}
          </Descriptions.Item>
          <Descriptions.Item label="政治面貌">
            {getUserInfomation("politicalStatus")}
          </Descriptions.Item>
          <Descriptions.Item label="学号">{getUserInfomation("studentNumber")}</Descriptions.Item>
          <Descriptions.Item label="居住地">
            {getUserInfomation("place")}
          </Descriptions.Item>
          <Descriptions.Item label="研究方向">
            {getUserInfomation("research")}
          </Descriptions.Item>
          <Descriptions.Item label="学院">{getUserInfomation("college")}</Descriptions.Item>
        </Descriptions>
      ),
      style: {
        width: "40%",
      },
      onClose: () => {
        setDebounceNumber(0);
      },
    });
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  const tailLayout = {
    wrapperCol: { offset: 2, span: 21 },
  };

  const validateMessages = {
    required: "${label} 必填项!",
    types: {
      email: "${label} 非合法邮箱!",
      number: "${label} 非合法号码!",
    },
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("两次输入密码不一致"));
    },
  });

  const getinitialValues = () => {
    return {
      username: getUserInfomation("username"),
      email: getUserInfomation("email"),
      phone: getUserInfomation("phone"),
      center: getUserInfomation("center"),
      school: getUserInfomation("school"),
    };
  };

  const handleSubmit = async (values) => {
    if (values.confirmPassword) {
      const result = reqUpdatePassword(getUserInfomation("phone"), values.oldPassword, values.newPassword);
      result.then((res) => {
        if (res.status === 0) {
          message.success(`${username}密码更新成功~`)
          navigate('/login');
        } else {
          message.error(`${username}密码更新失败`);
        }
      })
    } else {
      const result = await reqUpdatePerson(values);
      if (result.status === 0) {
        message.success("保存信息成功~");
      } else {
        message.error("保存信息失败，请稍后再试~");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const items = [
    {
      key: "basic settings",
      label: `基本设置`,
      children: (
        <Form
          name="basic settings"
          validateMessages={validateMessages}
          initialValues={getinitialValues()}
          labelAlign="right"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          {...layout}
        >
          <Item
            name="username"
            label="用户名称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="email"
            label="用户邮箱"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="phone"
            label="手机号码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Item>
          <Item name="center" label="所属中心">
            <Select
              value={centerNumberInfo}
              onChange={(value) => setCenterNumberInfo(value)}
            >
              <Option value="0">工业人工智能中心</Option>
              <Option value="1">工业数字孪生与CPS中心</Option>
              <Option value="2">工业大数据中心</Option>
              <Option value="3">西邮</Option>
              <Option value="4">其他</Option>
            </Select>
          </Item>
          <Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              保存
            </Button>
            <Button
              onClick={
                debounceNumber === 0
                  ? () => {
                      openNotification();
                      setDebounceNumber(1);
                    }
                  : () =>
                      message.warning({
                        content: <span>切勿重复点击&#128536;&#128536;</span>,
                      })
              }
            >
              详情
            </Button>
          </Item>
        </Form>
      ),
    },
    {
      key: "password updte",
      label: `密码修改`,
      children: (
        <Form
          name="basic settings"
          validateMessages={validateMessages}
          labelAlign="right"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          initialValues={{
            oldPassword: getUserInfomation("password"),
          }}
          {...layout}
        >
          <Item
            name="oldPassword"
            label="旧密码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="password" disabled={true} />
          </Item>
          <Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: "请输入新密码" },
              { min: 6, message: "密码长度不能小于6位" },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="confirmPassword"
            label="确认密码"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "请再次输入新密码",
              },
              validatePassword,
            ]}
          >
            <Input />
          </Item>
          <Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              保存
            </Button>
            <Button htmlType="reset">重置</Button>
          </Item>
        </Form>
      ),
    },
  ];

  return (
    <Row gutter={10}>
      <Col span={7}>
        <Card
          title="个人信息"
          bordered={false}
          style={{ backgroundColor: "#a2d2e2" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <UploadAvater
              alt="用户头像"
              handleSubmitAvater={handleSubmitAvater}
              avatar={avatar}
              size={104}
            />
          </div>
          <hr style={{ marginTop: 20 }} />
          <LeftRight left="用户名称" right={getUserInfomation("username")} icon={<IconUser />}/>
          <hr />
          <LeftRight left="用户邮箱" right={getUserInfomation("email")} icon={<IconEmail />}/>
          <hr />
          <LeftRight left="手机电话" right={getUserInfomation("phone")} icon={<IconPhone />}/>
          <hr />
          <LeftRight
            left="创建时间"
            right={moment(+getUserInfomation("create_at")).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
            icon={<IconLineHeight />}
          />
          <hr />
          <LeftRight left="所属中心" right={getUserInfomation("center")}  icon={<IconCopyright />}/>
          <hr />
          <LeftRight left="在读院校" right={getUserInfomation("school")} icon={<IconTag />}/>
          <hr style={{ marginBottom: 10 }} />
        </Card>
      </Col>
      <Col span={17}>
        <Card
          title="个人设置"
          bordered={false}
          style={{ backgroundColor: "#a2d2e2" }}
        >
          <Tabs defaultActiveKey="basic settings" items={items} />
        </Card>
      </Col>
    </Row>
  );
}
