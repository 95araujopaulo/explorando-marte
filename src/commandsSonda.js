const marsBo = require("./BO/marsBo")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let messageToInput = "Quais são as coordenadas iniciais? "
let messageToInputCoordinatesToMove = "Insira as instruções de movimento da Sonda: "
let messageToInputCoordinates = "Insira as cordenadas da Sonda: "

function coordinates() {
    readline.question(messageToInputCoordinates, (value) => {
        if (!marsBo.validateInputCoordinates(value)) {
            messageToInput = "Insira um novo comando: "
            return coordinates()
        }
        marsBo.moveSonda(value)
        coordinatesToMove()
    })
}

function coordinatesToMove() {
    readline.question(messageToInputCoordinatesToMove, (value) => {
        if (!marsBo.validateInputCoordinatesToMove(value)) {
            messageToInput = "Insira um novo comando: "
            return coordinatesToMove()
        }
        marsBo.execMoove(value)
        messageToInputCoordinates = "Insira as cordenadas da nova Sonda: "
        coordinates()
    })
}



module.exports = {
    coordinatesToMove,
    coordinates,
    readline
}