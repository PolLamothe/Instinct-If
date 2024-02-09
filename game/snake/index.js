const positionSum = 400
const line = 20

for (i=1;i <= positionSum;i++){
    $('#game').append('<div class="position" id="snake'+i+'" ></div>')
}

var Snake = [0,1]
var Food = Math.floor(Math.random()*positionSum)

$('#snake'+Food).css('background-color','red')

var direction = "right"
var directionUpdated = true

onkeydown = updateKey

function loose(){
    $("#annonce").text("You Loose")
    $("#annonce").css('display','flex')
    $("#annonce").append("<button id='rejouer'>Rejouer</button>")
    clearInterval(gameReapeat)
    $('#rejouer').on("click",replay)
}

function replay(){
    $('#annonce').empty()
    $("#annonce").css('display','none')
    Snake = [0,1]
    direction = "right"
    directionUpdated = true
    Food = Math.floor(Math.random()*positionSum)
    while(Snake.includes(Food)){
        Food = Math.floor(Math.random()*positionSum)
    }
    gameReapeat = setInterval(updateSnake,100)
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
        if(Snake.includes(i)){
            $('#snake'+i).css('background-color','white')
        }else if (i != Food){
            $('#snake'+i).css('background-color','black')
        }
    }
    $('#snake'+Food).css('background-color','red')
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
    if(Snake.length == positionSum){
        alert('You Win')
        clearInterval(gameReapeat)
    }
    Snake.push(Snake[Snake.length-1]+change)
    if(change == line ||change == -line){
        if (Snake[Snake.length-1] < 0 || Snake[Snake.length-1] > positionSum){
            loose()
        }
    }else if (change == 1 || change == -1){
        if(change == 1){
            if((Snake[Snake.length-1]+change)%line == 2){
                loose()
            }
        }else{
            if((((Snake[Snake.length-1]+change))%line) == line-1){
            loose()
        }
        }
    }
    if (Snake[Snake.length-1] == Food){
        $('#snake'+Food).css('background-color','white')
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

var gameReapeat = setInterval(updateSnake,100)
