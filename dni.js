
const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

function prepararNumero (letra, numero)
{
    let dni_num = '';//inicio a cadena vacía
        
        console.log("TIPO NUMERO = " +typeof numero);
        dni_num = letra+numero;

    return dni_num;
}

function mostrarResultado (letra_resultado)
{
    //CREAR UN NUEVO ELEMENTO
    var nuevo_elemento_div = document.createElement("div");
    nuevo_elemento_div.innerHTML="Tu letra es " + letra_resultado;
    //Y AÑADIRLO AL HTML
    var etiqueta_body = document.getElementById("cuerpo");
    etiqueta_body.appendChild(nuevo_elemento_div);
}

function calcularLetraDni ()
{
    console.log ("Ha introducido un dni");
    //tenemos que obtener el dni introducido
    var dni = document.getElementById("dni").value;
    console.log ("Ha introducido " + dni);
    //ejemplo de parseInt 
    let dni_numerico = parseInt(dni);
    console.log ("Ha introducido " + dni_numerico +  " " + typeof dni_numerico);
    let el_sel = document.querySelector('[name="prefijo"]:checked');
    console.log ("Letra =  " + el_sel.value);
    let dni_final = prepararNumero (el_sel.value, dni);
    var resto = (dni_final % 23);
    console.log ("Resto " + resto);
    let letradni = LETRAS_DNI.charAt(resto);
    console.log ("Tu letra es " + letradni);
    mostrarResultado (letradni);

}
// console.log ("Ha introducido " + dni);//AMBITO
// console.log ("Ha introducido " + LETRAS_DNI);