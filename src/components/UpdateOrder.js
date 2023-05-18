import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import firebase from '../database/firebase';

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar';

const initialState = {
    status: '',
};

const UpdateOrder = () => {
    const styles = {
        backgroundColor: '#f2f2f2', // set the background color to a light gray
        height: '100vh', // set the height of the component to be the full viewport height
      };
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { status} = state;

    const { id } = useParams();
    console.log(id);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Orders").on("value", (snapshot) => {
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

        if (!status) {
            alert('Please provide a value in each input field.');
            return;
        }
        const dbRef = firebase.database().ref(`Orders/${id}`);
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
                                <h1 className="text-center">Update Order Details</h1>
                                <hr style={{ borderBottom: '1px solid black' }}></hr>
                            </Col>
                        </Row>
                        <Row className='formcontainer'>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="category">
                                        <Form.Label>Order Status</Form.Label>
                                        <Form.Control as="select" value={status} name="status" onChange={handleInputChange}>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Delivered">Delivered</option>
                                        </Form.Control>
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

export default UpdateOrder;
