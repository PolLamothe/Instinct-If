import * as pieces from "./pieces.js"

const allPiece = pieces.allPiece

const rotateMap = pieces.rotateMap

const caseNumber = 400
const middle = 8
const line = 16

const backgroundStyle = {
    "background-color": "#232323",
    "border": "solid #3a3a3a 1px"
}
let score = 0
let scoreDisplay = document.querySelector('#scoreTetris')
scoreDisplay.innerText = score

const timer = 500

var count = 0

var piecePlaced = 0

var tempAmount = 6

class MovingPiece {
    type = 0
    data = []
    rotateNumber = -1
    bottomleft = 4 * line -middle
    
    reset(){
        this.type = 0
        this.data = []
        this.rotateNumber = -1
        this.bottomleft = 4 * line -middle
    }
}
var movingPiece = new MovingPiece()

for(var i = 1; i <= caseNumber; i++){
    $('#centerGame').append('<div class="case" id="case'+i+'"></div>')
}

var ground = {}

const blocStyle = {
    1 : {
        "background-color": "#00ffff",
        "border": "4px inset #00e1e1"
    },
    2 : {
        "background-color": "#ffff00",
        "border": "4px inset #e1e100"
    },
    3 : {
        "background-color": "#00ff00",
        "border": "4px inset #00e100"
    },
    4 : {
        "background-color": "#ff0000",
        "border": "4px inset #e10000"
    },
    5 : {
        "background-color": "#0000ff",
        "border": "4px inset #0000e1"
    },
    6 : {
        "background-color": "#ff7f00",
        "border": "4px inset #e87300"
    },
    7 : {
        "background-color": "#800080",
        "border": "4px inset #720072"
    }
}

function changeStruct(struct){
    var temp = []
    for (var i = 0;i<4;i++){
        temp.push([])
        for(var x = 0;x<4;x++){
            temp[i].push(0)
        }
    }
    if(movingPiece.bottomleft%line in [1,2,3]){
        return
    }
    for (var i = 1;i<=4;i++){
        for(var x = 1;x<=4;x++){
            if(struct[4-i][4-x] != 0){
                if(ground[struct[4-i][4-x] + movingPiece.bottomleft - i*line + (4-x)] != undefined ){
                    return
                }
                temp[4-i][4-x] = struct[4-i][4-x] + movingPiece.bottomleft - i*line + (4-x)
            }
        }
    }
    movingPiece.data = temp
}

function rotatePiece(){
    if(rotateMap[movingPiece.type-1].length != 0){
        if(movingPiece.rotateNumber == rotateMap[movingPiece.type-1].length-1){
            movingPiece.rotateNumber = -1
            changeStruct(allPiece[movingPiece.type-1])
        }else{
            movingPiece.rotateNumber++
            changeStruct(rotateMap[movingPiece.type-1][movingPiece.rotateNumber])
        }
    }
}

function decalPiece(pas){
    var secur = 1
    if(pas==16){
        secur = 2
    }
    for(var i=0;i<movingPiece.data.length;i++){
        for(var x=0;x<movingPiece.data[i].length;x++){  
            if(movingPiece.data[i][x] != 0){
                if((movingPiece.data[i][x] + pas)%line == 1 && pas == 1){
                    return
                }
                if((movingPiece.data[i][x] + pas)%line == 0 && pas == -1){
                    return
                }
                if(ground[movingPiece.data[i][x] + pas*secur] != undefined){
                    return
                }else if(movingPiece.data[i][x] + pas*secur > caseNumber){
                    return
                }
            }
        }
    }
    let temp = deepCopy(movingPiece.data)
    for(var i = 0;i<temp.length;i++){
        for(var x = 0;x< temp[i].length;x++){
            if( temp[i][x] != 0){
                if(ground[temp[i][x]+pas] != undefined || temp[i][x]+pas > caseNumber){
                    freeze()
                    movingPiece.reset()
                    return
                }
                temp[i][x] += pas
            }
        }
    }
    movingPiece.bottomleft += pas
    movingPiece.data = [...temp]
}

function eareaseAll(){
    for(var i = 1;i<=caseNumber;i++){
        $("#case"+i).css(backgroundStyle)
        for(var x = 0;x<movingPiece.data.length;x++){
            for(var y = 0;y<movingPiece.data[x].length;y++){
                if(movingPiece.data[x][y] == i){
                    $("#case"+i).css(blocStyle[movingPiece.type])
                }
            }
        }
        for(var x in ground){
            if(x == i){
                $("#case"+i).css(blocStyle[ground[x]])
            }
        }
    }
}

onkeydown = (event) => {
    if(movingPiece.type != 0){
        if(event.key == "ArrowRight"){
            decalPiece(1)
        }else if(event.key == "ArrowLeft"){
            decalPiece(-1)
        }else if(event.key == " "){
            fall()
        }else if(event.key == "r"){
            rotatePiece()
        }else if (event.key == "ArrowDown"){
            decalPiece(line)
        }
        eareaseAll()
    }
}

function fall(){
    var step = line
    while(true){
        for(var x = 0;x<movingPiece.data.length;x++){
            for(var i = 0;i<movingPiece.data[x].length;i++){
                if(movingPiece.data[x][i] + step > caseNumber || ground[movingPiece.data[x][i] + step] != undefined){
                    for(var j = 0;j<movingPiece.data.length;j++){
                        for(var w = 0;w<movingPiece.data[j].length;w++){
                            if (movingPiece.data[j][w] != 0){
                                movingPiece.data[j][w] += step-line
                            }
                        }
                    }
                    freeze()
                    movingPiece.reset()
                    return
                }
            }
        }
        step += line
    }
}

function erease(){
    for(var i = 0;i< movingPiece.data.length;i++){
        for(var x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                $("#case"+(movingPiece.data[i][x])).css(backgroundStyle)
            }
        }
    }
}

function freeze(){  
    for(var i = 0;i<movingPiece.data.length;i++){
        for(var x = 0;x<movingPiece.data[i].length;x++){
            if(movingPiece.data[i][x] != 0){
                ground[movingPiece.data[i][x]] = movingPiece.type
            }
        }
    }
    for(var i in ground){
        var min = i-(i%line)+1
        var max = min+line-1
        var state = true
        for(var x = min;x<=max;x++){
            if(ground[x] == undefined){
                state = false
            }
        }
        if(state){
            score += 40
            scoreDisplay.innerText = score
            for(var x = min;x<=max;x++){
                delete ground[x]
            }
            var groundCopy = {...ground}
            var allGround  = Object.keys(groundCopy).sort().reverse()
            for(var x in allGround){
                if(allGround[x] < min){
                    var temp = groundCopy[allGround[x]]
                    delete ground[allGround[x]]
                    ground[parseInt(allGround[x])+line] = temp
                }
            }
            for( var i in ground){   
                $("#case"+i).css(blocStyle[ground[i]])
            }
        }
    }
    for( var i in ground){   
        $("#case"+i).css(blocStyle[ground[i]])
    }
    piecePlaced++
}

function move(){
    let temp = deepCopy(movingPiece.data)
    for(var i = 0;i< temp.length;i++){
        for(var x = 0;x< temp[i].length;x++){
            if( temp[i][x] != 0){
                if(ground[temp[i][x]+line] != undefined || temp[i][x]+line > caseNumber){
                    freeze()
                    movingPiece.reset()
                    return
                }
                temp[i][x] += line
            }
        }
    }
    movingPiece.bottomleft += line 
    movingPiece.data = [...temp]
}

function draw(){
    for(var i = 0;i< movingPiece.data.length;i++){
        for(var x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                $("#case"+(movingPiece.data[i][x])).css(blocStyle[movingPiece.type])
            }
        }
    }
}

function updatePiece(){
    if(movingPiece.type == 0){
        var pieceChoice = Math.floor(Math.random() * (allPiece.length))
        var newPiece = allPiece[pieceChoice]
        movingPiece.type = (pieceChoice+1)
        var tempData = []
        for (var i = 0;i<newPiece.length;i++){
            tempData.push([])
            for(var x = 0;x<newPiece[i].length;x++){
                if(newPiece[i][x] != 0){
                    tempData[i].push(middle+x+(line*i))
                    if(ground[middle+x+(line*i)] != undefined){
                        alert("Game Over")
                        return
                    }
                }else{
                    tempData[i].push(0)
                }
            }
        }
        movingPiece.data = tempData
    }
    erease()
    if(count >= tempAmount){
        move()
        count = 0
    }
    count += 1
    if(piecePlaced == 20){
        tempAmount--
        piecePlaced ++
    }else if(piecePlaced == 60){
        tempAmount--
        piecePlaced ++
    }else if(piecePlaced == 120){
        tempAmount--
        piecePlaced ++
    }
    draw()
}

let gameClock = setInterval(updatePiece,timer/7)

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    
    let copy;
    if (Array.isArray(obj)) {
        copy = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
    } else {
        copy = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }
    }
    return copy;
}

function pauseGame() {
    clearInterval(gameClock)
}

$("#play_button").on("click",playGame) //c'est mon tetris donc c'est mon jquery ok Thomas ?
$("#pause_button").on("click",pauseGame)

function playGame() {
    gameClock = setInterval(updatePiece,timer/7)
}