const { where, Op } = require('sequelize')
const { posts } = require('../models')
// const db = require('../models')
// const Post = db.posts

exports.deleteOnePost = async (req, res) => {   
    await posts.destroy({ where: { id: req.params.id, user_id: req.userID } })
        .then(data => {
            res.status(202).send({message: "deleted"});
        })
        .catch(err => {
            res.status(500).send({
            message: "Some error occurred while deleting your post."
            });
        });         
}

exports.deleteAllPost = async (req, res) => {
    await posts.destroy({ where: { user_id: req.userID } })
        .then(data => {
            res.status(202).send('deleted all');
        })
        .catch(err => {
            res.status(500).send({
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
            res.status(500).send({
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
            res.status(500).send({
            message: "Some error occurred while getting all posts."
            });
        });         
}

exports.updatePosts = (req, res) => {
    posts.update({
            content: req.body.content
        }, {
            where: {
                id: req.body.postId
            }
        })
        .then(data => {
            res.status(205).send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Some error occurred while creating a post."
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
    
    posts.create(post)
        .then(data => {
          res.status(201).send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Some error occurred while creating a post."
          });
        });            
}