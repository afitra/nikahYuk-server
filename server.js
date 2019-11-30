require('dotenv').config();
require('./config/mongoose')
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    port = process.env.port,
    userRoute = require('./routes/userRoute')

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// schedule()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// R O U T I N G
// app.use('/', homeRoute);
// app.use('/users', userRoute);
// app.use('/questions', questionRoute);
// app.use('/answers', answerRoute);

app.listen(port, () => console.log(`Listen on port ${port} `))