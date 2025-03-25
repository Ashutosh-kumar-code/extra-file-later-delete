import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Replace with backend URL

const Chat = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();

        socket.emit('join', userId);

        socket.on('updateUsers', (onlineUsers) => {
            setUsers(onlineUsers.filter(u => u !== userId)); // Exclude self
        });

        socket.on('receiveMessage', (newMessage) => {
            if (selectedUser && (newMessage.senderId === selectedUser || newMessage.receiverId === selectedUser)) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [selectedUser]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/users');
            setUsers(res.data.filter(user => user._id !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMessages = async (otherUserId) => {
        try {
            const res = await axios.get(`http://localhost:5000/messages/${userId}/${otherUserId}`);
            setMessages(res.data);
            setSelectedUser(otherUserId);
        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = () => {
        if (message.trim() && selectedUser) {
            socket.emit('sendMessage', { senderId: userId, receiverId: selectedUser, message });
            setMessages(prev => [...prev, { senderId: userId, receiverId: selectedUser, message }]);
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', width: '600px', margin: 'auto', border: '1px solid #ccc' }}>
            <div style={{ width: '30%', borderRight: '1px solid #ddd', padding: '10px' }}>
                <h4>Users</h4>
                {users.map(user => (
                    <div key={user._id} style={{ padding: '5px', cursor: 'pointer', backgroundColor: selectedUser === user._id ? '#ddd' : 'transparent' }}
                         onClick={() => fetchMessages(user._id)}>
                        {user.name}
                    </div>
                ))}
            </div>
            <div style={{ width: '70%', padding: '10px' }}>
                {selectedUser ? (
                    <>
                        <h4>Chat</h4>
                        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '5px' }}>
                            {messages.map((msg, index) => (
                                <div key={index} style={{ textAlign: msg.senderId === userId ? 'right' : 'left', marginBottom: '5px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        background: msg.senderId === userId ? '#DCF8C6' : '#E5E5EA'
                                    }}>
                                        {msg.message}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={{ width: '80%', padding: '5px', marginRight: '5px' }}
                        />
                        <button onClick={sendMessage} style={{ padding: '5px 10px' }}>Send</button>
                    </>
                ) : (
                    <p>Select a user to chat with</p>
                )}
            </div>
        </div>
    );
};

export default Chat;
