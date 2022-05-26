
import * as jwt from 'jsonwebtoken';
import { Router } from 'express';
import db from '../../db';
import config from '../../config';
import { generateHash } from '../../utils/password';

const router = Router();

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        newUser.password = generateHash(newUser.password);//the right side of the assignment will be evaluated first.
        //^this will take their current plain text password salt and hash it and reassign it over itself on the newUser.
        
        const result = await db.users.insert(req.body.email, req.body.password);
        const token = jwt.sign(
            { userid: result.insertId, email: newUser.email, role: 'guest'},//result.unsertId is who just got inserted into the databasew
            config.jwt.secret,
            { expiresIn: config.jwt.expires}
        );
console.log(newUser);
        // const token = jwt.sign(
        //     { userid: req.user.id, email: req.user.email, role: 'guest' },
        //     config.jwt.secret,
        //     { expiresIn: '15d' }
        // ); //payload
        // res.json(token);
        
        res.json(token);
            
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'my code sucks!' });

    }
})

export default router;



