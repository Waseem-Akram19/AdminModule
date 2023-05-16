import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import firebase from '../database/firebase';

import './chat.css';

const initialState = {
    message: '',
    email: 'admin1@gmail.com',
    sender: 'Admin',
};
const ChatHandling = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const { userKey } = useParams();

    const { message, email, sender } = state;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    function updateMessages() {
        firebase.database().ref('chat/' + userKey).get('child').then((snapshot) => {
            var msg = [];
            snapshot.forEach((element) => {
                msg.push(element.val());
            });
            setData(msg);
        });
    };

    useEffect(() => {
        updateMessages(); // update messages initially
        const intervalId = setInterval(updateMessages, 100); // update messages every 100ms
        return () => clearInterval(intervalId); // clear the interval on component unmount
    }, []);

    function sendMessage() {
        const dbRef = firebase.database().ref('/chat/' + userKey);
        dbRef.push(state, () => {
            // alert('Added Data Successfully');
        });
    }

    return (
        <>
            <div className="card-big border p-4">
                <div className="headsec" >
                    <h5 style={{ textAlign: 'center', marginTop: "20px" }}>{userKey}</h5>
                </div>
                {data.length > 0 ? (
                    data.map((id, index) => (
                        <div key={index}>
                            <div>
                                {(data[index].email === 'admin1@gmail.com') > 0 ? (
                                    <p className="mt-3 adminmesssage" style={{ textAlign: 'right' }}>{data[index].message}</p>
                                ) : (
                                    <p className="mt-3">{data[index].message}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
            <div className='msginput'>
                <Form.Group controlId="message" className='msgfield'>
                    <Form.Control
                        type="text"
                        name='message'
                        value={message}
                        placeholder="Enter Message"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant='info' title="Send" className='btn' onClick={() => sendMessage()}> Send</Button>
            </div>
        </>
    );
};

export default ChatHandling;
