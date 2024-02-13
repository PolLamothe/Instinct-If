const caseNumber = 400
const middle = 8
const line = 16
const background = "black"

const allPiece = [
    [
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [1,1,1,1,],
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,0,0],
        [1,1,0,0],
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
    ],
    [
        [0,0,0,0],
        [1,1,0,0],
        [1,0,0,0],
        [1,0,0,0],
    ],
    [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
    ],
    [
        [0,0,0,0],
        [1,0,0,0],
        [1,1,0,0],
        [1,0,0,0],
    ]
]

const rotateMap = [
    [
        [
            [1,0,0,0],
            [1,0,0,0],
            [1,0,0,0],
            [1,0,0,0]
        ]
    ],
    [],
    [
        [
            [0,0,0,0],
            [0,1,0,0],
            [1,1,0,0],
            [1,0,0,0],
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,0,0],
            [0,1,1,0]
        ],
        [
            [0,0,0,0],
            [0,1,0,0],
            [1,1,0,0],
            [1,0,0,0]
        ]
    ],
    [
        [
            [0,0,0,0],
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [1,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,0,0,0],
            [1,1,0,0],
            [0,1,0,0]
        ],
    ],
    [
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,0],
            [0,0,1,0]
        ],
        [
            [0,0,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [1,1,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,0,0,0],
            [1,1,1,0]
        ],
    ],
    [
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,1,0],
            [1,1,1,0]
        ],
        [
            [0,0,0,0],
            [1,0,0,0],
            [1,0,0,0],
            [1,1,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,0],
            [1,0,0,0]
        ],
    ],
    [
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [0,1,0,0],
            [1,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,0,0],
            [1,1,1,0]
        ],
    ],
]

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

for(i = 1; i <= caseNumber; i++){
    $('#centerGame').append('<div class="case" id="case'+i+'"></div>')
}

var ground = {}

const color = {
    1 : "blue",
    2 : "yellow",
    3 : "green",
    4 : "red",
    5 : "purple",
    6 : "orange",
    7 : "pink",
}

function changeStruct(struct){
    var temp = []
    for (i = 0;i<4;i++){
        temp.push([])
        for(x = 0;x<4;x++){
            temp[i].push(0)
        }
    }
    for (i = 1;i<=4;i++){
        for(x = 1;x<=4;x++){
            if(struct[4-i][4-x] != 0){
                temp[4-i][4-x] = struct[4-i][4-x] + movingPiece.bottomleft - i*line + x - 4
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
    for(i=0;i<movingPiece.data.length;i++){
        for(x=0;x<movingPiece.data[i].length;x++){  
            if(movingPiece.data[i][x] != 0){
                if((movingPiece.data[i][x] + pas)%line == 1 && pas == 1){
                    return
                }
                if((movingPiece.data[i][x] + pas)%line == 0 && pas == -1){
                    return
                }
                if(ground[movingPiece.data[i][x] + pas] != undefined){
                    return
                }
            }
        }
    }
    movingPiece.bottomleft += pas
    for(i = 0;i< movingPiece.data.length;i++){
        for(x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                movingPiece.data[i][x] += pas
            }
        }
    }
}

function eareaseAll(){
    for(i = 1;i<=caseNumber;i++){
        $("#case"+i).css("background-color",background)
        for(x = 0;x<movingPiece.data.length;x++){
            for(y = 0;y<movingPiece.data[x].length;y++){
                if(movingPiece.data[x][y] == i){
                    $("#case"+i).css("background-color",color[movingPiece.type+1])
                }
            }
        }
        for(x in ground){
            if(x == i){
                $("#case"+i).css("background-color",color[ground[x]+1])
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
        }
        eareaseAll()
    }
}

function fall(){
    var step = line
    while(true){
        for(x = 0;x<movingPiece.data.length;x++){
            for(i = 0;i<movingPiece.data[x].length;i++){
                if(movingPiece.data[x][i] + step > caseNumber || ground[movingPiece.data[x][i] + step] != undefined){
                    for(j = 0;j<movingPiece.data.length;j++){
                        for(w = 0;w<movingPiece.data[j].length;w++){
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
    for(i = 0;i< movingPiece.data.length;i++){
        for(x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                $("#case"+(movingPiece.data[i][x])).css("background-color",background)
            }
        }
    }
}

function freeze(){  
    for(i = 0;i<movingPiece.data.length;i++){
        for(x = 0;x<movingPiece.data[i].length;x++){
            if(movingPiece.data[i][x] != 0){
                ground[movingPiece.data[i][x]] = movingPiece.type
            }
        }
    }
    for(i in ground){
        var min = i-(i%line)+1
        var max = min+line-1
        var state = true
        for(x = min;x<=max;x++){
            if(ground[x] == undefined){
                state = false
            }
        }
        if(state){
            for(x = min;x<=max;x++){
                delete ground[x]
            }
            groundCopy = {...ground}
            var allGround  = Object.keys(groundCopy).sort().reverse()
            for(x in allGround){
                if(allGround[x] < min){
                    var temp = groundCopy[allGround[x]]
                    delete ground[allGround[x]]
                    ground[parseInt(allGround[x])+line] = temp
                }
            }
            for(i in ground){   
                $("#case"+i).css("background-color",color[ground[i]+1])
            }
            return
        }
    }
    for(i in ground){   
        $("#case"+i).css("background-color",color[ground[i]+1])
    }
}

function move(){
    for(i = 0;i< movingPiece.data.length;i++){
        for(x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                movingPiece.data[i][x] += line
            }
        }
    }
    movingPiece.bottomleft += line
    for (i = 0;i<movingPiece.data.length;i++){
        for(x = 0;x<movingPiece.data[i].length;x++){
            if(movingPiece.data[i][x] != 0){
                var current = movingPiece.data[i][x]
                if(ground[current+line] != undefined || current+line > caseNumber){
                    freeze()
                    movingPiece.reset()
                }
            }
        }
    }
}

function draw(){
    for(i = 0;i< movingPiece.data.length;i++){
        for(x = 0;x< movingPiece.data[i].length;x++){
            if( movingPiece.data[i][x] != 0){
                $("#case"+(movingPiece.data[i][x])).css("background-color",color[movingPiece.type+1])
            }
        }
    }
}

function updatePiece(){
    if(movingPiece.type == 0){
        var pieceChoice = Math.floor(Math.random() * (allPiece.length-1))
        var newPiece = allPiece[pieceChoice]
        movingPiece.type = (pieceChoice+1)
        var tempData = []
        for (i = 0;i<newPiece.length;i++){
            tempData.push([])
            for(x = 0;x<newPiece[i].length;x++){
                if(newPiece[i][x] != 0){
                    tempData[i].push(middle+x+(line*i))
                }else{
                    tempData[i].push(0)
                }
            }
        }
        movingPiece.data = tempData
    }
    erease()
    move()
    draw()
}

setInterval(updatePiece,750)