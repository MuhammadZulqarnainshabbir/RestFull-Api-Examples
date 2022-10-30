const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const Resturant = require('./models/resturant');

app.use((res, req, next) => {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();

});
app.use(express.json());


app.get('/resturantList', (req, res) => {

    Resturant.find({})
        .then((resturantlist) => {
            res.send(resturantlist);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.post('/resturants', (req, res) => {      // Create a new resturant
    let ResturantObj = { // Create a new resturant object
        name: req.body.name, // Get the name from the request body
        typeofresturant: req.body.typeofresturant, // Get the typeofresturant from the request body
        adressofresturant: req.body.adressofresturant // Get the adressofresturant from the request body
    }
    Resturant(ResturantObj).save() // Save the resturant object to the database
        .then((resturant) => {   // If the resturant is saved successfully
            res.status(200); // Set the status code to 200 (OK)
            res.send('Resturant added');
        }) // Send a response to the client
        .catch((error) => {// If an error occurs
            console.log(error);// Log the error to the console
        })

})

app.patch('/resturants/:id', (req, res) => {
    Resturant.findByIdAndUpdate(req.params.id, req.body)
        .then((resturant) => {
            res.status(200);
            res.send(resturant);
        })
        .catch((error) => {
            console.log(error);
        })
})


app.delete('/resturants/:id', (req, res) => {
    Resturant.findOneAndDelete(req.params.id)
        .then((resturant) => {
            res.status(201);
            res.send(resturant);
        })
        .catch((error) => {
            console.log(error);
        })
})

app.listen(3000, () => {
    console.log("Server Started on port 3000");
});
