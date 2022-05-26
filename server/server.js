
import * as express from 'express';
import routes from './routes';
import * as passport from 'passport'; //bring in passport 
// import * as PassportLocal from 'passport-local';

import './middlewares/passport-strategies.mw'; //when the server starts it will run this file as a side effect.
                                            //then passport will initialize with these strategies from tis file coded on it.
const app = express();

//all this moved to passport-strategies.mw.js
// import db from './db';
// import { compareHash } from './utils/password';
// //passport middleware         //strategy is a constructor function that takes 2 arguments...a configuration or options object, and after that a callback function
// //by default passport is coded to look for a username.
// passport.use(new PassportLocal.Strategy({
//     usernameField: 'email' //default is username so need to override with email for login.
// }, async (email, password, done) => {
//     try {
//         const [userFound] = await db.users.find('email', email);  
//         if (userFound && compareHash(password, userFound.password)) {
//             done(null, userFound); //call null here b/c there is no error.
//             //could create token here but not recommended b/c this is simply for the logic used for the login.
//         } else { //this is if the password fails or the user is not found
//             done(null, false); //null b/c there is no error and false b/c no user was found
//         }
//     } catch (error) {
//         done(error);
//     }
// }));

app.use(passport.initialize()); //this makes it available middleware
app.use(express.static('public'));
app.use(express.json());  
app.use(routes);

const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
console.log('You can do it!!')






