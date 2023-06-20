const listadoTareas = document.querySelector('#listadoTareas');

const obtenerTareas = async () => {
    const res = await fetch('http://localhost:4000/api/tarea', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const eliminarTarea = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`http://localhost:4000/api/tarea/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Tarea eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}

const mostrarTareas = (tareas) => {

    // Si no hay tareas, mostrar un mensaje
    if(tareas.length === 0){
        listadoTareas.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay tareas registradas</td>
            </tr>
        `;
        return;
    };

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

    // Dentro de try se coloca el código que se quiere ejecutar
    try {
        const tareas = await obtenerTareas();     
        mostrarTareas(tareas);
    } catch (error) {  // Dentro de catch se coloca el código que se ejecutará en caso de que haya un error
        console.log({ error });

        // Mensaje para el usuario
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        });
    }
});