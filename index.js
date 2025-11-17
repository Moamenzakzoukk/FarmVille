const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const Farm = require('./routes/farms');
const auth = require('./routes/auth');
const users = require('./routes/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true)

 mongoose.connect('mongodb://127.0.0.1:27017/smartagriDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
.then((console.log('connected to database...')))
.catch((e) => console.error(`failed ${e}`));

app.use('/api/users', users);
app.use('/api/Farm', Farm);
app.use('/api/auth', auth);

app.use('/', (req,res) =>{
    res.send('Welcome to the home page!')
});


const port = 3000;


app.listen(port , ()=>{console.log(`server is live on port ${port}`)});