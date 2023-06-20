const express = require("express")//importar expres
const cors = require("cors");
const morgan = require ("morgan");
// const path = require ("path;")
const port =process.env.PORT || 4000;//puerto
require("ejs");



//configurar dotenv varibles de entorno 
require("dotenv").config();
//conectar a la base de datos 

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./db');

// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));

// require("ejes")
 

//se iniciara express para poder usar sus metodos
 const app = express();

 //middelewares confi
 app.use(cors());
 app.use(morgan("dev"));
 app.use(express.json());
//  app.use(express.urlencoded({extended:false}));

// Archivos estáticos utilizando la librería path que viene en NodeJS
// app.use(express.static(path.join(__dirname, 'public')));
// Alternativa a la línea anterior
// app.use(express.static(__dirname + '/public'));

// Configuración de motor de plantillas EJS
// app.set('view engine', 'ejs');

//confi de rutas AQUI


//consumir api con express
app.get("/api/data", (req, res)=>{
    //aqui es para llamar a un apiexterna o generar datos aleatorios
    const data= {message: "¡Hola desde la API!"};
    res.json(data);
})





// Servidor en escucha de peticiones
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));