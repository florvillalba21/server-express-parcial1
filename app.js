//importaciones
const path    = require('path');
const express = require('express'); 
const cors    = require('cors');
const morgan  = require('morgan');


//se importa la conexion de la bd
const dbConnect = require('./src/db/connectionDB'); 
require('dotenv').config();


// Inicializaciones
const app = express();
dbConnect(); 


// Configuraciones
const port = process.env.PORT || 3000;


// MIDDLEWARES

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Para que el servidor comprenda archivos con formato json


// Directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')));

// Importacion de rutas
app.use(require('./src/routes/users.routes')); 
// app.use(require('./src/routes/login.routes')); 
// app.use(require('./src/routes/tasks.routes')); 

// Configurando puerto
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));