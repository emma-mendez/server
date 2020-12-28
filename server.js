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
if (process.env.NODE_ENV !== 'productiom') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )
    


const users = []

// APP SET & USE
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// RENDER INDEX PAGE

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: 'Emma'})
})

//  GET & POST LOGIN
app.get('/login', checkAuthenticated, (req, res) => {
    res.render('login.ejs', { name: req.user.name })

})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true
}))


//  GET & POST REGISTRATION

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')

})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        // this will be auto generated when linked to Mongo, temporary for now!
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        // if failed redirects to register!
        res.redirect('/register')

    }
console.log(users)   
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// start the server
app.listen(1000, () => {console.log('Emmas Server Up & Running')})
