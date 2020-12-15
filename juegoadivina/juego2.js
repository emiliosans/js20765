
class Partida {

    constructor (nombre_jugador, num_intentos)
    {
        this.nombre = nombre_jugador;
        this.intentos = num_intentos;
    }

    mostrarPartida ()
    {
        console.log("Nombre jugador = " + this.nombre);
        console.log("Num intentos = " + this.intentos);

    }
}

//TODO
//definir una CLASE Partida
//que contenga el NOMBRE del usuario
//y el NÚmero de INTENTOS que ha obtenido al jugar
//Una vez definida la clase, debéis construir
//un objeto de partida y llamar a una función
//mostrarPartida -dentro de la clase- que nos
//imprima la información de la partida
//quién ha jugado y cuántos intentos ha empleado