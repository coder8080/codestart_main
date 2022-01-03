const passwordValidator = require('password-validator')
const validator = new passwordValidator()

validator
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase(1)
    .has()
    .lowercase(1)
    .has()
    .symbols(1)
    .has()
    .not()
    .spaces()

module.exports = validator
