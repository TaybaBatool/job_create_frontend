// import React, { useState } from "react";
// import { Button,Table, Typography } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import StaffFormModal from "../components/Models/StaffFormModal";
// import "antd/dist/reset.css";
// const { Title } = Typography;
// const SuperAdminDashboard = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [staff, setStaff] = useState([]);
  
//     const handleAddStaff = (newStaff) => {
//       setStaff([...staff, { ...newStaff, key: staff.length + 1 }]);
//       setShowModal(false);
//     };
  
//     const handleDelete = (key) => {
//       setStaff(staff.filter((item) => item.key !== key));
//     };
  
//     const handleEdit = (key) => {
//       setShowModal(true);
//     };
  
//     const columns = [
//       { title: "Name", dataIndex: "name", key: "name" },
//       { title: "Role", dataIndex: "role", key: "role" },
//       { title: "Email", dataIndex: "email", key: "email" },
//       { title: "Phone", dataIndex: "phone", key: "phone" },
//       {
//         title: "Actions",
//         key: "actions",
//         render: (_, record) => (
//           <div className="flex space-x-2">
//             <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.key)} />
//             <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
//           </div>
//         ),
//       },
//     ];
  
//     return (
//       <div className="p-6">
//         <Title level={2} className="text-center mb-4 text-gray-800">Super Admin Dashboard</Title>
//         <Button type="primary" className="mb-4 bg-green-600 hover:bg-green-700" onClick={() => setShowModal(true)}>Add New</Button>
//         <Table className="shadow-lg" dataSource={staff} columns={columns} rowKey="key" bordered />
//         <StaffFormModal visible={showModal} onSave={handleAddStaff} onClose={() => setShowModal(false)} />
//       </div>
//     );
//   };
  import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Spin } from "antd";
import {
  ProfileOutlined,
  TeamOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
// import { getDashboardStats } from "../../api/dashboard"; // hypothetical API

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCustomers: 0,
    totalUsers: 0,
  });

  // useEffect(() => {
  //   fetchStats();
  // }, []);

  // const fetchStats = async () => {
  //   try {
  //     const res = await getDashboardStats(); // API should return counts
  //     setStats({
  //       totalJobs: res.data.totalJobs,
  //       totalCustomers: res.data.totalCustomers,
  //       totalUsers: res.data.totalUsers,
  //     });
  //   } catch {
  //     // fallback or toast
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Spin spinning={loading}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#e6f7ff", borderLeft: "6px solid #1890ff" }}
          >
            <Statistic
              title="Total Jobs"
              value={"12"}
              valueStyle={{ color: "#1890ff" }}
              prefix={<FileDoneOutlined style={{ fontSize: 24 }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#f6ffed", borderLeft: "6px solid #52c41a" }}
          >
            <Statistic
              title="Total Customers"
              value={"20"}
              valueStyle={{ color: "#52c41a" }}
              prefix={<TeamOutlined style={{ fontSize: 24 }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#fff7e6", borderLeft: "6px solid #fa8c16" }}
          >
            <Statistic
              title="Total Users"
              value={"30"}
              valueStyle={{ color: "#fa8c16" }}
              prefix={<ProfileOutlined style={{ fontSize: 24 }} />}
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};
  export default SuperAdminDashboard