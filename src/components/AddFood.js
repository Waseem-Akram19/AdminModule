import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import firebase from "../database/firebase";

import './AddUser.css';
import Sidebar from './sidebar'
import Navbar from './Navbar'

const initialState = {
    itemName: '',
    itemPrice: '',
    itemQuantity: '',
    calories: '',
    carbs: '',
    protein: '',
    fats: '',
    sodium: '',
    sugar: '',
    selectedCategory: '',
};

const AddFood = () => {
    const styles = {
        backgroundColor: '#f2f2f2', // set the background color to a light gray
        // height: '100vh', // set the height of the component to be the full viewport height
    };
    const [state, setState] = useState(initialState);
    const [showPlaceholders, setShowPlaceholders] = useState(true);
    const { itemName, itemPrice, itemQuantity, calories, carbs, protein, fats, sodium, sugar, selectedCategory } = state;
    // const [selectedCategory, setSelectedCategory] = useState("Fastfood"); // initialize with a default value


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
        if (name === 'calories' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'carbs' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'protein' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'fats' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'sodium' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        if (name === 'sugar' && !/^[0-9]+$/.test(value)) {
            setState({ ...state, [name]: '' });
            return;
        }
        setState({ ...state, [name]: value });

    };
    const handleAdd = (e) => {
        e.preventDefault();
        try {
            const dbRef = firebase.database().ref(`/Food/${selectedCategory}`);
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
                                <h1 className="text-center">Add Food</h1>
                                <hr style={{ borderBottom: '1px solid black' }}></hr>
                            </Col>
                        </Row>
                        <Row className='formcontainer'>
                            <Col>
                                <Form className="food-form" onSubmit={handleAdd}>
                                    <Form.Group controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" value={selectedCategory} name="selectedCategory" onChange={handleCategoryChange}>
                                            <option value="Fastfood">Fastfood</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Biscuits">Biscuits</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="itemName">
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter item name" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="itemName"
                                            value={itemName}
                                            maxLength={20}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter price" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="itemPrice"
                                            value={itemPrice}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="itemQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter quantity" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="itemQuantity"
                                            value={itemQuantity}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="calories">
                                        <Form.Label>Calories</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter calories" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="calories"
                                            value={calories}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="carbs">
                                        <Form.Label>Carbs</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter carbs" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="carbs"
                                            value={carbs}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="protein">
                                        <Form.Label>Protein</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter protein" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="protein"
                                            value={protein}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="fats">
                                        <Form.Label>Fats</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter fats" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="fats"
                                            value={fats}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="sodium">
                                        <Form.Label>Sodium</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter sodium" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="sodium"
                                            value={sodium}
                                            maxLength={4}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="sugar">
                                        <Form.Label>Sugar</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={showPlaceholders ? "Enter sugar" : ""}
                                            onFocus={() => setShowPlaceholders(true)}
                                            name="sugar"
                                            value={sugar}
                                            maxLength={4}
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

export default AddFood;