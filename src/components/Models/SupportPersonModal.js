import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Form, Table } from "antd";
import "antd/dist/reset.css";
import { SUPPORT_USER, USER_ROLES } from "../../utils/constant";
const { Option } = Select;

// Add initialData to props and set initial form values
const SupportPersonModal = ({ visible, onSave, onClose, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        role: initialData.role,
        password: "", // leave empty for update
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal title={initialData ? "Edit Staff" : "Add New"} visible={visible} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select>
            {SUPPORT_USER.map((role) => (
              <Option key={role.id} value={role.title}>{role.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {!initialData && (
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default SupportPersonModal;
  