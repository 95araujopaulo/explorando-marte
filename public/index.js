const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let positionSonda = [{
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
let coordinatesMove = 0
let messageToInputCoordinatesToMove = "Insira as instruções de movimento da Sonda!"
let messageToInputCoordinates = "Insira as cordenadas da Sonda!"

function validateMalha(){
    if(positionSonda[0].y > 5 || positionSonda[0].y < 0 ){
        console.log("Sonda saiu da malha na posição y")
        return false
    }
    if(positionSonda[0].x > 5 || positionSonda[0].x < 0 ){
        console.log("Sonda saiu da malha na posição x")
        return false
    }
    return true
}

function moveFront(){
    let direction = positionSonda[0].looking
    positionSonda[0].y = parseInt(positionSonda[0].y)
    positionSonda[0].x = parseInt(positionSonda[0].x)
   if(direction == 'N') positionSonda[0].y += 1
   if(direction == 'S') positionSonda[0].y -= 1
   if(direction == 'E') positionSonda[0].x += 1
   if(direction == 'W') positionSonda[0].x -= 1
   if(!validateMalha(0)){
       console.log("A suas movimentações causaram um acidente com a sonda")
   }
   return true
   
}

function rotateLeft(){
    let direction = positionSonda[0].looking
   if(direction == 'N') positionSonda[0].looking = rotationLeft.N
   if(direction == 'S') positionSonda[0].looking = rotationLeft.S
   if(direction == 'E') positionSonda[0].looking = rotationLeft.E
   if(direction == 'W') positionSonda[0].looking = rotationLeft.W
}

function rotateRight(){
    let direction = positionSonda[0].looking
   if(direction == 'N') positionSonda[0].looking = rotationRight.N
   if(direction == 'S') positionSonda[0].looking = rotationRight.S
   if(direction == 'E') positionSonda[0].looking = rotationRight.E
   if(direction == 'W') positionSonda[0].looking = rotationRight.W
}

function execMoove(commandsMove) {
    commandsMove = commandsMove.toUpperCase()
    for (let i = 0; i < commandsMove.length; i++) {
        if (commandsMove[i] == 'M') {
            moveFront()
        }
        if (commandsMove[i] == 'L') {
            rotateLeft()
        }
        if (commandsMove[i] == 'R') {
            rotateRight()
        }
    }
}

function moveSonda(value) {
    let commandsToSonda = value.split(" ")
        if (coordinatesMove) {
            execMoove(value)
            messageToInputCoordinatesToMove = "Insira as instruções de movimento da Sonda!"
            console.log(positionSonda[0].x + ' ' + positionSonda[0].y + ' ' + positionSonda[0].looking)
            coordinatesMove = 0
            coordinates()
            return false
        }
        positionSonda[0].x = commandsToSonda[0]
        positionSonda[0].y = commandsToSonda[1]
        positionSonda[0].looking = commandsToSonda[2].toUpperCase()
        messageToInputCoordinates = "Insira as cordenadas da nova Sonda!"
        coordinatesToMove()
    
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

function coordinates() {
    
    readline.question(messageToInputCoordinates, (value) => {
        if (!validateInputCoordinates(value)) {
            messageToInput = "Insira um novo comando!"
            return coordinates()
        }
        moveSonda(value, coordinatesMove)
    })
}

function coordinatesToMove() {
    coordinatesMove++
    readline.question(messageToInputCoordinatesToMove, (value) => {
        if (!validateInputCoordinatesToMove(value)) {
            messageToInput = "Insira um novo comando!"
            return coordinatesToMove()
        }
        
        moveSonda(value, coordinatesMove)
        
    })
}


initExploreMars()


