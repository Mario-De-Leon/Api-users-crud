const express = require('express')
const app = express();
const port = 3000;
const routerApi = require('./routes')
const {logErrors, errorHlander ,boomErrorHanddler} = require('./middlewares/errorHanddler')
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hola mi server en express listo para navegar')
})

routerApi(app)
app.use(logErrors);
app.use(boomErrorHanddler);
app.use(errorHlander);

app.listen(port, ( ) => {
  console.log('Mi port' + port);
})
