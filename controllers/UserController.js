const User = require('../models/User');


const UserController = {
  async create(req,res){
    try {
        const user = await User.create({...req.body, 
        confirmed:false})
        
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'We had an issue creating the user...' })
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