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
app.use(express.json());
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
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

