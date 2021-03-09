const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors')

const main = async() => {

    let opt = ``;
    const tareas = new Tareas()

    const tareasDb = leerDb()

    if (tareasDb) {
        tareas.cargarTareasFromArray(tareasDb)
    }

    //await pausa()
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case `1`:
                const desc = await leerInput(`Descripcion:`)
                tareas.crearTarea(desc)
                break;
            case `2`:
                tareas.listadoCompleto()
                break;
            case `3`:
                tareas.listarPendientesCompletadas(true)
                break;
            case `4`:
                tareas.listarPendientesCompletadas(false)
                break;
            case `5`:
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                console.log(ids);
                break;
            case `6`:
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== `0`) {
                    const ok = await confirmar(`Esta seguro?`)
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log(`tarea borrada correctamente`)
                    }
                }
                break;

        }


        guardarDb(tareas.listadoArr)


        await pausa()
    } while (opt !== `0`)





}

main()