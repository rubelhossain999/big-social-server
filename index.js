const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.nqqpx5x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Data insert Function
async function run() {

    try {
        const AddPost = client.db('AddPost').collection('posts');

        // EndPoint
        app.post("/addpost", async (req, res) => {
            const result = await AddPost.insertOne(req.body);
            if (result.insertedId) {
                res.send({
                    success: true,
                    meassage: `Dataated Successfully with id ${result.insertedId}`
                })
            } else {
                res.send({
                    success: false,
                    error: 'Data Created Error'
                })
            }
        });
    }
    catch { }

}
run().catch(error => console.log(error));




// Start Server Area

app.get('/', async (req, res) => {
    res.send('This is Social Big Server');
});

app.listen(port, async (req, res) => {
    console.log(`This is server ${port}`);
});