import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  Input,
  Form,
  DatePicker,
  Row,
  Col,
  message,
  TimePicker,
} from "antd";
import moment from "moment";
import { PROPERTY_TYPE } from "../../utils/constant";
import { getCustomers } from "../../api/customers";
import { getSupportStaff } from "../../api/supportStaffApi";
import { getJobTypes } from "../../api/jobType";

const { Option } = Select;

const AddNewJobModel = ({ visible, onSave, onClose, editingJob }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [frontSupportList, setFrontSupportList] = useState([]);
  const [backSupportList, setBackSupportList] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchSupportStaff();
    fetchJobTypes();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      const formatted = res.data.data.customer.map((cust) => ({
        ...cust,
        key: cust.id,
      }));
      setCustomers(formatted);
    } catch {
      message.error("Failed to load customers");
    }
  };

  const fetchSupportStaff = async () => {
    try {
      const res = await getSupportStaff();
      const formatted = res.data.data.supportStaff.map((item) => ({
        ...item,
        key: item.id,
        phone: item.phone_number,
      }));

      const front = formatted.filter((item) => item.role === 4);
      const back = formatted.filter((item) => item.role === 5);

      setFrontSupportList(front);
      setBackSupportList(back);
    } catch {
      message.error("Failed to fetch support staff");
    }
  };

  const fetchJobTypes = async () => {
    try {
      const res = await getJobTypes();
      const activeJobs = res.data.data.jobType.filter(job => !job.is_deleted);
      setJobTypes(activeJobs.map(item => ({ ...item, key: item.id })));
    } catch {
      message.error("Failed to load job types");
    }
  };

useEffect(() => {
  if (editingJob) {
    const transformed = {
      ...editingJob,
      property_type: Number(editingJob.property_type), // Ensure number
      customer_id: Number(editingJob.customer_id),
      front_support: Number(editingJob.front_support),
      back_support: Number(editingJob.back_support),
      job_types: editingJob.job_types?.map((jt) => Number(jt)) || [],
      visitig_date: editingJob.visitig_date ? moment(editingJob.visitig_date) : null,
      time: editingJob.time ? moment(editingJob.time, "HH:mm:ss") : null,
    };
    form.setFieldsValue(transformed);
  } else {
    form.resetFields();
  }
}, [editingJob, form]);


  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          time: values.time?.format("HH:mm:ss"),
          visitig_date: values.visitig_date?.format("YYYY-MM-DD"),
          job_types: values.job_types,
        };
        onSave(formattedValues);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
 const handleCancel = () => {
  form.resetFields();
    onClose(); 
  };
  return (
    <Modal
      title={editingJob ? "Edit Job" : "Add Job"}
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      width={800}
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Customer"
          name="customer_id"
          rules={[{ required: true, message: "Please select a customer" }]}
        >
          <Select placeholder="Select Customer" allowClear>
            {customers.map((customer) => (
              <Option key={customer.id} value={customer.id}>
                {customer.customer_number} - {customer.company_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Postal Code"
              name="property_postalCode"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Property Type"
          name="property_type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select property type" allowClear>
            {PROPERTY_TYPE.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Visiting Date"
              name="visitig_date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Visiting Time"
              name="time"
              rules={[{ required: true }]}
            >
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Contact Name 1"
              name="contact_name1"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact Number 1"
              name="contact_number1"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Contact Name 2" name="contact_name2">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Contact Number 2" name="contact_number2">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Front Support"
              name="front_support"
              rules={[{ required: true, message: "Please select front support" }]}
            >
              <Select placeholder="Select front support" allowClear>
                {frontSupportList.map((staff) => (
                  <Option key={staff.id} value={staff.id}>
                    {staff.name} ({staff.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Back Support"
              name="back_support"
              rules={[{ required: true, message: "Please select back support" }]}
            >
              <Select placeholder="Select back support" allowClear>
                {backSupportList.map((staff) => (
                  <Option key={staff.id} value={staff.id}>
                    {staff.name} ({staff.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Job Types"
          name="job_types"
          rules={[{ required: true, message: "Please select at least one job type" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select job types"
            optionLabelProp="label"
            allowClear
          >
            {jobTypes.map((job) => (
              <Option key={job.id} value={job.id} label={job.title}>
                {job.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewJobModel;
