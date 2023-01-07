const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${process.env.MONGO_PROFILE}:${process.env.MONGO_PASS}@cluster0.i8r4g14.mongodb.net/Auth?retryWrites=true&w=majority`)
.then(() => {
    console.log("Connected to Mongo-Atlas");
})
.catch(err => {
    console.log(err);
})

module.exports = mongoose.connect;