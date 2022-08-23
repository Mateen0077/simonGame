var randomNumber;
var randomChosenColour;
var gamePattern = [];
var userChosenColour;
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
// let level=1;
let score = 0;
let currentLevel;
var started = false;
var level = 0;

// $(document).keypress(function() {
//     if (!started) {
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });
//   $("body").keydown(function (event) {
//     nextSequence();
//     $("h1").text("Level  "+ level);
//     started = true;
// })

$("body").keydown(function (event) {
    nextSequence();
    $("h1").text("Level  "+ level);
    started = true;
})

$("button.start").click(function () {
    setTimeout(function(){nextSequence();},300)
    $("h1").text("Level  "+ level);
    started = true;
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    makeAnimation(userChosenColour);

    // checkAnswer();
    checkAnswer(userClickedPattern.length-1);
})




function nextSequence() {

    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 3) + 1;

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    makeAnimation(randomChosenColour)
    // checkAnswer();
    // level++;
    

}

function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();;
}

function makeAnimation(name) {
    $("#" + name).addClass("pressed")
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 200);
}


// function checkAnswer()
// {
//   let index = 0;
//   if(gamePattern[i]==userClickedPattern[i])
//   {
//       alert("It matched");
//   }
//   else
//   {
//     alert("It didnt match");
//   }
// }

// function checkAnswer()
// {
//    if(gamePattern.join() === userClickedPattern.join())
//    {
      
//        level++;
//     //    userClickedPattern = [];
//        setTimeout(function(){nextSequence();},300)
//        $("h1").text("level "+level);
//    }   
//    else if(gamePattern.join() != userClickedPattern.join())
//    {
//      alert("123");
//    }
// }

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            level++;
            $("h1").text("level "+level);
            setTimeout(function () {
                nextSequence();
              }, 300);
            score = level;
            $(".score").text("Your new is score "+ score);
        }
    }
    else
    {
        ifWrong();
    }
}
function ifWrong()
{
    if(gamePattern.join() != userClickedPattern.join())
    {
        $("body").addClass("game-over");
        $("h1").text("You failed, Press any key to restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 300);
    
    
     var audio = new Audio("wrong.mp3");
     audio.play();
    
    }
    $(".score").text("Your  is score "+ score);
    saveScore();
    restart();
}
function restart()
{
    level = 0;
  gamePattern = [];
  started = false;
}
function saveScore()
{
    localStorage.setItem("score",score);
    $(".score").text("Your old was score "+ score);
}