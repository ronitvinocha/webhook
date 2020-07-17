'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const axios = require('axios');
const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/posts', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    axios.post('http://ec2-13-234-21-34.ap-south-1.compute.amazonaws.com:3000/onicares/posts')
  .then(response => {
    var posts=[];
    console.log(response.data.response);
    for(var i=0; i<response.data['response'].length; i++)
    {
        posts.push(response.data['response'][i].contentimageurl);
    }
    console.log(posts);
    return res.json({"fulfillmentMessages": [
        {
          "text": {
            "text":posts
          }
        }
      ]});
  })
  .catch(error => {
    console.log(error);
    return res.json({"response":error});
  });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});