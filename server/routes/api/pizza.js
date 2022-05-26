// import * as jwt from 'jsonwebtoken'; 
// import config from '../../config'; 
import { Router } from 'express';
import passport from 'passport';
import { tokenCheck } from '../../middlewares/auth.mw';

const router = Router();



// router.get('/', passport.authenticate('jwt', {successRedirect: '', failureRedirect : '', session: false}), (req,res) => {           
    //^instead of authenticate we want to use our tokenCheck() from auth.mw.js.
    router.get('/', tokenCheck, (req,res) => {    
    try {
    
    
        //    //no token? no go
    // const bearerToken = req.headers.authorization?.split(' '); 
    
    // const token = bearerToken && bearerToken[0] === "Bearer" ? bearerToken[1] : null;
    // if (!bearerToken || !token) {
    //     res.status(401).json({ message: 'unauthorized'});
    //     return;
    // }

    // //validate that the token is not expired and has the correct signature
    // const payload = jwt.verify(token, config.jwt.secret); 
    

    // console.log(token);
    res.json({ message: `Hell Yeah, got that token ${req.user.email}!!!` }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'my code sucks', error: error.message})
    }
});


export default router;