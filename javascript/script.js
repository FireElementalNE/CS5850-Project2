// green 26A65B
// red CF000F
// yellow F9BF3B
// blue 4183D7

var sequence = new Array();
var input;
var playerTurn = false;
var firstRound = true;
var haslost = false;
var index = 0;
var userEntered = 0;

function register(color) {
	if(playerTurn && !haslost) {
		lightUp(color);
		checkSequence(color);
	}
}

function addToSequence() {
	var color = Math.floor((Math.random() * 4) + 1);
	switch(color) {
		case 1:
			sequence.push('red');
			break;
		case 2:
			sequence.push('green');
			break;
		case 3:
			sequence.push('blue');
			break;
		case 4:
			sequence.push('yellow');
			break;
	}
}

function confirm() {
	lightUp('red');
	lightUp('green');
	lightUp('blue');
	lightUp('yellow');
}

function removeColors() {
	$('#red').remove();
	$('#green').remove();
	$('#blue').remove();
	$('#yellow').remove();
}

function checkSequence(userInput) {
	if(sequence[index] == userInput && userEntered <= sequence.length && !haslost) {
		console.log(userInput);
		userEntered++;
		index++;
	}
	else {
		haslost = true;
	}
	if(userEntered == sequence.length && !haslost) {
		userEntered = 0;
		index = 0;
		confirm();
		playerTurn = false;
	}

}

function newRound() { // http://codeplanet.io/building-simon-says-javascript/
    addToSequence();
    animate(sequence);
    playerTurn = true;
}
 
function animate(sequence) {
    var i = 0;
    var interval = setInterval(function() {
        lightUp(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
   }, 600);
}
function lightUp(tile) {
    var $tile = $('#' + tile).addClass('lit');
    window.setTimeout(function() {
        $tile.removeClass('lit');
    }, 300);
}

setInterval(function() {
	if(!playerTurn) {
		newRound();
	}
	if(haslost) {
		removeColors();
		$('#go').removeClass('hidden');
	}
}, 10);