const positionSum = 400
const line = 20

for (i=1;i <= positionSum;i++){
    $('#game').append('<div class="position" id="snake'+i+'" ></div>')
}

var Snake = [0,1]
var Food = Math.floor(Math.random()*positionSum)

let score = 0
let scoreDisplay = document.querySelector("#score_num")
scoreDisplay.innerText = score

var direction = "right"
var directionUpdated = true

function switchStyle(el, cName) {
    el.style = ""
    switch (cName) {
        case "food":
            el.style = "background: url('./assets/apple.png') no-repeat center/contain;"
            break
        case "head":
            el.style = "background: #4545e3;"
            switch (direction) {
                case "right":
                    el.style = "background: conic-gradient(from 0.1875turn, transparent 45deg, #4545e3 45deg);border-radius: 0 12px 12px 0;"
                    break
                case "left":
                    el.style = "background: conic-gradient(from 0.6875turn, transparent 45deg, #4545e3 45deg);border-radius: 12px 0 0 12px;"
                    break
                case "down":
                    el.style = "background: conic-gradient(from 0.4375turn, transparent 45deg, #4545e3 45deg);border-radius: 0 0 12px 12px;"
                    break
                case "up":
                    el.style = "background: conic-gradient(from -0.0625turn, transparent 45deg, #4545e3 45deg);border-radius: 12px 12px 0 0;"
                    break
            }
            break
        case "tail":
            el.style = "background: #4545e3;"
            break
        case "body":
            el.style = "background: #4545e3;"
            break
        case "trsp":
            el.style = "background: transparent;"
            break
    }

}

switchStyle(document.querySelector('#snake'+Food), "food")

onkeydown = updateKey

$('#rejouer').on("click",replay)
function loose(){
    $("#annonce").css('display','flex')
    clearInterval(gameRepeat)
}

function replay(){
    $("#annonce").css('display','none')
    Snake = [0,1]
    score = 0
    scoreDisplay.innerText = score
    direction = "right"
    directionUpdated = true
    Food = Math.floor(Math.random()*positionSum)
    while(Snake.includes(Food)){
        Food = Math.floor(Math.random()*positionSum)
    }
    gameRepeat = setInterval(updateSnake,100)
}

function updateKey(event) {
    if(event.key == "ArrowUp" && direction != "down" && directionUpdated){
        direction = "up"
    }else if(event.key == "ArrowDown" && direction != "up" && directionUpdated){
        direction = "down"
    }else if(event.key == "ArrowLeft" && direction != "right" && directionUpdated){
        direction = "left"
    }else if(event.key == "ArrowRight" && direction != "left" && directionUpdated){
        direction = "right"
    }
    directionUpdated = false
}

function updateSnakeGraphics(){
    for (i=1;i<=positionSum;i++){
        if (i === Snake[0]) {
            switchStyle(document.querySelector('#snake'+i), "tail")
        } else if (i === Snake[Snake.length-1]) {
            switchStyle(document.querySelector('#snake'+i), "head")
        } else if(Snake.includes(i)){
            switchStyle(document.querySelector('#snake'+i), "body")
        } else if (i !== Food){
            switchStyle(document.querySelector('#snake'+i), "trsp")
        }
    }
    switchStyle(document.querySelector('#snake'+Food), "food")
}

function updateSnake(){
    var change = 0
    if(direction == "right"){
        change = 1
    }else if(direction == "left"){
        change = -1
    }else if(direction == "up"){
        change = -line
    }else if(direction == "down"){
        change = line
    }
    if(Snake.includes(Snake[Snake.length-1]+change)){
        loose()
    }
    if(Snake.length === positionSum){
        alert('You Win')
        clearInterval(gameReapeat)
    }
    Snake.push(Snake[Snake.length-1]+change)
    if(change === line ||change === -line){
        if (Snake[Snake.length-1] < 0 || Snake[Snake.length-1] > positionSum){
            loose()
        }
    }else if (change === 1 || change === -1){
        if(change === 1){
            if((Snake[Snake.length-1]+change)%line === 2){
                loose()
            }
        }else{
            if((((Snake[Snake.length-1]+change))%line) === line-1){
                loose()
            } else if (Snake[Snake.length-1]+change < 0) {
                loose()
            }
        }
    }
    if (Snake[Snake.length-1] === Food){
        switchStyle(document.querySelector('#snake'+Food), "body")
        score++
        scoreDisplay.innerText = score
        Food = Math.floor(Math.random()*positionSum)
        while(Snake.includes(Food)){
            Food = Math.floor(Math.random()*positionSum)
        }
    }else{
        Snake.shift()
    }
    directionUpdated = true
    updateSnakeGraphics()
}

let gameRepeat = setInterval(updateSnake,100)
