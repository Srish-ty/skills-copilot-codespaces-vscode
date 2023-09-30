// create web server with express
const express = require('express');
const app = express();
// create a port
const port = 3000;
// import the comments.json file    
const comments = require('./comments.json');    
// create a route for getting a list of comments
app.get('/comments', (req, res) => {    
    res.json(comments);    
});
// create a route for getting a single comment
app.get('/comments/:id', (req, res) => {    
    const requestId = req.params.id;    
    let comment = comments.filter(comment => {            
        return comment.id == requestId;      
    });    
    res.json(comment[0]);    
});
// create a route for creating new comments
app.post('/comments', (req, res) => {    
    // implement functionality to add new comments    
});
// create a route for updating existing comments
app.put('/comments/:id', (req, res) => {    
    // implement functionality to update existing comments    
});
// create a route for deleting a comment
app.delete('/comments/:id', (req, res) => {    
    // implement functionality to delete a comment    
});
// listen on the port
app.listen(port, () => console.log(`Listening on port ${port}`));

