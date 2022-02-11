/** Authorization middleware */

const jwt = require('../helpers/jwt')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        // Get user id
        const email = jwt.decode(req.headers.authorization)
        // Get user
        const user = await User.findOne({
            email,
        })
        if (user) {
            // If the user exist, save him
            req.body.user = user
            next()
        } else {
            res.status(401).end()
        }
    } catch (e) {
        console.log(e)
        res.status(401).json({ errors: ['ваш токен не подтверждён. войдите на сайт'] })
        return
    }
}
