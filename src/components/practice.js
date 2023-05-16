


import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "../App.css";
import firebase from "../database/firebase";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref("/Users")
      .once("value")
      .then((snapshot) => {
        setUsers(Object.values(snapshot.val()));
      });
  }, []);

  return (
    <div>
      <Container className="mt-5">
        <Row className="text-center mb-4">
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
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.allergicitems}</td>
                      <td>{user.disease}</td>
                      <td>
                        <Button
                          variant="info"
                          title="Edit user details"
                          className="mx-2"
                        // onClick={() => onEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          title="Delete user"
                        //onClick={() => onDeleteUser(user)}
                        >
                          Delete
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
          </Col>
        </Row>
        <Row>
        <Link to={'/adduser'}>
            <Button variant='primary'> Add User</Button>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default ManageUser;


<Container>
        <Row className="text-center mb-3 formcontainer">
          <Col className='col-6'>
            <h1 className='userhead text-center'>Add User</h1>
          </Col>
        </Row>
        <Row className='formcontainer'>
          <Col className='col-6'>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' placeholder='Your Name' value={username} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name='email' placeholder='1234abc@gmail.com' value={email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Contact No</Form.Label>
                <Form.Control maxLength={11} type="tel" name='phone' placeholder='Your Contact No..' value={phone} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="disease">
                <Form.Label>Disease</Form.Label>
                <Form.Control type="text" name='disease' placeholder='Disease...' value={disease} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="allergicitems">
                <Form.Label>Disease</Form.Label>
                <Form.Control type="text" name='allergicitems' placeholder='Allergic items...' value={allergicitems} onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className='px-3'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>