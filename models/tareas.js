const Tarea = require("./tarea")

class Tareas {

    _listado = {}

    constructor() {
        this._listado = {}
    }

    get listadoArr() {
        const listado = []

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }


    crearTarea(desc = ``) {
        const tarea = new Tarea(desc)


        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, i) => {
            const index = `${i+1}`.green
            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ?
                `Completado`.green :
                `Pendiente`.red

            const cadena = `${index} ${desc} :: ${estado}`
            console.log(cadena)
        })
    }


    listarPendientesCompletadas(completadas = true) {
        let contador = 0
        this.listadoArr.forEach((tarea, i) => {
            const index = `${i+1}`.green
            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ?
                `Completado`.green :
                `Pendiente`.red

            if (completadas) {
                if (completadoEn) {
                    contador++
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`)
                }
            } else {
                if (!completadoEn) {
                    contador++
                    console.log(`${contador.toString().red} ${desc} :: ${estado}`)
                }
            }
        })
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })


        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                const taro = this._listado[tarea.id]
                taro.completadoEn = null
            }
        })
    }

}






module.exports = Tareas