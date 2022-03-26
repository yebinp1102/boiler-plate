const mongoose = require('mongoose')

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

const User = mongoose.model('User', userSchema);

module.export= { User }