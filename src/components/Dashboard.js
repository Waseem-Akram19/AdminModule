import React, { useEffect, useState } from 'react'
import {
  CDBProgress,
} from "cdbreact";
// import { Pie, Bar } from "react-chartjs-2";
import firebase from "../database/firebase";
import { NavLink, Link } from "react-router-dom";

import Sidebar from './sidebar'
import Navbar from './Navbar'
import './Dashboard.css'

const Dashboard = () => {
  const [recordCount, setRecordCount] = useState(0);
  const [OrderCount, setOrderCount] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const dbRef = firebase.database().ref("chat");
    dbRef.on("value", (snapshot) => {
      const keys = snapshot.exists() ? Object.keys(snapshot.val()) : [];
      // console.log("keys\n"+keys);
      setUsers(keys);
    });
  }, []);
  useEffect(() => {
    const dbRef = firebase.database().ref('/Users');
    dbRef.once("value", (snapshot) => {
      const count = snapshot.numChildren();
      setRecordCount(count);
    });
  }, []);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.child("Orders").get().then((snapshot) => {
      if (snapshot.exists()) {
        var arr2 = [];
        snapshot.forEach(element => {
          arr2.push(element.key)
        });
        // console.log(arr2[0])
        var msg = [];
        var count = 0;
        for (let index = 0; index < arr2.length; index++) {
          // console.log("array length = " + arr2.length)
          // console.log("index = " + index)
          firebase.database().ref(`Orders/${arr2[index]}`).get().then((snapshot) => {
            snapshot.forEach((element) => {
              msg.push(element.val());
            });
          });
        }
        var ord = [];
        for (let index = 0; index < arr2.length; index++) {
          // console.log("array length = " + arr2.length)
          // console.log("index = " + index)
          firebase.database().ref(`Orders/${arr2[index]}`).get().then((snapshot) => {
            snapshot.forEach((element) => {
              ord.push(element.val());
            });
            count = ord.length;
            setOrderCount(count);
          });
        }
      }
    });
  }, []);

  const progressValue = recordCount > 0 ? (recordCount / 100) * 100 : 0; // calculate progress value based on record count
  const progressOrderValue = OrderCount > 0 ? (OrderCount / 100) * 100 : 0;
  return (
    <div className='dashborad d-flex'>
        <div>
          <Sidebar />
        </div>
        <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
          <Navbar />
          <div style={{ height: "100%" }}>
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="m-0 h5 font-weight-bold text-dark head">Total Users</h4>
                        <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-users"></i></div>
                      </div>
                      <h4 className="mt-5 my-4 text-right text-dark h2 font-weight-bold">{recordCount}</h4>
                      <CDBProgress value={progressValue} height={8} colors="primary"></CDBProgress>
                      <p className="mt-3 text-success small">
                        <i className="fas fa-angle-up p-0"></i> {progressValue}%
                        <span style={{ fontSize: "0.95em" }} className="ml-2 font-weight-bold text-muted"> Since last month</span>
                      </p>
                      <NavLink to="/viewusers" className={`mt-auto text-decoration-none`}>
                        <p className="c-p mb-0 text-dark font-weight-bold details">
                          More Details
                          <i className="fas fa-arrow-right ml-1"></i>
                        </p>
                      </NavLink>
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="h5 font-weight-bold text-dark head">Messages</h6>
                      <div className="rounded-circle bg-grey px-2 py-1"><i className="fas fa-comment-alt"></i></div>
                    </div>
                    <div className="d-flex mt-4">
                      {users.length > 0 ? (
                        users.map((userKey, index) => (
                          <div key={index}>
                            <div>
                              <Link to={`/chathandling/${userKey}`} style={{ textDecoration: "none" }} >
                                <h5 className="bold" style={{ fontWeight: "600", color: "black" }}>{userKey}</h5>
                                <hr></hr>
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No messages found.</p>
                      )}
                    </div>
                    <NavLink to="/adminmessage" className={`mt-auto text-decoration-none`}>
                      <p className="c-p mb-0 text-dark font-weight-bold details">
                        More Details
                        <i className="fas fa-arrow-right ml-1"></i>
                      </p>
                    </NavLink>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column p-4">
                    <div className="d-flex align-items-center justify-content-between ml-3">
                      <h6 className="h5 font-weight-bold text-dark head">Team Members</h6>
                      <div className="ml-auto rounded-circle bg-grey py-1 px-2"><i className="fas fa-user"></i></div>
                    </div>
                    <div className="d-flex mt-4 ">
                      <img alt="panelImage" src="img/pane/pane1.png" className="pane-image" size="md" />
                      <div>
                        <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>WAHAB EJAZ</h6>
                        {/* <p className="m-0" style={{ fontSize: "0.75em" }}>Online</p> */}
                      </div>
                      {/* <CDBBtn style={{ background: "#333" }} flat size="small" className="border-0 ml-auto px-2 my-2"><span className="msg-rem">Send</span> Message</CDBBtn> */}
                    </div>
                    <div className="d-flex mt-4">
                      <img alt="panelImage" src="img/pane/pane2.png" className="pane-image" size="md" />
                      <div>
                        <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>WASEEM AKRAM</h6>
                        {/* <p className="m-0" style={{ fontSize: "0.75em" }}>Online</p> */}
                      </div>
                      {/* <CDBBtn style={{ background: "#333" }} flat size="small" className="border-0 ml-auto px-2 my-2"><span className="msg-rem">Send</span> Message</CDBBtn> */}
                    </div>
                    <div className="d-flex mt-4 ">
                      <img alt="panelImage" src="img/pane/pane3.png" className="pane-image" size="md" />
                      <div>
                        <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>USAMA FAISAL</h6>
                        {/* <p className="m-0" style={{ fontSize: "0.75em" }}>Online</p> */}
                      </div>
                      {/* <CDBBtn style={{ background: "#333" }} flat size="small" className="border-0 ml-auto px-2 my-2"><span className="msg-rem">Send</span> Message</CDBBtn> */}
                    </div>
                    <p className="c-p text-dark mb-0 font-weight-bold details">
                      More Details
                      <i className="fas fa-arrow-right ml-1"></i>
                    </p>
                  </div>
                  <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{gridRow: "span 2"}}>
                    <div className="p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="m-0 h5 font-weight-bold text-dark head">Total Orders</h4>
                        <div className="px-2 py-1 bg-grey rounded-circle"><i className="fas fa-shopping-bag"></i></div>
                      </div>
                      <div className="mt-5 d-flex align-items-center justify-content-between">
                        <div>
                          <h4 className="m-0 h1 font-weight-bold text-dark">{OrderCount}</h4>
                          <p className="text-success small">
                            <i className="fas fa-angle-up p-0"></i> {progressOrderValue} %
                          </p>
                        </div>
                        <div className="text-right d-flex flex-column justify-content-between">
                          <div className="d-flex align-items-center justify-content-between text-primary">
                            <span style={{ fontSize: "3em", margin: "-2rem 0px -1.5rem 0px" }}>&#8226;</span>
                            <span className="small">August</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between text-warning">
                            <span style={{ fontSize: "3em", margin: "-2rem 0px -1.5rem 0px" }}>&#8226;</span>
                            <span className="small ml-2">September</span>
                          </div>
                        </div>
                      </div>
                      <NavLink to="/manageorder" className={`mt-auto text-decoration-none`}>
                        <p className="c-p mb-0 text-dark font-weight-bold details">
                          More Details
                          <i className="fas fa-arrow-right ml-1"></i>
                        </p>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
