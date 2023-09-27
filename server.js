const express = require('express');
const app = express();
const env = require('dotenv').config();
const dbconfig = require('./config/dbConfig')

const port = process.env.PORT || 5000;













app.listen(port, ()=>console.log(`Server is running on ${port}`));