const express = require('express');
const app = express();
// e4POQ9vXNxWOAZqg
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://toDoUser:e4POQ9vXNxWOAZqg@cluster0.wlkn5.mongodb.net/toDoDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));



client.connect(err => {
  const collection = client.db("toDoDb").collection("listItem");
    app.post('/addlist',(req, res)=> {
        console.log(req.body);
        collection.insertOne(req.body)
        .then(response => {
            console.log('added')
            res.redirect('/')
        })
    })
    app.get('/lists', (req , res)=> {
        collection.find({})
        .toArray((err,documents)=> {
            res.send(documents)
        })
    app.delete('/delete/:id', (req, res)=> {
        collection.deleteOne({_id:ObjectId(req.params.id)})
        .then(response => {
            res.send(response.deletedCount > 0);
        })
    })
    app.get('/findlistitem/:id', (req , res)=> {
        collection.find({_id:ObjectId(req.params.id)})
        .toArray((err,documents)=> {
            res.send(documents[0])
        })
    })
    app.patch('/updatelist/:id',(req,res)=> {
        const updatedList = req.body;
        collection.updateOne({_id:ObjectId(req.params.id)},
        {$set:updatedList,$currentDate: { lastModified: true }})
        .then(result => {
            res.send(result.modifiedCount > 0)
        })
    })

})
  
  // perform actions on the collection object
//   client.close();
});

// app.get('/',(req,res)=> {
//     res.sendFile(__dirname + '/index.html');
// })

app.listen(3000);