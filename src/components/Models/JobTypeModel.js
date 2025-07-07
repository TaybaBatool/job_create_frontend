import React, { useEffect } from "react";
import { Modal, InputNumber, Input, Form } from "antd";
import "antd/dist/reset.css";

const JobTypeModel = ({ visible, onSave, onClose, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
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
    <Modal title={initialData ? "Edit Job Type" : "Add Job Type"} open={visible} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item label="Job Name" name="name" rules={[{ required: true, message: "Job name is required" }]}>
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
export default JobTypeModel
