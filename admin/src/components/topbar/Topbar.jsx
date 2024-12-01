import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          {/* <span className="logo">WATCHSHOP Admin</span> */}
          <Link to="/" className="logo">
          WATCHSHOP Admin
            </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>*/}
          <img
            src="https://i1-giaitri.vnecdn.net/2020/11/03/lisa-12-1604394417.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=abSxjmXK-wfNpKX7bSD_fg"
            alt=""
            className="topAvatar"
          />
          <div className="topbarIconContainer" style={{color: "#cdbc7a", fontWeight: "700", marginLeft: "10px"}}>
            {user.username}
          </div>
        </div>
      </div>
    </div>
  );
}
