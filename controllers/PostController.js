const Post = require('../models/Post');

const PostController ={
    async create(req,res){
        try {
            const post = await Post.create({
              ...req.body,
              userId: req.user._id, //guardo la ID del dueño del post
              status: "posted",
              postdate: new Date()
            })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'We had an issue creating the post...' })
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
    async getProductsByPage(req, res) {
      try {
        const {page = 1, limit = 10} = req.query;
        const products = await Post.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
        res.send(products);
      } catch (error) {
        res.status(400).send({message: "We had an issue trying to show you de posts"})
      }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id) //atengo al _id
            if(post === null){
              res.status(400).send({message: "The id you introduced doesn't exist"})
              return
            }
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async getPostsByName(req, res) {
        try {
          if (req.params.title.length>20){ //hay que poner un límite para que nadie ponga muchas caracteres por seguridad; tenerlo en cuenta siempre en el backend cuando apliquemos expresiones regulares.
            return res.status(400).send('Your search was too long')
          }
          const title = new RegExp(req.params.title, "i"); //la "i" es una expresión regular de RegExp que no tiene en cuenta las mayúsculas.
          const post = await Post.findOne({title}); //lo mismo que name:name
          if(post === null){
            res.status(400).send({message: "Sorry, we can't find that post"})
            return
          }
          res.send(post);
        } catch (error) {
          console.log(error);
        }
      },
      async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({post, message: 'Post deleted'})
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem trying to remove the post'})
        }
    },
    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, {new: true}) //el new:true me trae el nuevo actualizado. Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
          if (post === null){
            res.status(400).send({message: "The post you try to update doesn't exist"})
            return
          }
          // if (req.params._id.length <= 23 ){
          //   res.status(400).send({message: "You may need to introduce a valid Id format"})
          //   return
          // }
          
          res.send({ message: "Post successfully updated", post });
        } catch (error) {
          console.error(error);
        }
      },      
}

module.exports = PostController;
