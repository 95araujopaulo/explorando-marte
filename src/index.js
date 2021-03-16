const commandsSonda = require("./commandsSonda")
const marsBo = require("./BO/marsBo")



let messageToInput = "Quais são as coordenadas iniciais?"
function initExploreMars() {
    commandsSonda.readline.question(messageToInput, (value) => {
        if (!marsBo.validateInput(value)) {
            messageToInput = "Insira um novo comando!"
            return initExploreMars()
        }
        commandsSonda.coordinates()
    })
}

initExploreMars()


