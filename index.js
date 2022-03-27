const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('서버 연결 성공!'))

const { User } = require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// Register Router
app.post('/register', (req,res)=>{
  const user = new User(req.body)
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})
// Login Router
app.post('/login', (req, res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 존재하지 않습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 일치하지 않습니다."})
      user.generateToken((err,user)=>{
      })
    })    
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

