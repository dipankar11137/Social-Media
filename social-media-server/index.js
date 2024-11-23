const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://queries:MKOJZ2GbDLSu7wnd@cluster1.1jzlgma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
// const uri =
//   'mongodb+srv://living_needs:ExUETNeWw2P8fvGV@cluster0.oyfvck0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db('queries').collection('user');
    const quiresCollection = client.db('queries').collection('quires');

    const commentCollection = client.db('queries').collection('comments');
    const quizSolutionCollection = client
      .db('queries')
      .collection('quizSolution');
    const inquireCollection = client.db('queries').collection('inquire');

    // // // // // // // // // // // //

    //  *********  User  ********//

    // create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // get all users from db
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // all User filter by email category
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    // // //  *********  post quires  ********//

    // Post quires
    app.post('/quires', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await quiresCollection.insertOne(appointmentsBook);
      res.send(result);
    });
    // get quires
    app.get('/quires', async (req, res) => {
      const query = {};
      const cursor = quiresCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one quires
    app.delete('/quire/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await quiresCollection.deleteOne(query);
      res.send(result);
    });

    // Post inquire
    app.post('/inquire', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await inquireCollection.insertOne(appointmentsBook);
      res.send(result); 
    });
    // get inquire
    app.get('/inquire', async (req, res) => {
      const query = {};
      const cursor = inquireCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one inquire
    app.delete('/inquire/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inquireCollection.deleteOne(query);
      res.send(result);
    });

    // // //  *********  post comment  ********//

    // Post comment
    app.post('/comments', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await commentCollection.insertOne(appointmentsBook);
      res.send(result);
    });

    // get comments
    app.get('/comments', async (req, res) => {
      const query = {};
      const cursor = commentCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    //  comment  filter by post
    app.get('/comment/:pId', async (req, res) => {
      const pId = req.params.pId;
      const query = { pId };
      const cursor = commentCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Delete one comment Remove
    app.delete('/commentRemove/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await commentCollection.deleteOne(query);
      res.send(result);
    });

    // Post solve
    app.post('/solve', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await quizSolutionCollection.insertOne(appointmentsBook);
      res.send(result);
    });
    // get comments
    app.get('/solve', async (req, res) => {
      const query = {};
      const cursor = quizSolutionCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one comment Remove
    app.delete('/solveDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await quizSolutionCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Social Media ');
});

app.listen(port, () => {
  console.log('Social Media  server is running ');
});
