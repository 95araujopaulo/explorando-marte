const mars = require("../src/BO/marsBo")

describe("Teste validateInput", function () {
    it("teste do validateInput params corretos", function () {
        expect(mars.validateInput('5 5')).toEqual(true);
    })
    it("teste do validateInput params incorreto valor maior que a malha", function () {
        expect(mars.validateInput('55 ')).toEqual(false);
    })
    it("teste do validateInput params incorretos vazio", function () {
        expect(mars.validateInput('')).toEqual(false);
    })
    it("teste do validateInput params corretos incorreto com um valor apenas", function () {
        expect(mars.validateInput('5')).toEqual(false);
    })
})

describe("Teste validateInputCoordinates", function () {
    it("teste do validateInputCoordinates params corretos", function () {
        expect(mars.validateInputCoordinates('5 5 s')).toEqual(true);
    })

    it("teste do validateInputCoordinates params incorretos incompleto", function () {
        expect(mars.validateInputCoordinates('5 5')).toEqual(false);
    })

    it("teste do validateInputCoordinates params incorretos apontando lado invalido", function () {
        expect(mars.validateInputCoordinates('5 5 k')).toEqual(false);
    })
    
    it("teste do validateInputCoordinates params incorretos muitos valores", function () {
        expect(mars.validateInputCoordinates('5 5 k k')).toEqual(false);
    })
})

describe("Teste validateInputCoordinatesToMove", function () {
    it("teste do validateInputCoordinatesToMove params corretos", function () {
        expect(mars.validateInputCoordinatesToMove('lrmlrmlrmlrm')).toEqual(true);
    })
    it("teste do validateInputCoordinatesToMove params incorretos com commando invalido", function () {
        expect(mars.validateInputCoordinatesToMove('lrmlrmtlrmlrm')).toEqual(false);
    })
    it("teste do validateInputCoordinatesToMove params incorretos com commando invalido vazio", function () {
        expect(mars.validateInputCoordinatesToMove('')).toEqual(false);
    })
})
