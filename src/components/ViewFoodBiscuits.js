import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";
import firebase from "../database/firebase";

const ViewFoodBiscuits = () => {
    const [biscuits, setBiscuits] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Food/Biscuits").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setBiscuits({ ...snapshot.val() });
            }
            else {
                setBiscuits({});
            }
            //   console.log("biscuits"+biscuits)
        })
        return () => {
            setBiscuits({});
        }
    }, []);
    // const onDeleteUser = (id) => {
    //     const dbRef = firebase.database().ref();
    //     if (window.confirm("Are you sure you want to delete the user?")) {
    //         dbRef.child(`biscuits/${id}`).remove((error) => {
    //             if (error) {
    //                 console.log("Failed to delete the user: ", error);
    //             } else {
    //                 console.log("User deleted successfully.");
    //             }
    //         });
    //     }
    // };
    return (
        <Container className="mt-5">
                <Row className="text-center mb-4 " >
                    <h1>Food Items</h1>
                    <hr style={{ width: "250px", margin: "auto", fontSize: "bold" }}></hr>
                </Row>
                <Row className="text-left mt-5 mb-2" style={{ marginLeft: "190px" }}>
                    <h2>Biscuits</h2>
                </Row>
                <Row>
                    <Col>
                        <Table className="table-hover square border border-secondrytabledata" style={{ width: "900px", marginLeft: "200px" }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(biscuits).map((id, index) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{biscuits[id].itemName}</td>
                                            <td>{biscuits[id].itemPrice}</td>
                                            <td>{biscuits[id].itemQuantity}</td>
                                            <td>
                                                <Link to={`/updatefoodbiscuits/${id}`}>
                                                    <Button variant='info' title="Edit"
                                                        className="mx-2"> Edit</Button>
                                                </Link>
                                                {/* <Button
                                                    style={{ width: "25%" }}
                                                    variant="danger"
                                                    title="Delete user"
                                                    onClick={() => onDeleteUser(id)}
                                                >
                                                    Delete
                                                </Button> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Link to={'/addbiscuits'}>
                    <Button variant='primary' style={{ width: "10%", height: "20%", marginLeft: "200px" }}> Add Biscuits</Button>
                </Link>
            </Container>
    );
};

export default ViewFoodBiscuits;