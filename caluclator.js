function add(n1,n2) {
    return n1+n2
}
function subtract(n1,n2) {
    return n1-n2
}
function multiply (n1,n2) {
    return n1*n2
}
function divide (n1,n2) {
    return n1/n2
}

function operate (operator,n1,n2) {
    switch(operator) {
        case '+':
            return add(n1,n2)
            break;
        case '-':
            return subtract(n1,n2)
            break;
        case 'x':
            return multiply(n1,n2)
            break;
        case ':':
            return divide(n1,n2)
            break;
    }

}

let displayvalue = ''
let primoNumero = ''
let secondoNumero = ''
let operatore = ''

//getButtons e event listener
const numeri = document.querySelectorAll('.bottoniNumeri')
numeri.forEach((bottone) => {
    bottone.addEventListener('click',pressed)
})
//getoperator buttons and event listeners
const operatori = document.querySelectorAll('.operatori')
operatori.forEach((bottone) => {
    bottone.addEventListener('click',pressed)
})

//getDisplay
const display = document.querySelector('#display')
//getclearButton
const clear = document.querySelector('#clear')

clear.addEventListener('click',clearDisplay)

//get Equalbutton
const uguale = document.querySelector('#uguale')
uguale.addEventListener('click',prova)


function pressed() { 
    displayvalue +=  this.innerText 
    console.dir(displayvalue)
    updateDisplay()    
}

function clearDisplay() {
    displayvalue = ''
    updateDisplay()   
}
function updateDisplay() {
    display.innerText = displayvalue
}
function prova () {
    displayvalue = getMathematicalValue(displayvalue)
    updateDisplay()
    
}

function getMathematicalValue(str) {
    return new Function('return ' + str)();    
}


