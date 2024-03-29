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

var nextPieceValue = -1

const timer = 500

var count = 0

var piecePlaced = 0

var tempAmount = 6

var gameState = false

let score = 0
let scoreDisplay = document.querySelector('#tScore')
scoreDisplay.innerText = score

let linesNumber = 0
let linesDisplay = document.querySelector('#tLines')
linesDisplay.innerText = linesNumber

let levelNumber = 0
let levelDisplay = document.querySelector('#tLevel')
levelDisplay.innerText = levelNumber

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
    for (var i = 1;i<=4;i++){
        for(var x = 1;x<=4;x++){
            if(struct[4-i][4-x] != 0){
                temp[4-i][4-x] = (struct[4-i][4-x] + movingPiece.bottomleft - i*line + (4-x))
            }
        }
    }
    var current = {"count":0,"line":0}
    for (var i = 0;i<temp.length;i++){
        var firstPiece = -1
        for (var x = 0;x<temp[i].length;x++){
            if(temp[i][x] != 0){
                firstPiece = x
                break
            }
        }
        if (firstPiece == -1){
            continue
        }
        var currentQuotient = Math.floor((temp[i][firstPiece]-1) / line)
        var tempCount = 0
        for (var x = firstPiece;x<temp[i].length;x++){
            if (Math.floor((temp[i][x]-1) / line) != currentQuotient && temp[i][x] != 0) {
                tempCount++
            }
        }
        if(tempCount > current.count){
            current.count = tempCount
            current.line = i
        }
    }
    var saveBottom = movingPiece.bottomleft
    if(current.count > 0){
        for (var i = 0;i<temp.length;i++){
            for (var x = 0;x<temp[i].length;x++){
                if(temp[i][x] != 0){
                    temp[i][x] -= current.count
                }
            }
        }
        movingPiece.bottomleft -= current.count
    }
    var translateNeed = false
    for (var i = 0;i<temp.length;i++){
        for (var x = 0;x<temp[i].length;x++){
            if(ground[temp[i][x]] != undefined){
                movingPiece.bottomleft = saveBottom
                translateNeed = true
                break
            }
        }
    }
    var itineration = 0
    var tempBottom = movingPiece.bottomleft
    if(translateNeed){
        while(itineration < 4){
            var isValid = true
            for(var i = 0;i<temp.length;i++){
                for(var x = 0;x<temp[i].length;x++){
                    if(temp[i][x] != 0){
                        if(Math.floor((temp[i][x]-2) / line) != Math.floor((temp[i][x]-1) / line)){
                            return
                        }
                        if(ground[temp[i][x]-1] != undefined ){
                            isValid = false
                            if(itineration == 3){
                                return
                            }
                        }
                        temp[i][x]--
                    }
                }
            }
            if (isValid){
                break
            }
            tempBottom--
            itineration++
        }
    }
    movingPiece.bottomleft = tempBottom
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
    if(movingPiece.type != 0 && gameState){
        if(event.key == "ArrowRight"){
            decalPiece(1)
        }else if(event.key == "ArrowLeft"){
            decalPiece(-1)
        }else if(event.key == " "){
            fall()
        }else if(event.key == "r" || event.key == "ArrowUp"){
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
        let state = true
        for(var x = min;x<=max;x++){
            if(ground[x] == undefined){
                state = false
            }
        }
        if(state){
            // Update score et lines
            score += 40
            scoreDisplay.innerText = score
            linesNumber++
            linesDisplay.innerText = linesNumber
            if (linesNumber !== 0 && linesNumber%10 === 0) {
                levelNumber++
            }
            levelDisplay.innerText = levelNumber

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

function displayNext(){
    let piece = pieces.allPiece[nextPieceValue]
    for (let i = 0;i<piece.length;i++){
        for(let x = 0;x<piece[i].length;x++){
            $("#next"+(i*4+x+1)).css(backgroundStyle)
            if(piece[i][x] == 1){
                $("#next"+(i*4+x+1)).css(blocStyle[nextPieceValue+1])
            }
        }
    }
}

function updatePiece(){
    if(movingPiece.type == 0){
        if(nextPieceValue == -1){
            nextPieceValue =  Math.floor(Math.random() * (allPiece.length))
        }
        var pieceChoice =nextPieceValue
        nextPieceValue =  Math.floor(Math.random() * (allPiece.length))
        displayNext()
        var newPiece = allPiece[pieceChoice]
        movingPiece.type = (pieceChoice+1)
        var tempData = []
        for (var i = 0;i<newPiece.length;i++){
            tempData.push([])
            for(var x = 0;x<newPiece[i].length;x++){
                if(newPiece[i][x] != 0){
                    tempData[i].push(middle+x+(line*i))
                    if(ground[middle+x+(line*i)] != undefined){
                        $('#playAgainDiv').css('display','inherit')
                        gameState = false
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
    if(piecePlaced == 15){
        tempAmount --
        piecePlaced ++
    }else if(piecePlaced == 30){
        tempAmount --
        piecePlaced ++
    }else if(piecePlaced == 50){
        tempAmount--
        piecePlaced ++
    }else if(piecePlaced == 80){
        tempAmount--
        piecePlaced ++
    }else if(piecePlaced == 120){
        tempAmount--
        piecePlaced ++
    }
    draw()
}

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

// Game play state

let gameClock = undefined

function setGameState(state) {
    if (gameState && !state) {
        clearInterval(gameClock)
        gameState = false
    } else if (!gameState && state) {
        gameClock = setInterval(updatePiece,timer/7)
        gameState = true
    }
}

const playBtn = document.querySelector('#play_state_btn')

function updatePlayBtn() {
    if (gameState) {
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>`
    } else {
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-200v-560l440 280-440 280Z"/></svg>`
    }
}
playBtn.addEventListener('click', (e) => {
    setGameState(!gameState)
    updatePlayBtn()
})

// Empêche que le jeu se mette en pause lorsque la touche espace est pressée et que le bouton est sélectionné
playBtn.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
    }
});
document.querySelector("#reset_btn").addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
    }
});

// Rejouer
function resetGame() {
    movingPiece.reset()
    ground = {}
    count = 0
    piecePlaced = 0
    tempAmount = 6
    eareaseAll()
    setGameState(true)
    nextPieceValue = -1
    gameState = true
    $('#playAgainDiv').css('display','none')
}
$('#rejouerButton').click(function(){
    resetGame()
    updatePlayBtn()
})
$('#reset_btn').click(function(){
    resetGame()
    updatePlayBtn()
})

setGameState(true) // Start game
updatePlayBtn()