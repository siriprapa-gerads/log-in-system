import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
import { protect } from '../middleware/auth.js';


const router = express.Router();

const cookiesOptions = {
    // cookie cant accessed by js on client
    httpOnly: true,
    // only sent cookies over HTTPS in production
    secure: process.env.NODE_ENV,
    // prevent CSRF attacks
    sameSite: 'Strict',
    // cookies will exprire in 30 days
    maxAge: 30 * 24 * 60 * 1000 // 30day
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


// register
router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    // 1. check info
    // check if all value is filled
    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all require fileds' })
    }

    // 2.chek if user is exist by email
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(userExists.rows.length > 0) {
        return res.status(400).json({ message: " User already exists" });
    }

    // 3.hashed password
    // if user is not exist hash the password for security
    // then create a new user by insert into users with name, email, and password that is hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );

    // 4.token
    // store the id in the token
    const token = generateToken(newUser.rows[0].id);
    //cookie named token contained the JWT so the client can stay loged in security
    res.cookie('token', token, cookiesOptions);

    // return only users id, name, email to the frontend
    // password will never send its stay save in the server
    // because in newUser only return 'RETURNING id, name, email'
    return res.status(201).json({ user: newUser.rows[0] });
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // check if email and password are provided
    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide all required files' });
    }

    // find users by them email which match the incoming email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // if cant find user 
    // user who sent 'req.body' invaild credential
    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invaild credentials'})
    }

    // if find the user or its match the email
    // able to get user record which is included the personal data
    const userData = user.rows[0];

    // if 'userData.password' match 'password' from req.body
    // take those two password and compare them
    const isMatch = await bcrypt.compare(password, userData.password);

    // it password is match or not
    // !isMatch password does not equil to each other
    if(!isMatch){
        return res.status(400).json({ message: 'Password Invaild credentials'})
    }
    
    // isMatch password is equal to each other -> generate token
    const token = generateToken(userData.id);

    // store the token in cookies
    res.cookie('token', token, cookiesOptions)

    res.json({
        user: { 
            id: userData.id,
            name: userData.name,
            email: userData.email
        }
    })
})

// get data of the loging in user
// has to be protected - protected middleware
router.get('/me', protect, async(req, res) => {
    res.json({ user: req.user })
    // return info of loging in user from protect middleware
})

// log out
router.post('/logout', (req, res) => {
    // over write the token cookie with an emthy string ''
    // at the same time set maxAge to be 1 milisecond to affectily delete it
    res.cookie('token', '', {...cookiesOptions, maxAge: 1})
    // set it into emthy with vary short expire
    // then show message
    res.json({ message: 'Logged out sucessfully' })
})

export default router;
