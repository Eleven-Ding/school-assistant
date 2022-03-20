import React, { memo, useCallback, useRef, useState } from "react";
import { Form, Input, Button, Tabs, Picker, Toast } from "antd-mobile";
import { LoginWrapper } from "./style";
import { withRouter } from "react-router-dom";
import { basicColumns } from "@/constant";
import { sendMail, userRegister, userLogin } from "@/network/model";
export default memo(
  withRouter(function LoginPage({ history }) {
    const [isLogin, setIslogin] = useState("login");
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(["1"]);
    const [visibleMask, setVisibleMask] = useState(false);
    const formRef = useRef();

    const onFinish = async (values) => {
      setVisibleMask(true);
      let showmsg = "";
      if (isLogin === "login") {
        const {
          status,
          message,
          data: { token, userId },
        } = await userLogin({ ...values });
        showmsg = message;
        if (status === 200) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          history.push("/home");
        }
      } else {
        const { status, message } = await userRegister({
          ...values,
          school: value,
        });
        showmsg = message;
      }
      Toast.show({
        content: showmsg,
      });
      setVisibleMask(false);
    };
    const send = useCallback(async () => {
      const email = formRef.current?.getFieldValue("email");
      const result = await sendMail({ email });
      Toast.show({
        content: "发送成功，请耐心等待",
      });
    }, [formRef]);
    return (
      <LoginWrapper>
        <div className="login-container">
          <Tabs
            onChange={(key) => {
              setIslogin(key);
            }}
          >
            <Tabs.Tab title="登录" key="login"></Tabs.Tab>
            <Tabs.Tab title="注册" key="registry"></Tabs.Tab>
          </Tabs>
          <Form
            onFinish={onFinish}
            ref={formRef}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                onClick={() => {}}
                size="large"
                loading={visibleMask}
              >
                {isLogin === "login" ? "登录" : "注册"}
              </Button>
            }
            layout="vertical"
            mode="card"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入用户名" clearable />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入密码" clearable type="password" />
            </Form.Item>

            {isLogin !== "login" && (
              <>
                <Form.Item label="学校" name="school">
                  <Button
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    选择
                  </Button>
                  <Picker
                    columns={basicColumns}
                    visible={visible}
                    onClose={() => {
                      setVisible(false);
                    }}
                    value={value}
                    onConfirm={(v) => {
                      setValue(v);
                    }}
                    onSelect={(val, extend) => {}}
                  >
                    {(items) => {
                      if (items.every((item) => item === null)) {
                        return "未选择";
                      } else {
                        return items
                          .map((item) => item?.label ?? "未选择")
                          .join(" - ");
                      }
                    }}
                  </Picker>
                </Form.Item>
                <Form.Item
                  label="QQ邮箱"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="请输入邮箱@qq.com" clearable />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  label="邮箱验证码"
                  name="code"
                  extra={<a onClick={send}>发送验证码</a>}
                >
                  <Input placeholder="请输入验证码" />
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </LoginWrapper>
    );
  })
);
