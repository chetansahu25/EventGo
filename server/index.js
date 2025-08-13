const express = require("express");
const userRoutes = require('./routes/user.route')
const ConnectDB = require('./utils/ConnectDB');
const sendVerificationMail = require("./middlewares/verifyEmail");

require("dotenv").config();

const app = express();
sendVerificationMail('chetankumarsahu2525@gmail.com')




ConnectDB();
app.use(express.json());

app.use('/user', userRoutes )
 

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening to port ${process.env.PORT} `);
    
})
