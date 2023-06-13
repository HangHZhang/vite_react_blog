import React from "react";
import { Toast, Form } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";

import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import { reqLogin } from "../../api/index";

import mainIcon from "../../assets/imgs/后台管理系统.png";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    /* 发送网络请求 */
    const { phone, password } = values;
    const result = await reqLogin(phone, password);
    if (result.status === 0) {
      storageUtils.saveUser(result.data);
      memoryUtils.user = result.data;
      navigate("/");
      Toast.success({ content: "登陆成功", duration: 1.5 });
    } else {
      Toast.error({ content: "登陆失败," + result.msg, duration: 1.5 });
    }
  };
  const validatePassCheck = (_, value, callback) => {
    if (!value) {
      callback("手机号必须输入");
    } else if (value.length > 11) {
      callback("手机号不能大于11位");
    } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
      callback("手机号格式不正确");
    } else {
      callback();
    }
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={mainIcon} alt="" />
        <h1>个人博客后台管理系统</h1>
      </header>
      <div className="login-wrap">
        <div className="login-content">
          <h2>用户登陆</h2>
          <Form className=".login-form" style={{ width: 400 }}>
            {({ values }) => (
              <>
                <Form.Input
                  className="login-input"
                  field="phone"
                  label={{
                    text: "手机号",
                    extra: <PhoneOutlined />,
                  }}
                  placeholder="请输入你的手机号"
                  rules={[
                    { required: true, message: "" },
                    { validator: validatePassCheck },
                  ]}
                ></Form.Input>
                <Form.Input
                  className="login-input"
                  field="password"
                  mode="password"
                  label={{
                    text: "密码",
                    extra: <LockOutlined />,
                  }}
                  placeholder="请输入你的密码"
                  rules={[
                    { required: true, message: "密码必须输入" },
                    { min: 6, message: "密码最少6位" },
                    { max: 10, message: "密码最多10位" },
                    {
                      validator: (_, value, callback) =>
                        !/^\w+$/.test(value) && callback("密码格式不正确"),
                      message: "",
                    },
                  ]}
                ></Form.Input>
                <Form.Checkbox field="agree" noLabel>
                  我已阅读并同意所有服务项
                </Form.Checkbox>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Button
                    type="primary"
                    disabled={!values.agree}
                    style={
                      values.agree
                        ? { width: "100%", backgroundColor: "rgb(0,100,250)" }
                        : { width: "100%" }
                    }
                    onClick={() => handleSubmit(values)}
                  >
                    登陆
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
