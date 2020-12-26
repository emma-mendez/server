const express = require('express')
const cors = require('cors')


// const credentials = Realm.Credentials.anonymous();
// try {
//   const user = await app.logIn(credentials);
// } catch(err) {
//   console.error("Failed to log in", err);
// }

// const credentials = Realm.Credentials.anonymous();
// try {
//   const user = await app.logIn(credentials);
// } catch(err) {
//   console.error("Failed to log in", err);
// }


// realm.write(() => {
//     realm.create('User', {name: 'Fido', age: 12});
//   });
//   const dogs = realm.objects("Dog");

  

const app = express()
app.use(cors())

// const {MongoClient} = require('mongodb');

// const client = new MongoClient(uri);

// const uri = "mongodb://localhost:27017"



const databaseHits = {
    hitNumber: 0,
    emails: [
        'richardcrng@gmail.com'
    ]
}

// get / send back some simple json

app.get('/username/:id', ( req,res) => {

    if (usersDatabase.id.includes(req.params.id)) {
        res.json({
            status : 'success',
            data : 'Log In Successfull'
        })
    } else {
        res.json({
            status: 'fail',
            message: 'That username does not exist'
        })
    }   
})

app.get('/', ( req,res) => {
    res.json({
        status : 'Free Trial Activated',
        data : 'You have 30 days free'
    })
})

app.get('/checkEmail/:email', ( req,res) => {

    if (fakeDatabase.emails.includes(req.params.email)) {
        res.json({
            status : 'success',
            message: 'Successful Log In'
        })
    } else {
        res.json({
            status: 'fail',
            message: 'That email does not exist'
        })
    }
})

app.get('/visits', (req, res) => {
    nuberOfSiteVisitsDatabase.hitNumber += 1

    res.json({
        status: 'success',
        data: 'what a nice day',
        hits: fakeDatabase.hitNumber
    })
})


// do something to start the server
app.listen(1000, () => {console.log('Emmas Server Up & Running')})