import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "../App.css";
import firebase from "../database/firebase";
import Sidebar from './sidebar'
import Navbar from './Navbar'

const ManageUser = () => {
  const styles = {
    backgroundColor: '#f2f2f2', // set the background color to a light gray
    // height: '100vh', // set the height of the component to be the full viewport height
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.child("Users").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setUsers({ ...snapshot.val() });
      }
      else {
        setUsers({});
      }
    })
    return () => {
      setUsers({});
    }
  }, []);

  const onDeleteUser = (id) => {
    const dbRef = firebase.database().ref();
    if (window.confirm("Are you sure you want to delete the user?")) {
      dbRef.child(`Users/${id}`).remove((error) => {
        if (error) {
          console.log("Failed to delete the user: ", error);
        } else {
          console.log("User deleted successfully.");
        }
      });
    }
  };
  return (
    <div className="d-flex" style={styles}>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <Navbar />
        <Container className="mt-5">
        <Row className="text-center mb-4 " >
          <h1>Manage User</h1>
        </Row>
        <Row>
          <Col>
            <Table className="table-hover square border border-secondry">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>PhoneNo</th>
                  <th>Disease</th>
                  <th>AllergicItems</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(users).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{users[id].name}</td>
                      <td>{users[id].email}</td>
                      <td>{users[id].phoneno}</td>
                      <td>{users[id].allergicitems}</td>
                      <td>{users[id].disease}</td>
                      <td>
                        <Link to={`/updateuser/${id}`}>
                          <Button variant='info' title="Edit user details"
                            className="mx-2"> Edit</Button>
                        </Link>
                        <Button
                          style={{width:"30%"}}
                          variant="danger"
                          title="Delete user"
                          onClick={() => onDeleteUser(id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Link to={'/adduser'}>
          <Button variant='primary' style={{width:"8%",height:"15%"}}> Add User</Button>
        </Link>
      </Container>
      </div>
    </div>
  );
};

export default ManageUser;