const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI'); // we can get any values in that json file

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });
        console.log('connection success');

    } catch( err ){
        console.error(err.message);
        process.exit(1); // exit process with failure 
         // it throws the error message 
    }
}
module.exports = connectDB;