const { where, Op } = require('sequelize')
const db = require('../models')
const Post = db.posts

exports.deleteOnePost = async (req, res) => {
    await Post.destroy({ where: [{ user_id: res.locals.userID }, { id: req.body.id }] })
        .then(data => {
            res.send('deleted');
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });         
}

exports.deleteAllPost = async (req, res) => {
    await Post.destroy({ where: { user_id: res.locals.userID } })
        .then(data => {
            res.send('deleted all');
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });         
}


exports.getUserPosts = (req, res) => {
    Post.findAll({ where: { user_id: res.locals.userID }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });         
}

exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });         
}


exports.insertPosts = (req, res) => {
    const {title, content} = req.body;
    const post = {
        title: title,
        content: content,
        user_id: res.locals.userID,
        createdAt: Date(),
    };

    console.log(post)
    
      // Save User in the database
    Post.create(post)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });            
}