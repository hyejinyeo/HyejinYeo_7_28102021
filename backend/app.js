const express = require('express');
const cors = require('cors');



/* Déclaration des routes */
// User
// const userRoutes = require('./routes/user');
// Post
// const postRoutes = require('./routes/post');


/* Création d'une application Express */
const app = express();


app.use(cors({
    origin: 'http://localhost:8080'
}));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// prevents cors header errors 
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });


/* Routes User  */
// app.use('/api/user', userRoutes);
/* Routes Post  */
// app.use('/api/post', postRoutes);


/* ------------------------------------------------------------------------------------------------- */
// freeCodeCamp tuto 

// POSTMAN TEST DONE
app.get('/status', (req, res) => {
    res.send({
        message: 'Hello world! 👍'
    })
})

// POSTMAN TEST DONE - FRONTEND TEST DONE
app.post('/signup', (req, res) => {
    res.send({
        message: `Hello ${req.body.firstName} ${req.body.lastName}, your email ${req.body.email} has been successfully registered! Have fun 👍`
    })
})


/* ------------------------------------------------------------------------------------------------- */



/* Exporter l'application Express */
module.exports = app;