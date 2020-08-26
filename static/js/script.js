
function ageInDays()
    {
        var birthYear = prompt("What year you were born, Good Friend?");
        var ageInDayss =(2018 - birthYear) * 365;
        var h1 = document.createElement('h1');
        var textAnswer = document.createTextNode('you are '+ ageInDayss + ' days old');
        h1.setAttribute('id','ageInDays');
        h1.appendChild(textAnswer);
        document.querySelector('.flex-box-result').appendChild(h1);
        console.log(ageInDayss);
    }

function reset()
{
    document.getElementById('ageInDays').remove();
}
//challenge 2 
function generateCat() {
    var image = document.createElement('img');
    var div =document.getElementById('flex-cat-gen');
    image.src="https://media.tenor.com/images/034a09d2088b3cb947d3764d6886d767/tenor.gif";
    div.appendChild(image);
}

//challenge 3
function rpsGame(yourChoice)
{
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer Choice ',botChoice);
    results = decideWinner(humanChoice,botChoice);    
    console.log(results);
    message = finalMessage(results);

    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt()
{
    return Math.floor(Math.random()*3);
}

function numberToChoice(number)
{
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice)
{
    var rpsDatabase ={
        'rock':{'scissors':1 , 'rock':0.5,'paper':0},
        'paper':{'rock':1 , 'paper':0.5,'scissors':0},
        'scissors':{'paper':1 , 'scissors':0.5,'rock':0}
    };
    var yourScore =rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage(yourScore,computerScore){
    if(yourScore ==0)
        return {'message':'you lost','color':'red'};
    else if(yourScore ==0.5)
        return {'message':'you tied','color':'yellow'};
    else
        return{'message':'you won','color':'green'};
}


function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase ={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv= document.createElement('div');
    var botdiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+ imageDatabase[humanImageChoice] + "' height=150 width =150 style='box-shadow':0px 10px 50px rgba(37,50,233,1);>";
    messageDiv.innerHTML ="<h1 style='color:"+finalMessage['color'] +"; font-size:60px; padding:30px;'>"+finalMessage['message']+"</h1>"
    botdiv.innerHTML = "<img src='"+ imageDatabase[botImageChoice] + "' height=150 width =150 style='box-shadow':0px 10px 50px rgba(233,45,37,1);>";
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);


}

//challenge 4: change color of buttons
var all_buttons= document.getElementsByTagName('button');
var copyAllButtons=[];
for(let i=0; i< all_buttons.length;i++)
{
    copyAllButtons.push(all_buttons[i]);
}

function buttonColorChange(buttonThingy)
{
    if(buttonThingy.value === 'red')
        buttonsRed();
    else if(buttonThingy.value === 'green')
        buttonsGreen();
    else if(buttonThingy.value === 'reset')
        buttonsReset();
    else if(buttonThingy.value === 'random')
        buttonsColors();
}

function buttonsRed()
{
    for(let i =0; i < all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen()
{
    for(let i =0; i < all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset()
{
    for(let i =0; i < all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsColors()
{
    var choices =['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i =0; i < all_buttons.length;i++)
    {
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

let blackJackGame = {
    'you':{'scoreSpan':'#your-blackjack-score', 'div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-score', 'div':'#dealer-box','score':0},
    'cards' :['2','3','4','5','6','7','8','9','10','K','J',"Q",'A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStans':false,
    'turnsOver':false
}
const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.m4a');
const lossSound = new Audio('static/sounds/aww.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);



function blackJackHit()
{
    if(blackJackGame['isStans']=== false)
    {
    let card = randomCard();
    showCard(card,YOU);
    showScore(YOU);
    updateScore(card,YOU);
    }
}

function showCard(card,activePlayer)
{
    if(activePlayer['score'] <= 21){
    
    let cardImage = document.createElement('img');
    cardImage.src= `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackJackDeal(){
    if(blackJackGame['turnsOver']===true){

    blackJackGame['isStans']= false;
    showResult(computeWinner());
    let yourImages =document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages =document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0;i< yourImages.length;i++)
    {
        yourImages[i].remove();
    }

    for(i=0;i< dealerImages.length;i++)
    {
        dealerImages[i].remove();
    }

    YOU['score'] =0;
    DEALER['score'] =0;

    document.querySelector('#your-blackjack-score').textContent =0;
    document.querySelector('#dealer-blackjack-score').textContent =0;

    document.querySelector('#your-blackjack-score').style.color ='white';
    document.querySelector('#dealer-blackjack-score').style.color ='white';

    document.querySelector('#blackjack-result').textContent ="Let's play";
    document.querySelector('#blackjack-result').style.color ='black';
    blackJackGame['turnOver'] = true;
    }
}

function randomCard()
{
    let randomNumber = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomNumber];
}

function updateScore(card,activePlayer)
{
    if(card === 'A'){
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21){
            activePlayer['score']+= blackJackGame['cardsMap'][card][1];
        } else {

            activePlayer['score']+= blackJackGame['cardsMap'][card][0];

        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
    
}


function showScore(activePlayer)
{
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color ='red';

    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
    
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerLogic()
{
    blackJackGame['isStans'] = true;

    while(DEALER['score'] < 16 && blackJackGame['isStans']===true)
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);        
        showScore(DEALER);
    }
   
    blackJackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    await sleep(2000);
}

function computeWinner()
{
    let winner;
    if(YOU['score']<= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackJackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
               blackJackGame['draws']++;

        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackJackGame['losses']++;
        winner = DEALER;
    }
    else if(YOU['score'] > 21 && DEALER['score']>21)
    {
        blackJackGame['draws']++;    
    }

    return winner;
}


function showResult(winner){
    let message , messageColor;

    if(blackJackGame['turnsOver'] === true){
        
    if(winner === YOU)
    {
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message='You Won!';
        messageColor ='green';
        winSound.play();
    }
    else if(winner === DEALER)
    {
        document.querySelector('#losses').textContent = blackJackGame['losses'];

        message= 'You Lost!';
        messageColor ='red';
        lossSound.play();
    }
    else
    {
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        
        message ='You drew!';
        messageColor ='black';
    }

    document.querySelector('#blackjack-result').textContent =message;
    document.querySelector('#blackjack-result').style.color =messageColor;
    }

}