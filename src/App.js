const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', require('./routes'));

app.listen(8000, ()=>{
    console.log('Server Berjalan di Port : 8000');
});