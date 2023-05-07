const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:false
    },

    
    body:{
        type:String,
        required:false
    }
    
},{timestamps:true});

//model to communicate with the database
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;