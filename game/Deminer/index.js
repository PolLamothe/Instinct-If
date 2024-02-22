let gameDifficulty = null

const DifficultyData = {
    Facile: {
        tile : 100,
        mines: 10
    },
    Moyen: {
        tile : 196,
        mines: 40
    },
    Difficile: {
        tile : 400,
        mines: 90
    }

}

var ground = []

$('.difficultyButton').on('click',function (e){
    gameDifficulty = e.target.innerHTML
    resetDiv()
    Game()
})

window.oncontextmenu = (e) => {
    if(e.target.classList.contains("tile")){
        e.preventDefault()
        if(!e.target.classList.contains("marked")){
            $(e.target).addClass("marked")
        }else{
            $(e.target).removeClass("marked")
        }
    }
}

function resetDiv(){
    $('#startDiv').remove()
}

function getCase(x,y){
    return ground[y][x]
}

function getNearBomb(x,y){
    let bombCount = 0
    for (let i = -1;i<2;i++){
        for (let j = -1;j<2;j++){
            if (x+i >= 0 && x+i < Math.sqrt(DifficultyData[gameDifficulty].tile) && y+j >= 0 && y+j < Math.sqrt(DifficultyData[gameDifficulty].tile)){
                if (ground[y+j][x+i] == 1){
                    bombCount++
                }
            }
        }
    }
    return bombCount
}  

function dealClick(e){
    var current = e.target
    let x = parseInt(current.getAttribute('x'))
    let y = parseInt(current.getAttribute('y'))
    $(current).addClass("Revealed")
    $(current).removeClass("Light")
    $(current).removeClass("Dark")
    if (ground[y][x] == 1){
        $(current).addClass("bomb")
        alert("You losed")
    }else{
        current.innerHTML = getNearBomb(x,y)
        if(current.innerHTML == 0){
            for (let i = -1;i<2;i++){
                for (let j = -1;j<2;j++){
                    if (x+i >= 0 && x+i < Math.sqrt(DifficultyData[gameDifficulty].tile) && y+j >= 0 && y+j < Math.sqrt(DifficultyData[gameDifficulty].tile)){
                        if(!$(`#tile${(y+j)*Math.sqrt(DifficultyData[gameDifficulty].tile)+x+i}`).hasClass("Revealed")){
                            $(`#tile${(y+j)*Math.sqrt(DifficultyData[gameDifficulty].tile)+x+i}`).click()
                        }
                    }
                }
            }
        }
    }
}

function Game(){
    let switcher = false
    for (let i = 0;i<Math.sqrt(DifficultyData[gameDifficulty].tile);i++){
        ground.push([])
        for (let x = 0;x<Math.sqrt(DifficultyData[gameDifficulty].tile);x++){
            ground[i].push(0)
            let currentClass = "Light"
            if(switcher){
                currentClass = "Dark"
            }
            $("#Game").append("<div id='tile"+(i*Math.sqrt(DifficultyData[gameDifficulty].tile)+x)+"' x="+x+" y="+i+" class='tile "+currentClass+"'></div>")
            switcher = !switcher
        }
        switcher = !switcher
    }
    $('.tile').on('click',dealClick)
    let mineCount = DifficultyData[gameDifficulty].mines
    while(mineCount > 0){
        let x = Math.floor(Math.random()*Math.sqrt(DifficultyData[gameDifficulty].tile))
        let y = Math.floor(Math.random()*Math.sqrt(DifficultyData[gameDifficulty].tile))
        if (ground[x][y] == 0){
            ground[x][y] = 1
            mineCount--
        }
    }
    $('.tile').css("width",90/Math.sqrt(DifficultyData[gameDifficulty].tile)+"vh")
    $('.tile').css("height",90/Math.sqrt(DifficultyData[gameDifficulty].tile)+"vh")
    $("#Game").css("width",90+"vh")

}