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
var openedCards = [];
var openedIcons = [];
var totalClicks = 0;
var gameStart = false;
var deck = document.querySelector('.deck');
var moves = 0;
var moveSelector = document.querySelector('.moves');
var stars = 3; // default star amount
var starsSelector = document.querySelector('.stars');

function buildStars(n) {
  var starHTML = ``;
  for (var i=0; i<n; i++) {
    starHTML += `<li><i class="fa fa-star"></i></li>`;
  }
  return starHTML;
}
function loadGame() {
  var cardHTML = shuffle(cards).map(function(card) {
      return buildDeck(card);
  });
  deck.innerHTML = cardHTML.join('');
  moveSelector.innerText = moves;
  starsSelector.innerHTML = buildStars(3);
  //console.log(cardHTML)
}
function buildDeck(card) {
  template = `<li class="card" data-icon="${card}"><i class="fa ${card}"></i></li>`
  return template;
}
function resetGame() {
  // reset variables
  deck.innerHTML = "";
  openedCards = [];
  openedIcons = [];
  moves = 0;
  stars = 3;
  loadGame();
  cardEvent();
}
// remove the card from previous arrays
function cardEvent() {
  var cardsAll = document.querySelectorAll('.card');
  cardsAll.forEach(function(card) {
      card.addEventListener('click', function(e) {
        // prevent double clicking
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
          card.classList.add('open', 'show', 'animated', 'flipInY');
          openedCards.push(card);
          // check icon
          var firstCardType = openedCards[0].querySelector('i').classList.item(1);
          console.log(firstCardType);

          if (openedCards.length == 2) {
              openedCards[1].classList.remove('animated', 'flipInY');
              openedCards[0].classList.remove('animated', 'flipInY');
            if (openedCards[0].dataset.icon == openedCards[1].dataset.icon) {
              openedCards[0].classList.add('match', 'open', 'show', 'animated', 'pulse');
              openedCards[1].classList.add('match', 'open', 'show', 'animated', 'pulse');
              openedCards = [];
            } else {
              openedCards[0].classList.add('animated', 'shake', 'wrong');
              openedCards[1].classList.add('animated', 'shake', 'wrong');
              setTimeout(function(){
                  openedCards.forEach(function(card){
                    card.classList.remove('open', 'show', 'animated', 'shake', 'wrong', 'flipInY');
                  });
                  openedCards = [];
              }, 1100);
            }
            moves += 1;
            // check moves, remove stars
            if (moves == 12) {
                starsSelector.innerHTML = buildStars(2);
            } else if (moves == 24) {
                starsSelector.innerHTML = buildStars(1);
            }
            moveSelector.innerText = moves;
          }
        }
      });
  });
}
loadGame();
cardEvent();
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
