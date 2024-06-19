const { where, Op } = require('sequelize')
const { posts } = require('../models')
// const db = require('../models')
// const Post = db.posts

exports.deleteOnePost = async (req, res) => {
    await posts.destroy({ where: { id: req.body.id } })
        .then(data => {
            res.send('deleted');
        })
        .catch(err => {
            res.status(201).send({
            message: "Some error occurred while deleting your post."
            });
        });         
}

exports.deleteAllPost = async (req, res) => {
    await posts.destroy({ where: { user_id: req.userID } })
        .then(data => {
            res.send('deleted all');
        })
        .catch(err => {
            res.status(201).send({
            message: "Some error occurred while deleting all posts."
            });
        });         
}


exports.getUserPosts = (req, res) => {
    posts.findAll({ where: { user_id: req.userID }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(201).send({
            message: "Some error occurred while getting user's posts."
            });
        });         
}

exports.getAllPosts = (req, res) => {
    posts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(201).send({
            message: "Some error occurred while getting all posts."
            });
        });         
}


exports.insertPosts = (req, res) => {
    const {title, content} = req.body;
    const post = {
        title: title,
        content: content,
        user_id: req.userID,
        createdAt: Date(),
    };

    console.log(post)
    
      // Save User in the database
    posts.create(post)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(201).send({
            message: "Some error occurred while creating a post."
          });
        });            
}