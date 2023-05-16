import React, { useEffect, useState } from 'react'
import firebase from "../database/firebase";
import { Link } from "react-router-dom";

import Sidebar from './sidebar'
import Navbar from './Navbar'
import './Dashboard.css'

const AdminMessage = () => {
  const [users, setUsers] = useState({});
  useEffect(() => {
    const dbRef = firebase.database().ref("chat");
    dbRef.on("value", (snapshot) => {
      const keys = snapshot.exists() ? Object.keys(snapshot.val()) : {};
      // console.log("keys\n"+keys);
      setUsers(keys);
      // console.log(users[0]);
    });
  }, {});
  return (
    <div className='dashborad d-flex'>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        <div className="cards-container" style={{ marginLeft: "-60px" }}>
          <div className="card-bg w-100 border d-flex flex-column p-4" style={{ overflowY: "scroll", height: "150%" }}>
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="h5 font-weight-bold text-dark head">Messages</h6>
              <div className="rounded-circle bg-grey px-2 py-1"><i className="fas fa-comment-alt"></i></div>
            </div>
            <div className="d-flex mt-4" style={{display:"flex", flexDirection:"column"}} >
              {users.length > 0 ? (
                users.map((userKey, index) => (
                  <div key={index}>
                    <Link to={`/chathandling/${userKey}`} style={{ textDecoration: "none" }}>
                    <h5 className="bold" style={{ fontWeight: "600", color: "black" }}>{userKey}</h5>
                    </Link>
                    <hr /> {/* add a horizontal line after each userKey */}
                  </div>
                ))
              ) : (
                <p>No messages found.</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMessage
