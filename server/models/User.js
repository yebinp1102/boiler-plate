const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    // trim은 데이터 사이에 불필요한 빈칸(space)를 제거해준다.
    trim: true,
    // unique는 같은 유저 정보를 가진 사람이 존재하지 못하게 함.
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 관리자와 일반 유저를 분류하기 위해서 사용
  role: {
    type: Number, // 관리자의 수
    default: 0 // 관리자의 수를 따로 지정하지 않을 시 초기 값 0으로 지정
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: { // 토큰의 유효기간
    type: Number
  }
})

// 비밀번호 암호화
userSchema.pre('save', function (next) {
  var user = this
  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, (err,salt)=>{
      if(err) return next(err)
  
      bcrypt.hash(user.password, salt, (err, hash)=>{
        if(err) return next(err)
        user.password = hash
        next()
      })
    })
  }else{
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, callback){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return callback(err)
    callback(null, isMatch)
  })
}

userSchema.methods.generateToken = function(callback){
  let user = this;
  // jsonwebtoken을 이용해서 토큰 생성
  let token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save(function(err, user){
    if(err) return callback(err)
    callback(null, user)
  })
}

userSchema.statics.findByToken = function(token, callback){
  let user = this;
  // 토큰 해독, verify 메서드 사용
  jwt.verify(token, 'secretToken', function(err, decoded){
    user.findOne({"_id" : decoded, "token" : token}, function(err,user){
      if(err) return callback(err);
      callback(null, user)
    })
  })
}

const User = mongoose.model('User', userSchema);

module.exports= { User }