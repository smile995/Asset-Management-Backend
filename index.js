const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors=require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// assetsManagemenrDB
// 3olkUYZrc325cfmz


// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.lc6lor4.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://assetsManagemenrDB:efOUeRuRnVYOtFOJ@cluster0.lc6lor4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    // await client.connect();
    const database = client.db("assetDB");
    const requestCollection = database.collection("requests");
    // get api
    app.get('/requests',async(req,res)=>{
      const cursor= requestCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post('/requests', async(req,res)=>{
      const data= req.body;
      console.log(data);
      const result = await requestCollection.insertOne(data);
      res.send(result)
    })

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('Hello world')
});
app.listen(port,()=>{
console.log(`server is running on ${port}`);
})