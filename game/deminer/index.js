let gameDifficulty = null

let discovered = false

const DifficultyData = {
    Facile: {
        tile : 121,
        mines: 25,
        safe: 4
    },
    Moyen: {
        tile : 196,
        mines: 40,
        safe : 4
    },
    Difficile: {
        tile : 361,
        mines: 80,
        safe : 5
    }

}

var ground = []

$('.difficultyButton').on('click',function (e){
    gameDifficulty = e.target.innerHTML
    resetDiv()
    Game()
})

window.oncontextmenu = (e) => {
    if(e.target.classList.contains("tile") && discovered){
        e.preventDefault()
        if(!e.target.classList.contains("marked")){
            $(e.target).addClass("marked")
            $('#crossCount').text($('#crossCount').text()-1)
        }else{
            $(e.target).removeClass("marked")
            $('#crossCount').text(parseInt($('#crossCount').text())+1)
        }
    }
}

function resetDiv(){
    $('#startDiv').css("display","none") 
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

async function debug(password){
    if(await hash(password) == "83ddebbefbe67e0d4db0117d3bb759f8488198a1ffe321afeab2122363745322"){
        for(let i = 0;i<ground.length;i++){
            for(let j = 0;j<ground[i].length;j++){
                if(ground[i][j] == 1){
                    $(`#tile${i*Math.sqrt(DifficultyData[gameDifficulty].tile)+j}`).addClass("bomb")
                }
            }
        }    
    }else{
        console.log("Bien essayé mais non")
    }
}

function discoverGame(xClick,yClick){
    let mineCount = DifficultyData[gameDifficulty].mines
    while(mineCount > 0){
        let x = Math.floor(Math.random()*(Math.sqrt(DifficultyData[gameDifficulty].tile)))
        let y = Math.floor(Math.random()*(Math.sqrt(DifficultyData[gameDifficulty].tile)))
        if (ground[y][x] == 0 && (( Math.abs(x-xClick) + Math.abs(y-yClick)) >= DifficultyData[gameDifficulty].safe)){
            ground[y][x] = 1
            mineCount--
        }
    }
    discovered = true
}

function dealClick(e){
    if(!$(e.target).is("div")){
        return
    }
    var current = e.target
    let x = parseInt(current.getAttribute('x'))
    let y = parseInt(current.getAttribute('y'))
    $(current).addClass("Revealed")
    $(current).removeClass("Light")
    $(current).removeClass("Dark")
    if (!discovered){
        discoverGame(x,y)
    }
    if (ground[y][x] == 1){
        $(current).addClass("bomb")
        $('#annonceDéfaite').css("display","inherit")
    }else if($(current).children().length == 0){
        $(current).append("<p>"+getNearBomb(x,y)+"</p>")
        if($(current).children()[0].innerHTML == 0){
            for (let i = -1;i<2;i++){
                for (let j = -1;j<2;j++){
                    if (x+i >= 0 && x+i < Math.sqrt(DifficultyData[gameDifficulty].tile) && y+j >= 0 && y+j < (Math.sqrt(DifficultyData[gameDifficulty].tile))){
                        if(!$(`#tile${(y+j)*Math.sqrt(DifficultyData[gameDifficulty].tile)+x+i}`).hasClass("Revealed")){
                            $(`#tile${(y+j)*Math.sqrt(DifficultyData[gameDifficulty].tile)+x+i}`).click()
                        }
                    }
                }
            }
            $($(current).children()[0]).css("display","none")
        }
    }else{
        return
    }
    if($(".Revealed").length == DifficultyData[gameDifficulty].tile-DifficultyData[gameDifficulty].mines){
        $('#annonceVictoire').css("display","inherit")
    }
}

function Game(){
    $('#Main').css("display","flex")
    $('#crossCount').text(DifficultyData[gameDifficulty].mines)
    let switcher = false
    let previousLine = switcher
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
        switcher = !previousLine
        previousLine = switcher
    }
    $('.tile').on('click',dealClick)
    $('.tile').css("width",90/Math.sqrt(DifficultyData[gameDifficulty].tile)+"vh")
    $('.tile').css("height",90/Math.sqrt(DifficultyData[gameDifficulty].tile)+"vh")
}

async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
}

$(".rejouerButton").on("click",reset)

function reset(){
    gameDifficulty = null
    discovered = false
    ground = []
    $("#Game").empty()
    $('#Main').css("display","none")
    $('#startDiv').css("display","inherit")
    $('#annonceDéfaite').css("display","none")
    $('#annonceVictoire').css("display","none")
}