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

//getButtons
const numeri = document.querySelectorAll('.bottoniNumeri')
numeri.forEach((bottone) => {
    bottone.addEventListener('click',pressed)
})
//getDisplay
const display = document.querySelector('#display')
//getclearButton
const clear = document.querySelector('#clear')
clear.addEventListener('click',clearDisplay)


function pressed() { 
    displayvalue +=  this.innerText 
    console.log(displayvalue)
    updateDisplay()
}

function clearDisplay() {
    displayvalue = '0'
    updateDisplay()   
}
function updateDisplay() {
    display.innerText = displayvalue

}