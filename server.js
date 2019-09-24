require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const expressJwt = require("express-jwt")


let {PORT, MONGODB_URI, SECRET} = process.env;

app.use(express.json())

//connect to mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/baby-book", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err))

app.use("/api", expressJwt({secret: SECRET}))


//routes
app.use("/auth", require("./routes/auth"))
// routes requiring authentication
app.use("/api/milestones", require("./routes/milestone"))
app.use("/api/notes", require("./routes/note"))
app.use("/api/photos", require("./routes/photo"))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({message: err.message})
})


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))