// import { Modal, Select, Input, Form, Table } from "antd";
// import "antd/dist/reset.css";
// import { USER_ROLES } from "../../utils/constant";
// const { Option } = Select;

// const StaffFormModal = ({ visible, onSave, onClose }) => {
//   const [form] = Form.useForm();

//   const handleSubmit = () => {
//     form.validateFields().then((values) => {
//       onSave(values);
//       form.resetFields();
//     });
//   };

//   return (
//     <Modal title="Add New" visible={visible} onCancel={onClose} onOk={handleSubmit}>
//       <Form form={form} layout="vertical">
//         {/* <Form.Item label="Role" name="role" rules={[{ required: true }]}> 
//           <Select>
//             {USER_ROLES.slice(1).map((role) => (
//               <Option key={role.id} value={role.title}>{role.title}</Option>
//             ))}
//           </Select>
//         </Form.Item> */}
//         <Form.Item label="Name" name="name" rules={[{ required: true }]}> 
//           <Input />
//         </Form.Item>
//         <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}> 
//           <Input />
//         </Form.Item>
//         <Form.Item label="Phone" name="phone" rules={[{ required: true }]}> 
//           <Input />
//         </Form.Item>
//         <Form.Item label="Password" name="password" rules={[{ required: true }]}> 
//           <Input.Password />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

//   export default StaffFormModal
import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";

const StaffFormModal = ({ visible, onSave, onClose, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        phone: initialData.phone,
        email: initialData.email,
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
    <Modal title={initialData ? "Edit Admin" : "Add Admin"} visible={visible} onCancel={onClose} onOk={handleSubmit}>
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

export default StaffFormModal;
