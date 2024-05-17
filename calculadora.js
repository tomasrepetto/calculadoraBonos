const fs = require('fs');

class ProductManager {
    #bonos;
    #path;
    static idBono = 0;

    constructor(){
        this.#path = './data/bonos.json';
        this.#bonos = this.#leerBonosInFile();
    }

    #leerBonosInFile(){
        try {
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));

            return [];
        } catch (error) {
            console.log(`Ocurrio un error al momento de leer el archvio de bonos, ${error}`);
        }
    }

    #guardarBono(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#bonos));
        } catch (error){
            console.log(`Ocurrio un error al momento de guardar el archvio de bonos, ${error}`);
        }
    }

    addBono(titulo, cambio, primerPago, fechaLimite, fechaObjetivo, fechaCorte){
        if(!titulo || !cambio || !primerPago || !fechaLimite || !fechaObjetivo || !fechaCorte)
            return 'Todos los parametros son requeridos [titulo, cambio, primerPago, fechaLimite, fechaObjetivo, fechaCorte]';
        
        const bonoRepetido = this.#bonos.some(b => b.titulo == titulo)
        if(bonoRepetido)
            return `El bono ${titulo} ya se encuentra registrado`

        ProductManager.idBono = ProductManager.idBono + 1;
        const id = ProductManager.idBono;
        const nuevoBono = {
            id,
            titulo,
            primerPago,
            fechaLimite,
            fechaObjetivo,
            fechaCorte
        };

        this.#bonos.push(nuevoBono);
        this.#guardarBono();

        return 'Bono agregado exitosamente!';
    }

    getBono(){
        return this.#bonos;
    }

    getBonoById(id){
        const bonos = this.#bonos.find(b => b.id == id);
        if(bonos)
            return bonos;
        else
            return `Not Found del bono con id ${id}`;
    }

    updateBono(id, bonoUpdate){
        let msg = `El bono con id ${id} no existe`

        const index = this.#bonos.findIndex(b => b.id === id);
        if(index !== -1){
            const {id, ...rest} = bonoUpdate;
            this.#bonos[index] = {...this.#bonos[index], ...rest};
            this.#guardarBono();
            msg = 'Bono actualizado!';
        }
    }

    deleteBono(id){
        let msg = `El bono con id ${id} no existe`

        const index = this.#bonos.findIndex(b => b.id === id);
        if(index !== -1){
            this.#bonos = this.#bonos.filter(b => b.id !== id);
            this.#guardarBono();
            msg = 'Bono Eliminado!';
        }
        return msg;
    }
}



module.exports = ProductManager;