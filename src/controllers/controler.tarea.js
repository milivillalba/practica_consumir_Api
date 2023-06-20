const tarea_ctr = {};//constante principal de controllers
const tarea = require("../models")//aqui vamos a traer lo que contenga mi arpeta model 


// UTILIZAREMOS try y throw 
//son constructos utilizados en el manejo de excepciones para controlar y gestionar situaciones inesperadas o errores en el código.

//controlers para otener todas las tareas 
tarea_ctr.obtenerTarea = async(req ,res)=>{  
    try{//el bloqueo try se utiliza para envolve un fracmento de codigo que podria lanzar una excepcion
        const tareas = await tarea.findAll({
            where: {
                estado : true
            }
        });
        if(!tarea || tarea.length === 0){
            throw({//throw se utiliza para lanzar explicitamente una excepcion dentro de un bloque try o en cualquier otro lugar de codigo 
                status: 404,
                message : "No hay tareas registradas"
            })
        }
        return res.json(tarea);
    }catch (error){// en el bloque catch puedes realizar acciones especificas para manejar la excepcion, como mostrar un mensaje de error.
        return res.status(error.status || 500).json(error.message || "Error interno del servidor");
    }
    

} 

//control para optener una tarea
 tarea_ctr.obtenerTarea = async(req,res)=>{
    const{id} = rq.params;

    try{
        const tarea = await tarea.findOne({
            where : {
                id,
                estado:true
            }
        })
        if(!tarea){
            throw({
                status : 404,
                message : "no existe la tarea"
            })
        }
        return res.json(tarea);

    }catch (error){
        return res.status( error.status|| 500).json(error.message || "Error interno del servidor");
    }
 }

 //Control para crear una tarea
 tarea_ctr.crearTarea = async (req,res)=>{
    const { titulo ,descripcion} = req.body;

    try{
        const tarea = await tarea.crearTarea({
            titulo,
            descripcion
        });

        if(!tarea){
            throw({
                status : 400,
                message : "No se pudo crear la tarea"
            })
        }
        return res.json(tarea);
    }catch (error){
        return res.status(error.status || 500).json(error.message || "Error interno del servidor");

    }
 }


 //Control para actualizar las tareas

 tarea_ctr.actualizarTarea = async (req,res)=>{
    const{id} = req.params;
    const{titulo,descripcion} = req.body;
    try{
        const tareaActualizada = await tarea.update({
            titulo,
            descripcion
        },{
            where : {
                id,
                estado:true
            }
        });

        if (!tareaActualizada){
            throw({
                status:400,
                message: "No se pudo actualizar la tarea"
            })
        }
        return res.json({
            message: "tarea actualizada correctamente",
            tareaActualizada
        })
    }catch (error){
        return res.status(error.status || 500).json(error.message || "Error interno en el servidor");
    }
 }


 //Control para Eliminar tarea

 tarea_ctr.eliminarTarea = async(req,res)=>{
    const {id} = req.params;

    try{
        const tareaEliminada = await tarea.update({
            estado: false
        },{
            where: {
                id,
                estado: true
            }
        });
        if(!tareaEliminada){
            throw({
                status:400,
                message : "No se pudo eliminar tarea"
            })
        }
        return res.json({tareaEliminada,message:"tarea eliminada correctamente"});
    }catch (error){
        return res.status(error.status || 500).json(error.message || "Error interno del servidor");

    }
 }


 //exportar los controles

 module.exports= tarea_ctr;