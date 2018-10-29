const express = require('express')
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/activity');


app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/bookstore')

app.get('/', function (req, res, next){
  res.json({message: 'Mission Accomplished. It is Working.'})
})

//get- request all books
app.get('/api/books', function(req,res){
  Book.find({}).then(eachOne => {
    res.json(eachOne);
  })
})

//post - create a book
app.post('/api/books', function(req,res){
  Book.create({
    book_name: req.body.book_name,
    author_name: req.body.author_name,
    genre: req.body.genre
  }).then(book => {
    res.json(book)
  })
})

//get - request a book by its id
app.get('/api/books/:books_id', function(req, res){
  Book.findById(req.params.books_id).then(function(err,
    book){
      if(err){
        res.send(err)
      }
      res.json(book)
    })
})
//update by id
app.put('/api/books/:books_id', function(req, res){
  Book.findOneAndUpdate({
    book_name: req.body.book_name,
    author_name: req.body.author_name,
    genre: req.body.genre
  }).then(book => {
    res.json(book)
  })
})

//delete by id
app.delete('/api/books/:books_id', function(req, res){
  Book.findOneAndRemove({
    _id: req.params.books_id
  }).then(book => {
    res.json(book)
  })
})

app.listen(3000);
console.log('Application is working.');
