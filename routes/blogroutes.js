const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();


//render what is in the database to our site, in this case the blogs that we connected to our database using mongoose and imported the model at the top 
router.get('/' , (req,res)=>{
    //use the blog schema to find our blogs and arrange it according to our schema structure in the database the sorting them using the timestamp
Blog.find().sort( {createdAt: -1})
    .then((result) => {
        //rendering from our blogs in the database to our index.ejs //the results here is arranged according to our schema
        res.render('index', {title:'All Blogs', blogs:result})
    }).catch((err) => {
        console.log(err)
    });
});



router.post('/' , (req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    }).catch((err) => {
        console.log(err)
    });
});

 router.get('/:id', (req,res)=>{
     const id =req.params.id;
     Blog.findById(id)
      .then((result) => {
         res.render('details', {title:'Details', blog:result})
      }).catch((err) => {
         console.log(err);
      });
 });


//sending a delete request to the database
router.delete('/:id' , (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'})
    }).catch((err) => {
        console.log(err)
    });
})


module.exports = router;