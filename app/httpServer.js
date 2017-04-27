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
const app = express()

app.use((request, response, next) => {
  request.chance = Math.random()
  console.log('Chance middlewar call', request.chance);
  next()
})

app.use((request, response, next) => {
  console.log('Response logger call',request.headers)
  next()
})



app.get('/', (request, response) => {
  response.json({
    chance: request.chance
  })
})

app.listen(3000)
