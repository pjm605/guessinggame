
var goal = -1;

function checkNumber()
{
	if(goal === -1) {
		goal = getRandomNumber();
	}

	var value = document.getElementById("guessNumber").value;
	value = parseInt(value);
	

	//alert("checkNumber called:"+value+ " goal:"+goal);
	var message = "";
	var numValue = value;
	if(numValue == goal)
	{
		message = "Good Job. You found the number!!!";
	}
	else if(Math.abs(goal - numValue) <= 3)
	{
		message = "You are really hot!!";
	}
	else if(Math.abs(goal - numValue) <= 10)
	{
		message = "You are hot";
	}
	else
	{
		message = "You are cold";

	}
	document.getElementById("result").innerHTML = message;
}

function playAgain()
{
	// reset number
	goal = -1;
	var message = "You are starting a new game... reset number";
	document.getElementById("result").innerHTML = message;

}

function giveHint()
{
	var message = "";
	if(goal === -1)
	{
		message = "Try a guess before asking for a hint";
	}
	else
	{
		//message = "The goal number is:" + goal;
		var upper = Math.min(goal + 5, 100);
		var lower = Math.max(goal - 5, 0);
		message = "Number if between "+ lower + " and " + upper;

	}
	document.getElementById("result").innerHTML = message;

}

function getRandomNumber()
{
	return Math.floor(Math.random() * 100 + 1);
}