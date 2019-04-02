require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()


let {PORT, MONGODB_URI} = process.env;

app.use(express.json())

//routes


//connect to mongodb
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/baby-book", {useNewUrlParser: true}).then(() => console.log("Connected to MongoDB"))


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))