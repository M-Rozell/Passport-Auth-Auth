
import * as bcrypt from 'bcrypt'; 

//generateHash('password123'); 
export function generateHash(password){
    const salt = bcrypt.genSaltSync(12);  
    const hash = bcrypt.hashSync(password, salt); 
    return hash;
}

export function compareHash(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}

// console.log(generateHash('password123'));
// console.log(compareHash('password123', '$2b$12$YKmf3M4uLKDO8jpFx6sQYO96OknleImqWCa9GYwGHr53xgIjySEne'))





