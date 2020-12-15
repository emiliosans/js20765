
const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

class Dni {
   
        constructor(numero) {
          this.numero = numero;
        }

        calculaLetra ()
        {
            let resto = (this.numero % 23);
            console.log ("resto es de tipo " + typeof resto);
            console.log ("Resto " + resto);
            let letradni = LETRAS_DNI.charAt(resto);
            console.log (this.toString())cd j   ;
            return letradni;
        }
      
}



function calcularLetraDni2 ()
{
    var ndni = document.getElementById("dni").value;
    let dni = new Dni (ndni);
    var l = dni.calculaLetra();
    console.log ("La letra del dni es = " + l);
}
function calcularLetraDni ()
{
    calcularLetraDni2();
    console.log ("Ha introducido un dni");
    //tenemos que obtener el dni introducido
    var dni = document.getElementById("dni").value;
    console.log ("dni es de tipo " + typeof dni);
    console.log ("Ha introducido " + dni);
    console.log (isNaN(dni));
    var l =  document.querySelector('[name="prefijo"]:checked');
    //parseInt
    console.log (l.value);
    var resto = (dni % 23);
    console.log ("resto es de tipo " + typeof resto);
    console.log ("Resto " + resto);
    let letradni = LETRAS_DNI.charAt(resto);
    console.log ("Tu letra etradni");
    //CREAR UN NUEVO ELEMENTO
    var nuevo_elemento_div = document.createElement("div");
    nuevo_elemento_div.innerHTML="Tu letra es " + letradni;
    //Y AÑADIRLO AL HTML
    var etiqueta_body = document.getElementById("cuerpo");
    etiqueta_body.appendChild(nuevo_elemento_div);

}
// console.log ("Ha introducido " + dni);//AMBITO
// console.log ("Ha introducido " + LETRAS_DNI);