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
const cancella = document.querySelector('#cancella')
const uguale = document.querySelector('#uguale')
const divcontenitore = document.querySelector('.containerNumeri')
const megacontenitore = document.querySelector('#megacontenitore')



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
cancella.addEventListener('click', cancellaDisplay)
uguale.addEventListener('click',operate)
megacontenitore.addEventListener('mousemove', shadow)


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
    if (/[+-x:] $/.test(displayvalue)) {
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

function cancellaDisplay() {
    let displayLength = displayvalue.length
    if( displayvalue.match(/ $/) ) {
        displayLength = displayLength -1      
    }    
    displayvalue = displayvalue.slice(0,displayLength-1)
    console.log(displayvalue)
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
    if (displayvalue === result) {
        return
    }
    if (displayvalue.match(': 0')){
        alert('SNARKY ERROR MESSAGE')
        return
    }
    
    displayvalue = displayvalue.replace(/:/g,'/')
    displayvalue = displayvalue.replace(/x/g,'*')
    
   
    if ((/[+-\/*] $/.test(displayvalue))) {
        return;
    } else {
        displayPrevious = displayvalue 
        displayPrevious = displayPrevious.replace(/\//g,':')
        displayPrevious = displayPrevious.replace(/\*/g,'x')

    }
       
    result = getMathematicalValue(displayvalue)
    result =  Math.floor(result * 100) / 100
    displayvalue = result    
    updateDisplay()   
}

function getMathematicalValue(str) {
    return new Function('return ' + str)();    
}



function shadow (e) {
    const width = megacontenitore.offsetWidth
    const height = megacontenitore.offsetHeight
    let x = e.offsetX;
    let y = e.offsetY;
    
    
    if (this !== e.target) {
        x = x + e.target.offsetLeft
        y = y + e.target.offsetTop
    }
    
    const xPasso = (x / width * 30) - (30/2)
    const yPasso = (y / height * 30) - (30/2)
    divcontenitore.style.boxShadow = `${xPasso}px ${yPasso}px 20px #808080`    

}


