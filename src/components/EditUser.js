import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import firebase from '../database/firebase';

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar';

const initialState = {
    name: '',
    email: '',
    phoneno: '',
    disease: '',
    allergicitems: '',
};

const EditUser = () => {
    const styles = {
        backgroundColor: '#f2f2f2', // set the background color to a light gray
        height: '100vh', // set the height of the component to be the full viewport height
      };
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, phoneno, disease, allergicitems } = state;

    const { id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Users").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            }
            else {
                setData({});
            }
        })

        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] })
        }
        else {
            setState({ ...initialState });
        }

        return () => {
            setState({ ...initialState });
        }
    }, [id, data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phoneno || !disease || !allergicitems) {
            alert('Please provide a value in each input field.');
            return;
        }
        const dbRef = firebase.database().ref(`Users/${id}`);
        dbRef.set(state, () => {
            alert('Updated Data Successfully');
        });
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
                                <h1 className="text-center">Edit User</h1>
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
                                            placeholder="Your Name"
                                            value={name || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="phoneno">
                                        <Form.Label>Contact No</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phoneno"
                                            placeholder="Your Contact No.."
                                            maxLength={11}
                                            value={phoneno || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="1234abc@gmail.com"
                                            value={email || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="disease">
                                        <Form.Label>Disease</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="disease"
                                            placeholder="Disease..."
                                            value={disease || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="allergicitems">
                                        <Form.Label>Allergic Items</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="allergicitems"
                                            placeholder="Allergic items..."
                                            value={allergicitems || ""}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button style={{ backgroundColor: 'lightgray', color: 'black',width:"90px" }} type="submit" className=" mt-3 px-3" >
                                        Update
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

export default EditUser;
