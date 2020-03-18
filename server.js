const express = require ('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// connect database 
connectDB();

//Init Middleware
app.use(express.json()); // it allows to get the data in req.body in users.js
//Define Routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
//app.use('/api/posts', require('./routes/api/posts'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
const PORT = process.env.PORT || 5000;
//app.use('/', createProxyMiddleware('/', {target : 'http://localhost:3000' } ));


app.listen( PORT ,() => console.log(`server started on port ${PORT}`) );

//inacase in package
// "events": {
//     "restart": "fuser -k 5000/tcp ; fuser -k 3000/tcp"
//   }