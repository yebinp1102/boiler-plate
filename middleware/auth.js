const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리 담당
  // 순서 : 클라이언트의 쿠키에서 토큰 가져옴 -> 토큰 해독 -> 유저 탐색 -> 유저 있으면 인증 0, 없으면 인증 X
  let token = req.cookies.x_auth;
  User.findByToken(token, (err,user)=>{
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true})
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth }