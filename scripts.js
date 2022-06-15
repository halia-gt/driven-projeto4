function choseCardNumber() {
    let incializador = true;

    while (incializador) {
        let numberCards = Number(prompt('Com quantas cartas você gostaria de jogar? (mín: 4, máx: 14)'));
        if (numberCards%2 === 0 && numberCards >= 4 && numberCards <= 14) {
            incializador = false;
        }
    }
}

choseCardNumber();
