'use strict'

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');


module.exports = router => {
    router.get('/',(req, res) => res.end('Welcome to anubot'));
    router.post('/users',(req, res)=>{
        const name = req.body.name;
        

        const email = req.body.email;
        const password = req.body.password;
        if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
            console.log(name + " "+ email+ " "+password);
			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(name, email, password)

			.then(result => {

				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
    });
}