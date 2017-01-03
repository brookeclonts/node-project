const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next)=> {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// set up handler for http get request
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcome: "Hey Man, What's up?"
    });
});

app.get('/json', (req, res) => {
    res.send({
        name: 'Andrew',
        likes: [
            'biking',
            'cities'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        'code': 500,
        'message': 'bad request'
    });
});

// bind the app to a port on our machine
// 3000 is the port
app.listen(3000, () => {
    console.log('Sever is up on port 3000');
});