import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Select,
  message,
  Tooltip,
  Drawer,
  Input,
  Form,
} from "antd";
import {
  EditOutlined,
  DownloadOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import AddNewJobModel from "../../components/Models/AddNewJobModel";
import { getAllJobs, addJob, updateJobStatus } from "../../api/jobs";

const { Option } = Select;

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [filters, setFilters] = useState({
    jobNumber: "",
    status: "",
    support: "",
    jobType: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getAllJobs();
      const rawJobs = res.data.data.jobs || [];

      const formatted = rawJobs.map((job) => ({
        ...job,
        key: job.id,
        customerName: job.customer?.company_name || "N/A",
        frontSupport: job.front_support?.name || "N/A",
        backSupport: job.back_support?.name || "N/A",
        jobTypes: job.jobJobTypes?.map((j) => j.jobType.name).join(", ") || "N/A",
        visitingDate: job.visitig_date
          ? new Date(job.visitig_date).toLocaleDateString()
          : "N/A",
        propertyType:
          job.property_type === 1
            ? "House"
            : job.property_type === 2
            ? "Apartment"
            : "Other",
        status:
          job.job_status === 1
            ? "request"
            : job.job_status === 2
            ? "pending"
            : job.job_status === 3
            ? "in_progress"
            : job.job_status === 4
            ? "completed"
            : "unknown",
      }));

      setJobs(formatted);
      setFilteredJobs(formatted);
    } catch (err) {
      message.error("Error fetching jobs");
    }
  };

  const handleFilter = () => {
    const { jobNumber, status, support, jobType } = filters;

    const filtered = jobs.filter((job) => {
      const matchesJobNumber = job.job_number
        ?.toLowerCase()
        .includes(jobNumber.toLowerCase());
      const matchesStatus = status ? job.status === status : true;
      const matchesSupport =
        support === ""
          ? true
          : job.frontSupport === support || job.backSupport === support;
      const matchesJobType = jobType
        ? job.jobTypes.toLowerCase().includes(jobType.toLowerCase())
        : true;

      return (
        matchesJobNumber && matchesStatus && matchesSupport && matchesJobType
      );
    });

    setFilteredJobs(filtered);
    setDrawerVisible(false); // close filter drawer
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  const handleSaveJob = async (jobData) => {
    try {
      const payload = {
        ...jobData,
        job_types: [
          { jobTypeId: 1, discount: 2, additional_charges: 5 },
          { jobTypeId: 2, discount: 0, additional_charges: 0 },
        ],
        total_discount: 53,
        total_additional_charges: 2,
        total_amount_after_dis: 51,
      };

      await addJob(payload);
      message.success("Job saved successfully");
      fetchJobs();
      handleCloseModal();
    } catch (error) {
      message.error("Failed to save job");
    }
  };

  const handleStatusChange = async (id, value) => {
    const statusMap = {
      request: 1,
      pending: 2,
      in_progress: 3,
      completed: 4,
    };

    try {
      await updateJobStatus(id, statusMap[value]);
      fetchJobs();
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Job Number", dataIndex: "job_number" },
    { title: "Customer", dataIndex: "customerName" },
    { title: "Address", dataIndex: "address" },
    { title: "Postal Code", dataIndex: "property_postalCode" },
    { title: "Property Type", dataIndex: "propertyType" },
    { title: "Visiting Date", dataIndex: "visitingDate" },
    { title: "Time", dataIndex: "time" },
    { title: "Front Support", dataIndex: "frontSupport" },
    { title: "Back Support", dataIndex: "backSupport" },
    { title: "Job Types", dataIndex: "jobTypes" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 130 }}
        >
          <Option value="request">Request</Option>
          <Option value="pending">Pending</Option>
          <Option value="in_progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditJob(record)}
            />
          </Tooltip>
          <Tooltip title="Download Invoice">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              // onClick={() => downloadInvoice(record)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingJob(null);
            setShowModal(true);
          }}
        >
          Add New Job
        </Button>
        <Button
          icon={<FilterOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Filters
        </Button>
      </div>

      <Table
        dataSource={filteredJobs}
        columns={columns}
        style={{ marginTop: 20 }}
      />

      <AddNewJobModel
        visible={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />

      {/* Sidebar Drawer Filter */}
      <Drawer
        title="Filter Jobs"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Form layout="vertical">
          <Form.Item label="Job Number">
            <Input
              value={filters.jobNumber}
              onChange={(e) =>
                setFilters({ ...filters, jobNumber: e.target.value })
              }
              placeholder="Enter Job Number"
            />
          </Form.Item>

          <Form.Item label="Front/Back Support">
            <Select
              value={filters.support}
              onChange={(value) => setFilters({ ...filters, support: value })}
              placeholder="Select Support"
              allowClear
            >
              {[...new Set(jobs.map((job) => job.frontSupport))]
                .concat([...new Set(jobs.map((job) => job.backSupport))])
                .filter(Boolean)
                .map((name, idx) => (
                  <Option key={idx} value={name}>
                    {name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status">
            <Select
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              placeholder="Select Status"
              allowClear
            >
              <Option value="request">Request</Option>
              <Option value="pending">Pending</Option>
              <Option value="in_progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Job Type">
            <Input
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
              placeholder="Enter Job Type"
            />
          </Form.Item>

          <Button type="primary" block onClick={handleFilter}>
            Apply Filters
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Jobs;
