const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_name: String,
    author_name: String,
    genre: String,
  },{
    timestamps: true
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book
