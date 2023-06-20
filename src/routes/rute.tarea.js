const route = require("express").Router();
const{
    obtenerTareas,
    obtenerTarea,
    crearTarea,
    ActualizarTarea,
    eliminarTarea,
    actualizarTarea
}= require("../controllers/controler.tarea");


//RUTAS PARA RENDERIZAR LAS VISTAS DE LAS TAREAS

route.get("/tareas",(req,res)=>{
    res.render("tareas/index.tareas")

});

route.get("/tarea/editar/:id", (req,res)=>{
    res.render("tarea/editar.tarea",{ ide: req.params.id});
});

//RUTAS PARA CRUD DE TAREAS

route.get("/api/tarea", obtenerTareas);

route.get("/api/tarea/:id",obtenerTarea);

route.post("*api/tarea",crearTarea);

route.put("/api/tarea/:id",actualizarTarea);

route.delete("/api/tarea/:id",eliminarTarea);


module.exports= route;