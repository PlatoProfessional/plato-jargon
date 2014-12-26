
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var java = require('java');

//load articles route
var articles = require('./routes/articles'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: '127.11.123.130',
        user: 'admindnn22y1',
        password : 'CmYpAC5XVn3H',
        port : 3306, 
        database:'plato'

    },'pool') //or single

);


app.get('/', routes.index);
app.get('/articles', articles.list);
app.get('/articles/add', articles.add);
app.post('/articles/add', articles.save);
app.get('/articles/delete/:gk', articles.delete_article);
app.get('/articles/edit/:gk', articles.edit);
app.post('/articles/edit/:gk',articles.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
