const { default: expressJwt } = require('express-jwt');

function authJwt(){
    const secret=process.env.secret;
    return expressJwt({
        secret,
        algorithms:['HS256'],
    }).unless({
        path:[
            '/user/register',
            '/user/login'
        ]
    })
}

module.exports=authJwt;