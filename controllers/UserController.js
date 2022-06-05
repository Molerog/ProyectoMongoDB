const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      let hash;
      if (req.body.password !== undefined) {
        hash = bcrypt.hashSync(req.body.password, 10);
      }
      if (req.file)req.body.imagepath = req.file.filename; 
      const user = await User.create({
        ...req.body,
        confirmed: true,
        password: hash,
        role: "user",
      });
      //...req.body representa todo lo demás(es un spread y no podríamos modificar las propiedades que quisieramos de body)
      const url = "http://localhost:8080/users/confirm/" + req.body.email; //enviamos esta url en forma de enlace al correo puesto por el usuario
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
         <a href="${url}"> Click para confirmar tu registro</a>
         `,
      });
      res.status(201).send({
        message: "We have sent you an email to confirm your register...",
        user,
      });
    } catch (error) {
      console.log(error);
      error.origin = "User";
      next(error);
    }
  },

  async confirm(req, res) {
    //esta función confirm se aplica cuando clicamos en el enlace enviado al email
    try {
      await User.updateOne(
        {
          email: req.params.email,
        },
        { confirmed: true }
      ); //no esta actualizando el email, está buscando al usuario por el email introducido en el body al registrarse que volverá como parámetro
      res.status(201).send("User confirm succesfull");
    } catch (error) {
      console.error(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ message: "User or password incorrect..." });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "You may confirm your email" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "User or password incorrect..." });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.name, user, token });
    } catch (error) {
      res.status(401).send({ message: "We had an issue checking the user..." });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id)
      await Post.deleteMany({userId: req.params._id},
        ({})
        );
      await Comment.deleteMany({userId: req.params._id},
        ({})
        );
      res.send({ user, message: "User deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to remove the user" });
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      }); //el new:true me trae el nuevo actualizado (solo para updates). Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
      res.send({ message: "User successfully updated", user });
    } catch (error) {
      console.error(error);
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Disconnected" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "We had a problem trying to disconnect you",
      });
    }
  },

  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id) // también se puede User.findOne({_id: req.user._id})
        .populate({
          path: "postIds",
        })
        .populate({
          path: "followers",
          select: { name: 1},
        });
      user._doc.totalFollowers = user.followers.length; 
      res.status(200).send(user);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .send({ message: "We had a problem searching that information" });
    }
  },
  async getById(req, res) {
    try {
      if (req.params._id.length !== 24) {
        res
          .status(400)
          .send({ message: "You may need to introduce a valid Id format" });
        return;
      }
      const post = await User.findById(req.params._id); //atengo al _id
      if (post === null) {
        res
          .status(400)
          .send({ message: "The id you introduced doesn't exist" });
        return;
      }
      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },
  async getUserByName(req, res) {
    try {
      const name = new RegExp(req.params.name, "i"); //la "i" es una expresión regular de RegExp que no tiene en cuenta las mayúsculas.
      const post = await User.findOne({ name }); //lo mismo que name:name
      if (post === null) {
        res.status(400).send({ message: "Sorry, we can't find that User" });
        return;
      }
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async followUser(req, res) {
    try {
      const exist = await User.findById(req.params._id);
      if (!exist.followers.includes(req.user._id)) {
        const user = await User.findByIdAndUpdate(
          req.params._id,
          { $push: { followers: req.user._id } },
          { new: true }
        );
        res.send(user.name);
      } else {
        res.status(400).send({ message: "You can't follow twice!" });
      }
    } catch (error) {
      res.status(500).send({ message: "There was an issue in the controller" });
    }
  },
  async unFollowUser(req, res) {
    try {
      const exist = await User.findById(req.params._id);
      if (exist.followers.includes(req.user._id)) {
        const user = await User.findByIdAndUpdate(
          req.params._id,
          { $pull: { followers: req.user._id } },
          { new: true }
        );
        res.status(200).send(user);
      } else {
        res.status(400).send({
          message: "You can't unfollow someone you didn't follow first!",
        });
      }
    } catch (error) {
      res.status(500).send({ message: "There was an issue in the controller" });
    }
  },
};

module.exports = UserController;
