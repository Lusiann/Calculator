
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
window.addEventListener('keydown',keyboardpressing)

function keyboardpressing () {
    if (event.key.match(/[0-9]/)) {
        switch(event.key){
            case '0':
                pressedButton.call(document.getElementById('0'))
            break;

            case '1':
                pressedButton.call(document.getElementById('1'))
            break;

            case '2':
                pressedButton.call(document.getElementById('2'))
            break;

            case '3':
                pressedButton.call(document.getElementById('3'))
            break;

            case '4':
                pressedButton.call(document.getElementById('4'))
            break;

            case '5':
                pressedButton.call(document.getElementById('5'))
            break;

            case '6':
                pressedButton.call(document.getElementById('6'))
            break;

            case '7':
                pressedButton.call(document.getElementById('7'))
            break;

            case '8':
                pressedButton.call(document.getElementById('8'))
            break;

            case '9':
                pressedButton.call(document.getElementById('9'))
            break;
        }

    } else if(event.key.match(/\,|\./) ) {
        pressedDecimal.call(decimale)
    } else if(event.key.match('Backspace')){
        cancellaDisplay()
    } else if(event.key.match(/[+-\/*:x]/)) {
        switch (event.key) {
            case '+':
                pressedOperator.call(document.getElementById('+'))
            break;
            
            case '*':
            case 'x':
            case 'X':
                pressedOperator.call(document.getElementById('x'))
            break;
            
            case '/':
            case ':':
                pressedOperator.call(document.getElementById(':'))
            break;

            case '-':
                pressedOperator.call(document.getElementById('-'))
            break;
        }
            
    } else if(event.key.match('Enter')) {
        operate()
    } else if (event.key.match('Delete')) {
        clearDisplay()
    }
    
   
}


function pressedButton() { 
    if (displayvalue === '0') {
        displayvalue = ''
    }
    if (displayvalue === result) {
        displayvalue = ''
    }
    displayvalue +=  this.innerText    
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
        displayLength = displayLength -2     
    }
    if(displayvalue.charAt(displayLength-1).match('.')){
        decimabutton = true;
    }    
    displayvalue = displayvalue.slice(0,displayLength-1)
    updateDisplay()
}

function updateDisplay() {
    
    if((/ \./).test(displayvalue)) {
        displayvalue = displayvalue.replace(/ \./, ' 0.')
    } else if ((/^\./).test(displayvalue)) {
        displayvalue = displayvalue.replace(/^\./ , '0.')
    }    
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


//based on wes bos 30day challenges https://www.youtube.com/watch?v=zaz9gLI-Xac&t=566s
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


