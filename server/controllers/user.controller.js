const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.users
const Op = db.Sequelize.Op
const saltRounds = 10

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            // Handle error
            return;
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                // Handle error
                return;
            }
        
            // Hashing successful, 'hash' contains the hashed password
            console.log('Hashed password:', hash);

            const user = {
                name: req.body.name,
                password: hash
            };
        
            console.log(user)
            
              // Save User in the database
            User.findByPk(req.body.name)
                    .then(data => {
                    if (data) {
                        res.send(data);
                    } else {
                        User.create(user)
                            .then(data => {
                            res.send(data);
                            })
                            .catch(err => {
                            res.status(500).send({
                                message:
                                err.message || "Some error occurred while creating the User."
                            });
                            });     
                    }
                    })
                    .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving User with name=" + req.body.name
                    });
                    });
        });
        // Salt generation successful, proceed to hash the password
        });

      // Create a user
    
}