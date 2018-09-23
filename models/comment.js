const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment

// CREATE Comment
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  });
});
