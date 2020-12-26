const { FailureResponse } = require("./response")
const jwt = require('jsonwebtoken')




const Authenticate = {
    async authenticate(req, res, next) {
        try {
            let token = req.headers.token || req.body.token || req.query.token || req.cookies.token || null


            if (!token) {
                res.send(`Token is required`)
            }
            var user = jwt.decode(token, process.env.JWT_SECRET)


            if (user) {
                req.user = user
            }
            else {
                res.send(FailureResponse(`Invalid token !`))
            }
            /* if (!moment(user.exp).isSameOrBefore) {
                 res.send(FailureResponse('Token expired !'))
                 return
             } */

            next()


        } catch (err) {
            res.send(FailureResponse(`Invalid token !`))
        }
    },

    authorize(roles) {
        // roles param can be a single role string (e.g. Role.User or 'User') 
        // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
        if (typeof roles === 'string') {
            roles = [roles];
        }

        return [
            // authenticate JWT token and attach user to request object (req.user)


            // authorize based on user role
            (req, res, next) => {
                let { role } = req.user
                if (roles.length && !roles.includes(role)) {
                    // user's role is not authorized
                    res.status(401)
                    res.send(FailureResponse('You dont have access !'));
                    return;
                }

                // authentication and authorization successful
                next();
            }
        ];
    }

}




module.exports = Authenticate