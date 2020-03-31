/* function add(n1,n2) {
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

} */
const numeri = document.querySelectorAll('.bottoniNumeri')
const operatori = document.querySelectorAll('.operatori')
const display = document.querySelector('#display')
const displayPreviousElement = document.querySelector('#displayPending')
const clear = document.querySelector('#clear')
const uguale = document.querySelector('#uguale')

let displayvalue = '0'
let displayPrevious = ''
let currentOperatore = ''
let result = undefined


numeri.forEach((bottone) => {
    bottone.addEventListener('click',pressedButton)
})
operatori.forEach((bottone) => {
    bottone.addEventListener('click',pressedOperator)
})
clear.addEventListener('click',clearDisplay)
uguale.addEventListener('click',operate)

function pressedButton() { 
    if (displayvalue === '0') {
        displayvalue = ''
    }
    displayvalue += + this.innerText
    console.log(displayvalue)    
    updateDisplay()    
}
function pressedOperator () {
    if (/[+-\/*].$/.test(displayvalue)) {
        return;
    } else {
        operatore = this.innerText
        displayvalue += ' ' + operatore + ' '   
        updateDisplay()
    }  

}
function clearDisplay() {
    displayPrevious = ''
    displayvalue = '0'
    operatore = ''
    result = undefined
    updateDisplay()   
}
function updateDisplay() {
    display.innerText = displayvalue
    if (result) {
        displayPreviousElement.innerText = displayPrevious + ' = ' + result
    } else {
        displayPreviousElement.innerText = displayPrevious
    }
       
}
function operate () {
    debugger
    if (displayvalue === result) {
        return
    }
    displayPrevious = displayvalue    
    result = getMathematicalValue(displayvalue)
    displayvalue = result    
    updateDisplay()   
}

function getMathematicalValue(str) {
    return new Function('return ' + str)();    
}


