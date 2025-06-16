import React, { useEffect, useState } from "react";
import { Button, Table, Typography, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import CustomerModal from "../../components/Models/CustomerModal";
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers
} from "../../api/customers";

const { Title } = Typography;

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      const formatted = res.data.data.customer.map((cust) => ({
        ...cust,
        key: cust.id
      }));
      setCustomers(formatted);
    } catch (err) {
      message.error("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSaveCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        await updateCustomer({ id: editingCustomer.id, ...customerData });
        message.success("Customer updated");
      } else {
        await addCustomer({ area_id: 2, ...customerData }); // add area_id or make dynamic
        message.success("Customer added");
      }
      setShowModal(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      message.success("Customer deleted");
      fetchCustomers();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  const handleEdit = (record) => {
    setEditingCustomer(record);
    setShowModal(true);
  };

  const columns = [
    { title: "Company Name", dataIndex: "company_name", key: "company_name" },
    { title: "Customer Type", dataIndex: "customer_type", key: "customer_type" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Postal Code", dataIndex: "postal_code", key: "postal_code" },
    { title: "Contact Name 1", dataIndex: "contact_name1", key: "contact_name1" },
    { title: "Contact Number 1", dataIndex: "contact_number1", key: "contact_number1" },
    { title: "Contact Name 2", dataIndex: "contact_name2", key: "contact_name2" },
    { title: "Contact Number 2", dataIndex: "contact_number2", key: "contact_number2" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Invoice Name", dataIndex: "invoice_name", key: "invoice_name" },
    { title: "Invoice Address", dataIndex: "invoice_address", key: "invoice_address" },
    { title: "Invoice Email", dataIndex: "invoice_email", key: "invoice_email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">Customer Management</Title>
      <Button type="primary" className="mb-4 bg-green-600 hover:bg-green-700" onClick={() => setShowModal(true)}>
        Add New Customer
      </Button>
      <Table className="shadow-lg" dataSource={customers} columns={columns} rowKey="key" bordered />
      <CustomerModal
        visible={showModal}
        onSave={handleSaveCustomer}
        onClose={() => { setShowModal(false); setEditingCustomer(null); }}
        editingCustomer={editingCustomer}
      />
    </div>
  );
};

export default Customers;
