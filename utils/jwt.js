const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    const secret = process.env.SECRET_TOKEN;
return jwt.sign({
id: id
 }, secret, { expiresIn: '8h' });
}
const verifyJWT = (token) => {
    const secret = process.env.SECRET_TOKEN;
return jwt.verify(token, secret);
}
module.exports = {
verifyJWT,
generateJWT
}