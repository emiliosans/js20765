const URI_PERRO_ALEATORIO = "https://dog.ceo/api/breeds/image/random";

function mostrarPerro (jsonperro)
{
    console.log(jsonperro);
    console.log ("URL imagen = " +jsonperro.message);
    let imagen = document.getElementById("perronuevo");
    imagen.src = jsonperro.message;
}

//TODO MAÑANA SEGUIMOS Y HACEMOS TRAER UNA LISTA DE PERROS
function obtenerPerro ()
{
    console.log("Ha pedido un perro");
    //TODO LLAMAR AL DOG API
    fetch(URI_PERRO_ALEATORIO)//HAEMOS LA PETICIÓN GET
        .then(response => response.json())//CUANDO ESTÉ LISTA, HACE ESTO --response es el cuerpo de la respuesta
        .then(data => //data ya es el json
                {
                    console.log("llamar a mostrarPerro");
                    mostrarPerro(data);
                });
}