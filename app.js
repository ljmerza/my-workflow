'use strict'

let express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  http = require('http')

var routes = require('./routes/index')
var users = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.set('port', process.env.PORT || 8080)

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}
// production error handler - no stacktraces
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// create server object
let server = http.createServer(app)
// booting up server function
let boot = function() {
  server.listen(port, function() {
    console.log('Express server listening on port ', port)
  })
}
// shutdown server function
let shutdown = function() {
  server.close()
}

// if main module then start server else pass to exports
if(! require.parent){
  boot()
} else {
  console.log('Running app as module')
  module.exports = {
    boot: boot,
    shutdown: shutdown,
    port: port,
    server: server,
    app: app
  }
}
