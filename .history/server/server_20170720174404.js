const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const bodyParser = require('body-parser');


app.listen(port, () => {
    console.log(`App runnig on ${port}`)
});
