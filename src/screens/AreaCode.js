import React, { useState, useEffect } from "react";
import { Button, Table, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import AreaCodeModel from "../components/Models/AreaCodeModel";
import {
  getAreaCodes,
  addAreaCode,
  deleteAreaCode,
} from "../api/areaCode"; // adjust path if needed

const { Title } = Typography;

const AreaCode = () => {
  const [showModal, setShowModal] = useState(false);
  const [areaCodes, setAreaCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAreaCodes = async () => {
    setLoading(true);
    try {
      const res = await getAreaCodes();
      const data = res.data.data.areaCode.map((item) => ({
        ...item,
        key: item.id,
      }));
      setAreaCodes(data);
    } catch (err) {
      message.error("Failed to fetch area codes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAreaCode = async (newAreaCode) => {
    try {
      await addAreaCode({ name: newAreaCode.name });
      message.success("Area code added");
      setShowModal(false);
      fetchAreaCodes();
    } catch (err) {
      message.error("Failed to add area code");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAreaCode(id);
      message.success("Area code deleted");
      fetchAreaCodes();
    } catch (err) {
      message.error("Failed to delete area code");
    }
  };

  const columns = [
    { title: "Area Code", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          {/* Edit functionality is not implemented; can be added if needed */}
          <Button type="link" icon={<EditOutlined />} onClick={() => {}} disabled />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAreaCodes();
  }, []);

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">Area Code</Title>
      <Button 
        type="primary" 
        className="mb-4 bg-green-600 hover:bg-green-700" 
        onClick={() => setShowModal(true)}
      >
        Add New
      </Button>
      <Table
        loading={loading}
        className="shadow-lg"
        dataSource={areaCodes}
        columns={columns}
        rowKey="id"
        bordered
      />
      <AreaCodeModel
        visible={showModal}
        onSave={handleAddAreaCode}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default AreaCode;
