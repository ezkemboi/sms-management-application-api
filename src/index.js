import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { client, pool } from './database/config';

const app = express();
const port = 8000;
const hostname = '127.0.0.1';

// Set up body parsers
app.use(bodyParser.json());
// Extend url parser urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// Set up cross origin
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Welcome to SMS managament application." });
});

/**
 * Create user and needs
 * Name, phone number
 */

app.post('/contact', (req, res) => {
    const { name, phoneNumber } = req.body;
    // Validate user
    if (!name || !phoneNumber) {
        res.status(400).send({
            "message": "Name and phone number of user required"
        })
    };
    res.status(201).send({
        "messge": "User created successfully",
        "user": {
            name,
            phoneNumber
        }
    });
});

/**
 * Sms endpoints
 * person sending sms
 * person receiving sms
 * message of sms
 * sms status
 */

app.post('/sms', (req, res) => {
    const { sender, receiver, message, status } = req.body;
    res.status(201).send({
        "Message": "Send createad successfully",
        "sms": {
            sender,
            receiver,
            message,
            status
        }
    });
});

// Get all messages
app.get('/sms', async (req, res) => {
    // Fetch all sms in the database
    // const sms = await sms.findAll();
    res.status(200).send({
        "Message": "Sms retrieved successlly"
    })
});


// Run client for db connection
client.connect().then(() => {
    console.log("Database connection created successfully.")
}).catch(err => {
    console.log('Error while connecting to db', err)
})

// App listen
app.listen(port, hostname, () => {
    console.log(`Listneing to ${hostname}/${port}`)
});

export default app;
