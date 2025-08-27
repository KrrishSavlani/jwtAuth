import express from 'express';
const app = express();

import jwt from 'jsonwebtoken';

const secretKey = '03d41ef89b18c8094e6887e068324cfb98617eb49e6198a3f277f4f9152e25efe2a0c2f28a10a3c7cbd8228cab5523482d07aef2f6503aeee4a3dffc6cf1203d';

import dotenv from 'dotenv'
dotenv.config()
app.use(express.json());



const posts = [
    {
        username : "john_doe",
        title : "post1"
    },
    {
        username : "johny johny",
        title : "post2"
    }
]

app.get('/posts' , authenticateToken , (req, res) => {
    res.json(posts.filter(post =>  post.username === req.user.name));
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //if we have authHeader then split it and get the token part
    if(token == null) return res.sendStatus(401) //if there is no token
    jwt.verify(token , process.env.ACCESS_TOKEN , (err, user) => {
        if(err) return res.sendStatus(403) //if token is invalid
        req.user = user
        next() //pass the execution to the next middleware
    })
}


app.listen(3000 , () => {
    console.log('Server is running on port http://localhost:3000');
})