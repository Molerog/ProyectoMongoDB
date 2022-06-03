const { application } = require("express");
const express = require("express");
const { typeError } = require('./middleware/errors');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use('/posts', require ('./routes/posts'));
app.use('/users', require ('./routes/users'));
app.use('/comments', require ('./routes/comments'));

app.use(typeError);
