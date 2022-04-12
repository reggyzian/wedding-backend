const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const indexRoute = require('./routes');
app.use('/', indexRoute);

app.listen(8000, ()=>{
    console.log('Server Berjalan di Port : 8000');
});