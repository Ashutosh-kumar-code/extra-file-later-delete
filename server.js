require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ashu9908kumar:8f8PWepUTXLHYiwL@cluster0.4msie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model('User', UserSchema);

// Message Schema
const MessageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Store connected users
const onlineUsers = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (userId) => {
        onlineUsers[userId] = socket.id;
        io.emit('updateUsers', Object.keys(onlineUsers));
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();

        if (onlineUsers[receiverId]) {
            io.to(onlineUsers[receiverId]).emit('receiveMessage', newMessage);
        }
    });

    socket.on('disconnect', () => {
        for (let userId in onlineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];
                break;
            }
        }
        io.emit('updateUsers', Object.keys(onlineUsers));
        console.log('User disconnected:', socket.id);
    });
});

// Get All Users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Add a new user
app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const existingUser = await User.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({ name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// Get Chat History
app.get('/messages/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
        $or: [
            { senderId: user1, receiverId: user2 },
            { senderId: user2, receiverId: user1 }
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
