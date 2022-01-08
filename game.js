var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

// generate random number in b/w 0 and 3
function nextSequence(level) {
    randomNumber = Math.random();
    randomNumber *= 3;
    randomNumber += 1;
    randomNumber = Math.floor(randomNumber);
    $("h1").html("Level " + level);
    return randomNumber
}   

// generates sound based on colour of button
function playSound(name) {
    switch (name) {
        case "blue":
            var audio1 = new Audio("sounds/blue.mp3");
            audio1.play();
            break;
            
        case "green":
            var audio2 = new Audio("sounds/green.mp3");
            audio2.play();
            break;
                
        case "red":
            var audio3 = new Audio("sounds/red.mp3");
            audio3.play();
            break;
                    
        case "yellow":
            var audio4 = new Audio("sounds/yellow.mp3");
            audio4.play();
            break;
                    
        case "wrong":
            var audio5 = new Audio("sounds/wrong.mp3");
            audio5.play();
            break;
            
        default:
            break;
            }
}

// causes the button to flash
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

// starts a game
function playRound(index) {
    var randomChosenColour = buttonColors[index]; // select a random color based on the value using it as the array index
    gamePattern.push(randomChosenColour); // add it to the game play array

    $("." + randomChosenColour).fadeOut(50).fadeIn(50); // flash the random color
    playSound(randomChosenColour); // play its sound
}

function checkAnswer() {
    setTimeout(function() {
        if (userClickedPattern.every((val, index) => val === gamePattern[index])) {
            userClickedPattern = [];
            level += 1;
            var number = nextSequence(level);
            playRound(number);
            }
        }, 1000);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).keydown(function () {
    $("h1").html("Level "+ level);
    }, 2000);
}

$(document).keydown(function () {
    if (start == false) {
        start = true;
        var index = nextSequence(level); // call the new number
        playRound(index);
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkIndex = userClickedPattern.indexOf(userChosenColour);
    setTimeout(function() {
        if (userClickedPattern[checkIndex] !== gamePattern[checkIndex]) {
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").html("Game Over, Press Any Key to Restart");
            setTimeout(function() {
                start = false;
                startOver();
            }, 1000);
            
        }
    }, 500);
    if (userClickedPattern.length == gamePattern.length) {
        checkAnswer();
    }
})

