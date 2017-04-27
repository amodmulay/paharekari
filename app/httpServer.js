// app/httpServer
/* const http = require('http')
const port = 3000

const requestHandler = (request,response) => {
  console.log(request.url)
  response.end('pharekari is up')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if(err){
    return console.log('Something went wrong!!!', err)
  }
  console.log('pharekari active on :', port)
}) */

const express = require('express')
const exphbs = require('express-handlebars')
var path = require("path");
const app = express()

// #1 initialize handelbars engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))
//finish #1

app.use((request, response, next) => {
//  console.log('Response logger call',request.headers)
  next()
})
//home handler
app.get('/', (request, response) => {
  response.render('home', {
    name: 'welcome to paharekari'
  })
})


app.listen(3000)
