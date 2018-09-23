const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review

// SHOW
app.get('/reviews/:id', (req, res) => {
  // find review
  Review.findById(req.params.id).then(review => {
    // fetch its comments
    Comment.find({ reviewId: req.params.id }).then(comments => {
      // respond with the template with both values
      res.render('reviews-show', { review: review, comments: comments })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});
