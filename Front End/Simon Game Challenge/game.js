
var buttonColors = ["red","blue","yellow","green"];
  
var gamePattern = [];

var userClickedPattern = [];
var started = false;

   $(".btn").on("click",function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    });



   $(document).keypress(function() {

    if(!started){
    nextSequence();
    started = true;
    }    
});

var level = 0;

function nextSequence(){

userClickedPattern = [];

var randomNumber = Math.floor(Math.random()*4);

var randomChosenColor = buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(100).fadeIn(100);

playSound(randomChosenColor)

$("#level-title").text("Level " + level);
level++;

}

function playSound(name){

    
    var Sound = new Audio("sounds/" + name + ".mp3");
    Sound.play();

}


function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){

    $("#" + currentColor).removeClass("pressed");

    },100);

}


function checkAnswer(currentLevel){

if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("Sucess");

    if(userClickedPattern.length === gamePattern.length){

        setTimeout(function(){
        nextSequence();
        },1000)
}}  

if(gamePattern[currentLevel]!==userClickedPattern[currentLevel]){

 var Sound = new Audio("wrong.mp3");
    Sound.play();

    $("body").addClass("game-over");

    setTimeout(function(){

        $("body").removeClass("game-over")

    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();


}

else{
console.log("wrong");
}

}

function startOver(){

level = 0;
gamePattern = [];
started = false;

}