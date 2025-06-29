// App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import SuperAdminDashboard from "./screens/SuperAdminDashboard";
import Sidebar from "./components/Sidebar";
import AreaCoordinator from "./screens/Satff/AreaCoordinator";
import SupportPerson from "./screens/Satff/SupportPerson";
import SubAdmin from "./screens/Satff/SubAdmin";
import Jobs from "./screens/Jobs/Jobs";
import JobType from "./screens/Jobs/JobTypes";
import AreaCode from "./screens/AreaCode";
import Customers from "./screens/Customers/Customers";
import JobDetails from "./screens/Jobs/JobDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Optional: sidebar state

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const sidebarWidth = collapsed ? 80 : 250;

  const ProtectedLayout = ({ children }) => (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        selectedKey="dashboard"
        onSelect={(key) => console.log("Selected Key:", key)}
      />
      <div
        style={{
          marginLeft: sidebarWidth,
          padding: "16px",
          overflowY: "auto",
          width: "100%",
          height: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<ProtectedLayout><SuperAdminDashboard /></ProtectedLayout>} />
            <Route path="/jobs" element={<ProtectedLayout><Jobs /></ProtectedLayout>} />
            <Route path="/job-types" element={<ProtectedLayout><JobType /></ProtectedLayout>} />
            <Route path="/staff/admin" element={<ProtectedLayout><SubAdmin /></ProtectedLayout>} />
            <Route path="/staff/area-coordinator" element={<ProtectedLayout><AreaCoordinator /></ProtectedLayout>} />
            <Route path="/staff/support-person" element={<ProtectedLayout><SupportPerson /></ProtectedLayout>} />
            <Route path="/areacode" element={<ProtectedLayout><AreaCode /></ProtectedLayout>} />
            <Route path="/customers" element={<ProtectedLayout><Customers /></ProtectedLayout>} />
            <Route path="/job-details/:id" element={<ProtectedLayout><JobDetails /></ProtectedLayout>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
