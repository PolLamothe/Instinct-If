var turn = "X"

var game = {
    A1 : "",
    A2 : "",
    A3 : "",
    B1 : "",
    B2 : "",
    B3 : "",
    C1 : "",
    C2 : "",
    C3 : ""
}

letter = ["A", "B", "C"]

function checkGame(currentGameData){
    for (i = 0; i < 3; i++){
        var current = currentGameData[letter[i] + 1]
        if (current != ""){
            var state = true
            for(j = 0; j < 3; j++){
                if (currentGameData[letter[i] + (j+1)] != current){
                    state = false
                }
            }
            if (state){
                return current
            }
        }
    }
    for (i = 0; i < 3; i++){
        var current = currentGameData["A" + (i + 1)]
        if (current != ""){
            var state = true
            for(j = 0; j < 3; j++){
                if (currentGameData[letter[j]+(i+1)] != current){
                    state = false
                }
            }
            if (state){
                return current
            }
        }
    }
    var current = currentGameData["A1"]
    if (current != ""){
        if (currentGameData["B2"] == current && currentGameData["C3"] == current){
            return current
        }
    }
    var current = currentGameData["A3"]
    if (current != ""){
        if (currentGameData["B2"] == current && currentGameData["C1"] == current){
            return current
        }
    }
    for (var key in currentGameData){
        if (currentGameData[key] == ""){
            return null //pas fini
        }
    }
    return false //églité
}

function getFreeSpace(currentGameData){
    var freeSpace = []
    for (var key in currentGameData){
        if (currentGameData[key] == ""){
            freeSpace.push(key)
        }
    }
    return freeSpace
}

function GoodMinimax(currentGameData,Player){
    PlayerSymbol = "X"
    IASymbol = "O"
    var best = []
    if (Player){
        best = [null,-Infinity]
    }else{
        best = [null,Infinity]
    }
    if (checkGame(currentGameData) != null){
        if (checkGame(currentGameData) == IASymbol){
            return [null,1]
        }else if(checkGame(currentGameData) == PlayerSymbol){
            return [null,-1]
        }else{
            return [null,0]
        }
    }else{
        var freeSpace = getFreeSpace(currentGameData)
        for (var i = 0;i<freeSpace.length;i++){
            var space = freeSpace[i]
            temp = {...currentGameData}
            if (Player){
                temp[space] = IASymbol
            }else{
                temp[space] = PlayerSymbol
            }
            move = GoodMinimax(temp,!Player)
            if(Player){
                if(move[1] > best[1]){
                    best = [space,move[1]]
                }
            }else{
                if(move[1] < best[1]){
                    best = [space,move[1]]
                }
            }
        }
    }
    return best
}

function BadMinimax(currentGameData,Player){
    PlayerSymbol = "X"
    IASymbol = "O"
    var best = []
    if (Player){
        best = [null,-Infinity]
    }else{
        best = [null,Infinity]
    }
    if (checkGame(currentGameData) != null){
        if (checkGame(currentGameData) == IASymbol){
            return [null,1]
        }else if(checkGame(currentGameData) == PlayerSymbol){
            return [null,0]
        }else{
            return [null,0]
        }
    }else{
        var freeSpace = getFreeSpace(currentGameData)
        for (var i = 0;i<freeSpace.length;i++){
            var space = freeSpace[i]
            temp = {...currentGameData}
            if (Player){
                temp[space] = IASymbol
            }else{
                temp[space] = PlayerSymbol
            }
            move = BadMinimax(temp,!Player)
            if(Player){
                if(move[1] > best[1]){
                    best = [space,move[1]]
                }
            }else{
                if(move[1] < best[1]){
                    best = [space,move[1]]
                }
            }
        }
    }
    return best
}

function updateHTMLBoard(){
    updateAnnonce()
    for (var key in game){
        if (game[key] == "X"){
            document.getElementById(key).innerHTML = "X"
        }else if (game[key] == "O"){
            document.getElementById(key).innerHTML = "O"
        }
    }
}

function updateAnnonce(){
    if (checkGame(game) == "X"){
        $('#annonce').html("Tu as gagné !")
        $('#annonce').css("display","inherit")
        $("#annonce").css("color","#1fd655")
    }else if (checkGame(game) == "O"){
        $('#annonce').html("Tu as perdu !")
        $('#annonce').css("display","inherit")
        $("#annonce").css("color","#F75D59")
    }else if (checkGame(game) == false){
        $('#annonce').html("Il y a égalité !")
        $('#annonce').css("display","inherit")
        $("#annonce").css("color","white")
    }else{
        $('#annonce').html("")
        $('#annonce').css("display","none")
    }
}

$(".case").on("click", function(e) {
    if (e.target.children[0].innerHTML == ""){
        game[e.target.children[0].id] = turn    
        var IAPlay = ""
        if($("#npcState")[0].innerHTML != "Gentil Personne"){
            IAPlay = GoodMinimax(game,true)
        }else{
            IAPlay = BadMinimax(game,true)
        }
        game[IAPlay[0]] = "O"
        updateHTMLBoard()
    }
})

$("#reloadIcon").on("click", function(e) {
    try{
        for (var key in game){
            game[key] = ""
            document.getElementById(key).innerHTML = ""
        }
    }catch(e){

    }
    game = {
        A1 : "",
        A2 : "",
        A3 : "",
        B1 : "",
        B2 : "",
        B3 : "",
        C1 : "",
        C2 : "",
        C3 : ""
    }
    updateAnnonce()
})

document.getElementById("npcState").addEventListener("input", function(e) {
    if(e.target.innerHTML == "Gentil Personne"){
        $('#hater').attr("src","./assets/gentil.png")
        $('#speakText').html("Tu peux le faire ! Je crois en toi !")
    }
})