var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0
var started = false




$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    console.log(gamePattern[currentLevel]);
    console.log(userClickedPattern[currentLevel]);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game over")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over... Press any key to restart.")
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

