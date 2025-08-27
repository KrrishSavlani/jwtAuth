//login loguot and refresh

import express from 'express';
const app = express();

import jwt from 'jsonwebtoken';

const secretKey = '03d41ef89b18c8094e6887e068324cfb98617eb49e6198a3f277f4f9152e25efe2a0c2f28a10a3c7cbd8228cab5523482d07aef2f6503aeee4a3dffc6cf1203d';

import dotenv from 'dotenv'
dotenv.config()
app.use(express.json());

let refTokens = [];


app.delete("/logout" , (req, res) => {
    refTokens = refTokens.filter(token => token !== req.body.token); //remove the token from the array
    res.sendStatus(204);
})
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!refTokens.includes(refreshToken)){return res.sendStatus(403);}
    jwt.verify(refreshToken , process.env.REFRESH_TOKEN , (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({name : user.name});
        res.json({accessToken : accessToken});
    })
})

app.post('/login' , (req, res) => {
    //authenticate user first then do this
    const username = req.body.username;
    const user = {name : username}
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN);
    refTokens.push(refreshToken);
    res.json({accessToken : accessToken , refreshToken : refreshToken});
})

function generateAccessToken(user) {
    return jwt.sign(user , process.env.ACCESS_TOKEN , {expiresIn : '15s'});
}

app.listen(4000 , () => {
    console.log('Server is running on port http://localhost:4000');
})
