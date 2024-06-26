const { where } = require('sequelize')
const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.users
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const saltRounds = 10

exports.getUsers = (req, res) => {
    console.log(req.userID)
    User.findOne({ where: { id: req.userID }, attributes: { exclude: ['password'] } })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
}

exports.login = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    const result = await User.findOne({ where: { name: req.body.name } })

    if(result !== null) {
      bcrypt.compare(req.body.password, result.password, (err, isMatched) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }

        if (isMatched) {
            // Passwords match, authentication successful
            console.log('Passwords match! User authenticated.');

            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: result.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }
            const token = jwt.sign(data, jwtSecretKey);
            console.log(typeof token)
            res.status(200).send({data: token, uId: result.id})

        } else {
            // Passwords don't match, authentication failed
            res.status(401).send()
            console.log('Passwords do not match! Authentication failed.');

        }
      })
    } else {
      res.status(204).send({data: "", uId: ""})
      console.log("Not Found User")
    }
    
}

exports.create = async (req, res) => {
    console.log(JSON.stringify(req.body), req.body.name)
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    const result = await User.findOne({where: {name: req.body.name}})
    
    if(result === null) {
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
                User.create(user)
                    .then(data => {
                      res.status(201).send({ message: "Created successfully" });
                    })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Tutorial."
                      });
                    });            
            });
            // Salt generation successful, proceed to hash the password
            });
    
          // Create a user
        console.log('empty')
    } else {
        console.log(result)
        res.status(203).send({ message: "Already exists" })
    }    
}