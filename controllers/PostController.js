const Post = require('../models/Post');

const PostController ={
    async create(req,res){
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },
    async getAll(req, res) {
        try {
           const posts = await Post.find()
           res.send(posts)
        } catch (error) {
            console.error(error);
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id) //atengo al _id
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },

    async getPostsByName(req, res) {
        try {
          if (req.params.name.length>20){ //hay que poner un límite para que nadie ponga muchas caracteres por seguridad; tenerlo en cuenta siempre en el backend cuando apliquemos expresiones regulares.
            return res.status(400).send('Busqueda demasiado larga')
          }
          const name = new RegExp(req.params.name, "i"); //la "i" es una expresión regular de RegExp que no tiene en cuenta las mayúsculas.
          const post = await Post.find({name}); //lo mismo que name:name
          res.send(post);
        } catch (error) {
          console.log(error);
        }
      },
      async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ product, message: 'Post deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the publication' })
        }
    },
    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true }) //el new:true me trae el nuevo actualizado. Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
          res.send({ message: "product successfully updated", post });
        } catch (error) {
          console.error(error);
        }
      },
    
}
module.exports = PostController;
