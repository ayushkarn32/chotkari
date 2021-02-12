const express=require('express');
const app=express();
const cryptoRandomString = require('crypto-random-string'); 

app.use(express.urlencoded({extended:false}))

const urls=[
  {id:1,full:"abc.com/xyz/post/123",short:"first"}
];

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
  })

app.get('/urls', (req, res) => {
    res.send(urls)
  })

app.get('/urls/:id', (req, res) => {
    const data=urls.find(d => d.short==req.params.id) 
    data ? res.send(`https://${data.full}`): res.status(404).send("no data found")
})

app.post('/urls', function (req, res) {
  urls.push({
    id:urls.length+1,
    full: req.body.inputurl,
    short:cryptoRandomString({length: 5, type: 'alphanumeric'})
  });
  console.table(urls)
  res.redirect('/')
})

app.listen(7000);