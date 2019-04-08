require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const expressJwt = require("express-jwt")
const aws = require("aws-sdk")


let {PORT, MONGODB_URI, SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

app.use(express.json())

//connect to mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/baby-book", {useNewUrlParser: true}).then(() => console.log("Connected to MongoDB"))

app.use("/api", expressJwt({secret: SECRET}))

//////// amazon s3 //////////
app.get('/api/sign-s3', (req, res) => {
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
      console.log(returnData)
      return res.send(returnData);
    });
  });
/////////////////// end s3 //////////////

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