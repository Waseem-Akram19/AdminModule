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

const ViewFoodFastFood = () => {
    const [fastfood, setFastFood] = useState([]);
    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Food/Fastfood").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setFastFood({ ...snapshot.val() });
            }
            else {
                setFastFood({});
            }
            //   console.log("biscuits"+biscuits)
        })
        return () => {
            setFastFood({});
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
        <>
            <Container className="mt-5">
                <Row className="text-left mt-5 mb-2" style={{ marginLeft: "190px" }}>
                    <h2>Fast Food</h2>
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
                                {Object.keys(fastfood).map((id, index) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{fastfood[id].itemName}</td>
                                            <td>{fastfood[id].itemPrice}</td>
                                            <td>{fastfood[id].itemQuantity}</td>
                                            <td>
                                                <Link to={`/updatefoodfastfood/${id}`}>
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
                <Link to={'/addfood'}>
                    <Button variant='primary' className="mb-5" style={{ width: "12%", height: "30%", marginLeft: "200px" }}> Add FastFood</Button>
                </Link>
            </Container>
        </>
    );
};

export default ViewFoodFastFood;