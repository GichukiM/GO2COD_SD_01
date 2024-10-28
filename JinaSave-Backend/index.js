const express = require('express');
const  mongoose = require('mongoose');
const ContactRoute = require('./routes/contact.route.js');
const contactListRoute = require('./routes/contactList.routes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', ContactRoute);
app.use('/api/contactLists', contactListRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
})

mongoose.connect("mongodb+srv://gichukimuchiri80:N9OFUg7ppW93pvhL@cluster0.ixrp7.mongodb.net/Contact-Manager?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connections established");
    app.listen(3100, () => {
        console.log("Listening on port 3100");
    })
}).catch((err) => {
    console.log("Error connecting", err);
    
});