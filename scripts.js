let incializador = true;

while (incializador) {
    let numberCards = prompt('Com quantas cartas você gostaria de jogar? (min: 4, max: 14)');
    if (numberCards%2 === 0 && numberCards >= 4 && numberCards <= 14) {
        incializador = false;
    }
}