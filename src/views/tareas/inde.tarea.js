const { Model } = require("sequelize");

const listadoTareas = document.querySelector('#listadoTareas');

        const obtenerTareas = async () => {

            try {
                const res = await fetch('http://localhost:4000/api/tarea');

                if (res.status === 404) {
                    throw ({
                        status: 404,
                        message: 'No hay tareas'
                    })
                }

                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
                alert(error.message);
            }


        }

        const eliminarTarea = async (event) => {
            const id = event.target.dataset.id;

            try {
                const res = await fetch(`http://localhost:4000/api/tarea/${id}`, {
                    method: 'DELETE'
                });

                const data = await res.json();

                console.log(data);

                alert(data.message);
                window.location.reload();

            } catch (error) {
                console.log(error);
                alert(error.message);
            }

        }

        const mostrarTareas = (tareas) => {
            tareas.forEach(tarea => {
                listadoTareas.innerHTML += `
                    <tr>
                        <td>${tarea.titulo}</td>
                        <td>${tarea.descripcion}</td>
                        <td>
                            <button onclick=eliminarTarea(event) class="btn btn-danger btn-sm" data-id="${tarea.id}">Eliminar</button>
                            <a href="/tarea/editar/${tarea.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
            });
        }

        // Obtener las tareas automáticamente cuando se carga la página
        document.addEventListener('DOMContentLoaded', async () => {

            console.log('DOM cargado')

            try {
                const tareas = await obtenerTareas();

                if (!tareas || tareas.length === 0) {
                    listadoTareas.innerHTML += `
                        <tr>
                            <td colspan="3">No hay tareas</td>
                        </tr>
                    `;
                    return;
                }

                mostrarTareas(tareas);

            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        });


       module.exports= Model; 