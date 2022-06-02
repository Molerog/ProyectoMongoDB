const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        confirmed: false,
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
      res
        .status(201)
        .send({
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
      const token = jwt.sign({ _id: user._id }, jwt_secret);
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
      const user = await User.findByIdAndDelete(req.params._id);
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
      }); //el new:true me trae el nuevo actualizado. Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
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
        .populate("wishList")
        .populate({
          path: "postIds",
          populate: {
            path: "comments",
          },
        });
      res.send(user);
    } catch (error) {
      res
        .status(500)
        .send({ message: "We had a problem searching that information" });
    }
  },
};

module.exports = UserController;
