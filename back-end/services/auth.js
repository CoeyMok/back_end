const jwt = require('jsonwebtoken');

const login = (req,res) => {
    if(req.body.username === undefined || req.body.password === undefined){
        return res.status(401).end('login fail')
        
    }
    const username = req.body.username;
    const password = req.body.password;

    db.get('SELECT * from users where username = ? and password = ?', [username, password], (err, result) => {
        if (err) {
            return res.status(401).end('login fail')
        } else {
          // do something with result
          if(result){
            const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            console.log("token:", token)
        
            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
            return res.send({username,password,token})
          }
          else{
            return res.status(401).end('login fail')
          }
        }
      })
}

module.exports = {login}