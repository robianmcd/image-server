var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));


var images = [
    {url: 'http://i.imgur.com/DuMqW96.jpg', description: 'Owl Creek Pass, Colorado by Stuart Gordon'},
    {url: 'http://i.imgur.com/2CCGvhw.jpg', description: 'This owl is appears enamored with a leaf'},
    {url: 'http//i.imgur.com/ZM2xE1A.jpg', description: 'This stop sign has a sign under it to remind you that the above stop sign is a stop sign'},
    {url: 'http://i.imgur.com/j18XC9i.jpg', description: 'The most boring superhero ever'}
];

app.get('/', function (req, res) {
    res.send(images);
});

app.post('/', function(req, res) {
    if(req.body.url && req.body.description && typeof req.body.url === 'string' && typeof req.body.description === 'string') {
        images.unshift({url: req.body.url, description: req.body.description});

        while(images.length > 20) {
            images.pop();
        }

        res.send(200);
    } else {
        res.send(400, 'Post body must contain a url and a description and they must be strings');
    }

});

var server = app.listen(3000, function () {
    console.log('Listening');
});