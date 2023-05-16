import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import firebase from "../database/firebase";

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar'

const initialState = {
    vcode: '',
    vminimumordervalue: '',
    vdiscountpercentage: '',
    vexpireddate: '',
};

const AddVouchers = () => {
    const styles = {
        backgroundColor: '#f2f2f2', // set the background color to a light gray
        // height: '100vh', // set the height of the component to be the full viewport height
    };
    const [state, setState] = useState(initialState);
    const [showPlaceholders, setShowPlaceholders] = useState(true);
    const { vcode, vminimumordervalue, vdiscountpercentage, vexpireddate } = state;
    // const [selectedCategory, setSelectedCategory] = useState("Fastfood"); // initialize with a default value


    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        // Validate input based on input name
        if (name === 'vcode' && !isNaN(value)) {
            setState({ ...state, [name]: '' });
            return;
        }

        if (name === 'vminimumordervalue' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        const floatValue = parseFloat(value);

        if (name === 'vdiscountpercentage' && isNaN(floatValue)) {
            setState({ ...state, [name]: '' });
            return;
        }
        // if (name === 'vexpireddate') {
        //     setState({ ...state, [name]: '' });
        //     return;
        // }
        setState({ ...state, [name]: value });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        // EmailValidator.is_email_valid(email); // true
        if (!vcode || !vminimumordervalue || !vdiscountpercentage || !vexpireddate) {
            alert('Please provide a value in each input field.');
            return;
        }
        try {
            const dbRef = firebase.database().ref(`/Vauchers`);
            dbRef.push(state, () => { });
            alert('Added Data Successfully');
            // Reset input fields to their original state
            setState(initialState);
            // Show placeholders in input fields
            setShowPlaceholders(true);
        } catch (err) {
            console.error(err);
            alert("Error adding vouchers");
        }
    };
    return (
        <div className="d-flex" style={styles}>
            <div>
                <Sidebar />
            </div>
            <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", overflowY: "hidden" }}>
                <Navbar></Navbar>
                <div className='mx-5 mt-5 adjustform'>
                    <Container>
                        <Row className=" mt-2 mb-3">
                            <Col>
                                <h1 className="text-center">Add Vouchers</h1>
                                <hr style={{ borderBottom: '1px solid black' }}></hr>
                            </Col>
                        </Row>
                        <Row className='formcontainer'>
                            <Col>
                                <Form className="food-form" onSubmit={handleAdd}>
                                    <Form.Group controlId="vcode">
                                        <Form.Label>Vaucher Code</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={showPlaceholders ? "Enter vaucher code..." : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="vcode"
                                            value={vcode}
                                            maxLength={20}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="vminimumordervalue">
                                        <Form.Label>Minimum Order Value</Form.Label>
                                        <Form.Control
                                            type="int"
                                            placeholder={showPlaceholders ? "Enter minimum order value..." : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="vminimumordervalue"
                                            value={vminimumordervalue}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="vdiscountpercentage">
                                        <Form.Label>Discount Percentage</Form.Label>
                                        <Form.Control
                                            type="float"
                                            placeholder={showPlaceholders ? "Enter discount percentage" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="vdiscountpercentage"
                                            value={vdiscountpercentage}
                                            maxLength={5}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="vexpireddate">
                                        <Form.Label>Expired Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder={showPlaceholders ? "Enter expired date..." : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="vexpireddate"
                                            value={vexpireddate}
                                            // maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>
                                    <Button type="submit" className=" mt-3 px-3" style={{ backgroundColor: 'lightgray', color: 'black' }}>
                                        Add
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default AddVouchers;