var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  soundPlay(randomChosenColour);
}

function soundPlay(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  soundPlay(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
      soundPlay("wrong")
      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key To Restart.");
      startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function arrayEqual(array1, array2) {
  var flag = 0;
  if (array1.length != array2.length) {
    return false;
  } else {
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        var flag = 1;
      }
    }
  }
  if (flag === 0) {
    return true;
  } else {
    return false;
  }
}
