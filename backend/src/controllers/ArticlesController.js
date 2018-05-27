var Article = require('../models/Article')
var User = require('../models/User')

module.exports = {
  async index (req, res) {
    try {
      var tri = 1
      var limit = 10
      var articles = null
      const search = req.query.search
      // console.log('Search : ' + search)
      if (search) {
        var query = {
          $or:
          [
            {title: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
          ]
        }
        articles = await Article
          .find(query)
          .limit(limit)
          .sort({ title: tri })
      } else {
        articles = await Article
          .find()
          .limit(limit)
          .sort({ title: tri })
      }
      res.status(200).json({
        success: true,
        articles: articles
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'an error has occured trying to fetch the articles [' + err.message + ']'
      })
    }
  },
  async show (req, res) {
    try {
      const article = await Article.findById(req.params.articleId)
      res.status(200).json({
        success: true,
        article: article
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'an error has occured trying to show the articles [' + err.message + ']'
      })
    }
  },
  async post (req, res) {
    try {
      const {slug, title, description, body, iduser} = req.body
      const user = await User.findById(iduser)
      if (!user) {
        return res.status(400).json({
          success: false,
          err: 'Authentication failed. User not found.'
        })
      }
      const article = new Article()
      article.slug = slug
      article.title = title
      article.description = description
      article.body = body
      article.user = user
      // Add Article
      await Article.create(article)
      res.status(200).json({
        success: true,
        article: article
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'an error has occured trying to create the article [' + err.message + ']'
      })
    }
  },
  async put (req, res) {
    try {
      const {slug, title, description, body} = req.body
      await Article
        .findOneAndUpdate({ '_id': req.params.articleId },
          { '$set':
          { 'slug': slug,
            'title': title,
            'description': description,
            'body': body
          }},
          {upsert: true, 'new': true})
        .exec(function (err, article) {
          if (err) {
            return res.status(500).json({
              success: false,
              err: err.message
            })
          }
          res.status(200).json({
            success: true,
            article: article,
            msg: 'Successfully updated'
          })
        })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'an error has occured trying to update the article [' + err.message + ']'
      })
    }
  },
  async delete (req, res) {
    try {
      await Article
        .findOneAndRemove({ '_id': req.params.articleId })
        .exec(function (err, article) {
          if (err) {
            return res.status(500).json({
              success: false,
              err: err.message
            })
          }
          res.status(200).json({
            success: true,
            article: article,
            msg: 'Successfully removed'
          })
        })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'an error has occured trying to remove the article [' + err.message + ']'
      })
    }
  }
}
