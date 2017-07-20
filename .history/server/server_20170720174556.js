const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App runnig on ${port} port`)
});


module.exports = {app};