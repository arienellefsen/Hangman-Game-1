document.addEventListener('keydown', guessLetter, false);

function gameObject(score) {
	this.gameon = false; //Check if 'start game' button has been pressed, to prevent event listener from firing out of game
	this.score = score; //player score
	this.history = []; //record of all letters played
	this.gameWord = ''; //current word being guessed
	this.gameWordAnswer = ''; //current answer, in pieces
    this.tries = 10; //tries to guess remaining
    this.letterFound = false; //flag for if guessed letter was found in string
}


	var game = new gameObject(0); //to be replaced with a constructor function

function start() {
	document.getElementById('startButton').style.visibility = "hidden"; //we begin the game by hiding the start button
    document.getElementById('gameInstructions').textContent = 'Press any key to play!';
	game.gameWord = pickWord(); //game chooses a word to be played for
    for(var i=0;i<game.gameWord.length;i++) {
        game.gameWordAnswer = game.gameWordAnswer.concat('_'); //Generates a hidden string equal in length to game word
    }
    document.getElementById('gameWord').textContent = 'The game word is: '+ game.gameWordAnswer;
    document.getElementById('triesLeft').textContent = 'You have ' + game.tries + ' guesses remaining.';
	game.gameon = true;//Garth: "Game on!" Wayne:"Game on!"
}

function pickWord() {//Pick a word from a library of fabulous words!
	var gameWords = ['caboose','shannon','zooey','bella','groundhog'];
	var value = Math.floor((Math.random() * gameWords.length));
	return gameWords[value];
}


function guessLetter(e) { //main logic
	if(game.gameon) { //Check if start button has been pressed
        if(e.keyCode >= 65 && e.keyCode <= 90) { //Only accept key presses which are alpha chars
            var letter = String.fromCharCode(e.keyCode).toLowerCase(); //If a char, assign it to letter
            if(game.history.indexOf(letter) === -1) { //So if the user has not pressed this letter already...
                game.history.push(letter); //...then add it into the history...
                document.getElementById('wrong-letters').textContent = 'Letters played: ' + game.history;

                for(i=0;i<game.gameWord.length;i++) { //...and loop over the entire game word...
                    if(game.gameWord.charAt(i) === letter){ //compare our guessed letter to every letter in the game word string
                        game.gameWordAnswer = replaceChar(letter,game.gameWordAnswer,i); //then go to the function which replaces one char
                        game.letterFound = true;//...and set 'found' to true
                    }
                }

                if(!game.letterFound){
                    game.tries--; //Was the legal guess found within our game answer? No? Lose a try.
                } else if(game.letterFound) {
                    game.letterFound = false; //Was the legal guess found within our game answer? Yes? Reset.
                }

                if(game.gameWord===game.gameWordAnswer) { //check for win condition
                    youWon();
                } else if (game.tries === 0) {//check for lose condition
                    youLost();
                }

                document.getElementById('gameWord').textContent =('The current game word answer is: ' + game.gameWordAnswer);//This prints the current word, with guessed letters
                document.getElementById('triesLeft').textContent = 'You have ' + game.tries + ' remaining.';
            }
    	}
    }
}

function replaceChar(char,string,index){
    return string.substr(0,index) + char + string.substr(index+1); //When called, replaces the char at index with char input on string
}

function youWon() {
    document.getElementById('gameInstructions').textContent = 'You win, bro-hirrim!'; //Print win text
    game.gameon = false;
}

function youLost() {
    document.getElementById('gameInstructions').textContent = 'You lose, sucka! The answer was ' + game.gameWord;
    game.gameon = false;
}

