// set default variables
var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bomb', 'fa-bomb', 'fa-bicycle', 'fa-bicycle']
var openedCards = [];
var openedIcons = [];
var correctCards = 0;
var gameStart = false;
var deck = document.querySelector('.deck');
var moves = 0;
var moveSelector = document.querySelector('.moves');
var stars = 3; // default star amount
var starsSelector = document.querySelector('.stars');
var seconds = 0;
var timerElement = document.querySelector('.seconds-counter');

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
function startTime() {
  interval = setInterval(function() {
      seconds++;
      timerElement.innerText = seconds + "s";
    }, 1000);
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
  correctCards = 0;
  moves = 0;
  stars = 3;
  seconds = 0;
  if (gameStart == true) {
    clearInterval(interval);
  }
  gameStart = false;
  timerElement.innerText = "0s";
  // load game and load event listener
  loadGame();
  cardEvent();
}

// Finish Game
function finishGame() {
  finishedStars = buildStars(stars);
  var modalHTML = `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content text-center">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Congrats!</h5>
        </div>
        <div class="modal-body">
          <h1>You have finished the game with ${moves} moves!</h1>
          <ul class="finished-stars">
            ${finishedStars}
          </ul>
          <p>It took you ${seconds} seconds to complete the game!</p>
          <button type="button" class="btn btn-primary btn-lg" onclick="resetGame()" data-dismiss="modal">Play again</button>
        </div>
      </div>
    </div>
  </div>`;
  $(modalHTML).modal({backdrop: 'static', keyboard: false});
    clearInterval(interval);
}
function cardEvent() {
  var cardsAll = document.querySelectorAll('.card');
  cardsAll.forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (gameStart == false) {
          gameStart = true;
          startTime();
        }
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
              correctCards += 1;
              if (correctCards === 8) {
                finishGame();
              }
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
                stars = 2;
            } else if (moves == 24) {
                starsSelector.innerHTML = buildStars(1);
                stars = 1;
            }
            moveSelector.innerText = moves;
          }
        }
      });
  });
}
loadGame();
cardEvent();
