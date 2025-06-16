import React from "react";
import { Modal, Input, Form } from "antd";
import "antd/dist/reset.css";

const AreaCodeModel = ({ visible, onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal title="Add Area Code" open={visible} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Area Code"
          name="name"
          rules={[{ required: true, message: "Area Code is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AreaCodeModel;
