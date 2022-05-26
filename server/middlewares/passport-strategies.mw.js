import * as passport from 'passport'; //bring in passport 
import * as PassportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt';
import db from '../db';
import { compareHash } from '../utils/password';
import config from '../config';


passport.serializeUser((user, done) =>  {
    if (user.password) {
        delete user.password//security
    }
    done(null, user);
});
passport.deserializeUser((user, done) => done(null, user));


//passport middleware         //strategy is a constructor function that takes 2 arguments...a configuration or options object, and after that a callback function
//by default passport is coded to look for a username.
passport.use(new PassportLocal.Strategy({
    usernameField: 'email', //default is username so need to override with email for login.
    session: false
}, async (email, password, done) => {
    try {
        const [userFound] = await db.users.find('email', email);  
        if (userFound && compareHash(password, userFound.password)) {
            done(null, userFound); //call null here b/c there is no error.
            //could create token here but not recommended b/c this is simply for the logic used for the login.
        } else { //this is if the password fails or the user is not found
            done(null, false); //null b/c there is no error and false b/c no user was found
            //the false here sends a status 401 text of Unauthorized error message
        }
    } catch (error) {
        done(error);
    }
}));


// const token = jwt.sign(  
//     { userid: req.user.id, email: req.user.email, role: 'guest'}, 
//     config.jwt.secret,   
//     { expiresIn: '15d'} 
//     ); //payload

//this dosen't know what the payload is 
passport.use(new PassportJWT.Strategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}, (payload, done) => {
    try {
        done(null, payload)
    } catch (error) {
        done
    }
}))

