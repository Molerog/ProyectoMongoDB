const Comment = require('../models/Comment');
const Post = require('../models/Post')


const CommentController ={
    async create(req,res,next){
        try {
            const exist = await Post.findById(req.params._id)
            if(exist){
            const comment = await Comment.create({
                ...req.body,
                userId: req.user._id,
                postId: req.params._id
            })
            await Post.findByIdAndUpdate
            (req.params._id,
                {$push: {comments: comment._id}})
                res.status(201).send(comment)
            } else res.status(400).send({message: "This post doesn't exist"});
        } catch (error) {
            console.log(error);
          error.origin = "Comment";
          next(error);
        }
    },
    async delete(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
            res.send({ comment, message: 'User deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the user' })
        }
    },
    async update(req, res) {
        try {
          const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true }) //el new:true me trae el nuevo actualizado. Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
          res.send({ message: "user successfully updated", comment });
        } catch (error) {
          console.error(error);
        }
      },
    async getAll(req, res) {
        try {
           const comments = await Comment.find()
           res.send(comments)
        } catch (error) {
            console.error(error);
        }
      },
}

module.exports = CommentController;