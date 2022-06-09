const boom = require('@hapi/boom');
class UserService {
  constructor() {
    this.user = [];
    this.id = 0;
  }

  create(data) {
    this.id++
    const newUser = {
      id: this.id,
      ...data
    }
    this.user.push(newUser)
    return newUser
  }

  find() {
    return new Promise((resolve, reject ) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000)
    })
  }

  async findOne(id) {
    const usuario =  this.user.find(item => item.id === id);
    if (!usuario){
      throw boom.notFound('usuario not Found')
    }
    return usuario;
  }

  async  delete(id) {
    const index = this.user.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('user not Found')
    }
    this.user.splice(index, 1)
    return {id}
  }

  async update(id, change) {
    const index = this.user.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('user not Found')
    }
    const usuario = this.user[index];
    this.user[index] = {
      ...usuario,
      ...change
    }
    return this.user[index];
  }

    login(correo, password){
    const usuario = this.user.find(item => item.correo == correo && item.password == password)
    return usuario;
  }

}


module.exports = UserService;
