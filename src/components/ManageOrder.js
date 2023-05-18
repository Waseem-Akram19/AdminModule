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
import './manageorder.css';

const ManageOrder = () => {

    const [gorder, setgOrders] = useState([]);
    const [order, setOrders] = useState([]);
    const [orderid, setOrdersId] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Orders").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arr2 = [];
                snapshot.forEach(element => {
                    arr2.push(element.key)
                });
                setOrdersId(arr2);
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
                console.log(order);
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
                                        <td scope="row">{index + 1}</td>
                                        {/* <td>{order[index]}</td> */}
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
                                            <Link to={`/updateorder/${orderid[index]}`}>
                                                <button class="Btn">Edit
                                                    <svg class="svg" viewBox="0 0 512 512">
                                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                                                </button>


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