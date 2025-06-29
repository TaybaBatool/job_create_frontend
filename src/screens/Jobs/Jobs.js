import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DownloadOutlined,
  PlusOutlined,
  FilterOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AddNewJobModel from "../../components/Models/AddNewJobModel";
import {
  getAllJobs,
  addJob,
  getJobById,
} from "../../api/jobs";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

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
        jobTypes:
          job.jobJobTypes?.map((j) => j.jobType.name).join(", ") || "N/A",
        visitingDate: job.visitig_date
          ? new Date(job.visitig_date).toLocaleDateString()
          : "N/A",
        propertyType:
          job.property_type === 1
            ? "House"
            : job.property_type === 2
            ? "Apartment"
            : "Other",
      }));
      setJobs(formatted);
      setFilteredJobs(formatted);
    } catch (err) {
      message.error("Error fetching jobs");
    }
  };

  const handleEditJob = async (job) => {
    try {
      const res = await getJobById(job.id);
      setEditingJob(res.data.data.job[0]);
      setShowModal(true);
    } catch (err) {
      message.error("Failed to fetch job details");
    }
  };

  const handleSaveJob = async (jobData) => {
    try {
      await addJob(jobData);
      message.success("Job saved successfully");
      fetchJobs();
      setShowModal(false);
    } catch (error) {
      message.error("Failed to save job");
    }
  };

  const getRowStyle = (status) => {
    const statusColors = {
      1: "#e6f7ff", // Request
      2: "#fff1f0", // Cancel
      3: "#fff7e6", // Confirm
      4: "#f9f0ff", // Property Visit
      5: "#f6ffed", // Complete
      6: "#e6fffb", // Email Send
      7: "#fffbe6", // Invoice
      8: "#f0fff0", // Payment Success
    };
    return { backgroundColor: statusColors[status] || "white" };
  };

  const columns = [
    { title: "Job Number", dataIndex: "job_number" },
    { title: "Customer", dataIndex: "customerName" },
    { title: "Address", dataIndex: "address" },
    { title: "Postal Code", dataIndex: "property_postalCode" },
    { title: "Property Type", dataIndex: "propertyType" },
    { title: "Visiting Date", dataIndex: "visitingDate" },
    { title: "Time", dataIndex: "time" },
    { title: "Job Types", dataIndex: "jobTypes" },
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
              onClick={() =>
                window.open(
                  `http://localhost:4000/api/job/view_invoice_by_id?id=${record.id}`,
                  "_blank"
                )
              }
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/job-details/${record.id}`)}
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
        <Button icon={<FilterOutlined />}>Filters</Button>
      </div>

      <Table
        dataSource={filteredJobs}
        columns={columns}
        style={{ marginTop: 20 }}
        rowClassName={(record) => "job-row"}
        rowKey="key"
        onRow={(record) => {
          return {
            style: getRowStyle(record.job_status),
          };
        }}
      />

      <AddNewJobModel
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />
    </div>
  );
};

export default Jobs;
