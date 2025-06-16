import React, { useState } from "react";
import {
  Button,
  Card,
  Select,
  Typography,
  Form,
  Input,
  message,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { USER_ROLES } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";

const { Title } = Typography;
const { Option } = Select;

const LoginScreen = ({ onLogin }) => {
  const [userType, setUserType] = useState(USER_ROLES[0].id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginAdmin({
        email: values.email,
        password: values.password,
        role: userType,
      });

      const token = response.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        message.success("Login successful!");
        onLogin();
        navigate("/dashboard");
      } else {
        message.error("Login failed. Token not received.");
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "Login failed. Please try again.";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"
    >
      <div className="w-full max-w-md px-6">
        <Card
          className="backdrop-blur-md bg-white/80 shadow-xl rounded-2xl"
          bodyStyle={{ padding: 30 }}
        >
          <div className="text-center mb-6">
            <Title
              level={3}
              className="text-blue-700 font-bold"
              style={{ marginBottom: 0 }}
            >
              Welcome Back
            </Title>
            <p className="text-gray-600 text-sm">Login to your admin panel</p>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="User Type">
              <Select
                value={userType}
                onChange={(id) => setUserType(Number(id))}
              >
                {USER_ROLES.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
