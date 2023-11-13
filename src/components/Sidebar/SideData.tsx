import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DatasetIcon from "@mui/icons-material/Dataset";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/Home/Dashboard",
    icon: <HomeIcon />,
  },

  {
    title: "users management",
    path: "/Home/UserManagement",
    icon: <SupervisorAccountIcon />,
  },
  {
    title: "transactions",
    path: "/Home/Transaction",
    icon: <DatasetIcon />,
  },
  
];
