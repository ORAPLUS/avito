const passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var config = require('./config/config.js')
var User = require('./models/User')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secret

passport.use(new JwtStrategy(opts,
  async function (jwtPayload, done) {
    try {
      await User.findOne({id: jwtPayload.id}, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    } catch (err) {
      return done(err, false)
    }
  }))

module.exports = null
