const express = require('express')
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 以上套件因使用上有包含相關變數，故一定要在app = express()之後宣告

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 引用todo.js中的 Schema
const Todo = require('./models/todo')

const db = mongoose.connection
// 連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// extname:指定副檔名為縮寫的hbs
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 引用路由器 (設定/routes即會自動尋找底下的index.js)
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)


app.listen(3000, () => {
  console.log('Succeed in running on port 3000.')
})