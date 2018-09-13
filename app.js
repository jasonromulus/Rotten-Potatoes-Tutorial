const express = require('express')
const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Hello World!' });
// })

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rotten-potatoes',{useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('It is connected.')
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// const Review = mongoose.model('Review', {
//   title: String,
//   description: String,
//   movieTitle: String
// });
