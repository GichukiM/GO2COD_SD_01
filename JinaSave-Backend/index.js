// server.js
const express = require('express');
const mongoose = require('mongoose');
const ContactRoute = require('./routes/contact.route.js');
const contactListRoute = require('./routes/contactList.routes.js');
const userRoute = require('./routes/user.route.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoute);
app.use('/api/contacts', ContactRoute);
app.use('/api/contactLists', contactListRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connection to MongoDB established");
        app.listen(process.env.PORT || 3100, () => {
            console.log(`Listening on port ${process.env.PORT || 3100}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); 
    });
