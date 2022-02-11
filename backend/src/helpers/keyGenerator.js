/** Generate keys for password reset */

const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
module.exports = (len) => {
    let password = ''
    for (let i = 0; i < len; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return password
}
