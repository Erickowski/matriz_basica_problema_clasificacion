/**
    HECHO POR: Erick Daniel Pérez Mata ISC F-94
    "Believe in yourself"
*/
var muestras = 0;
var error = 0;
var textoInicio = "Ejemplo: ingenieria, sistemas, comunicaciones";
var diferencia = 0;
var posicionMaestra = 0;
var posicionEsclava = 0;
function comparar ( a, b ){ return a - b; }
//Validaciones
function validarConjuntos() {
    var variables =  document.getElementById("variables").value;
    //Validar K-valente
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice);        
        if(variable.value == 2){
            var textos = document.getElementById("text"+indice).value;
            if(textoInicio === textos) error = 1;
            var texto = textos.split(',');
            for (let element = 0; element < texto.length; element++) {
                var cadena = texto[element].trim();
                texto[element] = cadena;
                if (!/^([0-9])*$/.test(cadena))                    
                    continue; 
                else {
                    error = 1;
                }
            }
            document.getElementById("text"+indice).value = texto;
        }
    }
    //validar Real
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice);
        if(variable.value == 3){
            var numeros = document.getElementById("text"+indice).value;
            var numero = numeros.split(',');
            for (let element = 0; element < numero.length; element++) {
                if (!/^([0-9])*$/.test(numero[element]))
                    error = 1;    
            }
            document.getElementById("text"+indice).value = numero;
        }
    }
}
//Pendiente: Validar que los intervalos y conjuntos esten dentro de los valores admisibles
function validarValoresConjuntos() {
    var variables =  document.getElementById("variables").value;
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice).value;
        var criterio = document.getElementById("cri"+indice).value;
        if(variable == 2 || variable == 3){    
            var campo = document.getElementById("textCri"+indice).value;
            for (let i = 0; i < campo; i++) {
                var posicion = i + 1;
                //Variable K - valente
                //Variable Real
                if(variable == 3 && (criterio == 3 || criterio == 4)){
                    //Validar que sea numero
                    if(document.getElementById("Var"+indice+"Con"+posicion) != undefined){
                        var numeros = document.getElementById("Var"+indice+"Con"+posicion).value;
                        var numero = numeros.split(',');
                        for (let element = 0; element < numero.length; element++) {
                            if (!/^([0-9])*$/.test(numero[element]))
                                error = 1;    
                        }
                        //Validar que los numeros esten en el conjunto de valores admisibles
                        var valores = document.getElementById("text"+indice).value;
                        var valor = valores.split(',');
                        var numeros = document.getElementById("Var"+indice+"Con"+posicion).value;
                        var numero = numeros.split(',');
                        console.log(parseInt(numero[0]));
                        if (numero[0] < valor[0] || numero[1] > valor[1]) {
                            error = 1;
                        }
                    }
                }                
            }
            //Validar que los intervalos 
            if(variable == 3 && (criterio == 3 || criterio == 4)){
                for (let i = 0; i < campo; i++) {
                    if(document.getElementById("Var"+indice+"Con"+posicion) != undefined){
                        var posicion = i + 1;
                        var posicionAdelantada = posicion + 1;
                        if(posicion == campo) break;
                        var numerosActuales = document.getElementById("Var"+indice+"Con"+posicion).value;
                        var numeroActual = numerosActuales.split(',');
                        var numerosSiguientes = document.getElementById("Var"+indice+"Con"+posicionAdelantada).value;
                        var numeroSiguiente = numerosSiguientes.split(',');
                        console.log(numeroActual);
                        console.log(numeroSiguiente);
                        if (numeroActual[1] !== numeroSiguiente[0]) {
                            error = 1;
                        }
                    }                    
                }
            }
        }
    }
}
//Funciones de botones
$("#crearVariables").on("click",function(event){
    event.preventDefault();
    var variables =  document.getElementById("variables").value;
    //console.log(variables);
    var boton = document.getElementById('crearVariables');
    boton.disabled = true;
    boton = document.getElementById('variables');
    boton.disabled = true;
    boton = document.getElementById('clases');
    boton.disabled = true;
    var formulario = document.getElementById("formularioTipos");
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var div = document.createElement("div");
        var label = document.createElement("label");
        label.className += " mr-2";
        var contenido = document.createTextNode("Variable " + indice + ":");
        label.appendChild(contenido);
        document.body.appendChild(label);
        div.appendChild(label);
        var seleccion = document.createElement('select');
        seleccion.setAttribute("id","var"+indice);
        seleccion.name="opcion";
        var op1 = document.createElement('option');
        var op2 = document.createElement('option');
        var op3 = document.createElement('option');
        op1.value="1";
        op2.value="2";
        op3.value="3";
        var txt1 = document.createTextNode("Booleana");
        var txt2 = document.createTextNode("K-valente");
        var txt3 = document.createTextNode("Real");
        op1.appendChild(txt1);
        op2.appendChild(txt2);
        op3.appendChild(txt3);
        seleccion.appendChild(op1);
        seleccion.appendChild(op2);
        seleccion.appendChild(op3);
        div.appendChild(seleccion);

        formulario.appendChild(div);
        boton = document.getElementById("defTipos");
        formulario.insertBefore(div, boton);
    }
    document.getElementById('defTipos').style.display = 'block';
    document.getElementById('tipos').style.display = 'block';
 });

$("#defTipos").on("click",function(event){
    event.preventDefault();
    var variables =  document.getElementById("variables").value;
    var boton = document.getElementById("defTipos");
    boton.disabled = true;
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var select = document.getElementById("var"+indice);
        select.disabled = true;
    }
    var formulario = document.getElementById("formularioConjuntos");
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice).value;
        var div = document.createElement("div");
        var label = document.createElement("label");
        label.className += " mr-2";
        var contenido = document.createTextNode("Variable " + indice + ":");
        label.appendChild(contenido);
        document.body.appendChild(label);
        div.appendChild(label);
        var cajaTexto = document.createElement("textarea");
        cajaTexto.className += " w-100";
        cajaTexto.setAttribute("id","text"+indice);
        if (variable == 1) {
            var valoresCaja = document.createTextNode("0,1");
            var notaCaja = document.createTextNode("Nota: Para el tipo booleano no puedes asignar valores.");
            cajaTexto.appendChild(valoresCaja);
            div.appendChild(notaCaja);
            cajaTexto.disabled = true;
        }
        if (variable == 2) {
            var valoresCaja = document.createTextNode("Ejemplo: ingenieria, sistemas, comunicaciones");
            var notaCaja = document.createTextNode("Nota: Para el tipo k-valente ingresa todos los valores.");
            cajaTexto.appendChild(valoresCaja);
            div.appendChild(notaCaja);
        }
        if (variable == 3) {
            var valoresCaja = document.createTextNode("Ejemplo: 0,100");
            var notaCaja = document.createTextNode("Nota: Para el tipo real, ingresa el numero minimo y el numero maximo.");            
            cajaTexto.appendChild(valoresCaja);
            div.appendChild(notaCaja);
        }
        div.appendChild(cajaTexto);
        formulario.appendChild(div);
        boton = document.getElementById("defVar");
        formulario.insertBefore(div, boton);
    }
    document.getElementById('defVar').style.display = 'block';
    document.getElementById('conjuntos').style.display = 'block';
 });

 $("#defVar").on("click",function(event){
    event.preventDefault();
    validarConjuntos();
    if(error  == 1) {
        alert("Corrige tus conjuntos de variables para continuar");
        error = 0;
    } else { 
        var variables = document.getElementById("variables").value;
        var boton = document.getElementById("defVar");
        boton.disabled = true;
        for (let index = 0; index < variables; index++) {
            var indice = index + 1;
            var texto = document.getElementById("text"+indice);
            texto.disabled = true;
        }
        //Codigo para criterios
        var formulario = document.getElementById("formularioCriterios");
        for (let index = 0; index < variables; index++) {
            var indice = index + 1;
            var variable = document.getElementById("var"+indice).value;
            var div = document.createElement("div");
            var label = document.createElement("label");
            label.className += " mr-2";
            var contenido = document.createTextNode("Variable " + indice + ":");
            label.appendChild(contenido);
            document.body.appendChild(label);
            div.appendChild(label);
            var seleccion = document.createElement('select');
            seleccion.setAttribute("id","cri"+indice);
            seleccion.name="opcion";
            if (variable == 1) {
                var op1 = document.createElement('option');
                op1.value="1";
                var txt1 = document.createTextNode("Igualdad");
                seleccion.disabled = true;
                op1.appendChild(txt1);
                seleccion.appendChild(op1);
            }
            if(variable == 2){
                var op1 = document.createElement('option');
                var op2 = document.createElement('option');
                op1.value="1";
                op2.value="2";
                var txt1 = document.createTextNode("Igualdad");
                var txt2 = document.createTextNode("Conjunto");
                op1.appendChild(txt1);
                op2.appendChild(txt2);
                seleccion.appendChild(op1);
                seleccion.appendChild(op2);
            }
            if(variable == 3) {
                var op1 = document.createElement('option');
                var op2 = document.createElement('option');
                var op3 = document.createElement('option');
                var op4 = document.createElement('option');
                op1.value="1";
                op2.value="2";
                op3.value="3";
                op4.value="4";
                var txt1 = document.createTextNode("Igualdad");
                var txt2 = document.createTextNode("Conjunto");
                var txt3 = document.createTextNode("Intervalo");
                var txt4 = document.createTextNode("Umbral");
                op1.appendChild(txt1);
                op2.appendChild(txt2);
                op3.appendChild(txt3);
                op4.appendChild(txt4);
                seleccion.appendChild(op1);
                seleccion.appendChild(op2);
                seleccion.appendChild(op3);
                seleccion.appendChild(op4);
            }
            div.appendChild(seleccion);
            formulario.appendChild(div);
            boton = document.getElementById("defCri");
            formulario.insertBefore(div, boton);
        }
        document.getElementById('defCri').style.display = 'block';
        document.getElementById('criterios').style.display = 'block';
    }
 });
 $("#defCri").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var boton = document.getElementById("defCri");
    boton.disabled = true;
    //Codigo para establecer criterios de comparacion
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var texto = document.getElementById("cri"+indice);
        texto.disabled = true;
    }
    var formulario = document.getElementById("formularioCriteriosAsignacion");
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice).value;
        var criterio = document.getElementById("cri"+indice).value;
        var div = document.createElement("div");
        var label = document.createElement("label");
        label.className += " mr-2";
        var contenido = document.createTextNode("Variable " + indice + ":");
        label.appendChild(contenido);
        document.body.appendChild(label);
        div.appendChild(label);
        //Boton
        if(criterio == 1) {
            var cajaTexto = document.createElement("textarea");
            cajaTexto.className += " w-100";
            cajaTexto.setAttribute("id","textCri"+indice);
            var valoresCaja = document.createTextNode("0,1");
            var notaCaja = document.createTextNode("Nota: Para el criterio 'igualdad' esta seccion no esta disponible.");
            cajaTexto.appendChild(valoresCaja);
            div.appendChild(notaCaja);
            cajaTexto.disabled = true;
        }
        if(criterio == 2){
            var cajaNumero = document.createElement("input");
            cajaNumero.setAttribute("id","textCri"+indice);
            cajaNumero.setAttribute("type","number");
            cajaNumero.setAttribute("value","1");
            cajaNumero.setAttribute("min","1");
            cajaNumero.setAttribute("step","1");
            cajaNumero.className += " mb-2 ml-2";
            var notaNumero = document.createTextNode("Nota: Para el criterio 'conjuntos' escribe el numero total de conjuntos .");
            div.appendChild(notaNumero);
            div.appendChild(cajaNumero);
        }
        if(criterio == 3){
            var cajaNumero = document.createElement("input");
            cajaNumero.setAttribute("id","textCri"+indice);
            cajaNumero.setAttribute("type","number");
            cajaNumero.setAttribute("value","1");
            cajaNumero.setAttribute("min","1");
            cajaNumero.setAttribute("step","1");
            cajaNumero.className += " mb-2 ml-2";
            var notaNumero = document.createTextNode("Nota: Para el criterio 'intervalo' escribe el numero total de intervalos .");
            div.appendChild(notaNumero);
            div.appendChild(cajaNumero);
        }
        if(criterio == 4){
            var cajaNumero = document.createElement("input");
            cajaNumero.setAttribute("id","textCri"+indice);
            cajaNumero.setAttribute("type","number");
            cajaNumero.setAttribute("value","1");
            cajaNumero.setAttribute("min","1");
            cajaNumero.setAttribute("step","1");
            cajaNumero.className += " mb-2 ml-2";
            var notaNumero = document.createTextNode("Nota: Para el criterio 'umbral' selecciona un numero de umbral.");
            div.appendChild(notaNumero);
            div.appendChild(cajaNumero);
        }
        formulario.appendChild(div);
        boton = document.getElementById("defCriAsi");
        formulario.insertBefore(div, boton);
    }
    document.getElementById('defCriAsi').style.display = 'block';
 });
 
 $("#defCriAsi").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var boton = document.getElementById("defCriAsi");
    boton.disabled = true;
    //Codigo para establecer numero de conjuntos e intervalos
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        if(document.getElementById("textCri"+indice) != undefined){
            var texto = document.getElementById("textCri"+indice);
            texto.disabled = true;
        }
    }
    var formulario = document.getElementById("formularioCriteriosConInUm");
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        var variable = document.getElementById("var"+indice).value;
        var criterio = document.getElementById("cri"+indice).value;
        if(document.getElementById("textCri"+indice) != undefined){
            var numero = document.getElementById("textCri"+indice).value;
        }
        var div = document.createElement("div");
        var label = document.createElement("label");
        label.className += " mr-2";
        var contenido = document.createTextNode("Variable " + indice + ":");
        label.appendChild(contenido);
        document.body.appendChild(label);
        div.appendChild(label);
        if((criterio == 2 || criterio == 3) && variable != 1){
            for (let element = 0; element < numero; element++) {
                var elemento = element + 1;
                var cajaTexto = document.createElement("textarea");
                if(document.getElementById("text"+indice) != undefined){
                    var texto = document.getElementById("text"+indice).value;
                    var contenidoCajaTexto = document.createTextNode(texto);
                    cajaTexto.appendChild(contenidoCajaTexto);
                }
                if(criterio == 2) {
                    var notaCaja = document.createTextNode("Conjunto "+elemento+"\nNota: Ingresa el conjunto separando los valores por ',' y sin espacios.");
                }
                if(criterio == 3) {
                    var notaCaja = document.createTextNode("Intervalo "+elemento+"\nNota: Ingresa el intervalo separando los valores por ',' y sin espacios.");
                }
                cajaTexto.setAttribute("id","Var"+indice+"Con"+elemento);
                cajaTexto.className += "w-100";
                div.appendChild(notaCaja);
                div.appendChild(cajaTexto);
            }
        } else {
            var notaCaja = document.createTextNode("Nota: Sola para el criterio 'conjunto' e 'intervalo' se puede definir esta seccion.");
            div.appendChild(notaCaja);
        }
        formulario.appendChild(div);
        boton = document.getElementById("defCriConInUm");
        formulario.insertBefore(div, boton);
    }
    document.getElementById('defCriConInUm').style.display = 'block';
 });
 
 $("#defCriConInUm").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var boton = document.getElementById("defCriConInUm");
    boton.disabled = true;
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        if(document.getElementById("textCri"+indice) != undefined){
            var numeroConjuntos = document.getElementById("textCri"+indice).value;
            for (let elemento = 0; elemento < numeroConjuntos; elemento++) {
                var element = elemento + 1;
                if(document.getElementById("Var"+indice+"Con"+element) != undefined){
                    var texto = document.getElementById("Var"+indice+"Con"+element);
                    texto.disabled = true;
                }
            }
        } 
    }
    document.getElementById('file').style.display = 'block';
    document.getElementById('muestras').style.display = 'block';
 });

 $("#file").on("change",function(){
    var file = this.files[0];
    var formulario = document.getElementById("formularioMuestras");
    var div = document.createElement('div');
    div.setAttribute("id","conjuntoMuestras");
    var reader = new FileReader();
    var boton = document.getElementById("file");
    boton.disabled = true;
    boton = document.getElementById("defMue");
    reader.onload = function(progressEvent){
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            var indice = line + 1;
            var divMuestras = document.createElement("div");
            divMuestras.setAttribute("id","Muestra"+indice);
            var label = document.createElement("label");
            label.className += " mr-2";
            
            var contenido = document.createTextNode("Clase de la variable " + indice + ":");
            label.appendChild(contenido);
            document.body.appendChild(label);
            divMuestras.appendChild(label);

            var seleccion = document.createElement('select');
            seleccion.setAttribute("id","claseMu"+indice);
            seleccion.name="clase";
            var clases = document.getElementById("clases").value;
            for (let index = 0; index < clases; index++) {
                var element = index + 1;
                var op = document.createElement('option');
                op.value = element;
                var txt = document.createTextNode("K"+element);
                op.appendChild(txt);
                seleccion.appendChild(op);
            }
            divMuestras.appendChild(seleccion);
            var textMuestras = document.createElement("textarea");
            textMuestras.className += "w-100";
            textMuestras.disabled = true;
            textMuestras.setAttribute("id","objeto"+indice);
            var contMuestras = document.createTextNode(lines[line]);
            textMuestras.appendChild(contMuestras);
            divMuestras.appendChild(textMuestras);
            div.appendChild(divMuestras)
            formulario.appendChild(div);
            formulario.insertBefore(div, boton);
            muestras = line + 1;
        }
    };
    
    reader.readAsText(file);
    document.getElementById('defMue').style.display = 'block';
 });

 $("#defMue").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var boton = document.getElementById("defMue");
    boton.disabled = true;
    for (let index = 0; index < variables; index++) {
        var indice = index + 1;
        if(document.getElementById("claseMu"+indice) != undefined){
            boton = document.getElementById("claseMu"+indice);
            boton.disabled = true;
        }
    }
    document.getElementById('construirME').style.display = 'block';
    document.getElementById('matrices').style.display = 'block';
 });

 $("#construirME").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var div = document.getElementById("matrizEntrenamiento");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");
    var encabezado = document.createElement("th");
    var textoEncabezado = document.createTextNode("ME");
    encabezado.appendChild(textoEncabezado);
    tblHead.appendChild(encabezado);
    //For para encabezado
    for (let index = 0; index < variables; index++) {
        var indice = index +1;
        var encabezado = document.createElement("th");
        var textoEncabezado = document.createTextNode("X"+indice);
        encabezado.appendChild(textoEncabezado);
        tblHead.appendChild(encabezado);
    }
    for (var i = 0; i < muestras; i++) {
        var elemento = i + 1;
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("M"+elemento);
        var objetos = document.getElementById("objeto"+elemento).value;
        var objeto = objetos.split(',');
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        for (var j = 0; j < variables ; j++) {
            var indice = j + 1;
            var celda = document.createElement("td");
            celda.setAttribute("id","o"+elemento+"r"+indice);
            var textoCelda = document.createTextNode(objeto[j]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    tabla.className += "table";
    tabla.setAttribute("border", "2");
    tabla.appendChild(tblHead);
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    var boton = document.getElementById("construirME");
    boton.disabled = true;
    document.getElementById('construirMD').style.display = 'block';
 });

 $("#construirMD").on("click",function(event){
    event.preventDefault();
    var variables = document.getElementById("variables").value;
    var div = document.getElementById("matrizDiferencia");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");
    var encabezado = document.createElement("th");
    var textoEncabezado = document.createTextNode("MD");
    encabezado.appendChild(textoEncabezado);
    tblHead.appendChild(encabezado);
    //For para encabezado
    for (let index = 0; index < variables; index++) {
        var indice = index +1;
        var encabezado = document.createElement("th");
        var textoEncabezado = document.createTextNode("X"+indice);
        encabezado.appendChild(textoEncabezado);
        tblHead.appendChild(encabezado);
    }
    var linea = 0;
    for (var i = 0; i < muestras; i++) {
        var elemento = i + 1;
        for (var j = elemento + 1; j < muestras + 1 ; j++) {
            var claseUno = document.getElementById("claseMu"+elemento).value;
            var claseDos = document.getElementById("claseMu"+j).value;
            if(claseUno != claseDos){
                var hilera = document.createElement("tr");
                var celda = document.createElement("td");
                celda.setAttribute("id","d"+(linea+1)+"r0");
                var textoCelda = document.createTextNode("S"+elemento+j);
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
                tblBody.appendChild(hilera);
                linea++;
                //Criterios de comparacion
                for (let k = 0; k < variables; k++) {
                    var indice = k + 1;
                    var criterio = document.getElementById("cri"+indice).value;
                    //console.log(document.getElementById("cri"+indice));
                    var rasgoUno = document.getElementById("o"+elemento+"r"+indice).innerText;
                    var rasgoDos = document.getElementById("o"+j+"r"+indice).innerText;
                    //Igualdad
                    if(criterio == 1){
                        var celda = document.createElement("td");
                        celda.setAttribute("id","d"+linea+"r"+indice);
                        if (rasgoUno == rasgoDos) {
                            var textoCelda = document.createTextNode("0");
                        } else if(rasgoUno != rasgoDos) {
                            var textoCelda = document.createTextNode("1");
                        }
                        celda.appendChild(textoCelda);
                        hilera.appendChild(celda);
                        tblBody.appendChild(hilera);
                    }
                    //Conjunto
                    if(criterio == 2){
                        //console.log("Entre");
                        var bandera = 0;
                        var celda = document.createElement("td");
                        celda.setAttribute("id","d"+linea+"r"+indice);
                        var valor = document.getElementById("textCri"+indice).value;
                        // console.log(rasgoUno);
                        // console.log(rasgoDos);
                        for (let index = 0; index < valor; index++) {
                            var posicion = index + 1;
                            var conjuntos = document.getElementById("Var"+indice+"Con"+posicion).value;
                            var conjunto = conjuntos.split(',');
                            // console.log(conjunto);
                            if(conjunto.includes(rasgoUno) && conjunto.includes(rasgoDos)){
                                bandera = 1;
                                break;
                            }
                        }
                        if(bandera == 1) {
                            var textoCelda = document.createTextNode("0");
                        } else {
                            var textoCelda = document.createTextNode("1");
                        }
                        celda.appendChild(textoCelda);
                        hilera.appendChild(celda);
                        tblBody.appendChild(hilera);
                    } 
                    //Intervalo
                    if(criterio == 3) {
                        var bandera = 0;
                        var celda = document.createElement("td");
                        celda.setAttribute("id","d"+linea+"r"+indice);
                        var valor = document.getElementById("textCri"+indice).value;
                        for (let index = 0; index < valor; index++) {
                            var posicion = index + 1;
                            var intervalos = document.getElementById("Var"+indice+"Con"+posicion).value;
                            var intervalo = intervalos.split(',');
                            var intInferior = parseInt(intervalo[0]);
                            var intSuperior = parseInt(intervalo[1]);
                            if(posicion == valor) {
                                if((rasgoUno >= intInferior && rasgoUno <= intSuperior) && (rasgoDos >= intInferior && rasgoDos <= intSuperior)){
                                    bandera = 1;
                                    break;
                                }
                            }
                            if((rasgoUno >= intInferior && rasgoUno < intSuperior) && (rasgoDos >= intInferior && rasgoDos < intSuperior)){
                                bandera = 1;
                                break;
                            }
                        }
                        if(bandera == 1) {
                            var textoCelda = document.createTextNode("0");
                        } else {
                            var textoCelda = document.createTextNode("1");
                        }
                        celda.appendChild(textoCelda);
                        hilera.appendChild(celda);
                        tblBody.appendChild(hilera);
                    }
                    //Umbral
                    if(criterio == 4){
                        var celda = document.createElement("td");
                        celda.setAttribute("id","d"+linea+"r"+indice);
                        var valor =  document.getElementById("textCri"+indice).value;
                        rasgoUno = parseInt(rasgoUno);
                        rasgoDos = parseInt(rasgoDos);
                        var valorInferior = rasgoUno - valor;
                        var valorSuperior = rasgoUno + valor;
                        if (rasgoDos > valorInferior && rasgoDos < valorSuperior) {
                            var textoCelda = document.createTextNode("0");
                        } else if(rasgoUno != rasgoDos) {
                            var textoCelda = document.createTextNode("1");
                        }
                        celda.appendChild(textoCelda);
                        hilera.appendChild(celda);
                        tblBody.appendChild(hilera);
                    }
                }
                
            }
        }
    }
    diferencia = linea;
    tabla.className += "table";
    tabla.setAttribute("border", "2");
    tabla.appendChild(tblHead);
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    var boton = document.getElementById("construirMD");
    boton.disabled = true;
    document.getElementById('construirMB').style.display = 'block';
 });

 $("#construirMB").on("click",function (event) {
    event.preventDefault();
    var con_sub = 0;
    var con_sup = 0;
    var superfila = [];
    var subfila =[];
    var variables = document.getElementById("variables").value;
    var div = document.getElementById("matrizBasica");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");
    var encabezado = document.createElement("th");
    var textoEncabezado = document.createTextNode("MB");
    encabezado.appendChild(textoEncabezado);
    tblHead.appendChild(encabezado);
    //For para encabezado
    for (let index = 0; index < variables; index++) {
        var indice = index +1;
        var encabezado = document.createElement("th");
        var textoEncabezado = document.createTextNode("X"+indice);
        encabezado.appendChild(textoEncabezado);
        tblHead.appendChild(encabezado);
    }
    var bandera = 0;
    for (let i = 0; i < variables; i++) {
        var indice = i + 1;
        for (let j = 0; j < diferencia; j++) {
            var elemento = j + 1;
            var diferenciaUno = document.getElementById("d"+elemento+"r"+indice).innerText;
            for (let k = 0; k < diferencia; k++) {
                var posicion = k + 1;
                if(posicion == elemento) continue;
                var diferenciaDos = document.getElementById("d"+posicion+"r"+indice).innerText;
                if (diferenciaUno == 1 && diferenciaDos == 1) {
                    for (let l = 0; l < variables; l++) {
                        var segmento = l + 1;
                        var validacionUno = document.getElementById("d"+elemento+"r"+segmento).innerText;
                        var validacionDos = document.getElementById("d"+posicion+"r"+segmento).innerText;
                        if(validacionUno == 1 && validacionDos == 0) bandera = 1;
                        if(segmento == variables && bandera == 0) {
                            posicionMaestra = elemento;
                            posicionEsclava = posicion;
                        }
                    }
                    if(bandera == 0) {
                        if(!subfila.includes(posicionEsclava)){
                            subfila[con_sub] = posicionEsclava;
                            con_sub++;
                        }
                        if(!superfila.includes(posicionMaestra)){
                            superfila[con_sup] = posicionMaestra;
                            con_sup++;
                        }
                    } else {
                        bandera = 0;
                    }
                }
            }
        }
    }
    var matrizBasica = subfila.sort(comparar);
    for (let index = 0; index < diferencia; index++) {
        var indice = index + 1;
        if(!matrizBasica.includes(indice)){
            var hilera = document.createElement("tr");
            for (let i = 0; i < variables + 1; i++) {
                if(i > variables) break;
                var celda = document.createElement("td");
                var valor = document.getElementById("d"+indice+"r"+i).innerText;
                var textoCelda = document.createTextNode(valor);
                // console.log()
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            tblBody.appendChild(hilera);
        }
        
    }
    tabla.className += "table";
    tabla.setAttribute("border", "2");
    tabla.appendChild(tblHead);
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    var boton = document.getElementById("construirMB");
    boton.disabled = true;
 });

 //Simulacion con archivo "celulares.txt"
 $("#simularCV").on("click",function(event){
    event.preventDefault();
    document.getElementById("clases").value = 2;
    document.getElementById("variables").value = 6;
    document.getElementById("crearVariables").click();
    document.getElementById("simularT").click();
 });
 $("#simularT").on("click",function(event){
    event.preventDefault();
    document.getElementById("var1").value = 2;
    document.getElementById("var2").value = 2;
    document.getElementById("var3").value = 3;
    document.getElementById("var4").value = 3;
    document.getElementById("var5").value = 3;
    document.getElementById("var6").value = 3;
    document.getElementById("defTipos").click();
    document.getElementById("simularV").click();
 });
 $("#simularV").on("click",function(event){
    event.preventDefault();
    document.getElementById("text1").value = "iPhone,Huawei,Samsung,Motorola";
    document.getElementById("text2").value = "IOS,Android";
    document.getElementById("text3").value = "0,6";
    document.getElementById("text4").value = "0,32";
    document.getElementById("text5").value = "0,8";
    document.getElementById("text6").value = "0,4500";
    document.getElementById("defVar").click();
    document.getElementById("simularC").click();
 });
 $("#simularC").on("click",function(event){
    event.preventDefault();
    document.getElementById("cri1").value = 1;
    document.getElementById("cri2").value = 1;
    document.getElementById("cri3").value = 1;
    document.getElementById("cri4").value = 4;
    document.getElementById("cri5").value = 1;
    document.getElementById("cri6").value = 4;
    document.getElementById("defCri").click();
    document.getElementById("simularCO").click();
 });
 $("#simularCO").on("click",function(event){
    event.preventDefault();
    document.getElementById("textCri4").value = 5;
    document.getElementById("textCri6").value = 500;
    document.getElementById("defCriAsi").click();
    document.getElementById("simularVC").click();
 });
 $("#simularVC").on("click",function(event){
    event.preventDefault();
    document.getElementById("defCriConInUm").click();
    document.getElementById("file").click();
    document.getElementById("DsimularCV").disabled = true;
    document.getElementById("DsimularCOB").disabled = true;
    document.getElementById("simularCV").disabled = true;
 });
 $("#simularCOB").on("click",function(event){
    event.preventDefault();
    document.getElementById("claseMu4").value = 2;
    document.getElementById("claseMu5").value = 2;
    document.getElementById("claseMu6").value = 2;
    document.getElementById("defMue").click();
    document.getElementById("construirME").click();
    document.getElementById("construirMD").click();
    document.getElementById("construirMB").click();
    document.getElementById("simularCOB").disabled = true;
 },);
 
 //Simulacion con archivo "Deportistas.txt"
 $("#DsimularCV").on("click",function(event){
    event.preventDefault();
    document.getElementById("clases").value = 2;
    document.getElementById("variables").value = 8;
    document.getElementById("crearVariables").click();
    document.getElementById("DsimularT").click();
 });
 $("#DsimularT").on("click",function(event){
    event.preventDefault();
    document.getElementById("var1").value = 3;
    document.getElementById("var2").value = 3;
    document.getElementById("var3").value = 3;
    document.getElementById("var4").value = 3;
    document.getElementById("var5").value = 3;
    document.getElementById("var6").value = 1;
    document.getElementById("var7").value = 3;
    document.getElementById("var8").value = 2;
    document.getElementById("defTipos").click();
    document.getElementById("DsimularV").click();
 });
 $("#DsimularV").on("click",function(event){
    event.preventDefault();
    document.getElementById("text1").value = "10,80";
    document.getElementById("text2").value = "35,150";
    document.getElementById("text3").value = "0,100";
    document.getElementById("text4").value = "90,220";
    document.getElementById("text5").value = "0,10";
    document.getElementById("text6").value = "0,1";
    document.getElementById("text7").value = "0,20000";
    document.getElementById("text8").value = "Adidas,IMSS,UNAM,Concord,UAEM,Ouija";
    document.getElementById("defVar").click();
    document.getElementById("DsimularC").click();
 });
 $("#DsimularC").on("click",function(event){
    event.preventDefault();
    document.getElementById("cri1").value = 3;
    document.getElementById("cri2").value = 3;
    document.getElementById("cri3").value = 3;
    document.getElementById("cri4").value = 4;
    document.getElementById("cri5").value = 3;
    document.getElementById("cri7").value = 4;
    document.getElementById("cri8").value = 2;
    document.getElementById("defCri").click();
    document.getElementById("DsimularCO").click();
 });
 $("#DsimularCO").on("click",function(event){
    event.preventDefault();
    document.getElementById("textCri1").value = 3;
    document.getElementById("textCri2").value = 2;
    document.getElementById("textCri3").value = 3;
    document.getElementById("textCri4").value = 10;
    document.getElementById("textCri5").value = 3;
    document.getElementById("textCri7").value = 10000;
    document.getElementById("textCri8").value = 3;
    document.getElementById("defCriAsi").click();
    document.getElementById("DsimularVC").click();
 });
 $("#DsimularVC").on("click",function(event){
    event.preventDefault();
    document.getElementById("Var1Con1").value = "20,30";
    document.getElementById("Var1Con2").value = "30,40";
    document.getElementById("Var1Con3").value = "40,80";
    document.getElementById("Var2Con1").value = "35,70";
    document.getElementById("Var2Con2").value = "70,150";
    document.getElementById("Var3Con1").value = "0,30";
    document.getElementById("Var3Con2").value = "30,70";
    document.getElementById("Var3Con3").value = "70,100";
    document.getElementById("Var5Con1").value = "0,4";
    document.getElementById("Var5Con2").value = "4,7";
    document.getElementById("Var5Con3").value = "7,10";
    document.getElementById("Var8Con1").value = "UNAM,UAEM,IMSS";
    document.getElementById("Var8Con2").value = "Atletica,Concord";
    document.getElementById("Var8Con3").value = "Ouija";
    document.getElementById("defCriConInUm").click();
    document.getElementById("file").click();
    document.getElementById("DsimularCV").disabled = true;
    document.getElementById("simularCV").disabled = true;
    document.getElementById("simularCOB").disabled = true;
 });
 $("#DsimularCOB").on("click",function(event){
    event.preventDefault();
    document.getElementById("claseMu4").value = 2;
    document.getElementById("claseMu5").value = 2;
    document.getElementById("claseMu6").value = 2;
    document.getElementById("defMue").click();
    document.getElementById("construirME").click();
    document.getElementById("construirMD").click();
    document.getElementById("construirMB").click();
    document.getElementById("DsimularCOB").disabled = true;
 },);