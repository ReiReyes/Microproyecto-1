const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  //Funcion que le hace reset al juego y su interfaz
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `imagenes/${wrongGuessCount + 1}.jpg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
  gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selecciones una palabras random con su pista de wordList
    const{ word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
  // despues de 300ms de que se complete el juego, se muestra la info 
  setTimeout(() => {
    const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era:`;
    gameModal.querySelector("img").src = `imagenes/${isVictory ? 'victoria' : 'derrota'}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? 'Felicitaciones!' : 'Perdiste!'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300)
}

const initGame = (button, clickedLetter) => {
    //Revisa si la letra seleccionada esta en la palabra
  if(currentWord.includes(clickedLetter)) {
    //Muestra las letras correctas en el display de la palabra
    [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter){
          correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
  }
  else{
    //Si la letra no es correcta, muestra la siguiente imagen y suma 1 al contador.
    wrongGuessCount++;
    hangmanImage.src = `imagenes/${wrongGuessCount + 1}.jpg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  //Funcion del GameOver
  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

//Crea los botones de las letras y tiene el event listener
for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index); //Convierte valores Unicode a caracteres   
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index)))
}

getRandomWord(); 
playAgainBtn.addEventListener("click", getRandomWord);