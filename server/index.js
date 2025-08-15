const express = require("express");
const userRoutes = require('./routes/user.route')
const ConnectDB = require('./utils/ConnectDB');
const sendVerificationMail = require("./middlewares/verifyEmail");
const cors = require("cors")
const eventRoutes = require("./routes/event.route")



require("dotenv").config();

const app = express();
ConnectDB();
// sendVerificationMail('ch
// etankumarsahu2525@gmail.com')

app.use(cors());





app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes )

//event routes
app.use('/event', eventRoutes)
 

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening to port ${process.env.PORT} `);
    
})
