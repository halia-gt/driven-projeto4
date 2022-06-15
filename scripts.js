const img1 = '/images/bobrossparrot.gif';
const img2 = '/images/explodyparrot.gif';
const img3 = '/images/fiestaparrot.gif';
const img4 = '/images/metalparrot.gif';
const img5 = '/images/revertitparrot.gif';
const img6 = '/images/tripletsparrot.gif';
const img7 = '/images/unicornparrot.gif';
const cardsArray = [img1, img2, img3, img4, img5, img6, img7];
let flipped, firstCard, secondCard, totalPlays;

function choseCardNumber() {
    let incializador = true;
    let numberCards;
    
    while (incializador) {
        numberCards = Number(prompt('Com quantas cartas você gostaria de jogar? (mín: 4, máx: 14)'));
        if (numberCards%2 === 0 && numberCards >= 4 && numberCards <= 14) {
            incializador = false;
        }
    }
    displayCards(numberCards);
}

function displayCards(num) {
    const gameDisplay = document.querySelector('main');
    const indexArray = num/2;
    let gameArray = cardsArray.slice(0, indexArray);
    gameArray = gameArray.concat(gameArray);
    let shuffleArray = gameArray.sort(shuffleCards);
    let i = 0;
    while (i < num) {
        gameDisplay.innerHTML = gameDisplay.innerHTML +
        `
        <div class="card" data-identifier="card">
        <img class="front-face" src="${shuffleArray[i]}" data-identifier="front-face">
        <img class="back-face" src="/images/front.png" data-identifier="back-face">
        </div>
        
        `;
        i++;
    }
    totalPlays = 0;
    flipped = 0;
}

function shuffleCards() { 
    return Math.random() - 0.5; 
}

function flipCard() {
    flipped++;

    if (flipped <= 2) {
        this.classList.add('flip');
        if (flipped === 1) {
            firstCard = this;
        } else if (flipped === 2) {
            secondCard = this;
            flipped = 0;
            checkMatch();
        }
    }     
}

function checkMatch() {
    const firstSRC = firstCard.querySelector('img').src;
    const secondSRC = secondCard.querySelector('img').src;
    if (firstSRC === secondSRC) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        setTimeout(unflipCard, 1200);
    }
}

function unflipCard() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = undefined;
    secondCard = undefined;
}



choseCardNumber();
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));