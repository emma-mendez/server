
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

// APP SET & USE
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))


// ATTEMPT AT DOING THE REGISTRAION PAGE
app.get('/registration', (req, res) => {
    client.connect(async (err )=> {
        
        console.log("This is a REGISTRATION YAY!!")
        console.log(req.body)
        res.json({ message: "Successfully Registered. Please Login" })
    })
})


//  GET & POST REGISTRATION - Route Handler

app.post('/signup', (req, res) => {
    client.connect(async (err )=> {

        const userName = req.body.userName

        const password = req.body.password

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

app.post('/example-one', (req, res) => {
    console.log(req.body)
    res.json({
        message: `Example 1 is no fun, but your greeting was ${req.body.greeting}`,
    })
})

app.get('/login', (req, res) => {
    res.json({
        message: "Example 2 leaves me blue"
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
