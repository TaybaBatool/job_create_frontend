import React, { useState, useEffect } from "react";
import { Button, Table, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import SupportPersonModal from "../../components/Models/SupportPersonModal";
import {
  addSupportStaff,
  updateSupportStaff,
  updateSupportStaffStatus,
  getSupportStaff,
} from "../../api/supportStaffApi"; // adjust path if needed

const { Title } = Typography;

const SupportPerson = () => {
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchSupportStaff = async () => {
    try {
      const res = await getSupportStaff();
      const formatted = res.data.data.supportStaff.map((item) => ({
        ...item,
        key: item.id,
        phone: item.phone_number,
      }));
      setStaff(formatted);
    } catch (err) {
      message.error("Failed to fetch support staff");
    }
  };

  const handleAddOrUpdate = async (values) => {
    try {
      const payload = {
        name: values.name,
        phone_number: values.phone,
        email: values.email,
        password: values.password,
        role: 5,
      };

      if (editData) {
        await updateSupportStaff({ ...payload, id: editData.id });
        message.success("Updated successfully");
      } else {
        await addSupportStaff(payload);
        message.success("Added successfully");
      }

      setShowModal(false);
      setEditData(null);
      fetchSupportStaff();
    } catch (err) {
      message.error("Failed to save support staff");
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await updateSupportStaffStatus(id, 0);
      message.success("Deactivated successfully");
      fetchSupportStaff();
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Role", dataIndex: "role" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchSupportStaff();
  }, []);

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">Support Persons</Title>
      <Button
        type="primary"
        className="mb-4 bg-green-600 hover:bg-green-700"
        onClick={() => {
          setEditData(null);
          setShowModal(true);
        }}
      >
        Add New
      </Button>
      <Table className="shadow-lg" dataSource={staff} columns={columns} rowKey="id" bordered />
      <SupportPersonModal
        visible={showModal}
        onSave={handleAddOrUpdate}
        onClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        initialData={editData}
      />
    </div>
  );
};

export default SupportPerson;
