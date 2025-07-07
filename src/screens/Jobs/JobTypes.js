import React, { useEffect, useState } from "react";
import { Button, Table, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import JobTypeModel from "../../components/Models/JobTypeModel";
import { addJobType, deleteJobType, getJobTypes, updateJobType } from "../../api/jobType";

const { Title } = Typography;

const JobType = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobTypes, setJobTypes] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobTypes = async () => {
    try {
      const res = await getJobTypes();
      const activeJobs = res.data.data.jobType.filter(job => !job.is_deleted);
      setJobTypes(activeJobs.map(item => ({ ...item, key: item.id })));
    } catch (err) {
      message.error("Failed to load job types");
    }
  };

  useEffect(() => {
    fetchJobTypes();
  }, []);

  const handleAddOrUpdateJobType = async (data) => {
    try {
      if (editingJob) {
        await updateJobType({ id: editingJob.id, ...data });
        message.success("Job type updated");
      } else {
        await addJobType(data);
        message.success("Job type added");
      }
      setShowModal(false);
      setEditingJob(null);
      fetchJobTypes();
    } catch (err) {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJobType(id, true);
      message.success("Job type deleted");
      fetchJobTypes();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  const handleEdit = (record) => {
    setEditingJob(record);
    setShowModal(true);
  };

  const columns = [
    { title: "Job Type Name", dataIndex: "name", key: "name" },
    // { title: "Price", dataIndex: "price", key: "price", render: (price) => `${price.toFixed(2)}` },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-4 text-gray-800">Job Types</Title>
      <Button
        type="primary"
        className="mb-4 bg-green-600 hover:bg-green-700"
        onClick={() => {
          setEditingJob(null);
          setShowModal(true);
        }}
      >
        Add New
      </Button>
      <Table className="shadow-lg" dataSource={jobTypes} columns={columns} rowKey="key" bordered />
      <JobTypeModel
        visible={showModal}
        onSave={handleAddOrUpdateJobType}
        onClose={() => {
          setShowModal(false);
          setEditingJob(null);
        }}
        initialData={editingJob}
      />
    </div>
  );
};

export default JobType;
