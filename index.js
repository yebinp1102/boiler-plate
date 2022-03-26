const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yebinp1102:qkrdPqls1102!@online-store.bfj9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('서버 연결 성공!'))

const { User } = require('./models/User')
const bodyParser = require('body-parser')

// 바디파서는 클라이언트가 전송하는 데이터를 서버에서 분석(parse)해서 처리할 수 있게 함.
// application/x-www-form-urlencoded => 이렇게 된 데이터를 분석해서 가져올 수 있게 함.
app.use(bodyParser.urlencoded({extended: true}));
// application/json
// 즉 분석한 것을 JSON 파일로 가져올 수 있게 설정. 
app.use(bodyParser.json());

app.post('/register', (req,res)=>{
  // 회원가입할 때 필요한 정보들을 client에서 가져오면, 그것들을 DB에 저장.
  const user = new User(req.body)

  // save 메서드는 몽고 DB에서 제공. 정보들이 user라는 모델에 저장될 수 있게 함. 
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    // status 200은 응답에 성공했음을 의미, 이를 JSON 형식으로 바꿈. 
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

