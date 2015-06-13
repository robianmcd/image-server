var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

//Enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var images = [
    {url: 'http://i.imgur.com/DuMqW96.jpg', description: 'Owl Creek Pass, Colorado by Stuart Gordon'},
    {url: 'http://i.imgur.com/2CCGvhw.jpg', description: 'This owl is appears enamored with a leaf'},
    {url: 'http://i.imgur.com/ZM2xE1A.jpg', description: 'This stop sign has a sign under it to remind you that the above stop sign is a stop sign'},
    {url: 'http://i.imgur.com/j18XC9i.jpg', description: 'The most boring superhero ever'}
];

app.get('/api/images', function (req, res) {
    res.send(images);
});

app.post('/api/images', function(req, res) {
    var newImage = {url: req.body.url, description: req.body.description};

    if(newImage.url && newImage.description && typeof newImage.url === 'string' && typeof newImage.description === 'string') {
        images.unshift(newImage);

        while(images.length > 20) {
            images.pop();
        }

        res.send(newImage);
    } else {
        res.send(400, {error: 'Post body must contain a url and a description and they must be strings'});
    }

});

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening');
});