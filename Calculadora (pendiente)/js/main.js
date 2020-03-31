function declarar () {
    var checkboxA = document.getElementById("A");
    var checkboxB = document.getElementById("B");
    var checkboxC = document.getElementById("C");
    var checkboxD = document.getElementById("D");
    var checkboxE = document.getElementById("E");
    if (checkboxA.checked == true) {
        var A = "creado";
    }
    else {
        var A = null;
    }
    if (checkboxB.checked == true) {
        var B = "creado";
    }
    else {
        var B = null;
    }
    if (checkboxC.checked == true) {
        var C = "creado";
    }
    else {
        var C = null;
    }
    if (checkboxD.checked == true) {
        var D = "creado";
    }
    else {
        var D = null;
    }
    if (checkboxE.checked == true) {
        var E = "creado";
    }
    else {
        var E = null;
    }
    llenarMatrices(A,B,C,D,E);
}

function llenarMatrices (A,B,C,D,E) {
    if (A == "creado") {
        var fA = document.getElementById("filA").value;
        var cA = document.getElementById("colA").value;
        MatrizA =  document.createElement("table");
        MatrizA.setAttribute("id","MatrizA");
        for (var i=0; i<fA; i++) {
            tr = document.createElement("tr");
    
            for (var j=0; j<cA; j++) {
                td = document.createElement("tr");
                tr.appendChild("td");
            }
        }
    }
    if (B == "creado") {
        var fB = document.getElementById("filB");
        var cB = document.getElementById("colB");
    }
    if (C == "creado") {
        var fC = document.getElementById("filC");
        var cC = document.getElementById("colC");
    }
    if (D == "creado") {
        var fD = document.getElementById("filA");
        var cD = document.getElementById("colA");
    }
    if (E == "creado") {
        var fE = document.getElementById("filE");
        var cE = document.getElementById("colE");
    }
}