const Comment = require('../models/Comment');

const CommentController ={
    async create(req,res){
        try {
            const comment = await Comment.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'We had a problem adding the comment...' })
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