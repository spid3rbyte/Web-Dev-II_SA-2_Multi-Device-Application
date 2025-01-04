// this library is used to interact w a mongodb database
// helps define structure of docs in a mongodb collection through smthn called schemas
import mongoose from "mongoose";

// a schema in mongoose defines the structure of the docs that'll be stored in mongodb 
const userSchema = new mongoose.Schema({
    username: {
        type: String, //the value must be of type string 
        required: true //this field is mandatory, doc wont be saved w out it 
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.model("User, userSchema");