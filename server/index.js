const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();
const keys = require('./config/keys');
const bodyParser = require('body-parser');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json())

require('./models/Cards');
require('./routes/api')(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT);