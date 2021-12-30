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
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain-db'
  }
});

const app = express();
app.use(express.json());

app.use(cors());

const bcrypt = require('bcryptjs');

app.get('/',(req, res)=>{
	res.json(db('users'))
})

app.post('/signin',(req, res)=>{signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl', (req, res)=>{image.handleAPIcall(req,res)})


app.listen(3001);

