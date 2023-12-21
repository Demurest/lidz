const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const clientRoutes = require('./SRC/routes/clientRoutes')
const sequelize = require('./SRC/db/db')

const app = new Koa()

// middleware
app.use(bodyParser());

// use the routes
app.use(clientRoutes.routes())

// Iniciar servidor
const PORT = 3001;
sequelize.sync({force: false})// sincroniza la base de datos en True
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })
})
.catch(err => {
    console.error("Error al sincronizar la base de datos: ", err);
})
