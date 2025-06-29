import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Spin, Select } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { getDashboardJob } from "../api/jobs"; // Adjust path as needed

// Localization for react-big-calendar
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Color mapping for job_status
const statusColorMap = {
  1: "#1890ff", // Request
  2: "#ff4d4f", // Cancel
  3: "#52c41a", // Confirm
  4: "#722ed1", // Visit
  5: "#faad14", // Complete
  6: "#13c2c2", // Email
  7: "#eb2f96", // Invoice
  8: "#2f54eb", // Payment
};

// Job status label mapping
const statusLabels = {
  1: "Request",
  2: "Cancel",
  3: "Confirm",
  4: "Visit",
  5: "Complete",
  6: "Email",
  7: "Invoice",
  8: "Payment",
};

const SuperAdminDashboard = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [events, setEvents] = useState([]);
  const [statusSummary, setStatusSummary] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getDashboardJob(month, year);
        // const jobs = res.data?.jobs || [];
        const jobs = res?.data?.data?.jobs || [];
        setStatusSummary(res.data?.data?.statusSummary || {});

        const formatted = jobs.map((job) => {
          const date = new Date(job.created_at);
          const [h, m, s] = job.time?.split(":").map(Number) || [10, 0, 0];
          date.setHours(h, m, s);
          return {
            title: job.job_number,
            start: new Date(date),
            end: new Date(date),
            allDay: false,
            resource: {
              status: job.job_status,
              color: statusColorMap[job.job_status] || "#d9d9d9",
            },
          };
        });

        setEvents(formatted);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [month, year]);

  // Style each calendar event
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.resource.color,
      color: "white",
      borderRadius: "4px",
      padding: "4px",
      border: "none",
    },
  });

  // Month and year options
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
    value: i + 1,
  }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = new Date().getFullYear() - 2 + i;
    return { label: y, value: y };
  });

  return (
    <Spin spinning={loading}>
      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ background: "#e6f7ff", borderLeft: "6px solid #1890ff" }}
          >
            <Statistic
              title="Total Jobs"
              value={events.length}
              valueStyle={{ color: "#1890ff" }}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Card>
            <Row gutter={[8, 8]}>
              {Object.entries(statusSummary).map(([key, value]) => {
                const color = statusColorMap[parseInt(key)] || "#d9d9d9";
                return (
                  <Col span={6} key={key}>
                    <Card
                      size="small"
                      style={{
                        borderLeft: `4px solid ${color}`,
                        background: "#fafafa",
                      }}
                    >
                      <Statistic
                        title={statusLabels[key] || key}
                        value={value}
                        valueStyle={{ fontSize: 14 }}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            value={month}
            onChange={(value) => setMonth(value)}
            options={monthOptions}
            placeholder="Select Month"
          />
        </Col>
        <Col>
          <Select
            value={year}
            onChange={(value) => setYear(value)}
            options={yearOptions}
            placeholder="Select Year"
          />
        </Col>
      </Row>

      {/* Calendar */}
      <Card>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month"]}
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          defaultDate={new Date(year, month - 1, 1)}
        />
      </Card>
    </Spin>
  );
};

export default SuperAdminDashboard;
