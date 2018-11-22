export class Usuario{

    constructor(
        public createdAt: number,
        public updatedAt: number,
        public id: number,
        public tipoIdentificacion: string,
        public identificacion: string,
        public primerNombre: string,
        public segundoNombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public correoElectronico: string,
        public telefono:  string,
        public celular: string,
        public direccion: string,
        public estado: number
    ){        
    }
}