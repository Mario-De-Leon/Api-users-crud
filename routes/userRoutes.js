const express = require('express')
const UserService = require('./../service/userServis')
const validatorHlander = require('./../middlewares/validatorHanddler')
const { createUserSchema,updateUserSchema,getUserSchema, createLoginSchema } = require('./../schemas/userSchema')
const user = express.Router()

const service = new UserService();

user.get('/', async(req, res) => {
  const user = await service.find();
  res.json(user)
})

user.get('/:id',
  validatorHlander(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await service.findOne(parseInt(id));
      res.json(user)
    } catch (error) {
      next(error);
    }
})

user.post('/' ,
validatorHlander(createUserSchema, 'body')
, async (req, res) => {

  const body = req.body;
  const newUser = await service.create(body)
  res.status(201).json(newUser)
})


user.delete('/:id',
  async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(parseInt(id))
  res.json(rta)
})

user.patch('/:id',
  validatorHlander(getUserSchema, 'params'),
  validatorHlander(updateUserSchema, 'body'),
  async (req, res) => {
      const { id } = req.params;
      const body = req.body;
      const usuario = await service.update(parseInt(id), body)
      res.json(usuario)
  })

  user.post('/:login' ,
  validatorHlander(createLoginSchema, 'body')
  ,(req, res) => {
  const body = req.body;
  const newUser = service.login(body.correo, body.password)
  if (newUser){
      res.status(201).json({
        Message: "Bienvenido"
    })
  }else{
    res.status(201).json({
      Message: "Usuario Incorrecto"
    })
  }
})

module.exports = user;
