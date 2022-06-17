const img1 = 'bobrossparrot.gif';
const img2 = 'explodyparrot.gif';
const img3 = 'fiestaparrot.gif';
const img4 = 'metalparrot.gif';
const img5 = 'revertitparrot.gif';
const img6 = 'tripletsparrot.gif';
const img7 = 'unicornparrot.gif';
const cardsArray = [img1, img2, img3, img4, img5, img6, img7];
let indexArray, flipped, firstCard, secondCard, totalPlays, cards;
let counter = 0;
let lockedBoard = false;

function choseCardNumber() {
    let inicializador;
    let numberCards;
    

    do {
        numberCards = Number(prompt('Com quantas cartas você gostaria de jogar? (mín: 4, máx: 14)'));
        if (numberCards%2 === 0 && numberCards >= 4 && numberCards <= 14) {
            inicializador = false;
        } else {
            alert('O número deve ser par, entre 4 e 14.');
            inicializador = true;
        }
    } while (inicializador);

    displayCards(numberCards);
}

function displayCards(num) {
    const gameDisplay = document.querySelector('main');
    gameDisplay.innerHTML = '';
    
    indexArray = num/2;
    let gameArray = cardsArray.slice(0, indexArray);
    gameArray = gameArray.concat(gameArray);
    gameArray.sort(shuffleCards);

    
    let i = 0;
    while (i < num) {
        gameDisplay.innerHTML = gameDisplay.innerHTML +
        `
        <div class="card" data-identifier="card">
            <img class="front-face" src="/images/${gameArray[i]}" data-identifier="front-face">
            <img class="back-face" src="/images/front.png" data-identifier="back-face">
        </div>
        
        `;
        i++;
    }

    resetGameBoard();
}

function shuffleCards() { 
    return Math.random() - 0.5; 
}

function flipCard() {
    if (this !== firstCard && !lockedBoard) {
        flipped++;
        totalPlays++;
        if (flipped <= 2) {
            this.classList.add('flip');
            if (flipped === 1) {
                firstCard = this;
            } else if (flipped === 2) {
                secondCard = this;
                flipped = 0;
                lockedBoard = true;
                checkMatch();
            }
        }     
    }
}

function checkMatch() {
    const firstSRC = firstCard.querySelector('img').src;
    const secondSRC = secondCard.querySelector('img').src;
    if (firstSRC === secondSRC) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        counter++;
        setTimeout (endGame, 500);
    } else {
        setTimeout(unflipCard, 1000);
    }
}

function unflipCard() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
    lockedBoard = false;
}

function endGame() {
    let restart = '';
    if (counter === indexArray) {
        alert(`Você ganhou em ${totalPlays} jogadas!`);

        do {
            if (restart !== 'sim' && restart !== 'não') {
                restart = prompt('Gostaria de reiniciar a partda? Digite: "sim" ou "não" sem as aspas');
            }
        } while (restart !== 'sim' && restart !== 'não');
    }
    if (restart === 'sim') {
        choseCardNumber();
    }
    lockedBoard = false;
}

function resetGameBoard() {
    totalPlays = 0;
    flipped = 0;
    counter = 0;
    firstCard = null;
    secondCard = null;
    cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    lockedBoard = false;
}

choseCardNumber();