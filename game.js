var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //make selected button flash using jquery
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  //add sound to selected button
  playSound(randomChosenColour);
  $("h1").text("level " + level);
  level++;
}
//add sound to selected button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  //get id of button clicked
  var userChosenColour = $(this).attr("id");
  //add button clicked to userClickedPattern array
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  //pass index of last answer in userClickedPattern
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(buttonPressed) {
  $("#" + buttonPressed).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonPressed).removeClass("pressed");
  }, 100);
}

var started = 0;

$("body").keypress(function () {
  if (started !== true) {
    nextSequence();
  }
  started = true;
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
