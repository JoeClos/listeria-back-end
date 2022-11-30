require('dotenv').config();
const upload = import('./upload.mjs');
const express = require('express');
// const axios = require('axios');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Welcome to CORS server');
})
app.post('/upload',(request, response) => {
    response.header({'Access-Control-Allow-Origin': '*'})
    console.log(upload)
    upload()
    // .then(res => {
    //     response.send(res.data)
    //     console.log(res.data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})