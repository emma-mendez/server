
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://test:Richard123@cluster0.enfsj.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async (err )=> {

  const devicesCollection = client.db("test").collection("devices");
  const usersCollection = client.db("vocal-app-database").collection("users")


  await devicesCollection.insertOne({ brand: 'HP', chip: 'Intel' })
  
  await usersCollection.insertOne({ userName: "SovGamerXY", name: "Sovereign", password: "1234567890"})
  // perform actions on the collection object
  client.close();
});
