import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";
const AddAreaCoordinatorModel = ({ visible, onSave, onClose, initialData }) => {
    const [form] = Form.useForm();
  
    useEffect(() => {
      if (initialData) {
        form.setFieldsValue({
          name: initialData.name,
          phone: initialData.phone_number,
          email: initialData.email,
        });
      } else {
        form.resetFields();
      }
    }, [initialData, form]);
  
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        onSave(values);
      });
    };
  
    return (
      <Modal
        title={initialData ? "Edit Area Coordinator" : "Add Area Coordinator"}
        visible={visible}
        onCancel={onClose}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input disabled={!!initialData} />
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
   export default AddAreaCoordinatorModel
  