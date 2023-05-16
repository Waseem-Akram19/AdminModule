import React, { useState ,useEffect} from "react";
//import { Alert } from 'react-alert'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Alert,
} from "react-bootstrap";
import { Toggle } from "rsuite";
import "../App.css";
const express = require('express');
const router = express.Router();
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/manageusers', (req, res) => res.render('welcome'));

//import React, { useState, useEffect } from "react";
import firebase from "firebase";
const firebaseConfig = {
  // add your own config values here
  apiKey: "AIzaSyAmVXYAiYFPmKoXDO3jmMsM6xhcXdl3qqk",
  authDomain: "foodgrid-1.firebaseapp.com",
  projectId: "foodgrid-1",
  
  storageBucket: "foodgrid-1.appspot.com",
  messagingSenderId: "1022672518984",
  appId: "1:1022672518984:web:c7562ba82450d931a9fd7d",
  measurementId: "G-M9EFVZMT0J"
};

firebase.initializeApp(firebaseConfig);


export const Menu = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState([]);
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [editing, setEdit] = useState(false);
  const [rates, setRates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
  useEffect(() => {
    firebase
      .database()
      .ref("/Users")
      .once("value")
      .then((snapshot) => {
        setUsers(Object.values(snapshot.val()));
      });
  }, []);
  const handleClose = () => {
    setShow(false);   
  };
  const handleShow = () => {
    setShow(true);
    if(editing === false) {
//      setNewUser(users);
    }
  };

  const onFormSubmit = (newUser) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const onEdit = (newUser) => {
    setEdit(true);
    if(editing === true) {
      setNewUser({ ...newUser, newUser });
      handleShow();
    }
    
  };

  const onSubmit = (newUser) => {
    if (editing === true) {
      onUpdateUser(newUser);
    } else {
      onFormSubmit(newUser);
    }
  };

  const onUpdateUser = (newUser) => {
    setEdit(false);
    let id = newUser.id;
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };

  const onDeleteUser = (currentUser) => {
    // firebase.database().ref().child(`Users/${currentUser}`).remove((err)=>{
      
    //   if(!err)
    //   {
    //     Alert.alert('Success', 'Delete User successful!', [{text: 'OK'}]);
    //  //   navigation.navigate('ManageUsers')
    //   }
    //   else{
    //     Alert.alert('User Not Found', [{text: 'OK'}]);
    //   }
    
    // })
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard">
            <Card.Body>
              <div className="d-flex justify-content-between customCardBody">
                <div>
                  <Card.Title>User Data</Card.Title>
                </div>
                <div className="d-flex">
                  <Toggle
                    className="userToggleBtn"
                    checked={showCreateBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCreateBtn(!showCreateBtn);
                    }}
                  />
                  {showCreateBtn ? (
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      title="Add User"
                    >
                      
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Allergic Items</th>
                    <th>Disease</th>
                  </tr>
                </thead>
                
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.allergicitems}</td>
                        <td>{user.disease}</td>
                        
                        <td>
                          <Button
                            variant="info"
                            title="Edit user details"
                            onClick={() => onEdit(user)}
                          >
                            Edit
                            
                          </Button>
                          
                          <Button
                            variant="danger"
                            title="Delete user"
                            onClick={() => onDeleteUser(user)}
                          >
                            Del
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newUser);
              }}
            >
              <Modal.Header closeButton>
                {
                  editing === true 
                  ? <Modal.Title>Edit User</Modal.Title>
                  : <Modal.Title>Add User</Modal.Title>
                }
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.name}
                    required
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.address}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: e.target.value })
                    }
                    placeholder="Enter Address"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={newUser.age}
                    onChange={(e) =>
                      setNewUser({ ...newUser, age: e.target.value })
                    }
                    placeholder="Enter Age"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.profession}
                    onChange={(e) =>
                      setNewUser({ ...newUser, profession: e.target.value })
                    }
                    placeholder="Enter Profession"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sport Interest Rate</Form.Label>
                  <Form.Select
                    value={newUser.interestRate}
                    onChange={(e) =>
                      setNewUser({ ...newUser, interestRate: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    {rates.length
                      ? rates.map((val, index) => (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing === true ? (
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Update
                  </Button>
                ) : (
                  <Button variant="primary" disabled={!newUser.name} type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};