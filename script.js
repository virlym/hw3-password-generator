// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(pass) {
  var passwordText = document.querySelector("#password");

  passwordText.value = pass;

}

function makeLowerArray(){
  var letterArray = [];
  for(var i = 0; i < 26; i++){
    letterArray[i] = String.fromCharCode(97 + i);
  }
  return(letterArray);
}

function makeUpperArray(){
  var letterArray = [];
  for(var i = 0; i < 26; i++){
    letterArray[i] = String.fromCharCode(65 + i);
  }
  return(letterArray);
}


function makeNumArray(){
  var numArray = [];
  for(var i = 0; i < 10; i++){
    numArray[i] = String.fromCharCode(48 + i);
  }
  return(numArray);
}


function makeSpecialArray(){
  var specialArray = [];
  for(var i = 0; i < 15; i++){
    specialArray[i] = String.fromCharCode(33 + i);
  }
  for(var i = 15; i < 22; i++){
    specialArray[i] = String.fromCharCode(58 + (i-15));
  }
  for(var i = 22; i < 29; i++){
    specialArray[i] = String.fromCharCode(91 + (i-23));
  }
  for(var i = 29; i < 33; i++){
    specialArray[i] = String.fromCharCode(123 + (i-29));
  }
  return(specialArray);
}


function getLower(){
  var letter = makeLowerArray();
  //console.log(letter);
  var randLet = Math.floor(Math.random()*letter.length);
  return(letter[randLet]);
}

function getUpper(){
  var letter = makeUpperArray();
  //console.log(letter);
  var randLet = Math.floor(Math.random()*letter.length);
  return(letter[randLet]);

}

function getNum(){
  var num = makeNumArray();
  //console.log(num);
  var randNum = Math.floor(Math.random()*num.length);
  return(num[randNum]);
}

function getSpecial(){
  var special = makeSpecialArray();
  var randChar = Math.floor(Math.random()*special.length);
  return(special[randChar]);
}

function collectType(low, high, num, spec){
  var correctChoice = false;
  while(!correctChoice){
    var randChoice = Math.floor(Math.random()*4);
    if(randChoice === 0 && low){
      correctChoice = true;
    }
    if(randChoice === 1 && high){
      correctChoice = true;
    }
    if(randChoice === 2 && num){
      correctChoice = true;
    }
    if(randChoice === 3 && spec){
      correctChoice = true;
    }
  }
  return(randChoice);
}

function collectChar(choice){
  var addChar;
  if(choice === 0){
    addChar = getLower();
  }
  else if(choice === 1){
    addChar = getUpper();
  }
  else if(choice === 2){
    addChar = getNum();
  }
  else{
    addChar = getSpecial();
  }
  return(addChar);
}

function buildPass(length, lower, upper, number, special){
  var pass = "";
  for(var i = 0; i < length; i++){
    pass = pass + collectChar(collectType(lower, upper, number, special));
  }
  return(pass);
}

function clickGen(){

  var passLength = prompt("How long would you like the password? (between 8 and 128 characters)");
  //console.log(`pass length : ${passLength}`);

  if(passLength > 7 && passLength < 129){
    var choiceLower = confirm("Would you like to include lowercase letters?");
    //console.log(`lower case choice : ${choiceLower}`);

    var choiceUpper = confirm("Would you like to include capital letters?");
    //console.log(`upper case choice : ${choiceUpper}`);

    var choiceNum = confirm("Would you like to include numbers?");
    //console.log(`number choice : ${choiceNum}`);

    var choiceSpecial = confirm("Would you like to include special characters?");
    //console.log(`special character choice : ${choiceSpecial}`);

    if(choiceLower || choiceUpper || choiceNum || choiceSpecial){
      //console.log(`you selected at least one choice`);
      var password = buildPass(passLength, choiceLower, choiceUpper, choiceNum, choiceSpecial);
      writePassword(password);
    }
    else{
      alert("I'm sorry, but you need to select at least one option");
      writePassword("Your Secure Password would be here if you actually wanted one");
    }
  }
  else{
    alert("I'm sorry, we need a number input from 8-128 only");
    writePassword("Your Secure Password would be here if you followed directions");
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", clickGen);


/*
on button click
  -prompt for password length (8-128 characters)
  -confirm for lowercase
  -confirm for uppercase
  -confirm for numbers
  -confirm for special characters

  -validate choices
  -needs at least 1 choice

  generate password based on choices

  password is displayed, replace the card-body.textarea.placeholder
*/