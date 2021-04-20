const express = require('express')
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('bson');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 3005;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dipq6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const adminList = client.db(process.env.DB_NAME).collection("admins");
    const customerList = client.db(process.env.DB_NAME).collection("customers");
    //getting admin list to to recognize the logged in user

})
app.get('/', (req, res) => {
    res.send('nice working now!');
})

app.listen(process.env.PORT || port);