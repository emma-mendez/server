
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://test:Richard123@cluster0.enfsj.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())
app.use(express.json())


//  GET & POST REGISTRATION - Route Handler

app.post('/signup', (req, res) => {
    client.connect(async ( )=> {

        const userName = req.body.userName

        const password = req.body.password

        const firstName = req.body.firstName

        const lastName = req.body.lastName


        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            const usersCollection = client.db("vocal-app-database").collection("Registrants")
            await usersCollection.insertOne({ userName, firstName, lastName, password: hash })
            
            console.log("hello")
            console.log(req.body)
            res.json({ message: "Successfully Registered. Please Login!" })
        });
        
        
      });

})




app.post('/login', (req, res) => {
    client.connect(async ( )=> {

        const firstName = req.body.firstName
        const userName = req.body.userName
        const password = req.body.password
        const usersCollection = client.db("vocal-app-database").collection("Registrants")

        const match = await usersCollection.findOne({ userName: userName})
        
        if (match) {
            res.json({
                message: 'user exists!' 
            })
        } else {
            res.json({
                message: 'user does NOT exist!'
            })
        }
        
        
        // bcrypt.hash(password, saltRounds, async function(err, hash) {
        //     // Store hash in your password DB.
        //     const RegistrationCollection = client.db("vocal-app-database").collection("Registrants")
        //     await RegistrationCollection.findOne({ userName, firstName, password: hash })
            
        //     console.log("login functioning")
        //     console.log(req.body)
        //     res.json({ message: "Welcome To ACS Vocal App. Accessing Servers ..." })
        // });
        
        
      });

})


// LOG OUT FEATURE

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })



// start the server
app.listen(1000, () => {console.log('Emmas Server Up & Running')})
