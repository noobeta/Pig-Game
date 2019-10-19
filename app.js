/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;


function init()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

//we are using '#current' because current is an id
//document.querySelector('#current-'+ activePlayer).textContent=dice;
//this will extract the value from the particular id and store it in variable x;
//var x = document.querySelector('score-0').textContent;
//console.log(x);


document.querySelector('.dice').style.display = 'none'; 

/*
-----------------------------------CHANGING THE CSS ELEMENTS WITH JS-------------------------------------
document.querySelector('.dice').style.display = 'none'; 
display is the css property and 'none' is the css value.
this thing will just make the dice form screen go away.
-----------------------------------CHANGING THE CSS ELEMENTS WITH JS-------------------------------------
*/


/*
-------------------------------------CALL BACK FUNCTION----------------------------------------------------

function btn(){
    //do something here
}
document.querySelector('.btn-roll').addEventListener('click',btn);
// we are telling the event listener, that the kind of event is "click" and we are passing 
//the function "btn" as an argument to the eventlistener. We don't want to call the function
//but we want the event listener to call the function. This type of function is called as 
//callback function because this function is passed as an argrument to another function.

-------------------------------------CALL BACK FUNCTION----------------------------------------------------
*/


/*
-------------------------------------ANONYMOUS FUNCTION----------------------------------------------------
document.querySelector('.btn-roll').addEventListener('click',function(){
    //do something here
});
-------------------------------------ANONYMOUS FUNCTION----------------------------------------------------
*/



document.querySelector('.btn-roll').addEventListener('click',function(){

    //1.Generate Random numbers
    var dice = Math.floor(Math.random()*6)+1;

    //2.Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3.Update the round score if it is not equal to 1.
    if(dice!==1)
    {
        roundScore+=dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }
    else{
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //update the ui
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    //check if the player won the game
    if(scores[activePlayer]>=100)
    {
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        removeFromDisplay();
    }
    else{
        nextPlayer();
    }
});

function removeFromDisplay()
{
    document.querySelector('.dice').style.display='none';
    document.querySelector('.btn-roll').style.display='none';
    document.querySelector('.btn-hold').style.display='none';
}
function attachToDisplay()
{
    //document.querySelector('.dice').style.display='block';
    document.querySelector('.btn-roll').style.display='block';
    document.querySelector('.btn-hold').style.display='block';
}
function nextPlayer()
{
    activePlayer === 0?activePlayer=1:activePlayer=0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',function(){
    
    init();
    attachToDisplay();
});






