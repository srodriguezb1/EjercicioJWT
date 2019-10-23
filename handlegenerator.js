let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
let connection = require('./connection');

// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado

    connection.getUsuario((docs) =>{
        if(Array.isArray(docs) && docs.lenght){
        docs.forEach(user => {
            if(user.username === username && password === mockedPassword){
                
                // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                let token = jwt.sign( { username: user.username, ROL: user.rol},
                config.secret, { expiresIn: '24h' } );
                
                // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                res.json( {
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                } );
            }
        });
    }
    else{
        res.send( 403 ).json( {
            success: false,
            message: 'Incorrect username or password'
          } );
  
    }
    
    }, username);


   

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;