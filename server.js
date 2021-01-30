
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-Override');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const myPlaintextPassword = '';
const someOtherPlaintextPassword = '';
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://test:Richard123@cluster0.enfsj.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())
app.use(express.json())


const users = []


// ATTEMPT AT DOING THE REGISTRAION PAGE
app.get('/registration', (req, res) => {
    client.connect(async (err )=> {
        
        console.log("This is a REGISTRATION YAY!!")
        console.log(req.body)
        res.json({ message: "Welcome To ACS Vocal App. Accessing Servers ..." })
    })
})


//  GET & POST REGISTRATION - Route Handler

app.post('/signup', (req, res) => {
    client.connect(async (err )=> {

        const userName = req.body.userName

        const password = req.body.password

        // const  firstName = req.body.userName

        // const lastName = req.body.password

        // const choosePassword = req.body.password

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            const usersCollection = client.db("vocal-app-database").collection("users")
            await usersCollection.insertOne({ userName, password: hash })
            
            console.log("hello")
            console.log(req.body)
            res.json({ message: "Successfully Registered. Please Login!" })
        });
        
        
      });

})




app.post('/login', (req, res) => {
    client.connect(async (err )=> {

        const  firstName = req.body.userName

        const choosePassword = req.body.password

        const userName = req.body.userName

        const usersCollection = client.db("vocal-app-database").collection("users")
        const match = await usersCollection.findOne({ userName: userName })
        
        if (match) {
            res.json({
                message: 'user exists!'
            })
        } else {
            res.json({
                message: 'user does NOT exist!'
            })
        }
        
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            const RegistrationCollection = client.db("vocal-app-database").collection("Registrants")
            await RegistrationCollection.insertOne({ userName, firstName, lastName, password: hash })
            
            console.log("hello")
            console.log(req.body)
            res.json({ message: "Welcome To ACS Vocal App. Accessing Servers ..." })
        });
        
        
      });

})

app.get('/login-two', (req, res) => {

    client.connect(async (err )=> {

        const userName = req.body.userName

        const usersCollection = client.db("vocal-app-database").collection("users")
        const match = await usersCollection.findOne({ userName: userName })
        
        if (match) {
            res.json({
                message: 'user exists!'
            })
        } else {
            res.json({
                message: 'user does NOT exist!'
            })
        }
        
        

    })
})

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')

// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//         // this will be auto generated when linked to Mongo, temporary for now!
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect('/login')
//     } catch {
//         // if failed redirects to register!
//         res.redirect('/register')

//     }
// console.log(users)   
// })


// LOG OUT FEATURE

app.delete('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/login')
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
