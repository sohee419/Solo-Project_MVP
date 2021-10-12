const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
//dotenv - a module that loads environment variables from a .env file into process.env
const cors = require('cors');

// load env variables. passing in an object with the path describing where the confi file (Globla variable) will be stored. 
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser MW
app.use(express.json());

// Enable cors
app.use(cors());

// Routes
app.use('/api/v1/business', require('./routes/business'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))