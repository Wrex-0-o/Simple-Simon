var buttonColours = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var audioMap = {"red":"red.mp3", "blue":"blue.mp3", "green":"green.wav", "yellow":"yellow.mp3", "wrong":"wrong.mp3", "victory":"victory.mp3"};
var level = 0;

var gameActive = false;
$(document).keydown(function(){
    if(gameActive){
        return;
    }
    gameActive = true;
    nextSequence();
});

$(".tile").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    var index = userClickedPattern.length - 1;
    checkAnswer(index);
});

function checkAnswer(index){
    var currentLevel = index;
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //console.log(userClickedPattern[currentLevel]);
        //console.log(gamePattern[currentLevel]);
        //console.log(currentLevel);
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $(".update").text("Game Over! Press any key to Restart.");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    level++;
    $(".update").text("Level " + level);
    
    animateBlink(randomChosenColour);
    playSound(randomChosenColour);
}

function animateBlink(colour){
    $("#" + colour).addClass("blink");
    setTimeout(function(){
        $("#" + colour).removeClass("blink");
    }, 80);
}

function animatePress(colour){
    $("#" + colour).addClass("pressed");
    setTimeout(function(){
        $("#" + colour).removeClass("pressed");
    }, 80);
}

function playSound(nameOfAudio){
    var audio = new Audio("./audio/" + audioMap[nameOfAudio]);
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameActive = false;
}