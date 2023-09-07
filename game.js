var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
// 1. Create a new function called nextSequence()
function nextSequence() {
  // 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  // 3. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // 4. Add the new randomChosenColour generated in step 3 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // 5. Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  //add sound to selected button
  playSound(randomChosenColour);
  $("h1").text("level " + level);
  level++;
}

//play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add click event to buttons
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

//add animation to button clicked
function animatePress(buttonPressed) {
  //add pressed class to button clicked
  $("#" + buttonPressed).addClass("pressed");
  //remove pressed class after 100ms
  setTimeout(function () {
    $("#" + buttonPressed).removeClass("pressed");
  }, 100);
}

//add keypress event to start game
$("body").keypress(function () {
  if (started !== true) {
    nextSequence();
  }
  started = true;
});

//check answer
function checkAnswer(currentLevel) {
  //check if answer is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check if user has finished sequence
    if (gamePattern.length === userClickedPattern.length) {
      //start next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
      //reset userClickedPattern
      userClickedPattern = [];
    }
  } else {
    //play wrong sound
    playSound("wrong");
    $("body").addClass("game-over"); //add game-over class to body
    //remove game-over class after 200ms
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //change h1 text
    $("h1").text("Game Over, Press Any Key to Restart");
    //reset game
    startOver();
  }
}

//reset game function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
