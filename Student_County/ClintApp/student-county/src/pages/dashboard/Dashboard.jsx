//import { useState, useCallback } from "react";
// import Menu from "../../components/menu";
// import PortalDrawer from "../../components/portal-drawer";
import { HiMenuAlt2, HiUserGroup } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { RiNotification2Line, RiArrowDownSLine } from "react-icons/ri";
import { FaUserCircle, FaBook } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

import "./Dashboard.css";
const Dashboard = () => {
 /* const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);
*/
  return (
    <>
      {/* <div className="dashboard-container">  </div>*/}
        <div className="dashboard">
          <div className="dashboard-navbar">
            <div className="left-navbar">
            <button className="collapse" >
              <HiMenuAlt2 className="menu-collapse-icon" />
              </button>
              <div className="welcome-container" >
                  <div className="horizontal-line" />
                    <div className="welcome-info">
                      <div className="welcome-text">Welcome, Musab 👋</div>
                      <div className="welcome-description">Manage your services on the Student County dashboard.</div>
                    </div>
                  </div> 
            </div>
            <div className="right-navbar">
                  <div className="tools">
                    <FiSearch className="btn btn-icon btn-icon-active" />
                    <AiOutlinePlus className="btn btn-icon" />
                    <RiNotification2Line className="btn btn-icon" />
                  </div>
                  <div className="horizontal-line" />
                  <div className="profile">
                  <FaUserCircle className="avatar-icon" />
                    <div className="user-info">
                      <div className="username">Musab Al hotaree</div>
                      <div className="role">Student</div>
                    </div>
                    <RiArrowDownSLine className="arrow-down" />
                  </div>
            </div>
          </div>

           <div className="info-container">
            <div className="stats-container">
             <div className="stats">
             <div className="stats-icon-background" >
                <FaBook className="stats-icon" />
                </div>
                <div className="stats-info">
                  <div className="stats-title">BOOKS</div>
                  <div className="stats-number">124</div>
                </div>
              </div>
              <div className="stats">
              <div className="stats-icon-background" >
                <HiUserGroup className="stats-icon" />
                </div>
                <div className="stats-info">
                  <div className="stats-title">RIDING</div>
                  <div className="stats-number">01</div>
                </div>
              </div>
              <div className="stats">
                <div className="stats-icon-background" >
                <IoHome className="stats-icon" />
                </div>
                <div className="stats-info">
                  <div className="stats-title">HOUSING</div>
                  <div className="stats-number">None</div>
                </div>
              </div>
            </div>
            <div className="activities-container">
              <div className="activities-title">Recent Activities</div>
            </div>
            <div className="add-container">
              <AiOutlinePlus className="btn add-icon" />
              <div className="add-title">ADD SERVICE</div>
            </div>
          </div>
         <div className="service-container">
            <div className="services-head">
              <div className="services-head-title">Your Services</div>
              <div className="filterboxs">
                <button className="filterbox">
                  <div className="type">Type</div>
                  <RiArrowDownSLine className="arrow-down" />
                </button>
                <button className="filterbox">
                  <div className="type">Latest</div>
                  <RiArrowDownSLine className="arrow-down" />
                </button>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <div className="card-picture" />
                <div className="card-info">
                  <div className="card-text">
                    <div className="card-title">Lorem Ipsum</div>
                    <div className="card-description">
                      Lorem Ipsum is simply dummy text of the printing...
                    </div>
                  </div>
                  <button className="btn btn-small">Manage</button>
                </div>
              </div>
              <div className="card">
                <div className="card-picture" />
                <div className="card-info">
                  <div className="card-text">
                    <div className="card-title">Lorem Ipsum</div>
                    <div className="card-description">
                      Lorem Ipsum is simply dummy text of the printing...
                    </div>
                  </div>
                  <button className="btn btn-small">Manage</button>
                </div>
              </div>
              <div className="card">
                <div className="card-picture" />
                <div className="card-info">
                  <div className="card-text">
                    <div className="card-title">Lorem Ipsum</div>
                    <div className="card-description">
                      Lorem Ipsum is simply dummy text of the printing...
                    </div>
                  </div>
                  <button className="btn btn-small">Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* {isDrawerOpen && (
        <PortalDrawer placement="Left" onOutsideClick={closeDrawer}>
          <Menu onClose={closeDrawer} />
        </PortalDrawer>
      )} */}
    </>
  );
};

export default Dashboard;
