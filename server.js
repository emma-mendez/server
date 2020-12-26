const express = require('express')
const cors = require('cors')
const app = express()
// const {MongoClient} = require('mongodb'); 
// const client = new MongoClient(uri);
// const uri = "mongodb://localhost:27017"

app.use(cors())

// login endpoints
app.get('/logIn', ( req,res) => {

        res.json({
            status : 'success',
            message: 'Logging In'
})
})

// sign up endpoints

app.get('/signUp', ( req,res) => {

    res.json({
        status : 'success',
        message: 'Signing Up'
})
})




// app.get('/signUp', ( req,res) => {

//     if (fakeDatabase.emails.includes(req.params.email)) {
//         res.json({
//             status : 'success',
//             message: 'Successful Log In'
//         })
//     } else {
//         res.json({
//             status: 'fail',
//             message: 'That email does not exist'
//         })
//     }
// })



// start the server
app.listen(1000, () => {console.log('Emmas Server Up & Running')})