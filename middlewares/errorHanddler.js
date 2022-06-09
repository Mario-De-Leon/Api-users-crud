function logErrors (err , req, res, next){
  console.log('logErrors');
  console.error(err);
  next(err);
}
function errorHlander (err , req, res, next){
  console.log('errorHlander');
  res.status(500).json(
    {
      message: err.message,
      stack: err.stack
    })
}

function boomErrorHanddler (err , req, res, next){
  if (err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
module.exports = {logErrors, errorHlander, boomErrorHanddler}
