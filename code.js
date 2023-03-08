var board;
var totalmov = 0
var totalpiezas = 0
var segundos = 0;
var minutos = 0;
var t;
var esGanador = false;
var esPerdedor = false;
var mejorPuntaje="0"



function newgame(){

    
    segundos = 0
    minutos = 0
    esGanador = false
    esPerdedor = false
    totalpiezas = 0;
    totalmov = 0

    document.getElementById("segundos").innerHTML = ":00"
    document.getElementById("minutos").innerHTML = "00"
    document.getElementById("totalmov").innerHTML = 0
    document.getElementById("sumapiezas").innerHTML = 0
    
    document.addEventListener("keydown",teclas);

    let result = document.getElementById("resultado");
    result.innerHTML="";
    board= [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for(let f=0; f < 4;f++){
        for(let c=0;c < 4;c++){
            let casilla = document.getElementById(f.toString()+"-"+c.toString())
            let num = board[f][c]
            actualizarCasilla(casilla,num)
        }
    }
    validarpuntaje()
    generateNum()
    generateNum()
}
window.onload = function() {
    newgame();
    timer();
}

function validarpuntaje(){
    let puntajeActual = document.getElementById("sumapiezas");
    if(parseInt(puntajeActual.innerHTML)>parseInt(mejorPuntaje)){
        let best=document.getElementById("Best");
        best.innerText=puntajeActual.innerHTML;
        mejorPuntaje=puntajeActual.innerHTML;
        puntajeActual.innerHTML="0";
    }
    
}
function actualizarCasilla(casilla,num){
    casilla.innerText = ""
    casilla.classList.value = ""
    casilla.classList.add("box")    
    if(num > 0){
        if(num==2){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#eee4da";
            casilla.style.color="#727371";
        }
        if(num==4){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#ece0ca";
            casilla.style.color="#727371";
        }
        if(num==8){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#f4b17a";
            casilla.style.color="White";
        }
        if(num==16){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#f59575";
            casilla.style.color="White";
        }
        if(num==32){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#f57c5f";
            casilla.style.color="White";
        }
        if(num==64){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#f65d3b";
            casilla.style.color="White";
        }
        if(num==128){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#edce71";
            casilla.style.color="White";
        }
        if(num==256){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#edcc63";
            casilla.style.color="White";
        }
        if(num==512){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#edc651";
            casilla.style.color="White";
        }
        if(num==1024){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#eec744";
            casilla.style.color="White";
        }
        if(num==2048){
            casilla.innerText = num;
            casilla.style.backgroundColor = "#ecc230";
            casilla.style.color="White";
        }
    }
    else{
        casilla.innerText = "";
        casilla.style.backgroundColor = "#776e65";
    }
}

function generateNumber2or4(){
    num = Math.floor(Math.random()*5)
    if(num == 2  || num == 4){
        return num
    }else{
        generateNumber2or4()
    }   
}

function lleno() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function generateNum(){

    if(!lleno()){
        return
    }

    let encontrado = false
    while(!encontrado){
        let f = Math.floor(Math.random()* 4)
        let c = Math.floor(Math.random()* 4)
        if(board[f][c] == 0){

            let number2or4 = false
            while(!number2or4){
                numero = Math.floor(Math.random()*5)
                if(numero == 2  || numero == 4){
                    number2or4 = true
                }
            }        
            board[f][c] = numero
            let casilla = document.getElementById(f.toString()+"-"+c.toString())
            casilla.innerText = numero.toString()
            encontrado = true
            actualizarCasilla(casilla,2)
        }
    }
    //sumapiezas
    document.getElementById("sumapiezas").innerText = sumapiezas();
    
    }
    
function sumapiezas(){
    var suma = 0
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            suma += board[r][c]
        }
    }
    return suma;
}
//document.addEventListener("keydown",teclas)

function teclas(e){
   
    if (e.code == "ArrowLeft") {
        slideLeft();
        generateNum()
        totalmov +=1
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        generateNum()
        totalmov +=1
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        generateNum()
        totalmov +=1
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        generateNum()
        totalmov +=1
    }
    document.getElementById("totalmov").innerText = totalmov;
    document.getElementById("sumapiezas").innerText = sumapiezas();
    revisarResultado()

    if(esGanador || esPerdedor){
        document.removeEventListener("keydown",teclas);
        clearTimeout(t);
    }
}

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {

    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
        }
    } 
    row = filterZero(row); 
 
    while (row.length < 4) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < 4; r++) {
        let row = board[r]; 
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            actualizarCasilla(tile, num);
        }
    }
}


function slideRight() {
    for (let r = 0; r < 4; r++) {
        let row = board[r];
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();
        board[r] = row;
        for (let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            actualizarCasilla(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < 4; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            actualizarCasilla(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < 4; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            actualizarCasilla(tile, num);
        }
    }
}

function estaLlena(){
   

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if(board[r][c]== 0)
                return false;
        }
    }
    return true;
}

function es2048(){
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if(board[r][c]== 2048){
                esGanador = true;
                return true;
            }
        }
    }
    return false;
}

function revisarResultado(){

    let fin = es2048();
    

    let result = document.getElementById("resultado");
    
    if (estaLlena() && fin == false){
        
        esPerdedor = true;
        result.className = "perdedor";
        result.innerHTML = "PERDISTE!"
    }
    

    if(esGanador == true){
        result.className = "multicolortext";
        result.innerHTML = "GANASTE!";
        clearTimeout(t);      
    }
}

function tick(){
    segundos++;

    if(segundos>= 60){
        segundos = 0
        minutos++
    }

}

function timer(){
    t = setTimeout(cronometro, 1000);
}

function cronometro(){

    tick()

    let seg = document.getElementById("segundos")
    let min = document.getElementById("minutos")

    min.innerHTML = (minutos>9 ? minutos: "0"+ minutos)
    seg.innerHTML = ":" + (segundos > 9 ? segundos: "0" +segundos)

    timer()
}

