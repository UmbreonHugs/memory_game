/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// set default variables
var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bomb', 'fa-bomb', 'fa-bicycle', 'fa-bicycle']
var cardsAll = document.querySelectorAll('.card');
var openedCards = [];
var openedIcons = [];
var moves = 0;
var totalClicks = 0;
var gameStart = false;
var deck = document.querySelector('.deck');

function loadGame() {
  var cardHTML = cards.map(function(card) {
      return buildDeck(card);
  });
  deck.innerHTML = cardHTML.join('');
  //console.log(cardHTML)
}
loadGame();
function buildDeck(card) {
  template = `<li class="card"><i class="fa ${card}" data-icon="${card}"></i></li>`
  return template;
}
// remove the card from previous arrays
function reverseCard() {

}
function checkCards(t) {

}
function updateMoves() {
}
cardsAll.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // prevent double clicking
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        card.classList.add('open', 'show');
        openedCards.push(card)

        // check icon
        var firstCardType = openedCards[0].querySelector('i').classList.item(1);
        console.log(firstCardType);

        if (openedCards.length == 2) {
          if (openedCards[0].dataset.icon == openedCards[1].dataset.icon) {
            console.log("CORRECT");
          } else {
            setTimeout(function(){
            //  if (openedCards[0] == openedCards[1]) {
                openedCards.forEach(function(card){
                  card.classList.remove('open', 'show');
                });
                // alert("CORRECT!")
                openedCards = [];
          /*    } else {
                openedCards.forEach(function(card){
                  card.classList.remove('open', 'show');
                });
                alert("WRONG!")
                openedCards = [];
              } */
            }, 1000);
          }
        }
      }
    });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// display card
