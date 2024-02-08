var positionSum = 400
var line = 20

for (i=1;i <= positionSum;i++){
    $('#game').append('<div class="position" id="snake'+i+'" ></div>')
}

var Snake = [0,1]
var Food = Math.floor(Math.random()*positionSum)

$('#snake'+Food).css('background-color','red')

var direction = "right"

onkeydown = updateKey

function updateKey(event) {
    if(event.key == "ArrowUp" && direction != "down"){
        direction = "up"
    }else if(event.key == "ArrowDown" && direction != "up"){
        direction = "down"
    }else if(event.key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }else if(event.key == "ArrowRight" && direction != "left"){
        direction = "right"
    }
}

function updateSnakeGraphics(){
    for (i=1;i<=positionSum;i++){
        if(Snake.includes(i)){
            $('#snake'+i).css('background-color','white')
        }else if (i != Food){
            $('#snake'+i).css('background-color','black')
        }
    }
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
        clearInterval(gameReapeat)
    }
    if(Snake.length == positionSum){
        alert('You Win')
        clearInterval(gameReapeat)
    }
    Snake.push(Snake[Snake.length-1]+change)
    if(change == line ||change == -line){
        if (Snake[Snake.length-1] < 0 || Snake[Snake.length-1] > positionSum){
            clearInterval(gameReapeat)
        }
    }else if (change == 1 || change == -1){
        if(change == 1){
            if((Snake[Snake.length-1]+change)%line == 1){
                clearInterval(gameReapeat)
            }
        }else{
            if((((Snake[Snake.length-1]+change))%line) == line-1){
            clearInterval(gameReapeat)
        }
        }
    }
    if (Snake[Snake.length-1] == Food){
        $('#snake'+Food).css('background-color','white')
        Food = Math.floor(Math.random()*positionSum)
        $('#snake'+Food).css('background-color','red')
    }else{
        Snake.shift()
    }
    updateSnakeGraphics()
}

var gameReapeat = setInterval(updateSnake,125)
