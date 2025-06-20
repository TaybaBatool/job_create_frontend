// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   Select,
//   Typography,
//   Form,
//   Input,
//   message,
// } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { USER_ROLES } from "../utils/constant";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin } from "../api/authApi";

// const { Title } = Typography;
// const { Option } = Select;

// const LoginScreen = ({ onLogin }) => {
//   const [userType, setUserType] = useState(USER_ROLES[0].id);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const response = await loginAdmin({
//         email: values.email,
//         password: values.password,
//         role: userType,
//       });

//       const token = response.data?.data?.token;

//       if (token) {
//         localStorage.setItem("token", token);
//         message.success("Login successful!");
//         onLogin();
//         navigate("/dashboard");
//       } else {
//         message.error("Login failed. Token not received.");
//       }
//     } catch (error) {
//       const errMsg =
//         error?.response?.data?.message || "Login failed. Please try again.";
//       message.error(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"
//     >
//       <div className="w-full max-w-md px-6">
//         <Card
//           className="backdrop-blur-md bg-white/80 shadow-xl rounded-2xl"
//           bodyStyle={{ padding: 30 }}
//         >
//           <div className="text-center mb-6">
//             <Title
//               level={3}
//               className="text-blue-700 font-bold"
//               style={{ marginBottom: 0 }}
//             >
//               Welcome Back
//             </Title>
//             <p className="text-gray-600 text-sm">Login to your admin panel</p>
//           </div>

//           <Form layout="vertical" onFinish={onFinish}>
//             <Form.Item label="User Type">
//               <Select
//                 value={userType}
//                 onChange={(id) => setUserType(Number(id))}
//               >
//                 {USER_ROLES.map((type) => (
//                   <Option key={type.id} value={type.id}>
//                     {type.title}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Please enter a valid email address" },
//               ]}
//             >
//               <Input placeholder="Enter your email" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 { required: true, message: "Please enter your password" },
//               ]}
//             >
//               <Input.Password
//                 placeholder="Enter your password"
//                 iconRender={(visible) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 loading={loading}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;



import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  theme,
  Typography,
  Select,
  message,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";
import { USER_ROLES } from "../utils/constant";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
const { Option } = Select;

export default function LoginScreen({ onLogin }) {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(USER_ROLES[0].id);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginAdmin({
        email: values.email,
        password: values.password,
        role: userType,
      });

      const tokenValue = response.data?.data?.token;

      if (tokenValue) {
        localStorage.setItem("token", tokenValue);
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

  const styles = {
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f0f4f8, #d9e4f5)", // light professional gradient
      padding: "40px 20px",
    },
    container: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.95)", 
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      color: "#333",
    },
    forgotPassword: {
      float: "right",
      color: "#666",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    text: {
      color: "#555",
    },
    title: {
      color: "#222",
      fontSize: screens.md
        ? token.fontSizeHeading2
        : token.fontSizeHeading3,
      marginBottom: "8px",
    },
    input: {
      backgroundColor: "#fff",
      color: "#000",
      borderColor: "#ccc",
    },
    select: {
      backgroundColor: "#fff",
      color: "#000",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back! Enter your details to continue.
          </Text>
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label={<span style={{ color: "#222" }}>User Type</span>}>
            <Select
              value={userType}
              onChange={(id) => setUserType(Number(id))}
              size="large"
              style={styles.select}
              dropdownStyle={{ backgroundColor: "#fff" }}
            >
              {USER_ROLES.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#333" }}>Remember me</Checkbox>
            </Form.Item>
            {/* <a style={styles.forgotPassword} href="#">
              Forgot password?
            </a> */}
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
