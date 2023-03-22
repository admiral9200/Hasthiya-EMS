const mongoose = require('mongoose');

//connect to database
const connectingString = process.env.DATABASE_CONNECTION;

 const connectDB = async() => {
     try {
        mongoose.set("strictQuery", false);
         await mongoose.connect(connectingString,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
         })
         console.log('mongodb connection SUCCESS');
     } catch (error) {
         console.log('mongodb connection FAIL');
         console.log(error);
         process.exit(1);
     }

}

module.exports = connectDB;