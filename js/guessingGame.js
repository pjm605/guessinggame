/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100 + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	var guess = +$(document).find('#guessNumber').val();
	localStorage.playersGuess = Number(guess);
	document.getElementById('guessNumber').value = "";
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if(localStorage.playersGuess > localStorage.winnerNumber) {
		return "higher";
	}
	else {
		return "lower";
	}
}

function guessMessage(){
	var lowhigh = lowerOrHigher();
	var diff = Math.abs(localStorage.playersGuess - localStorage.winnerNumber);
	var steps = "";
	if(diff <= 5) {
		steps = "within five";
	}
	else if (diff <= 10) {
		steps = "within ten"
	}
	else {
		steps = "more than ten"

	}
	return "Your Guess is " + lowhigh + " and " + steps + " digits away from the winning number";
}


// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if(localStorage.guesses >= localStorage.maxGuesses) {
		$(document).find('#result').text("No more guesses remaining");
		$('.submit').slideUp();
		$('.hint').slideUp();
		return;
	}

	if(localStorage.lastGuess === localStorage.playersGuess) {
		$(document).find('#result').text("Duplicate guess");
		$(document).find('#result').css('background-color', 'orange');
	}
	else if(localStorage.winnerNumber === localStorage.playersGuess) {
		$(document).find('#result').text("You won!!!");
		$('.submit').slideUp();
		$('.hint').slideUp();
	}
	else {
		localStorage.lastGuess = localStorage.playersGuess;
		localStorage.guesses++;
		var remaining = localStorage.maxGuesses - localStorage.guesses;
		$(document).find('#result').text("Try Again. " +
		 	remaining + " remaining. " + guessMessage());

		if(remaining <= 0){
			$('.submit').slideUp();
			$('.hint').slideUp();
		}
		else if(remaining <= 3)
		{
			$(document).find('#result').css('background-color', 'red');
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	$(document).find('#result').text("Hint: Number is:" + localStorage.winnerNumber);
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	location.reload();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	localStorage.guesses = 0;
	localStorage.maxGuesses = 5;
	localStorage.lastGuess = 0;
	localStorage.playersGuess = 0;
	// set winning number
	localStorage.winnerNumber = generateWinningNumber();

	$('.submit').on('click', 'button', function() {
		playersGuessSubmission();
		checkGuess();
	});

	$('#guessNumber').on('keypress', function(event){
		if(event.which === 13) //return key
		{
			event.preventDefault();
			playersGuessSubmission();
			checkGuess();
		}
	})



	$('.playagain').on('click', 'button', function() {
		playAgain();
	});

	$('.hint').on('click', 'button', function(){
		provideHint();
	});

});

