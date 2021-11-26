const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/******************* cors origin *******************/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});


// All API Routes ************************/

const featureRoutes = require('./api/routes/features');
const userRoutes = require('./api/routes/user');
const replyRouts = require('./api/routes/reply')

app.use('/features', featureRoutes);
app.use('/user', userRoutes);
app.use('/reply', replyRouts);




//  Error handling ******************/
app.use((req, res, next) => {
  const error = new Error('Server site Working! but you are coming wrong route!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;