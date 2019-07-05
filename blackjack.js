let suits=["Hearts","Clubs", "Diamonds", "Spades"],
 values=["Ace","King","Queen","Jack",
'Ten','Nine','Eight','Seven','Six','Five','Four','Three','Two'];

//DOM VARIABLES
let textarea= document.getElementById("text-area");
let newgamebutton= document.getElementById("new-game");
let hitbutton= document.getElementById("hit-button");
let staybutton= document.getElementById("stay");

//game variables

let gamestarted=false,
    gameover=false,
    playerwon=false,
    dealercards=[],
    playercards=[],
    dealerscore=0,
    playerscore=o,
    deck=[];

    hitbutton.style.display='none';
    staybutton.style.display='none';
    showstatus();

newgamebutton.addEventListener('click', function(){
    gamestarted=true;
    gameover=false;
    playerwon=false;

    deck=createdeck();
    shuffledeck(deck);
    dealercards=[getnextcard(),getnextcard()];
    playercards=[getnextcard(),getnextcard()];

    newgamebutton.display.style='none';
    hitbutton.style.display='inline';
    staybutton.style.display='inline';
    showstatus();
});
hitbutton.addEventListener('click', function(){
    playercards.push(getnextcard());
    checkforendgame();
    showstatus();
});
staybutton.addEventListener('click', function(){
gameover=true;
checkforendgame();
showstatus();
});

function createdeck(){
    let deck=[];
    for(suitsidx=0;suitsidx<suits.length;suitsidx++){
        for(let valuesidx=0;valuesidx<values.length;valuesidx++){
            let card={
                suit: suits[suitsidx],
                value: values[valuesidx]
            };
            deck.push(card);
        }
    }
    return deck;
}
//loop through every card in the deck
function shuffledeck(deck){
    for(let i=0; i<deck.length; i++){
        let swapidx= Math.trunc(Math.random* deck.length);
        let tmp=deck[swapidx];
        deck[swapidx]=deck[i];
        deck[i]=tmp;
    }
}
function getcardstring(card){
    return card.value+ " of "+ card.suit;
}
function getcardnumericvalue(card){
    switch(card.value){
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}

//get scores
function getscore(cardArray){
let score = 0;
let hasAce = false;
for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getcardnumericvalue(card);
    if(card.value == 'Ace'){
        hasAce = true;
    }
}
if(hasAce && score +10 <=21){
    return score +10;
}
return score;
}

function updatescore(){
dealerscore = getscore(dealercards);
playerscore = getscore(playercards);
}
function checkforendgame(){
    updatescore();
    if(gameover){
        //dealer pick cards
        while(dealerscore < playerscore && playerscore <= 21 && dealerscore <= 21){
            dealercards.push(getnextcard());
            updatescore();

        }
    }
    if(playerscore > 21){
        playerwon = false;
        gameover = true;
    }
    else if(dealerscore > 21){
        playerwon = true;
        gameover = true;
    }
    else if(gameover){
        if(playerscore > dealerscore){
            playerwon = true;
        }
        else{
            playerwon = false;
        }
    }
}
function showstatus(){
    if(!gamestarted){
        textarea.innerText="Welcome to blackjack";
        return;
    }
    let dealercardstring='';
    for(let i=0; i<dealercards.length; i++){
        dealercardstring += getcardstring(dealercards[i]) + '\n';
    }
    let playercardstring='';
    for(let i=0; i<playercards.length; i++){
        playercardstring += getcardstring(playercards[i]) + '\n';
    }
    updatescore();
    //get and append string to each card
    textarea.innerText= 'Dealer has:\n' + dealercardstring+ '(score: '+ dealerscore +')\n\n'+
    'player has: \n'+ playerscore + ')\n\n';
    if(gameover){
        if(playerwon){
            textarea.innerText += "YOU WIN!";
        }
        else{
            textarea.innerText +="DEALER WINS!";
        }
    }   
    for(var i=0; i<deck.length; i++){
        textarea.innerText += '\n' + getcardstring(deck[i]);
    }
}
function getnextcard(){
    return deck.shift();
}
