const Joi = require('joi')

module.exports = {
  signup (req, res, next) {
    const schema = {
      username: Joi.string().alphanum().min(5).max(30).required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      email: Joi.string().email().required(),
      bio: Joi.string().allow('').optional(),
      image: Joi.string().allow('').optional()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'You must provide a valid username entre 5 et 30 caractere'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information.'
          })
      }
    } else {
      next()
    }
  }
}
