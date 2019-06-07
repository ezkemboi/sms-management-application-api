import express from 'express';

const app = express();
const port = 8000;
const hostname = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Welcome to NodeJS" })
})

app.listen(port, hostname, () => {
    console.log(`Listneing to ${hostname}/${port}`)
})