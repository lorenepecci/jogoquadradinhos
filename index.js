alert("oi");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var chosenuserColor = $(this).attr("id");
  userPattern.push(chosenuserColor);

  play_sound(chosenuserColor);
  color_press(chosenuserColor);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(levell) {
  if (gamePattern[levell] === userPattern[levell]) {
    console.log("success");
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    play_sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("GAME OVER Pressione qualquer key para jogar novamente!");
    start_over()

  }
}

function start_over(){
  level=0;
  gamePattern=[];
  userPattern=[];
  started=false;

}
function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("LEVEL" + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  play_sound(randomChosenColor);
}


function play_sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function color_press(com) {
  $("#" + com).addClass("pressed");
  setTimeout(function() {
    $("#" + com).removeClass("pressed");
  }, 100);
}
