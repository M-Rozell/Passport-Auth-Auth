
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport'; 
//we won't be using all of passport so we can import just one thing from it called authenticate.
// import { authenticate } from 'passport';
import { Router } from 'express';
// import db from '../../db'; 
import config from '../../config'; 
// import { compareHash } from '../../utils/password';


const router = Router();




//this function's sole purpose now to retrieve and receive the userFound info, make the token, and send the token as a response.
router.post('/', passport.authenticate('local',{successRedirect : '',  //you could put a route to a page upon successful or unsuccessful completion.
failureRedirect : '', session: false}), async (req, res) => {
    //this part was moved to the passport.use function
    // const email = req.body.email;
    // const password = req.body.password;
    try {
        // console.log(req.user); //this property req.user is created by userFound in passport-strategies. it knows how to populate req.user with the done() from that page.
        //check for the users email
        // const [userFound] = await db.users.find('email', email);
        
        // console.log(userFound);
        
        //checking if users email is found && if passwords compare and pass
        // if ( userFound && compareHash(password, userFound.password)) {
            
        const token = jwt.sign(  
                { userid: req.user.id, email: req.user.email, role: 'guest'}, //userFound here is changed to req.user
                config.jwt.secret,   
                // { expiresIn: '15d'} 
                { expiresIn: config.jwt.expires }
                ); //payload
            
             res.json(token); 
        
             //can't have multiple callbacks Ex. res.status after res.json
        // res.status(401).json({ message: 'invalid credentials'});
        
    //    res.json('plz'); //if this is left in the error occurs (Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
    //The error "Error: Can't set headers after they are sent." means that you're already in the Body or Finished state, but some function tried to set a header or statusCode.
    
    } catch (error) {               
        console.log(error);
        res.status(500).json({ message: 'my code sucks!'});
        
    }
})

export default router;