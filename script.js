'use strict';

//Selecting Element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,playing;

//Starting Condition
const init = function(){

    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    playing = true;

    score0El.textContent = 0;
    score1EL.textContent = 0;
    diceEl.classList.add('hidden');

    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');

    activePlayer = 0;

    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

    current0El.textContent = 0;
    current1El.textContent = 0;
}

init();

//Switching Player

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling Dice
btnRoll.addEventListener('click',function(){
    if(playing){
         //1.generate a random dice roll
    const dice = Math.trunc(Math.random()*6) + 1;

    //2.display the dice
    diceEl.classList.remove('hidden');
       diceEl.src = `dice-${dice}.png`;

    //3.check if the dice is 1
    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
        //switch to next player
        switchPlayer();
    }
    }
   
});

btnHold.addEventListener('click', function(){
    if(playing){
    // 1. Add current score to the active player's Total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >=100
    if(scores[activePlayer] >= 20){
    // Finish the game
    diceEl.classList.add('hidden');
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } 
    else{
    // 3. Switch the player
    switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);