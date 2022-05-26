import { authenticate } from "passport";
import passport from "passport";


//middleware with the 3 arguments it needs. intercept the request, maybe send a response if it needs to, otherwise move to the next step.
export function tokenCheck(req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (info) {
            info.message === "invalid token"//this is the passport response so I am changing it below.
            return res.status(401).json({ message: "this is not the token you are looking for" })//here could just be { message: info.message}
        }
        if (!user) {
            return res.status(401).json({ message: "redirect to login" })
            //res.redirect('/login')
        }
        
        req.user = user;
        next();
    })(req, res, next);
}