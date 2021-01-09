if (process.env.NODE_ENV !== 'productiom') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-Override')
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


// EXAMPLE JSON ROUTE
app.get('/register', (req, res) => {
    res.json({
        message: 'You got this - this is some server data',
        areYouLoggedIn: true 
    })
})


//  GET & POST REGISTRATION - Route Handler

app.post('/signup', (req, res) => {
    client.connect(async (err )=> {

        const usersCollection = client.db("vocal-app-database").collection("users")
        
        await usersCollection.insertOne(req.body)
        // perform actions on the collection object
        res.json({ message: 'User created! (hopefully)' })
      });

})

app.get('/signup', (req, res) => {
    res.json({
        message: "Signup request received and done!"
    })
})

app.post('/example-one', (req, res) => {
    console.log(req.body)
    res.json({
        message: `Example 1 is no fun, but your greeting was ${req.body.greeting}`,
    })
})

app.get('/example-two', (req, res) => {
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
