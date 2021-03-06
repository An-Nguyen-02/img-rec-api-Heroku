const handleRegister = (req, res, db, bcrypt)=>{
	const {email, password, name} = req.body;
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt);
	db.transaction(trx=>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return db('users')
				.returning('*')
				.insert({
				email: email,
				name: name,
				joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.then(trx.rollback)
	})
	.catch(err=>{
		res.status(400).json('Unable to register')
	})
}

module.exports = {
	handleRegister: handleRegister
}