import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById, updateJobStatus } from "../../api/jobs";
import { Card, Select, message, Steps, Tag, Row, Col, Table, Descriptions } from "antd";

const { Option } = Select;
const { Step } = Steps;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const res = await getJobById(id);
      const data = res.data.data.job[0];
      setJob(data);
      setStatus(data.job_status);
    } catch (err) {
      message.error("Failed to load job");
    }
  };

  const handleStatusChange = async (value) => {
    try {
      await updateJobStatus(id, value);
      message.success("Status updated");
      fetchJobDetails();
    } catch {
      message.error("Failed to update status");
    }
  };

  const statusMap = {
    1: { name: "Request", color: "blue" },
    2: { name: "Cancel", color: "red" },
    3: { name: "Confirm", color: "orange" },
    4: { name: "Property Visit", color: "purple" },
    5: { name: "Complete", color: "green" },
    6: { name: "Email Send", color: "cyan" },
    7: { name: "Invoice", color: "gold" },
    8: { name: "Payment Success", color: "lime" },
  };

  const getStatusName = (s) => statusMap[s]?.name || "Unknown";
  const getStatusColor = (s) => statusMap[s]?.color || "default";

  const jobTypeColumns = [
    { title: "Job Type", dataIndex: ["jobType", "name"] },
    { title: "Price", dataIndex: ["jobType", "total_amount"] },
    { title: "Discount", dataIndex: "discount" },
    { title: "Additional Charges", dataIndex: "additional_charges" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          padding: "12px 20px",
          marginBottom: 24,
          borderRadius: 6,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Job Details - {job?.job_number}</h2>
          <Tag color={getStatusColor(status)} style={{ fontSize: 16 }}>
            {getStatusName(status)}
          </Tag>
        </div>
        <div>
          <Select
            value={status}
            onChange={handleStatusChange}
            style={{ width: 200 }}
          >
            {Object.entries(statusMap).map(([value, { name }]) => (
              <Option key={value} value={parseInt(value)}>
                {name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Job Timeline">
            <Steps direction="vertical" current={status - 1}>
              {job?.jobHistories?.map((h, i) => (
                <Step
                  key={i}
                  title={getStatusName(h.status)}
                  description={`${h.user_name} - ${new Date(
                    h.change_date
                  ).toLocaleDateString()}`}
                  status={h.status === status ? "process" : "finish"}
                />
              ))}
            </Steps>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Job Types">
            <Table
              dataSource={job?.jobJobTypes || []}
              columns={jobTypeColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
       <Card title="Basic Job Information" style={{ marginBottom: 24 }}>
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Visit Date">
            {new Date(job?.visitig_date).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Time">{job?.time}</Descriptions.Item>
          <Descriptions.Item label="Address">{job?.address}</Descriptions.Item>
          <Descriptions.Item label="Postal Code">{job?.property_postalCode}</Descriptions.Item>
          <Descriptions.Item label="Job Created At">
            {new Date(job?.created_at).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card title="Front Support">
            <p><b>Name:</b> {job?.front_support?.name}</p>
            <p><b>Email:</b> {job?.front_support?.email}</p>
            <p><b>Phone:</b> {job?.front_support?.phone_number}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Back Support">
            <p><b>Name:</b> {job?.back_support?.name}</p>
            <p><b>Email:</b> {job?.back_support?.email}</p>
            <p><b>Phone:</b> {job?.back_support?.phone_number}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Customer Details">
            <p><b>Company:</b> {job?.customer?.company_name}</p>
            <p><b>Email:</b> {job?.customer?.email}</p>
            <p><b>Phone 1:</b> {job?.customer?.contact_number1}</p>
            <p><b>Phone 2:</b> {job?.customer?.contact_number2}</p>
            <p><b>Address:</b> {job?.customer?.address}</p>
            <p><b>Postal Code:</b> {job?.customer?.postal_code}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetails;
