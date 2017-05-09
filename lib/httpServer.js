const express = require('express');
const exphbs = require('express-handlebars');
const port = 3000;
var path = require("path");
const app = express()

// #1 initialize handlebars engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}));

// configure server to use handlebars
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../views'));
//finish #1

app.use((request, response, next) => {
  //  console.log('Response logger call',request.headers)
  next()
});
//home handler
app.get('/', (request, response) => {
  response.render('home', {
    name: 'welcome to paharekari'
  })
});


app.listen(port, (err) => {
  if (err) {
    console.log(
      "Failed to start paharekari. Ensure another instance is not running and port %d is available.",
      port);
  } else {
    console.log("paharekari is listening on port %d in monitor mode", port);
  }
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
});
