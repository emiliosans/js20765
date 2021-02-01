/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //alert("dispo iniciado");
    document.addEventListener("backbutton", botonHaciaAtras, false);
    //alert("atrás programado");

    document.addEventListener("online", avisoOnline, false);
    document.addEventListener("offline", avisoOffline, false);
}

function botonHaciaAtras() {
    salir2();
}

/**
 * 
 */



async function avisoOffline() {

    alerta = await alertController.create({
        header: 'Error acceso a internet',
        message: 'La aplicación requiere acceso a internet. Por favor, conecte los datos o pulse salir.',
        buttons: [{
            text: 'Salir',
            handler: () => {
                navigator.app.exitApp();
            }
        }]
    });

    await alerta.present();
}

function avisoOnline() {
    if (alerta != null) {
        alerta.dismiss();
        location.reload();
    }
}



async function salir2() {
    const alert = await alertController.create({
        header: 'AVISO',
        message: '¿Desea salir del programa?',
        buttons: [{
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary',
        }, {
            text: 'SÍ',
            handler: () => {
                navigator.app.exitApp();
            }
        }]
    });

    await alert.present();
}

/**
 * Esta función se invoca al tocar el botón de meud
 * @param la pagina a la que el usuario quiere diriirse 
 */
function cambiaPagina(pagina) {

    let ruta_actual = location.href;
    let pag_actual = ruta_actual.substr(ruta_actual.lastIndexOf('/') + 1);

    if (pag_actual.localeCompare(pagina) == 0)//
    {

        menuController.close();
    } else {
        location.href = pagina;
    }


}

