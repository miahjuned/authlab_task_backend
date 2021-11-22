const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cors origin *******************/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-with, Content-Type, Accept, Authorization'  
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
})

// All API Routes ************************/

const featureRoutes = require('./api/routes/features');

app.use('/features', featureRoutes);




//  Error handling ******************/
app.use((req, res, next) => {
  const error = new Error('Site Working, error not found');
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