var randomNumber1 = Math.floor(Math.random() * 6) + 1;

var randomImg1 = "images/dice" + randomNumber1 + ".png";

var Image1=document.querySelectorAll("img")[0];

Image1.setAttribute("src", randomImg1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImg2 = "images/dice" + randomNumber2 + ".png";

var Image2=document.querySelectorAll("img")[1];

Image2.setAttribute("src", randomImg2);

if(randomNumber1>randomNumber2){

document.querySelector("h1").innerHTML="Player 1 wins";

}

else if (randomNumber1<randomNumber2){

  document.querySelector("h1").innerHTML="Player 2 wins";

}

else{

  document.querySelector("h1").innerHTML="Draw";
}