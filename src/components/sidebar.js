import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  // CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import './sidebar.css'
const Sidebar = () => {

  return (
    <div className={`app`} style={{ display: "flex", height: "100%", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#FFF" backgroundColor="#1A88CA">
        <CDBSidebarHeader prefix={<i className="fa fa-bars"></i>}>
          {/* <h4>ADMIN</h4> */}
        {/* <Header>ADMIN</Header> */}
        <a href="/" className="dash" style={{color:"inherit",fontSize:24}}>
            DASHBOARD
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/manageuser" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >ManageUser</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/viewusers" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >View Users</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/adduser" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Add User</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/managefood" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >ManageFood</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/addfood" activeClassName="activeClicked" className={`nav-link list`}>
            <CDBSidebarMenuItem>Add Food</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/addsingleitem" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Add Single Item</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/addbiscuits" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Add Biscuits</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manageorder" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >ManageOrder</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >ManageVouchers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/voucher" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Apply Vouchers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/deals" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Create Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminmessage" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >ChatHandling</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminmessage" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Chat</CDBSidebarMenuItem>
            </NavLink>
            {/* <DropdownButton id="dropdown-basic-button" title="Dropdown Menu">
              <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
            </DropdownButton> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
