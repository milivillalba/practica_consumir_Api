//CREAR TAREAS

const e = require("express");

const formNuevaTarea = document.querySelector("#formNuevaTarea");
                                         //cuando una funcion se declara async automaticamente se convierte en una promesa  Esto significa que puedes utilizar las palabras clave await dentro de la función para esperar la resolución de una promesa antes de continuar la ejecución.
formNuevaTarea,addEventListener("submit",async (e)=>{ //async se utiliza para definir una funcion asincrona, una funcion asincrona es aquella que realiza operaciones que pueden tomar tiempo, como llamadas a una API
 e.preventDefault();

 //aqui se optine los valores de cada input 
 const titulo= document.querySelector("#titulo").value;
 const descripcion=document.querySelector("#descripcion").value;

 //se crea un objetos con los valores de los input
 const nuevaTarea={titulo,descripcion}


 //se envia la peticion post
 try{
    const res= await fetch("http://localhost:4000/api/tarea",{
        method: "POST",
        headers:{
            "content-type": "aplication/json"
        },
        body: JSON.stringify(nuevaTarea)
    });
    if (res.status === 400) {
        throw ({
            status: 400,
            message: 'Todos los campos son obligatorios'
        })
    }
    if (res.status === 500) {
        throw ({
            status: 500,
            message: 'Error en el servidor'
        })
    }
    const data = await res.json();
                console.log({ data });
                formNuevaTarea.reset();
                window.location.href = '/tareas';
 }catch (error) {
    console.log(error)}
});

module.exports= e;