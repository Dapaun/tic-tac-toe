const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const auth = require('./routes/auth');

const config = require("config");

const app = express();

app.use(express.json());

//DB setup
const db = config.get('mongoURI');
mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the DB');
    })
    .catch(e => console.log(e));

app.use('/auth', auth);

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));