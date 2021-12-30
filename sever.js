const express = require('express');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js')
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
//app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());
//app.use(cors({ origin: "http://localhost:3000", credentials: true }))
const bcrypt = require('bcryptjs');

app.get('/',(req, res)=>{
	res.json(db('users'))
})

app.post('/signin',(req, res)=>{signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl', (req, res)=>{image.handleAPIcall(req,res)})


app.listen(process.env.PORT||3001);

