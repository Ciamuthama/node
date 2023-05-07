require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouters = require('./routes/blogroutes');

const app = express();
const dbURL= process.env.CONNECT_DB;
mongoose.connect(dbURL)
   .then((result) => {
    app.listen(3000);
    console.log('connected to db');
   }).catch((err) => {
    console.log(err);
   });

app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//adding data to database
// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog ({
//         title:'new blog',
//         snippet:'hello how are you',
//         body:'just answer the question'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err);
//     });
    
// });


//redirecting the home page to our blog page
app.get('/', (req,res) =>{
   res.redirect('/blogs')
});

app.get('/about', (req,res) =>{
    res.render('about', {title: 'about'});
});

app.get('/create', (req,res)=>{
   res.render('create', {title:'create new blog'});
});

app.use('/blogs', blogRouters);
