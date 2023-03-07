const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

const characters = [
    'carlo',
    'cecilia',
    'faustina',
    'francisco',
    'gemma',
    'joao-paulo',
    'luzia',
    'padre-pio',
    'tereza',
    'jose',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}!  Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
            
        }, 500);

    }
    
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (characters) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

front.style.backgroundImage = `url('../images/${characters}.png')`;

    card.appendChild (front);
    card.appendChild (back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', characters);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shufflesArray = duplicateCharacters.sort(() => Math.random() -0.5 );

    shufflesArray.forEach((characters) => {

        const card = createCard(characters);
        grid.appendChild(card);

    });

}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
