let suits=["Hearts","Clubs", "Diamonds", "Spades"];
let values=["Ace","King","Queen","Jack",
'Ten','Nine','Eight','Seven','six','five','four','three','two'];
let textarea=document.getElementById("text-area");
let newgamebutton= document.getElementById("new-game");
let hitbutton= document.getElementById("hit-button");
let staybutton= document.getElementById("stay");
hitbutton.style.display="none";
staybutton.style.display="none";

newgamebutton.addEventListener('click', function(){
    textarea.innerText="Started...";
    newgamebutton.display.style='none';
    hitbutton.style.display='inline';
    staybutton.style.display='inline';
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
function getcardstring(card){
    return card.value+ " of "+ card.suit;
}
function getnextcard(){
    return deck.shift();
}
let deck=createdeck();

let playercards=[getnextcard(),getnextcard()];
console.log("Welcome to blackjack");
console.log("you are dealt: ");
console.log(" "+getcardstring(playercards[0]));
console.log(" "+getcardstring(playercards[1]));
