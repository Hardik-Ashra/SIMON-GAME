var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//1st step
// detect game is started or not 

$(document).keypress(function () {
    if (!started) {

        // checking for saved game
        if (localStorage.getItem("gamePattern") && localStorage.getItem("level")) {

            // retrieving saved game
            gamePattern = JSON.parse(localStorage.getItem("gamePattern"));
            level = parseInt(localStorage.getItem("level"));

            // Update the level title
            $("#level-title").text("Level " + level);

            // Resume the game from the saved level and pattern
            playPattern(gamePattern);
        }
            // No saved data, start a new game
        else {
            
            $("#level-title").text("Level " + level);
            nextSequence();
        }
        started = true;
    }
});


//2nd step
//Random game pattern 

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // ...

    // Store gamePattern and level in localStorage
    localStorage.setItem("gamePattern", JSON.stringify(gamePattern));
    localStorage.setItem("level", level);

    // ...

}

//3rd step
// USER PATTERN

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);
});

//4th step
//CHECK ANSWER

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

//4th step
//restart

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}

//Sound
function playSound(name) {
    var audio = new Audio("sounds\\" + name + ".mp3");
    audio.play();
}

//Animation after clicking
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playPattern(pattern) {
    var i = 0;
    var interval = setInterval(function () {
      $("#" + pattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(pattern[i]);
      i++;

      if (i >= pattern.length) {
        clearInterval(interval);
      }
    }, 1000);
  }
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

    // Clear the saved data from localStorage
    localStorage.removeItem("gamePattern");
    localStorage.removeItem("level");
}