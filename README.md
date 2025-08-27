# JWT Authentication Example (Node.js + Express)

---

## 🚀 Features
- JWT-based Authentication
- Access Token with Expiration
- Refresh Token Implementation
- Logout (Invalidate Refresh Token)
- Protect Routes using Middleware
- Environment Variables with dotenv

---

## 📂 Project Structure
jwtAuth/
│── server1.js
│── server2.js
│── package.json
│── .env

---
## ⚙️ Installation
git clone <repo-url> <br>
cd jwtAuth <br>
npm install

---
`.env` file:<br>
ACCESS_TOKEN=your_secret_access_key<br>
REFRESH_TOKEN=your_secret_refresh_key

---
## ▶️ Running the Project

npm start -- Runs posts API on port 3000<br>
npm run startAuth --  Runs auth API on port 4000


---

## 📌 API Endpoints

### Login
POST /login<br>
Request : { "username": "john_doe" }<br>
Response : { "accessToken": "xxx", "refreshToken": "yyy" }


### Refresh Token
POST /token<br>
Request : { "token": "your_refresh_token" }


### Logout
DELETE /logout<br>
Request: { "token": "your_refresh_token" }


---

## 📄 Protected Posts API
GET /posts<br>
Authorization: Bearer <access_token><br>
Response : 
[
{ "username": "john_doe", "title": "post1" }
]


---

## 🛡️ Middleware
```js
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
```
## 📖 Flow

1. User logs in → receives **Access Token** (short-lived) and **Refresh Token** (long-lived)  
2. User accesses protected route `/posts` with **Access Token**  
3. If Access Token expires → request new Access Token using `/token` with **Refresh Token**  
4. User logs out → Refresh Token is removed from the server (invalidated)  

---

## 🔮 Future Improvements

- Store refresh tokens in a **database** instead of memory  
- Use **bcrypt** for password hashing  
- Implement **role-based access control (RBAC)**  

---

## 📝 License

Free to use and modify. For learning purposes.  
