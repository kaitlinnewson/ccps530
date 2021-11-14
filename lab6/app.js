// -----------------
// CCPS 530, Lab 6
// Kaitlin Newson
// November 2021
// -----------------

let express = require('express');
let app = express();

app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({    // to support URL-encoded bodies
  extended: false
})); 

// Initial list of books
let books = [
    {
      'title':'Dune',
      'author':'Frank Herbert',
      'publisher':'Penguin Random House',
      'date':'August 1965',
      'website':'https://www.penguinrandomhouse.com/books/352036/dune-by-frank-herbert/',
      'isbn': '9780441013593',
    },
    {
      'title':'Dune Messiah',
      'author':'Frank Herbert',
      'publisher':'Penguin Random House',
      'date':'1969',
      'website':'https://www.penguinrandomhouse.com/books/342568/dune-messiah-by-frank-herbert/',
      'isbn':'9780593201732',
    },
]

// List site functions available
app.get('/', function(req, res){

  const options = '<ul> \
                  <li><a href="/bookinventory/list">List all books</a></li> \
                  <li><a href="/bookinventory/add">Add a new book</a></li> \
                 </ul>'

  res.send(options);
});

// Get list of all books
app.get('/bookinventory/list', function(req, res) {
  let html = '<p>'
  for (let i = 0; i < books.length; i++) {
     html = html + 'Title: ' + books[i].title + '<br>';
     html = html + 'Author(s): ' + books[i].author + '<br>';
     html = html + 'Publisher: ' + books[i].publisher + '<br>';
     html = html + 'Original Date of Publication: ' + books[i].date + '<br>';
     html = html + 'Website: ' + '<a href="' + books[i].website + '">'+ books[i].website + '</a><br>';
     html = html + 'ISBN: ' + books[i].isbn + '<br><br>';
   }
   html += '</p><br>'

  res.send('<h1>List of books</h1><p><a href="/bookinventory/listjson">View list as JSON</a></p>' + html);
});

app.get('/bookinventory/listjson', function(req, res) {
  res.send(books);
});

// Add a new book to the inventory
app.get('/bookinventory/add', function(req, res){

  const html = '<br><form action="/bookinventory/addbook" method="post"> \
              <label for="bookTitle">Title:</label><br> \
              <input type="text" id="bookTitle" name="bookTitle" required><br><br> \
              <label for="bookAuthor">Author(s):</label><br> \
              <input type="text" id="bookAuthor" name="bookAuthor" required><br><br> \
              <label for="bookPublisher">Publisher:</label><br> \
              <input type="text" id="bookPublisher" name="bookPublisher" required><br><br> \
              <label for="bookDate">Original Date of Publication:</label><br> \
              <input type="text" id="bookDate" name="bookDate" required><br><br> \
              <label for="bookWebsite">Website:</label><br> \
              <input type="text" id="bookWebsite" name="bookWebsite" required><br><br> \
              <label for="bookISBN">ISBN:</label><br> \
              <input type="text" id="bookISBN" name="bookISBN" required><br><br> \
              <input type="submit" value="Add Book"><br></form>'

  res.send('<h1>Add a book</h1>' + html);
});

app.post('/bookinventory/addbook', function(req, res) {
  const newBookTitle = req.body.bookTitle;
  const newBookAuthor = req.body.bookAuthor;
  const newBookPublisher = req.body.bookPublisher;
  const newBookDate = req.body.bookDate;
  const newBookWebsite = req.body.bookWebsite;
  const newBookISBN = req.body.bookISBN;

  const bookJson = {'title': newBookTitle, 
                    'author': newBookAuthor,
                    'publisher': newBookPublisher,
                    'date': newBookDate,
                    'website': newBookWebsite,
                    'isbn': newBookISBN
                   };
  books.push(bookJson);
  res.send('Book with title "' + newBookTitle + '" has been added.<br><br><a href="/bookinventory/add">Add another book</a><br><br><a href="/bookinventory/list">List all books</a>');
});

app.listen(3000);
