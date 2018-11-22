export class Vehiculo{
    constructor(
        public createdAt: number,
        public updatedAt: number,
        public id: number,
        public placa: string,
        public marca: string,
        public linea: string,
        public modelo: string,
        public cilindraje: string,
        public color: string,
        public usuario: number,
        public seguro: number,
        public estado: number
    ){}
}