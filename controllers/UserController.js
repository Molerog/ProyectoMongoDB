const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/keys');
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req,res){
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create({...req.body,
        confirmed:false,
        password : hash,
        role: "user",
        }); //...req.body representa todo lo demás
      //   const url ='http://localhost:8080/users/confirm/'+ req.body.email
      //   await transporter.sendMail({
      //    to: req.body.email,
      //    subject: "Confirme su registro",
      //    html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
      //    <a href="${url}"> Click para confirmar tu registro</a>
      //    `
      //  });
       res.status(201).send({ message: 'We sent you an email to confirm your register...', user });
    } catch (error) {
        console.error(error)
       res.status(500).send({ message: 'We had an issue creating the user...' })
    }
},

async confirm(req,res){
  try {
     await User.updateOne({
      email: req.params.email
    },{confirmed:true})
    res.status(201).send("Usuario confirmado con exito");
  } catch (error) {
    console.error(error)
  }
},

async login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    if (!user) {
      return res
        .status(400)
        .send({ message: 'User or password incorrect...' });
    }
    if(!user.confirmed){
      return res.status(400).send({message: 'You may confirm your email'});
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: 'User or password incorrect...' });
    }
    const token = jwt.sign({ id: user._id, UserId: user.id}, jwt_secret);
    user.token.push(token);
    await user.save()
    res.send({ message: 'Welcome' + user.name, user, token });
  } catch (error) {
    res.status(401).send({ message: 'We had an issue checking the user...' });
  }
},

  async delete(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params._id)
        res.send({ user, message: 'User deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'there was a problem trying to remove the user' })
    }
},
async update(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true }) //el new:true me trae el nuevo actualizado. Aquí se pasan 3 parámetros; la busqueda por id, lo que queremos actualizar y el nuevo objeto actualizado
    res.send({ message: "user successfully updated", user });
  } catch (error) {
    console.error(error);
  }
},
async getAll(req, res) {
  try {
     const users = await User.find()
     res.send(users)
  } catch (error) {
      console.error(error);
  }
},
}

module.exports = UserController;