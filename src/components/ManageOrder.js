import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";
import firebase from "../database/firebase";
const ManageOrder = () => {
    const [gorder, setgOrders] = useState({});
    const [order, setOrders] = useState({});
    // useEffect(() => {
    //     const dbRef = firebase.database().ref();
    //     dbRef.child("Orders").get().then((snapshot) => {
    //         if (snapshot.exists()) {
    //             var arr2 = [];
    //             snapshot.forEach(element => {
    //                 arr2.push(element.key)
    //             });
    //             var tempOrders = [];
    //             for (let index = 0; index < arr2.length; index++) {
    //                 firebase.database().ref(`Orders/${arr2[index]}`).get().then((snapshot) => {
    //                     snapshot.forEach((childSnapshot) => {
    //                         const order = childSnapshot.val();
    //                         const orderId = childSnapshot.key;
    //                         tempOrders.push({ ...order, orderId });
    //                     });
    //                     setOrders(tempOrders);
    //                 });
    //             }
    //         }
    //     });
    // }, []);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Orders").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arr2 = [];
                snapshot.forEach(element => {
                    arr2.push(element.key)
                });
                // console.log(arr2[0])
                var msg = [];
                for (let index = 0; index < arr2.length; index++) {
                    // console.log("array length = " + arr2.length)
                    // console.log("index = " + index)
                    firebase.database().ref(`Orders/${arr2[index]}`).get().then((snapshot) => {
                        snapshot.forEach((element) => {
                            msg.push(element.val());
                        });
                        setOrders(msg);
                    });
                }
                for (let index = 0; index < arr2.length; index++) {
                    // console.log("array length = " + arr2.length)
                    // console.log("index = " + index)
                    firebase.database().ref(`Orders/${arr2[index]}`).get().then((snapshot) => {
                        var ord = [];
                        snapshot.forEach((element) => {
                            ord.push(element.val());
                        });
                        setgOrders(ord);
                    });
                }
            }
        });
    }, []);
    return (
        <Container className="mt-5">
            <Row className="text-center mb-4 " >
                <h1>Orders</h1>
                <hr style={{ width: "250px", margin: "auto", fontSize: "bold" }}></hr>
            </Row>
            <Row className='mb-5'>
                <Col>
                    <Table className="table-hover square border border-secondry tabledata mt-5">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>UserEmail</th>
                                <th>UserContact</th>
                                <th>OrderTime</th>
                                <th>OrderStatus</th>
                                <th>ItemName</th>
                                <th>ItemPrice</th>
                                <th>OrderQuantity</th>
                                <th>Action</th>
                                {/* <th>ItemPrice</th>
                                <th>OrderQuantity</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {order.length > 0 ? (
                                order.map((id, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order[index].userEmail}</td>
                                        <td>{order[index].userNumber}</td>
                                        <td>{order[index].orderTime}</td>
                                        {/* <td>{order[index].longitude}</td>
                                        <td>{order[index].latitude}</td> */}
                                        <td>{order[index].status}</td>
                                        {/* <td>{order[index].Items[id].count}</td> */}
                                        <td>
                                            {id.Items.map((subid, inx) => (
                                                <tr key={inx}>
                                                    <td>{subid.itemName}</td>
                                                    {/* <td>{subid.itemPrice}</td>, */}
                                                    {/* <td>{subid.count}</td> */}
                                                </tr>
                                            ))}
                                        </td>
                                        <td>
                                            {id.Items.map((subid, inx) => (
                                                <tr key={inx}>
                                                    {/* <td>{subid.itemName}</td>, */}
                                                    <td>{subid.itemPrice}</td>
                                                    {/* <td>{subid.count}</td> */}
                                                </tr>
                                            ))}
                                        </td>
                                        <td>
                                            {id.Items.map((subid, inx) => (
                                                <tr key={inx}>
                                                    {/* <td>{subid.itemName}</td>, */}
                                                    {/* <td>{subid.itemPrice}</td>, */}
                                                    <td>{subid.count}</td>
                                                </tr>
                                            ))}
                                        </td>
                                        <td>
                                            <Link to={`/updateorder/${id}`}>
                                                <Button variant='info' title="Edit user details"
                                                    className="mx-2"> Edit</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <p>No messages found.</p>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ManageOrder