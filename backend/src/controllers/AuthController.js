var User = require('../models/User')
var config = require('../config/config')
var jwt = require('jsonwebtoken')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.secret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        email: email
      })

      if (!user) {
        return res.status(400).json({
          success: false,
          errors: 'Authentication failed. User not found.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          errors: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.status(200).json({
        success: true,
        user: userJson,
        token: jwt.sign(userJson, jwtSignUser(userJson)),
        msg: 'Successful created new token.'
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        errors: 'An error has occured trying to log in [' + err.message + ']'
      })
    }
  },
  async signup (req, res) {
    try {
      // save the user
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.status(200).json({
        success: true,
        user: userJson,
        token: jwt.sign(userJson, jwtSignUser(userJson)),
        msg: 'Successful created new token.'
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: 'This email account is already in use [' + err.message + ']'
      })
    }
  }
}
