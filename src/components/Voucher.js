import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Container,
} from "react-bootstrap";
import firebase from "../database/firebase";

import "./Vouch.css";

const Voucher = () => {

    const [order, setOrders] = useState([]);
    const [unique, setUnique] = useState([]);
    
    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.child("Orders").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arr2 = [];
                snapshot.forEach(element => {
                    arr2.push(element.key)
                });
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
                let gmail = [];
                for (let i = 0; i < order.length; i++) {
                    gmail.push(order[i].userEmail);
                }
                let g = gmail.filter((item, i, ar) => ar.indexOf(item) === i);
                setUnique(g);
            }
        });
    });
    return (
        <>
            <Container className="mt-5">
                <h1 style={{textAlign:"center"}}>Apply Vouchers</h1>
                <hr style={{ width: "300px", margin: "auto", fontSize: "bold" }}></hr>
                <div className="div-wrap mt-5">
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
            </Container>
        </>
    )
}

export default Voucher;