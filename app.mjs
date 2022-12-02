// require('dotenv').config();
import request from 'request';
import upload from './upload.mjs'
import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config();

// const dotenv = request('dotenv').config();
// const upload = import('./upload.mjs');
// const express = require('express');
const app = express();
const port = 8080;
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to CORS server');
})
app.post('/upload',(req, res) => {
    res.header({'Access-Control-Allow-Origin': '*'})
    upload(()=> {
        console.log('success')
        res.send({})
    },'Wikipedia:Sandbox', 'test')

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