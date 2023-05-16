import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";

import './Vouchers.css';
import firebase from "../database/firebase";
const ApplyVouchers = () => {
    const [gorder, setgOrders] = useState({});
    const [order, setOrders] = useState({});
    const [unique, setUnique] = useState({});
    // function getUnique(Array){
    //     for (let i=0; i<Array.length();i++){
    //         console.log(Array[i].userEmail);
    //         unique = [...new Set(Array.map(item => item[i].userEmail))];
    //     }
    // }
    // function getUniqueEmails(array) {
    //     let uniqueEmails = new Set(); // Use a Set to store unique email addresses

    //     for (let obj of array) {
    //         if (obj.length > 0 && typeof obj[0] === 'string') { // Check if the first index is a string
    //             uniqueEmails.add(obj[0]);
    //         }
    //     }

    //     return Array.from(uniqueEmails);
    // }

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
                // console.warn("SetOrder\n",order);
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
                // console.warn("SetgOrders\n",order[0].userEmail);
                // getUnique(order);
                let gmail = [];
                for (let i = 0; i < order.length; i++) {
                    // console.log(i,order[i].userEmail);
                    gmail.push(order[i].userEmail);
                    // setUnique = [...new Set(order.map(item => item[i].userEmail))];
                }
                let g = gmail.filter((item, i, ar) => ar.indexOf(item) === i);
                // console.log("gmail",g);
                setUnique(g);
                // console.log("unique\n",unique)
            }
        });
    }, []);
    return (
        <Container className="mt-5">
            <Row className="text-center mb-4 " >
                <h1>Orders List</h1>
                <hr style={{ width: "250px", margin: "auto", fontSize: "bold" }}></hr>
            </Row>
            <Row className='mb-5'>
                <Col>
                    <div className="div-wrap">
                        {unique.map((item, index) => (
                            <div key={index} className="custom-div">
                                <h3 style={{ textAlign: "center", color: "white" }} className="mt-1">Voucher</h3>
                                <h6 style={{ color: "white" }} className="mt-2">User: {item}</h6>
                                <Link to={`/addvouchers/${item}`}>
                                    <button className="mt-5 cta" style={{ textAlign: "center" }}>
                                        <span className="text-center">Apply</span>
                                        <svg viewBox="0 0 13 10" height="10px" width="15px">
                                            <path d="M1,5 L11,5"></path>
                                            <polyline points="8 1 12 5 8 9"></polyline>
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ApplyVouchers;