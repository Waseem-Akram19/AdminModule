import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import firebase from '../database/firebase';
// import { Router } from '@angular/router';
// import * as EmailValidator from 'node-email-validation';

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar'

const initialState = {
  name: '',
  email: '',
  phoneno: '',
  password: '',
  disease: '',
  allergicitems: '',
};

const AddUser = () => {

  const styles = {
    backgroundColor: '#f2f2f2', // set the background color to a light gray
    // height: '100vh', // set the height of the component to be the full viewport height
  };
  const [state, setState] = useState(initialState);
  const [showPlaceholders, setShowPlaceholders] = useState(true);
  const { name, email, phoneno, password, disease, allergicitems } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check for backspace key
    if (e.keyCode === 8) {
      if (value.length > 0) {
        const newValue = value.slice(0, -1);
        setState({ ...state, [name]: newValue });
      }
      return;
    }

    // Validate input based on input name
    if (name === 'name' && !/^[a-zA-Z\s]+$/.test(value)) {
      // alert('Please enter only letters for Name.');
      setState({ ...state, [name]: '' });
      return;
    }

    if (name === 'phoneno' && !/^[0-9]+$/.test(value)) {
      // alert('Please enter only numbers for Contact No.');
      setState({ ...state, [name]: '' });
      return;
    }

    // if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
    //   // alert('Please enter a valid email address.');
    //   setState({ ...state, [name]: '' });
    //   return;
    // }

    if (name === 'disease' && !/^[a-zA-Z\s]+$/.test(value)) {
      // alert('Please enter only letters for Disease.');
      setState({ ...state, [name]: '' });
      return;
    }

    if (name === 'allergicitems' && !/^[a-zA-Z\s]+$/.test(value)) {
      // alert('Please enter only letters for Allergic Items.');
      setState({ ...state, [name]: '' });
      return;
    }

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // EmailValidator.is_email_valid(email); // true
    if (!name || !email || !phoneno || !password || !disease || !allergicitems) {
      alert('Please provide a value in each input field.');
      return;
    }
    try {
      const dbRef = firebase.database().ref('/Users');
      dbRef.push(state, () => {
        alert('Added Data Successfully');
      });
      // Reset input fields to their original state
      setState(initialState);
      // Show placeholders in input fields
      setShowPlaceholders(true);
    } catch (err) {
      console.error(err);
      alert("Error adding biscuit");
    }
  };
  return (
    <div className="d-flex" style={styles}>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", overflowY: "hidden" }}>
        <Navbar></Navbar>
        <div className='mx-5 adjustform'>
          <Container>
            <Row className=" mt-2 mb-3">
              <Col>
                <h1 className="text-center">Add User</h1>
                <hr style={{ borderBottom: '1px solid black' }}></hr>
              </Col>
            </Row>
            <Row className='formcontainer'>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={showPlaceholders ? "Your Name" : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      value={name || ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="phoneno">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneno"
                      // placeholder="Your Contact No.."
                      placeholder={showPlaceholders ? "Your Contact No.." : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      maxLength={11}
                      value={phoneno}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      // placeholder='Password'
                      placeholder={showPlaceholders ? "Password" : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      value={password}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      // placeholder="1234abc@gmail.com"
                      placeholder={showPlaceholders ? "1234abc@gmail.com" : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      value={email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="disease">
                    <Form.Label>Disease</Form.Label>
                    <Form.Control
                      type="text"
                      name="disease"
                      // placeholder="Disease..."
                      placeholder={showPlaceholders ? "Disease..." : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      value={disease}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="allergicitems">
                    <Form.Label>Allergic Items</Form.Label>
                    <Form.Control
                      type="text"
                      name="allergicitems"
                      // placeholder="Allergic items..."
                      placeholder={showPlaceholders ? "Allergic items..." : ""}
                      onFocus={() => setShowPlaceholders(true)}
                      value={allergicitems}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button type="submit" className=" mt-3 px-3 btn" style={{ backgroundColor: '#FF8B66', color: 'black', width: "20%" }}>
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
