const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Comment = require('./models/comment')
// const Review = mongoose.model('Review', {
//   title: String,
//   description: String,
//   movieTitle: String
// });
const Review = require('./models/review')

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


mongoose.connect('mongodb://localhost/rotten-potatoes',{useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('It is connected.');
// });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});


// INDEX
app.get('/', (req, res) => {
  Review.find()
  .then(reviews => {
    res.render('reviews-index', { reviews: reviews });
  })
  .catch(err => {
    console.log(err);
  });
});

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`); // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  });
});

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  });
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  });
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    });
});

// DELETE
// app.delete('/reviews/:id', function (req, res) {
//   console.log("DELETE review")
//   Review.findByIdAndRemove(req.params.id).then((review) => {
//     res.redirect('/');
//   }).catch((err) => {
//     console.log(err.message);
//   });
// });

// DELETE
app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

// const reviews = require('./reviews');

module.exports = app;

// var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
