import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import firebase from '../database/firebase';

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar';

const initialState = {
    itemName: '',
    itemPrice: '',
    itemQuantity: '',
};

const UpdatedFoodFastFood = () => {
    const styles = {
        backgroundColor: '#f2f2f2', // set the background color to a light gray
        height: '100vh', // set the height of the component to be the full viewport height
      };
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { itemName, itemPrice, itemQuantity} = state;

    const { id } = useParams();

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
         // Validate input based on input name
         if (name === 'itemName' && !/^[a-zA-Z\s]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }

        if (name === 'itemPrice' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'itemQuantity' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        setState({ ...state, [name]: value });

    };

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Food/Fastfood").on("value", (snapshot) => {
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
        const dbRef = firebase.database().ref(`Food/Fastfood/${id}`);
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
                                <h1 className="text-center">Edit Biscuits</h1>
                                <hr style={{ borderBottom: '1px solid black' }}></hr>
                            </Col>
                        </Row>
                        <Row className='formcontainer'>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="itemName">
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter item name"
                                            name="itemName"
                                            value={itemName || ""}
                                            maxLength={20}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter price"
                                            name="itemPrice"
                                            value={itemPrice || ""}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="itemQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter quantity"
                                            name="itemQuantity"
                                            value={itemQuantity || ""}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>
                                    <Button type="submit" style={{ backgroundColor: 'lightgray', color: 'black',width:"90px" }}  className=" mt-3 px-3" >
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

export default UpdatedFoodFastFood;
