// import React, { useState } from "react";
// import { Button,Table, Typography } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import StaffFormModal from "../../components/Models/StaffFormModal";
// import "antd/dist/reset.css";
// import { getAdmins, addAdmin, updateAdmin, updateAdminStatus } from "../../api/adminApi";

// const { Title } = Typography;
// const SubAdmin = () => {
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
//         <Title level={2} className="text-center mb-4 text-gray-800">Sub Admins</Title>
//         <Button type="primary" className="mb-4 bg-green-600 hover:bg-green-700" onClick={() => setShowModal(true)}>Add New</Button>
//         <Table className="shadow-lg" dataSource={staff} columns={columns} rowKey="key" bordered />
//         <StaffFormModal visible={showModal} onSave={handleAddStaff} onClose={() => setShowModal(false)} />
//       </div>
//     );
//   };
  
//   export default SubAdmin
import React, { useState, useEffect } from "react";
import { Button, Table, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StaffFormModal from "../../components/Models/StaffFormModal";
import {
  getAdmins,
  addAdmin,
  updateAdmin,
  updateAdminStatus,
} from "../../api/admin";

const { Title } = Typography;

const SubAdmin = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins();
      const admins = res.data.data.admin.map((admin) => ({
        ...admin,
        key: admin.id,
        phone: admin.phone_number,
      }));
      setStaff(admins);
    } catch (err) {
      message.error("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddStaff = async (values) => {
    try {
      if (editingAdmin) {
        await updateAdmin({
          id: editingAdmin.id,
          name: values.name,
          phone_number: values.phone,
        });
        message.success("Admin updated successfully");
      } else {
        await addAdmin({
          name: values.name,
          phone_number: values.phone,
          email: values.email,
          password: values.password,
        });
        message.success("Admin added successfully");
      }
      fetchAdmins();
      setShowModal(false);
      setEditingAdmin(null);
    } catch (err) {
      message.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await updateAdminStatus(id, 2); // 2 = inactive
      message.success("Admin deactivated successfully");
      fetchAdmins();
    } catch (err) {
      message.error("Failed to deactivate admin");
    }
  };

  const handleEdit = (record) => {
    setEditingAdmin(record);
    setShowModal(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">
        Sub Admins
      </Title>
      <Button
        type="primary"
        className="mb-4 bg-green-600 hover:bg-green-700"
        onClick={() => {
          setEditingAdmin(null);
          setShowModal(true);
        }}
      >
        Add New
      </Button>
      <Table
        className="shadow-lg"
        dataSource={staff}
        columns={columns}
        rowKey="key"
        bordered
      />
      <StaffFormModal
        visible={showModal}
        onSave={handleAddStaff}
        onClose={() => {
          setShowModal(false);
          setEditingAdmin(null);
        }}
        initialData={editingAdmin}
      />
    </div>
  );
};

export default SubAdmin;
