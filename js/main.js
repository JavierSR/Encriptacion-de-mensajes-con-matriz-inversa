document.getElementById("_fil1").style.display = "block"; //muestra la fila 1 de desencriptar al cargar la pagina

const matrizKey     = [[1,2,-1,0],[3,0,-1,5],[2,0,-2,4],[-1,0,0,1]]
let matrizProducto  = [],
    matrizObtenida  = [],
    contador        = 2,
    filas;

function obtenerMensaje () {
    reiniciarTabla(); //Oculta toda la tabla para evitar que al reescribir un mensaje mas corto, debajo queden elementos anteriores
    let mensaje = document.getElementById("texto").value.toLowerCase(); //Guarda en la variable "mensaje" el texto ingresado en el formulario y lo convierte todo a minuscula para evitar problemas con el unicode, ya que a =/= A
    if (validar(mensaje)) {
        mensaje = mensaje.split(" "); //Separo mensaje en cada espacio, siendo ahora mensaje un array que guarda cada palabra en una posicion del vector
        let mensajeNum = []; 
        for (let i = 0; i < mensaje.length; i++) { 
            for (let j = 0; j < mensaje[i].length; j++) {  //Lo recorro y convierto cada letra a numero con la funcion charCodeAt (Equivalente a castear strings con ascii en C++) y se resta una constante que cuadra perfectamente para todo el abecedario
                mensajeNum = [...mensajeNum, mensaje[i].charCodeAt(j) - 96]; // Agrego el numero al array  
            }
            if (i < mensaje.length - 1) { 
                mensajeNum = [...mensajeNum, 0]; //Finalmente agrego un "espacio" y ya estaria lista la primera palabra, ahora a repetir por cada palabra de la cadena
            }                                    //El If Valida que no sea el ultimo ciclo asi no inserta un espacio demas detras de la ultima palabra
        }
        //console.log(mensajeNum);
        for (let i = 1; i <= Math.ceil(mensajeNum.length / 4); i++) {   //Muestra filas segun el largo de la cadena y redondea hacia arriba con math.ceils
            document.getElementById("fil"+i).style.display = "block";
        }
        encriptar(mensajeNum);
    }
    else {
        alert ("El campo ingresado debe contener solo letras y espacios. Intentelo nuevamente.");
    }
}

function validar (texto) {
    const validacion = new RegExp (/^[a-z\s]*$/);    //Crea un objeto de la clase RegExp (que viene por defecto en js) y le manda al constructor de la 'a' a la 'z' y espacios /s
    return validacion.test(texto);  //La funcion test busca dentro del string y retorna true si cumple los requisitos del objeto
}

function validarNum (num) {
    const validacion = new RegExp (/^0$|^-?[1-9]\d*(\.\d+)?$/);
    return validacion.test(num);
}

function encriptar (array) {
    let matrizFinal = [];
    let arrayAux;
    let id, k = 0;
    filas = Math.ceil(array.length / 4);
    for (let i = 0; i < filas; i++) {
        arrayAux = [];  //Reinicia el valor de arrayAux
        for (let j = 0; j < 4; j++) {
            if (array[k] == undefined) {  //Como el recorrido se hace suponiendo que todo es de 4 columnas, a la hora de asginar quedan indefinidos los espacios que sobran, entonces los vuelve 0 para rellenar el ultimo renglon
                array[k] = 0;
            }
            arrayAux[j] = array[k];
            k++;
        }
        matrizFinal[i] = arrayAux; //Asigna el array auxiliar (que representa cada fila) a la matriz[i], y se repite segun el for, de esta forma es dinamico
    }
    console.log("Mensaje a numeros: ");
    console.log(matrizFinal);
    multiplicar (matrizFinal,matrizKey,filas);
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < 4; j++) {
            id = i.toString() + j.toString();  //llena los ids de la tabla con la posicion i j
            document.getElementById(id).style.display = "block";
            document.getElementById(id).innerHTML = matrizProducto[i][j];
        }
    }
    console.log("Matriz encriptada: ");
    console.log(matrizProducto);
}

function multiplicar (matriz,matriz2,filas) {
    let suma;
    matrizProducto = [];
    for (let i = 0; i < filas; i++) {
        matrizProducto [i] = [];
        for (let j = 0; j < 4; j++) {
            suma = 0;
            for (let k = 0; k < 4; k++) {
                suma += matriz[i][k] * matriz2[k][j];
            }
            matrizProducto[i][j] = suma;
        }
    }
}

function reiniciarTabla () {
    for (let i = 0; i <= 11; i++) {
        for (let j = 0; j < 4; j++) {
            const id = i.toString() + j.toString();
            document.getElementById(id).innerHTML = undefined;
            document.getElementById(id).style.display = "none";
        }
    }
}

function pasar () {
    for (let i = 0; i < filas-1; i++) {
        if (contador < 13) {
            document.getElementById("_fil"+contador).style.display = "block";
        }
        else {
            alert ("Alcanzado maximo de filas permitidas");
            break;
        }
        contador++;
    }
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < 4; j++) {
            const id = i.toString() + j.toString();
            document.getElementById("_"+id).value = matrizProducto[i][j];
            document.getElementById("_"+id).innerHTML = matrizProducto[i][j];
        }
    }
}

function obtenerNumero() {
    for (let i = 0; i < contador-1; i++) {
        matrizObtenida[i] = [];
        for (let j = 0; j < 4; j++) {
            const id = i.toString() + j.toString();
            if (typeof document.getElementById("_"+id).value == undefined || document.getElementById("_"+id).value == "") {
                matrizObtenida[i][j] = 0;
            } else {
                matrizObtenida[i][j] = parseInt(document.getElementById("_"+id).value);
            }
        }
    }
    console.log(matrizObtenida);
    let cantidadValidada = 0,
        cantidadTotal    = 0;
    for (let i in matrizObtenida) {
        for (let j in matrizObtenida[i]) {
            if (validarNum(matrizObtenida[i][j])) {
                cantidadValidada++;
            }
            cantidadTotal++;
        }
    }
    if (cantidadValidada == cantidadTotal) {
        desencriptar();
    } 
    else {
        alert ("Error, solo tiene permitido ingresar numeros");
    }
}

function desencriptar () {
    const matrizInversa = invertirMatriz(matrizKey);
    let          cadena = "";
    console.log(matrizInversa);
    multiplicar(matrizObtenida,matrizInversa,contador-1);
    console.log("Mensaje en numeros: "+matrizProducto); 
    for (let i in matrizProducto) {
        for (let j in matrizProducto[i]) {
            if (Math.round(matrizProducto[i][j] == 0)) {
                cadena += " ";
            }
            else {
                cadena += String.fromCharCode(Math.round(matrizProducto[i][j])+96);
            }
        }
    }
    document.getElementById("mensajeDesenc").style.display = "block";
    document.getElementById("mensajeDesenc").innerHTML = cadena;
}

function invertirMatriz(M){
    //Tomado de http://blog.acipo.com/matrix-inversion-in-javascript/

    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    //if the matrix isn't square: exit (error)
    if(M.length !== M[0].length){return;}
    
    //create the identity matrix (I), and a copy (C) of the original
    let i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    let I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }
    
    // Perform elementary row operations
    for(i=0; i<dim; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<dim; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<dim; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}