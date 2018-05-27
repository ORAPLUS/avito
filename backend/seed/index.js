var mongoose = require('mongoose')
var configDB = require('../src/config/config.js')
// configuration ===============================================================
mongoose.Promise = global.Promise
mongoose.connect(configDB.url, { useMongoClient: true }) // connect to our database
// Begin Seed User =============================================================
try {
  var User = require('../src/models/User')
  // drop User before add the admin
  User.collection.drop()
  // create user admin always active
  var newUser = new User()

  newUser.email = 'sis.ayoub.youb@gmail.com'
  newUser.password = newUser.generateHash('Casacasa123')
  newUser.active = 1

  newUser.save(function (err) {
    if (err) { console.log(err) }
    mongoose.disconnect()
  })
} catch (err) {
  console.log('error occured in the user table')
}
// End Seed User =============================================================
