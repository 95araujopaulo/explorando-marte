const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let positionSonda = [{
    x: 0,
    y: 0,
    looking: "N"
},
{
    x: 0,
    y: 0,
    looking: "N"
}]


const rotationLeft = {
    N: "W",
    S: "E",
    E: "N",
    W: "S"
}

const rotationRight = {
    N: "E",
    S: "W",
    E: "S",
    W: "N"
}

let messageToInput = "Quais são as coordenadas iniciais?"
let sonda = 0
let coordinatesMove = 0
function validateMalha(sonda){
    if(positionSonda[sonda].y > 5 || positionSonda[sonda].y < 0 ){
        console.log("Sonda saiu da malha na posição y")
        return false
    }
    if(positionSonda[sonda].x > 5 || positionSonda[sonda].x < 0 ){
        console.log("Sonda saiu da malha na posição x")
        return false
    }
    return true
}

function moveFront(sonda){
    let indexSondaMove = sonda - 1
    let direction = positionSonda[indexSondaMove].looking
   if(direction == 'N') positionSonda[indexSondaMove].y += 1
   if(direction == 'S') positionSonda[indexSondaMove].y -= 1
   if(direction == 'E') positionSonda[indexSondaMove].x += 1
   if(direction == 'W') positionSonda[indexSondaMove].x -= 1
   if(!validateMalha(indexSondaMove)){
       console.log("A suas movimentações foram causaram um acidente com a sonda "+indexSondaMove)
   }
   return true
   
}
function rotateLeft(sonda){
    let indexSondaLft = sonda - 1
    let direction = positionSonda[indexSondaLft].looking
   if(direction == 'N') positionSonda[indexSondaLft].looking = rotationLeft.N
   if(direction == 'S') positionSonda[indexSondaLft].looking = rotationLeft.S
   if(direction == 'E') positionSonda[indexSondaLft].looking = rotationLeft.E
   if(direction == 'W') positionSonda[indexSondaLft].looking = rotationLeft.W
}
function rotateRight(sonda){
    let indexSondarRgt = sonda - 1
    let direction = positionSonda[indexSondarRgt].looking
   if(direction == 'N') positionSonda[indexSondarRgt].looking = rotationRight.N
   if(direction == 'S') positionSonda[indexSondarRgt].looking = rotationRight.S
   if(direction == 'E') positionSonda[indexSondarRgt].looking = rotationRight.E
   if(direction == 'W') positionSonda[indexSondarRgt].looking = rotationRight.W
}

function execMoove(commandsMove, sonda) {
    commandsMove = commandsMove.toUpperCase()
    for (let i = 0; i < commandsMove.length; i++) {
        if (commandsMove[i] == 'M') {
            moveFront(sonda)
        }
        if (commandsMove[i] == 'L') {
            rotateLeft(sonda)
        }
        if (commandsMove[i] == 'R') {
            rotateRight(sonda)
        }
    }
}

function moveSonda(value, sonda, coordinatesMove) {
    let commandsToSonda = value.split(" ")
    if (sonda == 1) {
        if (coordinatesMove) {
            execMoove(value, sonda)
            messageToInputCoordinatesToMove = "Insira as instruções de movimento da segunda Sonda!"
            coordinatesToMove()
            return false
        }
        positionSonda[0].x = commandsToSonda[0]
        positionSonda[0].y = commandsToSonda[1]
        positionSonda[0].looking = commandsToSonda[2].toUpperCase()
        messageToInputCoordinates = "Insira as cordenadas da segunda Sonda!"
        coordinates()
    } else if (sonda == 2) {
        if (coordinatesMove) {
            execMoove(value, sonda)
            console.log(positionSonda[0])
            console.log(positionSonda[1])
            return false
        }
        positionSonda[1].x = commandsToSonda[0]
        positionSonda[1].y = commandsToSonda[1]
        positionSonda[1].looking = commandsToSonda[2].toUpperCase()
        coordinatesToMove()
        
    }
    return positionSonda;
}
function validateInputCoordinates(value) {
    value = value.toUpperCase()
    if (validateInput(value)) {
        value = value.split(" ")
        if (value.length < 3) {
            console.log("Insira coordenadas completas!")
            return false
        }
        if ((value[2] != 'N') && (value[2] != 'S') && (value[2] != 'E') && (value[2] != 'W')) {
            console.log("Informe uma direção valida! Direções possiveis, N, S, E e W.")
            return false
        }
        return true
    }
}
function validateInput(value) {
    if (!value) {
        console.log("Insira um valor Valido")
        return false
    }
    value = value.split(" ")
    if (value[0] > 5) {
        console.log("Valor inserido excede tamanho da malha!")
        return false
    }
    if (value.length < 2) {
        console.log("Insira coordenadas completas!")
        return false
    }
    return true
}
function validateInputCoordinatesToMove(values) {
    
    values = values.toUpperCase()
    for (let i = 0; i < values.length; i++) {
        if (values[i] != "M" && values[i] != "R" && values[i] != "L") {
            console.log(values[i] + ', Não é um comando valido, os comandos possíveis são L, R e M.')
            return false
        }
    }
    return true
}

function initExploreMars() {
    readline.question(messageToInput, (value) => {
        if (!validateInput(value)) {
            messageToInput = "Insira um novo comando!"
            return initExploreMars()
        }
        coordinates()
    })
}
messageToInputCoordinates = "Insira as cordenadas da primeira Sonda!"

function coordinates() {
    sonda++
    readline.question(messageToInputCoordinates, (value) => {
        if (!validateInputCoordinates(value)) {
            messageToInput = "Insira um novo comando!"
            return coordinates()
        }
        moveSonda(value, sonda, coordinatesMove)
    })
}

messageToInputCoordinatesToMove = "Insira as instruções de movimento da primeira Sonda!"
function coordinatesToMove() {
    sonda++
    coordinatesMove++
    readline.question(messageToInputCoordinatesToMove, (value) => {
        if (!validateInputCoordinatesToMove(value)) {
            messageToInput = "Insira um novo comando!"
            return coordinatesToMove()
        }
        
        moveSonda(value, sonda, coordinatesMove)
        
    })
}


initExploreMars()


