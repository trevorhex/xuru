const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  speaker: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  comments: {
    type: [CommentSchema],
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  Story: mongoose.model('Story', StorySchema),
  Comment: mongoose.model('Comment', CommentSchema)
};
