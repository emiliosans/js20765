
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
    //SI NO EXISTE EL DIV
        //CREA
    //ACTUALIZAR EL INNER

    let el_div = document.querySelector('div');

    if (el_div==null) {
        //CREAR UN NUEVO ELEMENTO
        console.log("No existe el div");
        el_div = document.createElement("div");
        var etiqueta_body = document.getElementById("cuerpo");
        etiqueta_body.appendChild(el_div);
        console.log("div creado");
    } 
    el_div.innerHTML="Tu letra es " + letra_resultado;
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