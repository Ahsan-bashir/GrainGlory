const jwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    return jwt.expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url:/\/products(.*)/,methods:['GET','OPTIONS']},
            { url: /^\/assets\/.*/, methods: ['GET'] },
            '/',
            '/loginPage',
            '/signupPage',
            '/productsPage',
            '/user/register',
            '/user/login',
            '/cprofilePage',
            '/adminDashboard',
            '/addUser',
            '/viewUser/:id',
        ]
    })

}


const isRevoked = async (req, payload, done) => {
    if (!payload.isAdmin) {
        done(null, true);
    }
    done();
};
module.exports = authJwt;