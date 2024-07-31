var buttonColors = ["red","blue","yellow","green"];
   var gamePattern = [];

   $(document).keypress(function() {
    nextSequence();
});


function nextSequence(){

var randomNumber = Math.floor(Math.random()*4);

var randomChosenColor = buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
$()

}
