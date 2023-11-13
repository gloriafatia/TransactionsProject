import React from "react";
import "./Sidebar.css";
import { SidebarData } from "./SideData";
import LoginIcon from "@mui/icons-material/Login";
import { Outlet } from "react-router-dom";
import "../Navbar/Navbar.css";
import { Button, Collapse } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";

const loginData = [
  {
    title: "User",
    path: "/",
    icon: <LoginIcon />,
  },
];

const navbar = [
  {
    title: "Menu",
    path: "/",
    icon: <MenuIcon />,
  },
];

const Sidebar: React.FC = () => {
  const [status, setStatus] = React.useState(true);
  return (
    <div>
      <div className="color">
        {status ? (
          <div className="sidebar">
            <ul className="sidebarRows">
              {SidebarData.map((val, key) => {
                return (
                  <li
                    key={key}
                    className="row"
                    id={val.path === window.location.pathname ? "active" : ""}
                    onClick={() => (window.location.pathname = val.path)}
                  >
                    <div id="iconContainer">{val.icon}</div>

                    <div id="titleContainer">
                      <h3>{val.title}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebarRows" id="user-placement">
              {loginData.map((val, key) => {
                return (
                  <li
                    key={key}
                    className="row"
                    id={val.path === window.location.pathname ? "active" : ""}
                    onClick={() => (window.location.pathname = val.path)}
                  >
                    <div id="iconContainer">{val.icon}</div>

                    <div id="titleContainer">
                      <h3>{val.title}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <div className="content">
          <div>
            <nav>
              <div className="bruh">
                <Button className="collapse" onClick={() => setStatus(!status)}>
                  <MenuIcon />
                </Button>
              </div>
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
