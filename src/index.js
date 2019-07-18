import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import db from './database/query';

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
app.use(cors());

// Get Swagger API documentation
app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Welcome to SMS managament application." });
});

/**
 * Create user and needs
 * Name, phone number
 */

// Add contact in the list
app.post('/contacts', async (req, res) => {
    const { name, phoneNumber } = req.body;
    // Validate user
    if (!name || !phoneNumber) {
        res.status(400).send({
            "message": "Name and phone number of user required"
        });
    };

    // Try inserting data into the database
    const data = `INSERT INTO contacts(name, phone_number, created_date) 
                    VALUES($1, $2, $3) RETURNING *`;
    const values = [name, phoneNumber, moment(new Date())];
    // Async await (try/catch)
    try {
        const { rows } = await db.query(data, values);
        return res.status(201).send({
            "messge": "Contact created successfully",
            "user": rows[0]
        });
    } catch (err) {
        return res.status(400).send(err)
    }
});

// Get all contacts
app.get('/contacts', async (req, res) => {
    // Selecting user's contacts from table contacts
    const data = 'SELECT * FROM contacts';
    try {
        const { rows, rowCount } = await db.query(data);
        if (rows.length < 1 || rowCount < 1) {
            return res.status(404).send({
                "message": "There are no contacts that exist at the moment"
            });
        }
        return res.status(200).send({
            "message": "Contacts retrieved successfully.",
            "contacts": rows,
            "totalCount": rowCount
        });
    } catch (err) {
        return res.status(400).send(err)
    }
});

// Delete contacts from my list
app.delete('/contacts/:id', async (req, res) => {
    const data = `DELETE FROM contacts WHERE id=${req.params.id}`;
    try {
        const deleteContact = await db.query(data);
        return res.status(200).send({
            "message": "Deleted contacts and sms related to them successfully"
        })
    } catch (err) {
        return res.status(400).json(err)
    }
});

/**
 * Sms endpoints
 * person sending sms
 * person receiving sms
 * message of sms
 * sms status
 */

// Send an sms
app.post('/sms', async (req, res) => {
    const { senderId, receiverId, message, status } = req.body;
    if (!senderId || !receiverId || !message || !status) {
        res.status(400).send({
            "message": "Sender, receiver, message and status required"
        });
    };
    const data = `INSERT INTO sms(sender_id, receiver_id, message, status, created_date) 
                    VALUES($1, $2, $3, $4, $5) RETURNING *`
    // Values to insert into db
    const values = [senderId, receiverId, message, status, moment(new Date())]

    try {
        const { rows } = await db.query(data, values);
        return res.status(201).send({
            "Message": "Message was sent successfully",
            "sms": rows[0]
        });
    } catch (err) {
        return res.status(400).send(err)
    }
});

// Get all messages
app.get('/sms', async (req, res) => {
    // Fetch all sms in the database
    const data = 'SELECT * FROM sms';

    try {
        const { rows, rowCount } = await db.query(data);
        if (rows.length < 1 || rowCount < 1) {
            return res.status(404).send({
                "Message": "There no sms at the moment"
            });
        }
        return res.status(200).send({
            "Message": "All sms retrieved successfully",
            "sms": rows,
            "smsCount": rowCount
        })
    } catch (err) {
        return res.status(400).send(err)
    }
});

// App running on
app.listen(port, hostname, () => {
    console.log(`Listening to http://${hostname}/${port}`)
});

export default app;
