const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = app.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : 8080');
});