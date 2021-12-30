const handleSignIn = (req, res, db, bcrypt)=>{
	const {email, password} = req.body;
	db.select('email','hash').from('login')
	  .where('email','=',email)
	  .then(data=>{
	  	const Valid = bcrypt.compareSync(password,data[0].hash);
	  	if (Valid){
	  		return db.select('*').from('users')
	  				  .where('email','=',email)
	  				  .then(user=>{
	  				  	res.json(user[0])
	  				  })
	  				  .catch(err=>res.status(400).json('Can not find user'))
	  	}else{
	  		res.status(400).json('Wrong email or password')
	  	}
	  })
	  .catch(err=>res.status(400).json('Wrong credentials'))	
}

module.exports = {
	handleSignIn: handleSignIn
}