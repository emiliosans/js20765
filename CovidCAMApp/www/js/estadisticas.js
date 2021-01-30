onload = obtenerDatos;

const URL_DATOS_JSON_ZBS = "https://datos.comunidad.madrid/catalogo/dataset/b3d55e40-8263-4c0b-827d-2bb23b5e7bab/resource/907a2df0-2334-4ca7-aed6-0fa199c893ad/download/covid19_tia_zonas_basicas_salud_s.json";
const URL_DATOS_JSON_LOCALIDADES = "https://datos.comunidad.madrid/catalogo/dataset/7da43feb-8d4d-47e0-abd5-3d022d29d09e/resource/877fa8f5-cd6c-4e44-9df5-0fb60944a841/download/covid19_tia_muni_y_distritos_s.json";
const NUM_FECHAS_EJEX = 7;
let fecha_sel;
let zona_sel;//esto representa la ZBS o distrito/locaidad seleccionada según tab
let datos_cam;//los datos de la CAM, bien sean los de zbs o municipio seǵun tab
let tabzbs=false;
let selectfechas;
let searchbar;

let listazonas = null;
function obtenerZonas(datosjson) {
    let array_zonas = [];
    let zona;


    let fecha_actual = datosjson.data[0].fecha_informe;//"2021/01/19 10:32:00";
    let fecha_nueva = false;
    let contador = 0;
    while (!fecha_nueva) {
        if (datosjson.data[contador].fecha_informe == fecha_actual) {
            zona = tabzbs ? datosjson.data[contador].zona_basica_salud : datosjson.data[contador].municipio_distrito
            array_zonas.push(zona);
            contador = contador + 1;
        } else {
            fecha_nueva = true;
        }
    }
    

    return array_zonas;
}


function formatFecha(fecha) {
    let fechaDDMMAAAA;
    fechaDDMMAAAA = fecha.substr(8, 2) + "/";
    fechaDDMMAAAA = fechaDDMMAAAA + fecha.substr(5, 2) + "/";
    fechaDDMMAAAA = fechaDDMMAAAA + fecha.substr(0, 4);
    return fechaDDMMAAAA;
}


function mostrarIonSearchBarZonas(array_localidades) {
    var elemento_lista_localidades = tabzbs ? document.getElementById("listazbs") : document.getElementById("listalocalidades");
    let item_localidad;

    for (localidad of array_localidades) {

        item_localidad = document.createElement("ion-item");//creo elemento
        item_localidad.innerHTML = localidad;//le meto la localidad
        item_localidad.style.display = 'none';
        item_localidad.addEventListener("click", zonaSeleccionada);

        elemento_lista_localidades.appendChild(item_localidad);//añado al padre
    }

}


function obtenerPosicionFechaBuscada(datos_localidad, fecha_buscada) {
    let posicion = 0;
    let encontrado = false;
    let fecha_actual;
    //caso especial que no esté esa fecha en los datos de esa localidad

    while ((!encontrado)/*&&(posicion<datos_localidad.length)*/) {
        fecha_actual = datos_localidad[posicion].fecha_informe.substr(0, 10);
        if (fecha_actual <= fecha_buscada) {
            encontrado = true;
        }
        else {
            posicion = posicion + 1;
        }
    }
    console.log("encontrado en la pos " + posicion);
 
    return posicion;
}

function pintar(fecha, zona) {
    
    //me quedo con la localidad seleccionada
    let datos_zonas = tabzbs ? datos_cam.data.filter(item => item.zona_basica_salud == zona) : datos_cam.data.filter(item => item.municipio_distrito == zona);
    console.log(datos_zonas);
    //busco la posición de la fecha seleccionada por el usuario --> OJO CASO ESPECIAL q puede no estar
    let posicion = obtenerPosicionFechaBuscada(datos_zonas, fecha);
    //Una vez encontrada esa posición, corto el array desde esa posición, a las 7 siguientes
    //me quedo en realidad con los informes de 7 fechas - un array de 7
    let datos_zona_ultimos7 = datos_zonas.slice(posicion, posicion + NUM_FECHAS_EJEX);
    console.log(datos_zona_ultimos7);
    //del array de 7 fechaas, saco 2, uno para el eje X que son las fechas
    //otro array con la TIA 14 ddías, que son el eje y
    let arrayFechas = datos_zona_ultimos7.map(elemento => formatFecha(elemento.fecha_informe.substr(0, 10)));
    let arrayTia = datos_zona_ultimos7.map(elemento => elemento.tasa_incidencia_acumulada_ultimos_14dias);
    //Y lo mando dibujar
    //me he dado cuenta que para que aparezca de izquira a derecha, hay que dar la vuelta a los arrays
    dibujarGrafico(arrayFechas.reverse(), arrayTia.reverse());//les damos la vuelta
    //dibujarGrafico(arrayFechas, arrayTia);//les damos la vuelta
    console.log("array fechas = " + arrayFechas);
    console.log("arrayTia = " + arrayTia);

    pintarDatos(datos_zona_ultimos7[0]);
}

function zonaSeleccionada() {
    //alert("localidad_seleccionada = " + this.innerHTML);
    zona_sel = this.innerHTML;//obtengo la loclidad
    ponerListaZonasInvisible();
    searchbar.value = this.innerHTML;
    //alert ("sbv " + searchbar.value);

    if (selectfechas.value == undefined) {
        alert("Seleccione una fecha");
    } else {
        fecha_sel = selectfechas.value;
        pintar(fecha_sel, zona_sel);
    }

}

function fechaSeleccionada() {
    console.log("cambio fechas");
    fecha_sel = selectfechas.value;
    console.log("Fecha seleccionada = " + selectfechas.value);

    if (zona_sel && fecha_sel) {

        pintar(fecha_sel, zona_sel);
    } else {
        //alert("Selecciona una localidad");
    }
}


function mostrarIonSelectFechas(array_fechas) {
    var etiqueta_ion_select = tabzbs ? document.getElementById("listaFechaZbs") : document.getElementById("listaFecha");
    let fecha_formato_DDMMAAA;
    let etiqueta_fecha = null;
    let primera_fecha;

    for (elemento_fecha of array_fechas) {

        etiqueta_fecha = document.createElement("ion-select-option");
        etiqueta_ion_select.appendChild(etiqueta_fecha);

        fecha_formato_DDMMAAA = formatFecha(elemento_fecha);
        etiqueta_fecha.setAttribute("value", elemento_fecha);
        etiqueta_fecha.innerHTML = fecha_formato_DDMMAAA;
    }
    //primera_fecha = formatFecha (array_fechas[0]);
    etiqueta_ion_select.setAttribute('value', array_fechas[0]);
    fecha_sel = array_fechas[0];//la primera fecha por defecto es la seleccionada
}

function obtenerFechas(datosjson) {
    let listado_fechas = [];
    let listado_fechas_unico = [];

    listado_fechas = datosjson.data.map(elemento => elemento.fecha_informe.substr(0, 10));//saco las fechas
    console.log(listado_fechas);
    console.log(listado_fechas.length);
    listado_fechas_unico = [...new Set(listado_fechas)];
    console.log(listado_fechas_unico.length);
    console.log(listado_fechas_unico);


    return listado_fechas_unico;
}

function obtenerDatos() {
    let url_datos = tabzbs ? URL_DATOS_JSON_ZBS : URL_DATOS_JSON_LOCALIDADES;
    selectfechas = tabzbs ? document.getElementById('listaFechaZbs') : document.getElementById('listaFecha');
    selectfechas.addEventListener('ionChange', fechaSeleccionada);
    searchbar = tabzbs ? document.getElementById("sbzbs") : document.getElementById('sblocalidad');
    searchbar.addEventListener('ionInput', zonaModificada);
    fetch(url_datos)
        .then(response => response.json())//paso de json a objeto
        .then(datosjson => {
            datos_cam = datosjson;
            let array_localidades = obtenerZonas(datosjson);
            let array_fechas = obtenerFechas(datosjson);
            mostrarIonSearchBarZonas(array_localidades);
            mostrarIonSelectFechas(array_fechas);
            listazonas = tabzbs ? Array.from(document.getElementById('listazbs').children) : Array.from(document.getElementById('listalocalidades').children);
          

        });
}
function dibujarGrafico(ejexFechas, ejeyTIA) {
    //OBTENERLOS DATOS

    var ctx = tabzbs ? document.getElementById('myChartZBS').getContext('2d') : document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ejexFechas,//['ATLÉTICO', 'BARCELONA', 'REAL MADRID'],//7 fechas
            datasets: [{
                label: 'TIA 14 días',
                backgroundColor: 'rgb(235, 68, 90)',//'tomato',//'rgb(16, 26, 214)',
                //borderColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 255, 255)',
                //borderColor: 'rgb(0, 0, 0)',
                data: ejeyTIA//[0, 5, 13]//la TIA a 14 días de ese municipio en esa fecha
            }]
        },

        // Configuration options go here
        options: {}
    });


}



function pintarDatos(arrayDatos) {

    console.log("Pintamos datos.");
    let datos;

    if (tabzbs)
    {
        document.getElementById("tituloZBS").innerHTML = arrayDatos.zona_basica_salud;
        document.getElementById("tituloFechaZBS").innerHTML = formatFecha(arrayDatos.fecha_informe.substr(0, 10));
    } else {
        document.getElementById("tituloLocalidad").innerHTML = arrayDatos.municipio_distrito;
        document.getElementById("tituloFecha").innerHTML = formatFecha(arrayDatos.fecha_informe.substr(0, 10));
    }
    
    
  
    datos = tabzbs ? document.getElementById("datosZBS") : document.getElementById("datos");
    datos.innerHTML = "Casos totales: " + arrayDatos.casos_confirmados_totales + "<br>";
    datos.innerHTML = datos.innerHTML + "Casos últimos 14 días: " + arrayDatos.casos_confirmados_ultimos_14dias + "<br>";
    datos.innerHTML = datos.innerHTML + "TIA total: " + arrayDatos.tasa_incidencia_acumulada_total.toFixed(2) + "<br>";
    datos.innerHTML = datos.innerHTML + " TIA últimos 14 días: " + arrayDatos.tasa_incidencia_acumulada_ultimos_14dias.toFixed(2);



}


function ponerListaZonasInvisible() {
    listazonas.forEach(item => item.style.display = 'none');
}

function zonaModificada(event) {
    const query = event.target.value.toLowerCase();
    

    //si query es vacia, hay que limipar la lista
    if (query == '') {
        ponerListaZonasInvisible();
    } else {

        requestAnimationFrame(() => {
            listazonas.forEach(item => {
                //TODO VALORAR LA OPCIÓN DE JAIME 
                const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;//la localidad tiene las letras introducidas?
                item.style.display = shouldShow ? 'block' : 'none';//operador ternaria
               
            });
        });
    }
}


function tabTocada (tipo)
{
    //alert("tab " + tipo + " tocada");
    tabzbs = tipo == "zbs";//actualizamos tab en curso
    obtenerDatos();
}