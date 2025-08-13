const mongoose = require('mongoose');

async function ConnectDB (){
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected Sucessfully')        
    } catch (error) {
        console.error(`Failed to connect with database!!! ${error}`)
        process.exit(1); 
        
    }

}

module.exports = ConnectDB;