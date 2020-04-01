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
const decimale = document.querySelector('#decimale')
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
let decimabutton = true;

decimale.addEventListener('click', pressedDecimal)
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
    if (displayvalue === result) {
        displayvalue = ''
    }
    displayvalue +=  this.innerText
    console.log(displayvalue)    
    updateDisplay()    
}

function pressedOperator () {    
    if (/[+-\/*] $/.test(displayvalue)) {
        return;
    } else {
        decimabutton = true;
        operatore = this.innerText
        displayvalue += ' ' + operatore + ' '   
        updateDisplay()
    }  

}

function pressedDecimal() { 
    if (decimabutton) {
        pressedButton.call(this)
        decimabutton = false;
    } else {
        return;
    }         
    
}

function clearDisplay() {
    displayPrevious = ''
    displayvalue = '0'
    operatore = ''
    result = undefined
    decimabutton = true;
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
    if ((/[+-\/*] $/.test(displayvalue))) {
        return;
    } else {
        displayPrevious = displayvalue 
    }
       
    result = getMathematicalValue(displayvalue)
    result =  Math.floor(result * 100) / 100
    displayvalue = result    
    updateDisplay()   
}

function getMathematicalValue(str) {
    return new Function('return ' + str)();    
}


