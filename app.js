const express=require('express');
// const body=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');
const { Db } = require('mongodb');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/wikiDB',{ useNewUrlParser: true, useUnifiedTopology: true  } );

const app=express();
const Schema=new mongoose.Schema({title:String,content:String});
const Article=mongoose.model('Article',Schema);

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static('public'));

app.route('/articles')
.get((req,res)=>{
        Article.find((err,articleList)=>{
            if(err) console.log("oh no something went wring in finding query");
            res.send(articleList);
        });
})
.post((req,res)=>{
let source=req.body;
let newArticle =new Article({title:source.title,content:source.content});
newArticle.save((err)=>{
    if(err) console.log(err);
    else console.log('succesfully entered new article');

});
})
.delete((req,res)=>{
    Article.deleteMany((err)=>{
        if(err) console.log(err);
        else {
            console.log("successfully deleted everything");
             res.send("successfully deleted everything")};
        
    });
});

app.route('/articles/:articleName').get((req,res)=>{

Article.findOne({title:req.params.articleName},(err,founList)=>{
    if(!err) console.warn("found error in getting article named ");
    res.send(founList);
})

}).put((req,res)=>{
    Article.replaceOne({title:req.params.articleName},req.body,(err)=>{
         if(err)console.log("error at putting new article"+err);
         res.send("succesfully updated article with put");
    })

}).patch((req,res)=>{
    Article.updateOne({title:req.params.articleName},{$set:req.body},(err)=>{
         if(err)console.log("error at patching new article");
         res.send("succesfully updated article with patch");
    })

}).delete((req,res)=>{
    Article.deleteOne({title:req.params.articleName},(err)=>{
         if(err)console.log("error at putting new article");
         res.send("succesfully deleted article with put");
    })

});
// app.get('/articles',(req,res)=>{
//      Article.find((err,articleList)=>{
//          if(err) console.log("oh no something went wring in finding query")
//          res.send(articleList);
//      });
//     });

// app.post('/articles',(req,res)=>{
//     let source=req.body;
// let newArticle =new Article({title:source.title,content:source.content});
// newArticle.save((err)=>{
//     if(err) console.log(err);
//     else console.log('succesfully entered new article');

// });
// res.send('<h1>succesfully entered new article</h1>');
// });
 
// app.delete('/articles',(req,res)=>{
// Article.deleteMany((err)=>{
//     if(err) console.log(err);
//     else {
//         console.log("successfully deleted everything");
//          res.send("successfully deleted everything")};
    
// });
// });




app.listen(3000,()=>{console.warn("connected")});

