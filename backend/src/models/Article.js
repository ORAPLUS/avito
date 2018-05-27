var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  body: {
    type: String
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Article', ArticleSchema)
