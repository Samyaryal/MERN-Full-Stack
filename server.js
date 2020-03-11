const express = require ('express');
const connectDB = require('./config/db');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');
// connect database 
connectDB();

//Init Middleware
app.use(express.json({extended: false})); // it allows to get the data in req.body in users.js
app.get('/', (req, res) => res.send('API running'));

//Define Routes 
const userRoute= require('./routes/api/users')
const authRoute= require('./routes/api/auth')
const profileRoute= require('./routes/api/profile')


app.use('/api/users',userRoute );
app.use('/api/auth', authRoute);
app.use('/api/profile',profileRoute );
// app.use('/api/posts',postRoute);

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;
//app.use('/', createProxyMiddleware('/', {target : 'http://localhost:3000' } ));


app.listen( PORT ,() => console.log(`server started on port ${PORT}`) );

//inacase in package
// "events": {
//     "restart": "fuser -k 5000/tcp ; fuser -k 3000/tcp"
//   }