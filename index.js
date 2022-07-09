// required middleware
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// user name: mdrakib
// user pass:38be0sBSfgDj9Mub

// connect middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5yugt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await client.connect();
        // only available for admins
        const userCollection = database.db('creative_agency').collection('users');

        // get user form db
        app.get('/users', async (req, res) => {
            res.send(await userCollection.find({}).toArray());
        })


        // get admin of a user from db
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email: email });
            const role = user?.role === 'admin' && 'admin';

            res.send({ role: role });
        })

    } finally {
        // await database.close();
    }
} run().catch(console.dir);


app.get('/', (req, res) => {
    res.send(`<h1>Creative agency server Connected.</h1>`);
})

app.listen(port, () => {
    console.log(`Creative agency server listening on port ${port}`);
})



