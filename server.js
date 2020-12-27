// import express from 'express'
// import cors from 'cors'
// const app = express()

// app.set('view-engine', 'ejs')

// app.use(cors())

// // login endpoints
// app.get('/logIn', ( req,res) => {

//         res.render('index.ejs')
// })


// // test page
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

// // sign up endpoints

// app.get('/signUp', ( req,res) => {

//     res.json({
//         status : 'success',
//         message: 'Signing Up'
// })
// })


const express = require('express')
const app = express()

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Emma'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')

})

app.get('/register', (req, res) => {
    res.render('register.ejs')

})

app.post('/register', (req, res) => {
    
})
// start the server
app.listen(1000, () => {console.log('Emmas Server Up & Running')})
