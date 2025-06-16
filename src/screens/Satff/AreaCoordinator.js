import React, { useEffect, useState } from "react";
import { Button, Table, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  addAreaCoordinator,
  updateAreaCoordinator,
  updateAreaCoordinatorStatus,
  getAreaCoordinators,
} from "../../api/areaCoordinatorApi"; // Adjust the path based on your folder structure
import AddAreaCoordinatorModel from "../../components/Models/AddAreaCoordinator";
import "antd/dist/reset.css";

const { Title } = Typography;

const AreaCoordinator = () => {
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchCoordinators = async () => {
    try {
      const res = await getAreaCoordinators();
      const formatted = res.data.data.areaCoordinator.map((item) => ({
        ...item,
        key: item.id,
        phone: item.phone_number,
      }));
      setStaff(formatted);
    } catch (error) {
      message.error("Failed to fetch area coordinators");
    }
  };

  const handleAddOrUpdate = async (values) => {
    const payload = {
      name: values.name,
      phone_number: values.phone,
      email: values.email,
      password: values.password,
      permission: ["AB", "CD", "EF"], // replace with actual values if needed
    };

    try {
      if (editData) {
        await updateAreaCoordinator({ ...payload, id: editData.id });
        message.success("Updated successfully");
      } else {
        await addAreaCoordinator(payload);
        message.success("Added successfully");
      }

      setShowModal(false);
      setEditData(null);
      fetchCoordinators();
    } catch (error) {
      message.error("Error saving data");
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await updateAreaCoordinatorStatus(id, 0);
      message.success("Deactivated successfully");
      fetchCoordinators();
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCoordinators();
  }, []);

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">
        Area Coordinators
      </Title>
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
      <Table dataSource={staff} columns={columns} rowKey="id" bordered />
      <AddAreaCoordinatorModel
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

export default AreaCoordinator;
