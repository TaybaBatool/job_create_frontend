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
      const activeJobs = res.data.data.jobType.filter((job) => !job.is_deleted);
      setJobTypes(activeJobs.map((item) => ({ ...item, key: item.id })));
    } catch {
      message.error("Failed to load job types");
    }
  };

  useEffect(() => {
    if (editingJob) {
      const transformed = {
        ...editingJob,
        property_type: Number(editingJob.property_type),
        customer_id: Number(editingJob.customer_id),
        front_support: Number(editingJob.front_support),
        back_support: Number(editingJob.back_support),
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
          job_types: values.job_types.map((jt) => ({
            jobTypeId: jt.jobTypeId,
            discount: Number(jt.discount),
            additional_charges: Number(jt.additional_charges),
          })),
          total_discount: Number(values.total_discount),
          total_additional_charges: Number(values.total_additional_charges),
          total_amount_after_dis: Number(values.total_amount_after_dis),
        };

        onSave(formattedValues);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
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
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }} // Scrollable
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
              <TimePicker style={{ width: "100%" }} format="hh:mm A" use12Hours />
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
              rules={[{ required: true }]}
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
              rules={[{ required: true }]}
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

        {/* Job Type Entries */}
        <Form.List name="job_types" rules={[{ required: true }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} align="middle">
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Job Type"
                      name={[name, "jobTypeId"]}
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select Job Type">
                        {jobTypes.map((jt) => (
                          <Option key={jt.id} value={jt.id}>
                            {jt.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      label="Discount"
                      name={[name, "discount"]}
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      label="Additional Charges"
                      name={[name, "additional_charges"]}
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <a onClick={() => remove(name)}>Remove</a>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <a onClick={() => add()}>+ Add Job Type</a>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Totals */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Total Discount"
              name="total_discount"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Total Additional Charges"
              name="total_additional_charges"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Total Amount After Discount"
              name="total_amount_after_dis"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddNewJobModel;
