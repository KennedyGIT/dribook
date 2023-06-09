const express = require('express')
const path = require('path')
const ejs = require('ejs')

const app = new express();

app.listen(4000, () => 
{
    console.log('App listening on Port 4000')
})

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/',(req, res) => {
    res.render('index')
})


app.get('/login', (req, res) => 
{
  
    res.render('login')
})

app.get('/G', (req, res) => 
{
   
    res.render('g')
})

app.get('/G2', (req, res) => 
{
    res.render('g2')
})


