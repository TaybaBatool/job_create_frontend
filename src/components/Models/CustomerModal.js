import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CUSTOMER_TYPE } from "../../utils/constant";

const { Option } = Select;

const CustomerModal = ({ visible, onSave, onClose, editingCustomer }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCustomer) {
      form.setFieldsValue({
        ...editingCustomer,
        customer_type: Number(editingCustomer.customer_type),
      });
    } else {
      form.resetFields();
    }
  }, [editingCustomer, form]);

  const handleFinish = (values) => {
    // console.log("Submitting:", values);
    onSave(values);
  };

  return (
    <Modal
      title={editingCustomer ? "Edit Customer" : "Add Customer"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onClose}
      okText={editingCustomer ? "Update" : "Add"}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          customer_type: 1,
        }}
      >
        <Form.Item
          label="Company Name"
          name="company_name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Customer Type"
          name="customer_type"
          rules={[{ required: true, message: "Please select customer type" }]}
        >
          <Select placeholder="Select customer type">
            {CUSTOMER_TYPE.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Postal Code" name="postal_code">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Name 1" name="contact_name1">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Number 1" name="contact_number1">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Name 2" name="contact_name2">
          <Input />
        </Form.Item>

        <Form.Item label="Contact Number 2" name="contact_number2">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "Enter a valid email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Invoice Name" name="invoice_name">
          <Input />
        </Form.Item>

        <Form.Item label="Invoice Address" name="invoice_address">
          <Input />
        </Form.Item>

        <Form.Item
          label="Invoice Email"
          name="invoice_email"
          rules={[{ type: "email", message: "Enter a valid invoice email" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
