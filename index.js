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
    const bookings = client.db(process.env.DB_NAME).collection("bookings");
    const reviews = client.db(process.env.DB_NAME).collection("reviews");
    app.post('/addadmin', (req, res) => {
        const newAdminInfo = req.body;
        adminList.insertOne(newAdminInfo)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    //getting admin list to to recognize the logged in user
    app.get('/admins', (req, res) => {
        adminList.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    // adding new booking
    app.post('/book', (req, res) => {
        const newBook = req.body;
        bookings.insertOne(newBook)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    //getting bookinglist of a particular user
    app.get('/bookinglist', (req, res) => {
        const email = req.query.email;
        if (email === 'admin') {
            bookings.find({})
                .toArray((err, documents) => {
                    res.status(200).send(documents);
                })

        }
        else {
            bookings.find({ email: req.query.email })
                .toArray((err, documents) => {
                    res.status(200).send(documents);
                })
        }
    })
    //adding new reviews
    app.post('/addreview', (req, res) => {
        const newReview = req.body;
        reviews.insertOne(newReview)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    //getting reviews from server
    app.get('/reviews', (req, res) => {
        reviews.find({})
            .toArray((err, documents) => {
                res.status(200).send(documents);
            })
    })


})
app.get('/', (req, res) => {
    res.send('nice working now!');
})

app.listen(process.env.PORT || port);