const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const hangman = document.querySelector(".hangman-box");
const dificulty = document.querySelector(".game-dificulty");
const facil = document.querySelector(".f");
const media = document.querySelector(".m");
const dificil = document.querySelector(".d");

let currentWord, correctLetters, wrongGuessCount, bestpoints, points, dificultad ;
const maxGuessesF = 12;
const maxGuessesM = 6;
const maxGuessesD = 4;
bestpoints = 0;
points = 0;



const resetGame = () => {
  //Funcion que le hace reset al juego y su interfaz
  if(dificultad === "facil"){
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `imagenes/${wrongGuessCount + 1}.jpg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesF}`;
    
  }else if(dificultad === "medio"){
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `imagenes/${wrongGuessCount + 7}.jpg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesM}`;
  
  
  }else if(dificultad === "dificil"){
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `imagenes/${wrongGuessCount + 9}.jpg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesD}`;
  }
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
const gameDificulty = () => { 
  dificulty.classList.add("show");
  facil.addEventListener("click", easy);
  media.addEventListener("click", medium);
  dificil.addEventListener("click", hard);
}
const easy= () => {
  dificultad = "facil";
  getRandomWord();
  hangman.querySelector("h6").innerText= `Dificultad: ${dificultad}`;
  dificulty.classList.remove("show")
}
const medium = () =>{
  dificultad = "medio";
  getRandomWord();
  hangman.querySelector("h6").innerText= `Dificultad: ${dificultad}`;
  dificulty.classList.remove("show");
}
const hard = () =>{
  dificultad = "dificil";
  getRandomWord();
  hangman.querySelector("h6").innerText= `Dificultad: ${dificultad}`;
  dificulty.classList.remove("show");
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
  // suma el puntaje actual si adivino la palabra\

  if(dificultad === "facil"){
    
    if(wrongGuessCount !==12){
      points += (maxGuessesF - wrongGuessCount)/2;
      hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
      if(points > bestpoints){
        bestpoints = points;
        hangman.querySelector("h5").innerText = `Mejor Puntaje: ${bestpoints} pts`;
      }
    }else{
      points = 0;
      hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
    }
  }else if(dificultad === "medio"){
    
  if(wrongGuessCount !==6){
    points += maxGuessesM - wrongGuessCount;
    hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
    if(points > bestpoints){
      bestpoints = points;
      hangman.querySelector("h5").innerText = `Mejor Puntaje: ${bestpoints} pts`;
    }
    }else{
      points = 0;
      hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
    }
  }else if(dificultad === "dificil"){
    
    if(wrongGuessCount !== 4){
      points += maxGuessesD*3 - wrongGuessCount*2;
      
      hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
      if(points > bestpoints){
        bestpoints = points;
        hangman.querySelector("h5").innerText = `Mejor Puntaje: ${bestpoints} pts`;
      }
    }else{
      
      points = 0;
      hangman.querySelector("h3").innerText = `Puntaje Actual: ${points} pts`;
    }}
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
    if(dificultad === "facil"){
      hangmanImage.src = `imagenes/${wrongGuessCount + 1}.jpg`;
    }else if (dificultad === "medio"){
      hangmanImage.src = `imagenes/${wrongGuessCount+7}.jpg`;
    }else if (dificultad === "dificil"){
      hangmanImage.src = `imagenes/${wrongGuessCount+9}.jpg`;
    }
    
  }

  button.disabled = true;
  if(dificultad === "facil"){
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesF}`;
    //Funcion del GameOver
    if(wrongGuessCount === maxGuessesF) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

  }else if(dificultad === "medio"){
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesM}`;
    //Funcion del GameOver
    if(wrongGuessCount === maxGuessesM) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

  }else if(dificultad === "dificil"){
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessesD}`;
    //Funcion del GameOver
    if(wrongGuessCount === maxGuessesD) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
  }
}

//Crea los botones de las letras y tiene el event listener
for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index); //Convierte valores Unicode a caracteres   
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index)))
}

gameDificulty();
playAgainBtn.addEventListener("click", getRandomWord);
