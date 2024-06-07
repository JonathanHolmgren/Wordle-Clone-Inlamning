const express = require('express');
const path = require('path');

const app = express();
const port = 5080; 

app.use(express.static('../client/build'))
app.use(express.json());





fakeListDatabase = [{
  text: "Learn JavaScript",
  completed: true
},{
  text: "Learn Java",
  completed: true
},{
  text: "Learn Next.js",
  completed: true
}];

app.get('/', (req, res) => {
    res.status(200).json("hello")
    
  });

  app.get('/correctword', (req, res) => {
    const fakeListDatabase = ["word1", "word2", "word3"]; // Fake data for example
    res.status(200).json(fakeListDatabase);
});

 
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'about.html'));
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

