const { application } = require("express");
const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use('/posts', require ('./routes/posts'));
app.use('/users', require ('./routes/users'));
app.use('/comments', require ('./routes/comments'));
