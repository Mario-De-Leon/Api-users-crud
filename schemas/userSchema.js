const Joi = require('joi');

const id = Joi.required();
const correo =  Joi.string().min(3).max(50);
const name = Joi.string().min(3).max(15)
const edad = Joi.number().integer().min(12);
const password = Joi.string().min(3).max(20);

const createUserSchema = Joi.object({
  correo: correo.required(),
  name: name.required(),
  edad: edad.required(),
  password: password.required()
})

const createLoginSchema = Joi.object({
  correo: correo.required(),
  password: password.required()
})
const updateUserSchema = Joi.object({
  correo: correo,
  name: name,
  edad: edad,
  password: password
})

const getUserSchema = Joi.object({
  id: id
})

module.exports ={createUserSchema,updateUserSchema,getUserSchema, createLoginSchema}
