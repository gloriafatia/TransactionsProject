import { FunctionComponent, useEffect } from "react";
import "./Dashboard.css";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = ({}) => {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <ul className="nav-links">
          <li>
            <a href="/Home/UserManagement">UserManagement</a>
          </li>
          <li>
            <a href="/Home/Transaction">Transactions</a>
          </li>
        </ul>
      </nav>

      <div className="content1">
        <h2>Welcome to the Dashboard</h2>
      </div>
    </div>
  );
};

export default DashboardPage;
