import React, {useEffect} from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const admin = {
  username: "admin@example.com",
  password: "password"
};
 
const NormalLoginForm = () => {
  const {
    authState: { isLoggedIn },
    dispatchAuth
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    if (
      values.username == admin.username &&
      values.password == admin.password
    ) {
      window.localStorage.setItem("username", values.username);
      dispatchAuth({
        type: "TOGGLE_AUTH"
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <Row align={"center"} style={{ marginTop: "100px" }}>
      <Col span={12}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default () => <NormalLoginForm />;
