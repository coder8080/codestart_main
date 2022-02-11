/** CORS middleware */

const allowedOrigins = ['http://localhost:8080', 'http://127.0.0.1:8080']
module.exports = (req, res, next) => {
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', true)
    next()
}
